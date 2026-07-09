import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

/* ═══ Contacts API Route ═══
 * POST /api/contacts
 * Validates feedback form submission, persists to DB (ContactMessage table).
 *
 * Rate limiting: simple in-memory per-IP counter (resets on server restart).
 *   — max 5 submissions / 10 min / IP.
 */

/* ─── Validation schema (mirrors the client) ─── */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Слишком длинное имя'),
  contact: z
    .string()
    .trim()
    .min(1, 'Укажите email или телефон')
    .max(120, 'Слишком длинный контакт')
    .refine(
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || // email
        /^[\d+()\-\s]{7,20}$/.test(v), // phone
      'Введите корректный email или телефон'
    ),
  topic: z.string().max(30).optional().nullable(),
  message: z
    .string()
    .trim()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(2000, 'Сообщение слишком длинное (максимум 2000 символов)'),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Необходимо согласие на обработку данных'),
})

/* ─── In-memory rate limiter ─── */
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const rateMap = new Map<string, { count: number; firstAt: number }>()

function rateLimitOk(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstAt: now })
    return true
  }
  entry.count += 1
  return entry.count <= RATE_LIMIT_MAX
}

function getClientIp(request: NextRequest): string {
  const xf = request.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0]!.trim()
  const xr = request.headers.get('x-real-ip')
  if (xr) return xr.trim()
  return 'unknown'
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Некорректный JSON' },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return NextResponse.json(
      {
        error: firstError?.message ?? 'Ошибка валидации',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  const ip = getClientIp(request)
  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { error: 'Слишком много заявок. Попробуйте позже.' },
      { status: 429 }
    )
  }

  try {
    const record = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        contact: parsed.data.contact,
        topic: parsed.data.topic || null,
        message: parsed.data.message,
        consent: parsed.data.consent,
      },
    })

    return NextResponse.json(
      {
        ok: true,
        id: record.id,
        message: 'Заявка успешно сохранена',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[/api/contacts] DB error:', err)
    return NextResponse.json(
      { error: 'Не удалось сохранить заявку. Попробуйте позже.' },
      { status: 500 }
    )
  }
}

/* GET — health check (не отдаёт данные публично) */
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: '/api/contacts' })
}
