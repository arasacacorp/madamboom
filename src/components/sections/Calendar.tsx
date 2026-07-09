'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  getDate,
} from 'date-fns'
import { ru } from 'date-fns/locale'

/* ─── CalendarEvent type (mirrors /api/calendar response) ─── */
interface CalendarEvent {
  id: string
  startLocal: string
  endLocal: string
  dateKey: string // YYYY-MM-DD (venue TZ)
  dateDisplay: string
  timeDisplay: string
  title: string
  description: string
  ageRating: number
  venueId: string
  venueName: string
  venueAddress: string
  city: string
  timezone: string
  ticketsAmount: number
  ticketsVacant: number
  soldOut: boolean
  coverUrl: string | null
  coverSmallUrl: string | null
  sets: Array<{
    id: string
    name: string
    price: number
    vacant: number
    total: number
  }>
  widgetUrl: string | null
  cityMarker: 'М' | 'СПб' | null
  /* Show type — "Мадам Бум" or "Джазовый бунт" */
  showType: string
  showTypeKey: 'jazz' | 'classic'
}

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (reduced count for section) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 70) * 3 + 1,
    left: seededRandom(i * 13 + 80) * 100,
    top: seededRandom(i * 17 + 90) * 100,
    opacity: seededRandom(i * 19 + 100) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 110) * 16 + 14,
    delay: seededRandom(i * 29 + 120) * 10,
    driftX: seededRandom(i * 31 + 130) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 140) * 80 + 20),
    driftX2: seededRandom(i * 41 + 150) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 160) * 100 + 30),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            '--particle-opacity': p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
            '--drift-x2': `${p.driftX2}px`,
            '--drift-y2': `${p.driftY2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/* ─── Icons ─── */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function VenueIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

/* ─── City marker colors ─── */
const CITY_COLORS: Record<string, string> = {
  'М': '#C9A96E', // gold for Moscow
  'СПб': '#7B1A2B', // burgundy for SPb
}

/* ─── Event Modal Component ─── */
function EventModal({
  event,
  onClose,
}: {
  event: CalendarEvent | null
  onClose: () => void
}) {
  const [showWidget, setShowWidget] = useState(false)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)

  // Reset widget view when event changes (derived from activeEventId)
  if (event && event.id !== activeEventId) {
    setActiveEventId(event.id)
    setShowWidget(false)
  }
  if (!event && activeEventId !== null) {
    setActiveEventId(null)
    setShowWidget(false)
  }

  // Lock body scroll when open + ESC to close
  useEffect(() => {
    if (!event) return
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = orig
      window.removeEventListener('keydown', onKey)
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: 'rgba(6,2,10,0.88)',
        backdropFilter: 'blur(8px)',
        animation: 'modalFadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1A0812 0%, #0D0408 100%)',
          border: '1px solid rgba(201,169,110,0.3)',
          boxShadow: '0 0 60px rgba(123,26,43,0.3), 0 0 100px rgba(201,169,110,0.08), 0 20px 60px rgba(0,0,0,0.7)',
          animation: 'modalSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 z-10 transition-all duration-300 hover:scale-110"
          style={{
            color: '#C9A96E',
            background: 'rgba(6,2,10,0.7)',
            border: '1px solid rgba(201,169,110,0.25)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </button>

        {showWidget && event.widgetUrl ? (
          /* ═══ Widget view (iframe TicketsCloud) ═══ */
          <div className="flex flex-col h-[85vh]">
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(201,169,110,0.15)' }}
            >
              <button
                onClick={() => setShowWidget(false)}
                className="flex items-center gap-2 transition-all duration-300 hover:gap-3"
                style={{
                  color: '#C9A96E',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Назад к описанию
              </button>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(201,169,110,0.5)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                }}
              >
                Безопасная оплата · TicketsCloud
              </span>
            </div>
            <iframe
              src={event.widgetUrl}
              title={`Покупка билетов: ${event.title}`}
              className="w-full flex-1"
              style={{ border: 'none', background: '#fff' }}
              allow="payment"
            />
          </div>
        ) : (
          /* ═══ Details view ═══ */
          <div className="flex flex-col md:flex-row max-h-[85vh]">
            {/* Left: Cover image */}
            <div className="md:w-2/5 flex-shrink-0 relative" style={{ minHeight: '200px' }}>
              {event.coverUrl ? (
                <img
                  src={event.coverUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '200px', maxHeight: '85vh' }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    minHeight: '200px',
                    background: 'linear-gradient(135deg, #1A0812 0%, #0D0408 100%)',
                  }}
                >
                  <CalendarIcon />
                </div>
              )}
              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(26,8,18,0.6) 100%)',
                }}
              />
              {/* City marker badge */}
              {event.cityMarker && (
                <div
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(6,2,10,0.8)',
                    border: `1px solid ${CITY_COLORS[event.cityMarker]}`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: CITY_COLORS[event.cityMarker],
                      boxShadow: `0 0 8px ${CITY_COLORS[event.cityMarker]}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: '#E8D5A3',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {event.city}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="md:w-3/5 flex flex-col overflow-y-auto" style={{ maxHeight: '85vh' }}>
              <div className="p-6 md:p-8">
                {/* Date + time row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2" style={{ color: '#C9A96E' }}>
                    <CalendarIcon />
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '13px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {event.dateDisplay}
                    </span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: 'rgba(201,169,110,0.7)' }}>
                    <ClockIcon />
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '13px',
                        fontWeight: 400,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {event.timeDisplay}
                    </span>
                  </div>
                  <div
                    className="ml-auto px-2.5 py-1 rounded"
                    style={{
                      background: 'rgba(123,26,43,0.2)',
                      border: '1px solid rgba(123,26,43,0.35)',
                      color: '#E8D5A3',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {event.ageRating}+
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#F5E6D3',
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  {event.title}
                </h3>

                {/* Venue + address */}
                <div
                  className="flex flex-col gap-2 mb-5 pb-5"
                  style={{ borderBottom: '1px solid rgba(201,169,110,0.12)' }}
                >
                  <div className="flex items-start gap-2" style={{ color: 'rgba(201,169,110,0.7)' }}>
                    <VenueIcon />
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: '#E8D5A3',
                          fontSize: '13px',
                          fontWeight: 500,
                        }}
                      >
                        {event.venueName}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'rgba(245,230,211,0.5)',
                          fontSize: '12px',
                          marginLeft: '6px',
                        }}
                      >
                        {event.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description — split into paragraphs (description is pre-cleaned by API: <br> stripped, \n\n = paragraph break) */}
                {event.description && (
                  <div className="mb-6 flex flex-col gap-3">
                    {event.description
                      .split('\n')
                      .map((line) => line.trim())
                      .filter((line) => line.length > 0)
                      .map((line, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: 'var(--font-cormorant)',
                            color: 'rgba(245,230,211,0.78)',
                            fontSize: 'clamp(14px, 1.3vw, 16px)',
                            fontStyle: 'italic',
                            lineHeight: 1.7,
                            letterSpacing: '0.02em',
                            margin: 0,
                          }}
                        >
                          {line}
                        </p>
                      ))}
                  </div>
                )}

                {/* Tickets availability + categories */}
                <div className="mb-6">
                  {/* Availability bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: event.soldOut ? '#7B1A2B' : 'rgba(201,169,110,0.7)',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {event.soldOut
                        ? 'Sold out'
                        : `Свободно ${event.ticketsVacant} из ${event.ticketsAmount}`}
                    </span>
                    {!event.soldOut && (
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'rgba(245,230,211,0.4)',
                          fontSize: '11px',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {Math.round((event.ticketsVacant / event.ticketsAmount) * 100)}% доступно
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      background: 'rgba(201,169,110,0.1)',
                    }}
                  >
                    <div
                      style={{
                        width: `${(event.ticketsVacant / event.ticketsAmount) * 100}%`,
                        height: '100%',
                        background: event.soldOut
                          ? '#7B1A2B'
                          : 'linear-gradient(90deg, #C9A96E, #E8D5A3)',
                        borderRadius: 'inherit',
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </div>

                  {/* Ticket categories */}
                  {event.sets.length > 0 && (
                    <div className="mt-5">
                      <h4
                        className="mb-3"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'rgba(201,169,110,0.7)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Категории билетов
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {event.sets.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between px-3 py-2 rounded"
                            style={{
                              background: 'rgba(201,169,110,0.04)',
                              border: '1px solid rgba(201,169,110,0.1)',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-inter)',
                                color: 'rgba(245,230,211,0.7)',
                                fontSize: '12px',
                              }}
                            >
                              {s.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  fontFamily: 'var(--font-playfair)',
                                  color: '#C9A96E',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                }}
                              >
                                {s.price.toLocaleString('ru-RU')} ₽
                              </span>
                              {s.vacant === 0 ? (
                                <span
                                  style={{
                                    fontFamily: 'var(--font-inter)',
                                    color: '#7B1A2B',
                                    fontSize: '10px',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  нет
                                </span>
                              ) : s.vacant <= 5 ? (
                                <span
                                  style={{
                                    fontFamily: 'var(--font-inter)',
                                    color: '#E8D5A3',
                                    fontSize: '10px',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {s.vacant} ост.
                                </span>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA: Buy tickets */}
                {event.widgetUrl && (
                  <button
                    onClick={() => setShowWidget(true)}
                    disabled={event.soldOut}
                    className="calendar-modal-buy-btn w-full flex items-center justify-center gap-3"
                    style={{
                      padding: '14px 24px',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: event.soldOut ? 'rgba(245,230,211,0.3)' : '#06020A',
                      background: event.soldOut
                        ? 'rgba(201,169,110,0.08)'
                        : 'linear-gradient(90deg, #C9A96E 0%, #E8D5A3 100%)',
                      border: '1px solid rgba(201,169,110,0.5)',
                      borderRadius: '4px',
                      cursor: event.soldOut ? 'not-allowed' : 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: event.soldOut ? 'none' : '0 0 20px rgba(201,169,110,0.2)',
                    }}
                  >
                    <TicketIcon />
                    {event.soldOut ? 'Билеты распроданы' : 'Купить билеты'}
                    {!event.soldOut && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: 'transform 0.3s ease' }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                )}
                {!event.widgetUrl && (
                  <div
                    className="px-4 py-3 rounded text-center"
                    style={{
                      background: 'rgba(123,26,43,0.1)',
                      border: '1px solid rgba(123,26,43,0.25)',
                      color: 'rgba(232,213,163,0.6)',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Скоро — продажа билетов откроется
                  </div>
                )}

                {/* Footer note */}
                <p
                  className="mt-4 text-center"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.35)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Безопасная оплата через TicketsCloud
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Calendar Component ───
 * Props (all optional):
 *  - cityFilter: 'М' | 'СПб'  → only fetch events for that city (via /api/calendar?city=)
 *  - widgetOverride: string   → force ALL events' ticket widget URL to this value
 *                               (e.g. 'https://madamboommsk.ticketscloud.org/' on the /msk page)
 *  - title: string            → override the section heading (default "Календарь событий")
 */
export default function Calendar({
  cityFilter,
  widgetOverride,
  title,
}: {
  cityFilter?: 'М' | 'СПб'
  widgetOverride?: string
  title?: string
} = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null)

  /* ── Events from API ── */
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  /* ── Client-side cache by month (+ city) ── */
  const monthCacheRef = useRef<Map<string, CalendarEvent[]>>(new Map())

  /* ── Fetch events when month changes ── */
  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + 1 // 1-indexed for API
    const cityQs = cityFilter === 'М' ? '&city=msk' : cityFilter === 'СПб' ? '&city=spb' : ''
    const cacheKey = `${year}-${month}-${cityQs || 'all'}`

    // Use cache if available
    const cached = monthCacheRef.current.get(cacheKey)
    if (cached) {
      setEvents(cached)
      setIsLoading(false)
      setLoadError(null)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setLoadError(null)

    fetch(`/api/calendar?year=${year}&month=${month}${cityQs}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        // Override widget URL for all events when widgetOverride is set
        const raw = (data.events || []) as CalendarEvent[]
        const evts = widgetOverride
          ? raw.map((e) => ({ ...e, widgetUrl: widgetOverride }))
          : raw
        monthCacheRef.current.set(cacheKey, evts)
        setEvents(evts)
        setIsLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('[Calendar] fetch error:', err)
        setLoadError(err.message || 'Failed to load events')
        setEvents([])
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [currentMonth, cityFilter, widgetOverride])

  /* ── Intersection Observer for entrance animation ── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /* ── Map events by dateKey for O(1) lookup ── */
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const e of events) {
      const arr = map.get(e.dateKey) || []
      arr.push(e)
      map.set(e.dateKey, arr)
    }
    return map
  }, [events])

  /* ── Helper: get dateKey for a Date in Europe/Moscow ── */
  const dateKeyFor = useCallback((d: Date): string => {
    // Europe/Moscow = UTC+3, no DST
    const local = new Date(d.getTime() + 3 * 60 * 60 * 1000)
    return local.toISOString().slice(0, 10)
  }, [])

  const selectedEvent = useMemo(() => {
    if (!selectedDate) return null
    const key = dateKeyFor(selectedDate)
    const arr = eventsByDate.get(key)
    return arr && arr.length > 0 ? arr[0] : null
  }, [selectedDate, eventsByDate, dateKeyFor])

  /* ── Calendar grid generation ── */
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days: Date[] = []
    let day = calStart
    while (day <= calEnd) {
      days.push(day)
      day = addDays(day, 1)
    }
    return days
  }, [currentMonth])

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i)),
    []
  )

  /* ── Handlers ── */
  const prevMonth = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMonth((m) => subMonths(m, 1))
      setSelectedDate(null)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [])

  const nextMonth = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMonth((m) => addMonths(m, 1))
      setSelectedDate(null)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [])

  const handleDayClick = useCallback(
    (day: Date) => {
      if (!isSameMonth(day, currentMonth)) return
      const key = dateKeyFor(day)
      const arr = eventsByDate.get(key)
      if (arr && arr.length > 0) {
        // If multiple events on same day, open the first; user can switch in modal
        setModalEvent(arr[0])
      }
    },
    [currentMonth, eventsByDate, dateKeyFor]
  )

  const handleEventCardClick = useCallback((evt: CalendarEvent) => {
    setModalEvent(evt)
  }, [])

  const monthLabel = format(currentMonth, 'LLLL yyyy', { locale: ru })
  const capitalizedMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)

  return (
    <section
      ref={sectionRef}
      id="calendar"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background atmospheric layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #0D0408 20%, #1A0812 50%, #0D0408 80%, #06020A 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(123,26,43,0.14) 0%, rgba(123,26,43,0.04) 45%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            conic-gradient(from 170deg at 30% 0%, rgba(201,169,110,0.04) 0deg, transparent 22deg) 0 0 / 100% 45% no-repeat,
            conic-gradient(from 190deg at 70% 0%, rgba(201,169,110,0.03) 0deg, transparent 18deg) 0 0 / 100% 45% no-repeat
          `,
          zIndex: 1,
        }}
      />
      <SectionParticles />
      <div className="vignette" style={{ position: 'absolute' }} />

      {/* ── Content ── */}
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 sm:pb-10"
        style={{ zIndex: 6 }}
      >
        {/* ═══ Section Header ═══ */}
        <div
          className="flex flex-col items-center gap-4 mb-12 sm:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="flex items-center gap-3" style={{ opacity: 0.6 }}>
            <div style={{ width: 'clamp(30px, 5vw, 60px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }} />
            <div
              style={{
                width: '8px',
                height: '8px',
                border: '1px solid rgba(201,169,110,0.7)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div style={{ width: 'clamp(30px, 5vw, 60px)', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {title || 'Календарь событий'}
          </h2>

          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#C9A96E',
              fontSize: 'clamp(11px, 1.4vw, 15px)',
              fontWeight: 400,
            }}
          >
            Расписание шоу
          </p>

          {/* City legend — show only the filtered city when cityFilter is set,
              otherwise show both cities */}
          <div className="flex items-center gap-4 mt-2">
            {(!cityFilter || cityFilter === 'М') && (
              <div className="flex items-center gap-1.5">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: CITY_COLORS['М'], boxShadow: `0 0 6px ${CITY_COLORS['М']}` }} />
                <span style={{ fontFamily: 'var(--font-inter)', color: 'rgba(201,169,110,0.55)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Москва
                </span>
              </div>
            )}
            {(!cityFilter || cityFilter === 'СПб') && (
              <div className="flex items-center gap-1.5">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: CITY_COLORS['СПб'], boxShadow: `0 0 6px ${CITY_COLORS['СПб']}` }} />
                <span style={{ fontFamily: 'var(--font-inter)', color: 'rgba(201,169,110,0.55)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Санкт-Петербург
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ═══ Counter badge ═══ */}
        {!isLoading && events.length > 0 && (
          <div
            className="flex items-center justify-center mb-8 sm:mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
            }}
          >
            <div className="flex items-center gap-3">
              <div style={{ width: 'clamp(20px, 4vw, 40px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35))' }} />
              <div
                className="date-badge"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: '#E8D5A3',
                  fontSize: 'clamp(10px, 1.2vw, 12px)',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.1) 0%, rgba(123,26,43,0.15) 100%)',
                  border: '1px solid rgba(201,169,110,0.25)',
                }}
              >
                {events.length} {events.length === 1 ? 'ШОУ' : 'ШОУ'} В ЭТОМ МЕСЯЦЕ
              </div>
              <div style={{ width: 'clamp(20px, 4vw, 40px)', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.35), transparent)' }} />
            </div>
          </div>
        )}

        {/* ═══ Main Content: Calendar Grid + Sidebar ═══ */}
        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
          }}
        >
          {/* ══════ Calendar Grid (Left) ══════ */}
          <div className="w-full lg:flex-1">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(26,10,16,0.9) 0%, rgba(10,3,16,0.95) 100%)',
                border: '1px solid rgba(201,169,110,0.15)',
                boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(123,26,43,0.08), inset 0 1px 0 rgba(201,169,110,0.1)',
              }}
            >
              {/* Month Navigation Header */}
              <div
                className="flex items-center justify-between px-4 sm:px-6 py-4"
                style={{
                  borderBottom: '1px solid rgba(201,169,110,0.12)',
                  background: 'linear-gradient(180deg, rgba(123,26,43,0.1) 0%, transparent 100%)',
                }}
              >
                <button
                  onClick={prevMonth}
                  className="transition-all duration-300 hover:scale-110"
                  style={{
                    color: '#C9A96E',
                    background: 'rgba(201,169,110,0.06)',
                    border: '1px solid rgba(201,169,110,0.15)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Предыдущий месяц"
                >
                  <ChevronLeft />
                </button>

                <span
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#F5E6D3',
                    fontSize: 'clamp(16px, 2.5vw, 22px)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  }}
                >
                  {capitalizedMonth}
                </span>

                <button
                  onClick={nextMonth}
                  className="transition-all duration-300 hover:scale-110"
                  style={{
                    color: '#C9A96E',
                    background: 'rgba(201,169,110,0.06)',
                    border: '1px solid rgba(201,169,110,0.15)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Следующий месяц"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(201,169,110,0.06)' }}>
                {weekDays.map((d, i) => (
                  <div
                    key={i}
                    className="py-2 sm:py-3 text-center"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'rgba(201,169,110,0.55)',
                      fontSize: 'clamp(10px, 1.4vw, 13px)',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {format(d, 'EEEEEE', { locale: ru })}
                  </div>
                ))}
              </div>

              {/* Day cells grid */}
              <div
                className="grid grid-cols-7"
                style={{
                  opacity: isTransitioning || isLoading ? 0.3 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {calendarDays.map((day, i) => {
                  const inMonth = isSameMonth(day, currentMonth)
                  const key = dateKeyFor(day)
                  const dayEvents = inMonth ? eventsByDate.get(key) || [] : []
                  const isEvent = dayEvents.length > 0
                  const isTodayDate = isToday(day)
                  // City marker for this day (first event's marker)
                  const cityMarker = dayEvents.length > 0 ? dayEvents[0].cityMarker : null
                  const cityColor = cityMarker ? CITY_COLORS[cityMarker] : null

                  return (
                    <button
                      key={i}
                      onClick={() => handleDayClick(day)}
                      disabled={!inMonth || !isEvent}
                      className="calendar-day-cell relative flex flex-col items-center justify-center transition-all duration-300"
                      style={{
                        aspectRatio: '1',
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'clamp(13px, 1.8vw, 16px)',
                        fontWeight: isEvent ? 600 : 400,
                        cursor: isEvent ? 'pointer' : 'default',
                        color: !inMonth
                          ? 'rgba(245,230,211,0.08)'
                          : isEvent
                            ? '#F5E6D3'
                            : isTodayDate
                              ? '#F5E6D3'
                              : 'rgba(245,230,211,0.3)',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        position: 'relative',
                      }}
                      aria-label={
                        isEvent
                          ? `${format(day, 'd MMMM', { locale: ru })} — ${dayEvents[0].title}`
                          : format(day, 'd MMMM', { locale: ru })
                      }
                    >
                      {/* Today's thin gold ring */}
                      {isTodayDate && !isEvent && (
                        <div
                          className="absolute"
                          style={{
                            width: 'clamp(30px, 4.5vw, 38px)',
                            height: 'clamp(30px, 4.5vw, 38px)',
                            borderRadius: '50%',
                            border: '1px solid rgba(201,169,110,0.35)',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      )}

                      {/* Event date: colored circle by city */}
                      {isEvent && cityColor && (
                        <div
                          className="absolute"
                          style={{
                            width: 'clamp(32px, 5vw, 40px)',
                            height: 'clamp(32px, 5vw, 40px)',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${cityColor}40 0%, ${cityColor}10 100%)`,
                            border: `1.5px solid ${cityColor}99`,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            transition: 'all 0.3s ease',
                            boxShadow: `0 0 12px ${cityColor}40, 0 0 30px ${cityColor}10`,
                          }}
                        />
                      )}

                      {/* Day number */}
                      <span style={{ position: 'relative', zIndex: 1 }}>{getDate(day)}</span>

                      {/* City text badge below date — МСК / СПБ */}
                      {isEvent && cityMarker && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: 'clamp(2px, 0.6vw, 5px)',
                            zIndex: 1,
                            fontFamily: 'var(--font-inter)',
                            fontSize: 'clamp(7px, 0.9vw, 9px)',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            lineHeight: 1,
                            color: cityColor,
                            textShadow: `0 0 6px ${cityColor}80`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {cityMarker === 'М' ? 'МСК' : 'СПБ'}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Bottom decorative gold line */}
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), rgba(201,169,110,0.3), rgba(201,169,110,0.2), transparent)',
                }}
              />
            </div>
          </div>

          {/* ══════ Sidebar: Event List (Right) ══════ */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div
              className="rounded-lg overflow-hidden h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(26,10,16,0.9) 0%, rgba(10,3,16,0.95) 100%)',
                border: '1px solid rgba(201,169,110,0.15)',
                boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(123,26,43,0.08), inset 0 1px 0 rgba(201,169,110,0.1)',
              }}
            >
              {/* Sidebar Header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{
                  borderBottom: '1px solid rgba(201,169,110,0.12)',
                  background: 'linear-gradient(180deg, rgba(123,26,43,0.1) 0%, transparent 100%)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: events.length > 0 ? '#C9A96E' : 'rgba(201,169,110,0.2)',
                    boxShadow: events.length > 0 ? '0 0 8px rgba(201,169,110,0.3)' : 'none',
                    transition: 'all 0.4s ease',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#F5E6D3',
                    fontSize: 'clamp(15px, 2vw, 19px)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}
                >
                  {isLoading ? 'Загрузка...' : events.length > 0 ? 'Ближайшие шоу' : 'Шоу не найдены'}
                </h3>
              </div>

              <div className="p-4 sm:p-5 flex flex-col" style={{ minHeight: '280px' }}>
                {isLoading ? (
                  /* Loading state */
                  <div className="flex flex-col items-center gap-3 py-10">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '2px solid rgba(201,169,110,0.15)',
                        borderTopColor: '#C9A96E',
                        animation: 'calendarSpin 0.8s linear infinite',
                      }}
                    />
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: 'rgba(201,169,110,0.5)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Загрузка шоу
                    </p>
                  </div>
                ) : loadError ? (
                  /* Error state */
                  <div className="flex flex-col items-center gap-3 py-10">
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        color: 'rgba(245,230,211,0.4)',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        textAlign: 'center',
                      }}
                    >
                      Не удалось загрузить события
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: 'rgba(201,169,110,0.3)',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {loadError}
                    </p>
                  </div>
                ) : events.length > 0 ? (
                  /* Event cards */
                  <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto calendar-event-list">
                    {events.map((evt, idx) => {
                      const cityColor = evt.cityMarker ? CITY_COLORS[evt.cityMarker] : '#C9A96E'
                      // Parse day-of-month from dateKey (YYYY-MM-DD → day)
                      // Note: split gives [year, month, day] — we want index 2 (day)
                      const dateParts = evt.dateKey.split('-')
                      const dayNumber = parseInt(dateParts[2], 10)
                      // Get weekday short from startLocal (e.g. "пт", "сб")
                      const weekdayShort = format(new Date(evt.startLocal), 'EEEEEE', { locale: ru })

                      return (
                        <button
                          key={evt.id || idx}
                          onClick={() => handleEventCardClick(evt)}
                          className="calendar-event-card w-full text-left rounded-md"
                          style={{
                            background: 'rgba(201,169,110,0.02)',
                            border: '1px solid rgba(201,169,110,0.08)',
                            padding: '12px 14px',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                          }}
                          aria-label={`${evt.title} — ${evt.dateDisplay}`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Date badge with city color */}
                            <div
                              className="date-badge flex-shrink-0 flex flex-col items-center justify-center"
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: '10px',
                                background: `linear-gradient(135deg, ${cityColor}25 0%, ${cityColor}08 100%)`,
                                border: `1px solid ${cityColor}55`,
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--font-playfair)',
                                  color: '#E8D5A3',
                                  fontSize: '17px',
                                  fontWeight: 700,
                                  lineHeight: 1.1,
                                }}
                              >
                                {dayNumber}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-inter)',
                                  color: 'rgba(201,169,110,0.6)',
                                  fontSize: '8px',
                                  fontWeight: 500,
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                  marginTop: '1px',
                                }}
                              >
                                {weekdayShort}
                              </span>
                            </div>

                            {/* Event info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p
                                  className="truncate"
                                  style={{
                                    fontFamily: 'var(--font-playfair)',
                                    color: 'rgba(245,230,211,0.92)',
                                    fontSize: 'clamp(14px, 1.5vw, 17px)',
                                    fontWeight: 600,
                                    letterSpacing: '0.02em',
                                    lineHeight: 1.2,
                                    margin: 0,
                                  }}
                                >
                                  {evt.showType}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 mt-1.5">
                                {/* City badge with dot — colored by city */}
                                <div className="flex items-center gap-1.5">
                                  <span
                                    style={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      background: cityColor,
                                      boxShadow: `0 0 6px ${cityColor}`,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-inter)',
                                      fontSize: '11px',
                                      fontWeight: 500,
                                      letterSpacing: '0.04em',
                                      color: 'rgba(245,230,211,0.7)',
                                    }}
                                  >
                                    {evt.city}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1" style={{ color: 'rgba(201,169,110,0.45)' }}>
                                  <ClockIcon />
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-inter)',
                                      fontSize: '11px',
                                      fontWeight: 400,
                                      letterSpacing: '0.04em',
                                    }}
                                  >
                                    {evt.timeDisplay}
                                  </span>
                                </div>
                              </div>
                              {/* Sold out badge */}
                              {evt.soldOut && (
                                <span
                                  className="inline-block mt-1.5 px-2 py-0.5 rounded"
                                  style={{
                                    background: 'rgba(123,26,43,0.2)',
                                    color: '#E8D5A3',
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: '9px',
                                    fontWeight: 600,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  Sold out
                                </span>
                              )}
                            </div>

                            {/* Arrow */}
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                color: 'rgba(201,169,110,0.3)',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                              }}
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  /* No events this month */
                  <div className="flex flex-col items-center gap-3 py-10">
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        background: 'rgba(201,169,110,0.04)',
                        border: '1px solid rgba(201,169,110,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: 'rgba(201,169,110,0.25)' }}
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        color: 'rgba(245,230,211,0.3)',
                        fontSize: '15px',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                      }}
                    >
                      В этом месяце мероприятий нет
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: 'rgba(201,169,110,0.25)',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}
                    >
                      Попробуйте другой месяц
                    </p>
                  </div>
                )}

                {/* Sidebar Footer */}
                {!isLoading && events.length > 0 && (
                  <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}>
                    <div className="flex items-center gap-2 justify-center">
                      <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'rgba(201,169,110,0.35)',
                          fontSize: '10px',
                          fontWeight: 400,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {events.length} {events.length === 1 ? 'шоу' : 'шоу'} в этом месяце
                      </span>
                      <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Bottom decorative element ═══ */}
        <div className="flex flex-col items-center gap-4 mt-12 sm:mt-16">
          <div className="gold-line-shimmer" style={{ width: '120px', height: '1px' }} />
          <div className="flex items-center gap-3" style={{ opacity: 0.4 }}>
            <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }} />
            <div
              style={{
                width: '6px',
                height: '6px',
                border: '1px solid rgba(201,169,110,0.5)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ═══ Event Detail Modal ═══ */}
      <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />

      {/* ══════ Inline Styles & Keyframes ══════ */}
      <style>{`
        @keyframes calendarFadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes calendarSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Calendar day cell hover */
        .calendar-day-cell:not(:disabled):hover {
          background: rgba(201,169,110,0.06) !important;
        }

        /* Event card hover */
        .calendar-event-card:hover {
          background: rgba(201,169,110,0.06) !important;
          border-color: rgba(201,169,110,0.2) !important;
          transform: translateY(-1px);
        }

        /* Modal buy button hover */
        .calendar-modal-buy-btn:not(:disabled):hover {
          letter-spacing: 0.22em !important;
          box-shadow: 0 0 30px rgba(201,169,110,0.35), 0 6px 20px rgba(0,0,0,0.4) !important;
        }
        .calendar-modal-buy-btn:not(:disabled):hover svg {
          transform: translateX(4px);
        }
        .calendar-modal-buy-btn:not(:disabled):active {
          transform: scale(0.98);
        }

        /* Custom scrollbar for event list */
        .calendar-event-list::-webkit-scrollbar {
          width: 4px;
        }
        .calendar-event-list::-webkit-scrollbar-track {
          background: rgba(201,169,110,0.04);
        }
        .calendar-event-list::-webkit-scrollbar-thumb {
          background: rgba(201,169,110,0.2);
          border-radius: 2px;
        }
        .calendar-event-list::-webkit-scrollbar-thumb:hover {
          background: rgba(201,169,110,0.4);
        }

        /* Focus styles */
        .calendar-day-cell:focus-visible,
        .calendar-event-card:focus-visible {
          outline: 1px solid rgba(201,169,110,0.5);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}
