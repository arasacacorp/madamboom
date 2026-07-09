import { NextRequest, NextResponse } from 'next/server'
import { getWidgetUrl } from '@/lib/tc-widget-config'

/* ═══ TicketsCloud Calendar API Route ═══
 * GET /api/calendar?year=2026&month=6
 * (month is 1-indexed: 1=January, 12=December)
 *
 * Fetches events from TicketsCloud, caches 1 hour in-memory.
 * Only READ operations — never modifies anything on TicketsCloud side.
 */

const TC_API_KEY = process.env.TC_API_KEY
const TC_API_BASE = process.env.TC_API_BASE || 'https://ticketscloud.com'

/* ─── In-memory cache ─── */
type CacheEntry = { data: CalendarEvent[]; ts: number }
const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

/* ─── All-events cache (refreshed periodically) ─── */
let allEventsCache: { data: RawTCEvent[]; ts: number } | null = null
const ALL_EVENTS_TTL = 60 * 60 * 1000 // 1 hour

/* ─── Types ─── */
interface RawTCEvent {
  id: string
  status: string
  age_rating?: number
  lifetime: string // VEVENT string
  title: { text: string; desc: string }
  org: { id: string; name: string }
  partner: { id: string; name: string }
  venue: {
    id: string
    name: string
    address: string
    city: {
      id: number
      country: string
      name: Record<string, string> | string
      timezone: string
    }
  }
  sets: Array<{
    id: string
    name: string
    price: string
    amount: number
    amount_vacant: number
    with_seats: boolean
  }>
  media?: {
    cover?: { url: string }
    cover_small?: { url: string }
    cover_original?: { url: string }
  }
  tickets_amount: number
  tickets_amount_vacant: number
}

export interface CalendarEvent {
  id: string
  /* Date in local venue timezone (ISO string) */
  startLocal: string
  endLocal: string
  /* Date-only (YYYY-MM-DD) in venue TZ for calendar grouping */
  dateKey: string
  /* Human-readable */
  dateDisplay: string
  timeDisplay: string
  /* Content */
  title: string
  description: string
  ageRating: number
  /* Venue */
  venueId: string
  venueName: string
  venueAddress: string
  city: string
  timezone: string
  /* Tickets */
  ticketsAmount: number
  ticketsVacant: number
  soldOut: boolean
  /* Cover image */
  coverUrl: string | null
  coverSmallUrl: string | null
  /* Ticket categories (sets) — top 6 by price */
  sets: Array<{
    id: string
    name: string
    price: number
    vacant: number
    total: number
  }>
  /* Widget URL for purchase (mapped by venue/show type) */
  widgetUrl: string | null
  /* City marker for calendar: 'М' | 'СПб' | null */
  cityMarker: 'М' | 'СПб' | null
}

/* ─── Parse VEVENT lifetime → start/end Date (UTC) ─── */
function parseVEVENT(lifetime: string): { start: Date; end: Date } | null {
  const startMatch = lifetime.match(/DTSTART[^:]*:(\d{8}T\d{6}Z)/)
  const endMatch = lifetime.match(/DTEND[^:]*:(\d{8}T\d{6}Z)/)
  if (!startMatch || !endMatch) return null

  // Format: 20260619T160000Z → 2026-06-19T16:00:00Z
  const toISO = (s: string) =>
    `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(11, 13)}:${s.slice(13, 15)}Z`

  const start = new Date(toISO(startMatch[1]))
  const end = new Date(toISO(endMatch[1]))
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null
  return { start, end }
}

/* ─── Convert UTC Date to venue-local date key (YYYY-MM-DD) ─── */
function toDateKey(utcDate: Date, timezone: string): string {
  // We support Europe/Moscow (UTC+3, no DST since 2014) directly.
  // For other TZs we fall back to UTC offset approximation.
  if (timezone === 'Europe/Moscow') {
    // UTC+3
    const local = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000)
    return local.toISOString().slice(0, 10)
  }
  // Fallback: use Intl with the timezone
  try {
    const fmt = new Intl.DateTimeFormat('sv-SE', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    return fmt.format(utcDate) // sv-SE gives YYYY-MM-DD
  } catch {
    return utcDate.toISOString().slice(0, 10)
  }
}

/* ─── Format time in venue TZ (HH:MM) ─── */
function toTimeDisplay(utcDate: Date, timezone: string): string {
  if (timezone === 'Europe/Moscow') {
    const local = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000)
    return local.toISOString().slice(11, 16)
  }
  try {
    const fmt = new Intl.DateTimeFormat('ru-RU', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
    })
    return fmt.format(utcDate)
  } catch {
    return utcDate.toISOString().slice(11, 16)
  }
}

/* ─── Format date display in Russian ─── */
const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]
function toDateDisplay(utcDate: Date, timezone: string): string {
  let local: Date
  if (timezone === 'Europe/Moscow') {
    local = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000)
  } else {
    local = utcDate
  }
  const day = local.getUTCDate()
  const month = local.getUTCMonth()
  return `${day} ${MONTHS_RU[month]}`
}

/* ─── Get city name in Russian ─── */
function getCityName(city: RawTCEvent['venue']['city']): string {
  if (typeof city.name === 'string') return city.name
  return city.name.ru || city.name.default || city.name.en || ''
}

/* ─── Determine city marker for calendar ─── */
function getCityMarker(city: string): 'М' | 'СПб' | null {
  const c = city.toLowerCase()
  if (c.includes('москв')) return 'М'
  if (c.includes('петербург') || c.includes('спб') || c.includes('peterburg')) return 'СПб'
  return null
}

/* (getWidgetUrl импортирован из @/lib/tc-widget-config — см. конфиг-файл
 *  для добавления новых поддоменов виджетов продаж) */

/* ─── Transform raw TC event → CalendarEvent ─── */
function transformEvent(raw: RawTCEvent): CalendarEvent | null {
  const parsed = parseVEVENT(raw.lifetime)
  if (!parsed) return null

  const city = getCityName(raw.venue.city)
  const timezone = raw.venue.city.timezone || 'Europe/Moscow'

  // Sort sets by price asc, take top 6
  const sets = (raw.sets || [])
    .map((s) => ({
      id: s.id,
      name: s.name,
      price: parseFloat(s.price) || 0,
      vacant: s.amount_vacant || 0,
      total: s.amount || 0,
    }))
    .sort((a, b) => a.price - b.price)
    .slice(0, 6)

  return {
    id: raw.id,
    startLocal: parsed.start.toISOString(),
    endLocal: parsed.end.toISOString(),
    dateKey: toDateKey(parsed.start, timezone),
    dateDisplay: toDateDisplay(parsed.start, timezone),
    timeDisplay: toTimeDisplay(parsed.start, timezone),
    title: raw.title.text,
    description: raw.title.desc,
    ageRating: raw.age_rating || 18,
    venueId: raw.venue.id,
    venueName: raw.venue.name,
    venueAddress: raw.venue.address,
    city,
    timezone,
    ticketsAmount: raw.tickets_amount || 0,
    ticketsVacant: raw.tickets_amount_vacant || 0,
    soldOut: (raw.tickets_amount_vacant || 0) === 0,
    coverUrl: raw.media?.cover?.url || null,
    coverSmallUrl: raw.media?.cover_small?.url || null,
    sets,
    widgetUrl: getWidgetUrl(raw.venue.id, raw.title.text),
    cityMarker: getCityMarker(city),
  }
}

/* ─── Fetch all events from TicketsCloud (cached) ─── */
async function fetchAllEvents(): Promise<RawTCEvent[]> {
  // Return cache if fresh
  if (allEventsCache && Date.now() - allEventsCache.ts < ALL_EVENTS_TTL) {
    return allEventsCache.data
  }

  if (!TC_API_KEY) {
    throw new Error('TC_API_KEY is not set')
  }

  // Fetch all events (page_size=100 should be enough for ~36 events)
  const url = `${TC_API_BASE}/v1/services/simple/events?page_size=200&status=public`
  const res = await fetch(url, {
    headers: {
      Authorization: `key ${TC_API_KEY}`,
      Accept: 'application/json',
    },
    // Always fetch fresh on server (no browser cache)
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`TicketsCloud API error: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as RawTCEvent[]

  // Cache
  allEventsCache = { data, ts: Date.now() }

  return data
}

/* ─── GET handler ─── */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const yearParam = searchParams.get('year')
  const monthParam = searchParams.get('month') // 1-12

  try {
    const rawEvents = await fetchAllEvents()

    // Transform all events
    const allCalEvents = rawEvents
      .map(transformEvent)
      .filter((e): e is CalendarEvent => e !== null)

    // If year+month specified, filter to that month
    if (yearParam && monthParam) {
      const year = parseInt(yearParam, 10)
      const month = parseInt(monthParam, 10) // 1-12
      if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
        // Filter by dateKey (YYYY-MM)
        const monthPrefix = `${year}-${String(month).padStart(2, '0')}-`
        const filtered = allCalEvents.filter((e) => e.dateKey.startsWith(monthPrefix))

        // Cache key
        const cacheKey = `${year}-${month}`
        const cached = cache.get(cacheKey)
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
          return NextResponse.json(
            { events: cached.data, cached: true, count: cached.data.length },
            { headers: { 'Cache-Control': 'public, max-age=3600' } }
          )
        }
        cache.set(cacheKey, { data: filtered, ts: Date.now() })

        return NextResponse.json(
          { events: filtered, cached: false, count: filtered.length },
          { headers: { 'Cache-Control': 'public, max-age=3600' } }
        )
      }
    }

    // No filter — return all events
    return NextResponse.json(
      { events: allCalEvents, cached: false, count: allCalEvents.length },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[/api/calendar] Error:', message)
    return NextResponse.json(
      { error: 'Failed to fetch events', details: message },
      { status: 500 }
    )
  }
}
