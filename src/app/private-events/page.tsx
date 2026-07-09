'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Users, MapPin, Send, Loader2, CheckCircle2, Sparkles, ArrowRight, Ticket } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Corporate from '@/components/sections/Corporate'
import CastModal from '@/components/sections/CastModal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

/* ═══ Private Events Page (/private-events) ═══
 * Dedicated page for ordering private events:
 *   1. Hero header ("Заказать мероприятие")
 *   2. <Corporate/> — what we offer (event types, description, image)
 *   3. <CastModal/> — cast grid where clicking a card opens a popup with bio
 *   4. Booking form → POST /api/contacts (topic=private)
 *   5. Footer (sticky via mt-auto)
 */

/* ─── Validation schema ─── */
const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Слишком длинное имя'),
  contact: z
    .string()
    .trim()
    .min(1, 'Укажите email или телефон')
    .refine(
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ||
        /^[\d+()\-\s]{7,20}$/.test(v),
      'Введите корректный email или телефон'
    ),
  eventType: z.string().min(1, 'Выберите тип мероприятия'),
  date: z.string().optional(),
  guests: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Расскажите подробнее (минимум 10 символов)')
    .max(2000, 'Сообщение слишком длинное (максимум 2000 символов)'),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Необходимо согласие на обработку данных'),
})

type BookingFormValues = z.infer<typeof bookingSchema>

const EVENT_TYPES = [
  { value: 'corporate', label: 'Корпоратив' },
  { value: 'festival', label: 'Фестиваль' },
  { value: 'presentation', label: 'Презентация' },
  { value: 'bachelorette', label: 'Девичник' },
  { value: 'private', label: 'Частный праздник' },
  { value: 'gala', label: 'Светский вечер' },
  { value: 'other', label: 'Другое' },
]

export default function PrivateEventsPage() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      contact: '',
      eventType: '',
      date: '',
      guests: '',
      message: '',
      consent: false,
    },
  })

  const consentValue = watch('consent')
  const eventTypeValue = watch('eventType')

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const fullMessage = [
        `Тип мероприятия: ${data.eventType}`,
        data.date ? `Дата: ${data.date}` : null,
        data.guests ? `Кол-во гостей: ${data.guests}` : null,
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n')

      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          contact: data.contact,
          topic: 'private',
          message: fullMessage,
          consent: data.consent,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Ошибка сервера (${res.status})`)
      }
      toast({
        title: 'Заявка отправлена',
        description: 'Мы свяжемся с вами в ближайшее время для обсуждения деталей.',
      })
      setSubmitted(true)
      reset()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Не удалось отправить',
        description: err instanceof Error ? err.message : 'Попробуйте позже.',
      })
    }
  }

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <Navbar />

      {/* Spacer to clear fixed navbar */}
      <div style={{ height: '56px' }} className="sm:hidden" />
      <div style={{ height: '64px' }} className="hidden sm:block" />

      {/* ═══ Hero header ═══ */}
      <section className="relative pt-10 pb-8 md:pt-16 md:pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,26,43,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative flex flex-col items-center px-4 text-center">
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 'clamp(40px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <div
              style={{
                width: '7px',
                height: '7px',
                border: '1px solid rgba(201,169,110,0.6)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(40px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.55)',
              fontSize: 'clamp(10px, 1.2vw, 12px)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Гастроли и корпоративы
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 700,
              color: '#E8D5A3',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(201,169,110,0.18)',
              marginBottom: '18px',
            }}
          >
            Заказать мероприятие
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.65)',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              maxWidth: '620px',
              lineHeight: 1.6,
            }}
          >
            Бурлеск-кабаре «Мадам Бум» на вашем мероприятии — отдельные номера
            или полноценное шоу, адаптированное под вашу площадку и формат.
          </p>

          {/* Quick-jump pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="#corporate"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(201,169,110,0.4)',
              }}
            >
              <Sparkles size={14} strokeWidth={1.8} />
              О шоу
            </a>
            <a
              href="#cast-modal"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(201,169,110,0.4)',
              }}
            >
              <Users size={14} strokeWidth={1.8} />
              Артисты
            </a>
            <a
              href="#booking"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                color: '#06020A',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(232,213,163,0.4)',
                boxShadow: '0 0 20px rgba(201,169,110,0.12)',
              }}
            >
              <Send size={14} strokeWidth={2} />
              Оставить заявку
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Corporate section (what we offer) ═══ */}
      <Corporate />

      {/* ═══ Cast grid with popup bios ═══ */}
      <CastModal />

      {/* ═══ Booking form ═══ */}
      <section id="booking" className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06020A 0%, #0D0408 20%, #1A0812 50%, #0D0408 80%, #06020A 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 45% 50% at 50% 50%, rgba(123,26,43,0.12) 0%, rgba(123,26,43,0.03) 50%, transparent 75%)',
            zIndex: 1,
          }}
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6" style={{ zIndex: 6 }}>
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 'clamp(30px, 5vw, 50px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
                }}
              />
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  border: '1px solid rgba(201,169,110,0.6)',
                  transform: 'rotate(45deg)',
                  background: 'rgba(6,2,10,0.9)',
                }}
              />
              <div
                style={{
                  width: 'clamp(30px, 5vw, 50px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                color: '#C9A96E',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                textShadow: '0 0 40px rgba(201,169,110,0.12)',
                textAlign: 'center',
                marginBottom: '12px',
              }}
            >
              Оставить заявку
            </h2>

            <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'rgba(245,230,211,0.6)',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                maxWidth: '480px',
                textAlign: 'center',
                lineHeight: 1.6,
                marginTop: '16px',
              }}
            >
              Расскажите о вашем мероприятии — мы свяжемся с вами в течение
              24 часов для обсуждения деталей и программы.
            </p>
          </div>

          {/* Form card */}
          <div
            className="relative p-6 sm:p-8 md:p-10 rounded-lg"
            style={{
              background:
                'linear-gradient(180deg, rgba(13,4,8,0.85) 0%, rgba(10,3,16,0.75) 100%)',
              border: '1px solid rgba(201,169,110,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(123,26,43,0.08)',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
              }}
            />

            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div
                  className="flex items-center justify-center mb-6"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(201,169,110,0.1)',
                    border: '1px solid rgba(201,169,110,0.4)',
                    color: '#E8D5A3',
                  }}
                >
                  <CheckCircle2 size={30} strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 600,
                    color: '#E8D5A3',
                    marginBottom: '12px',
                  }}
                >
                  Заявка отправлена!
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    color: 'rgba(245,230,211,0.7)',
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    maxWidth: '400px',
                    lineHeight: 1.6,
                    marginBottom: '28px',
                  }}
                >
                  Мы свяжемся с вами в течение 24 часов для обсуждения
                  деталей вашего мероприятия.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-[rgba(201,169,110,0.35)] text-[#C9A96E] hover:bg-[rgba(201,169,110,0.08)] hover:text-[#E8D5A3]"
                >
                  Отправить ещё одну заявку
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                {/* Name + Contact row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bk-name" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                      Имя <span style={{ color: '#8B1A2B' }}>*</span>
                    </Label>
                    <Input
                      id="bk-name"
                      placeholder="Как к вам обращаться"
                      className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-[#c97a8a] text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bk-contact" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                      Email или телефон <span style={{ color: '#8B1A2B' }}>*</span>
                    </Label>
                    <Input
                      id="bk-contact"
                      placeholder="+7 999 123-45-67"
                      className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                      aria-invalid={!!errors.contact}
                      {...register('contact')}
                    />
                    {errors.contact && (
                      <p className="text-[#c97a8a] text-xs">{errors.contact.message}</p>
                    )}
                  </div>
                </div>

                {/* Event type + Date row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                      Тип мероприятия <span style={{ color: '#8B1A2B' }}>*</span>
                    </Label>
                    <Select
                      value={eventTypeValue}
                      onValueChange={(v) => setValue('eventType', v, { shouldValidate: true })}
                    >
                      <SelectTrigger className="h-11 w-full bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] data-[placeholder]:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0310] border-[rgba(201,169,110,0.25)] text-[#F5E6D3]">
                        {EVENT_TYPES.map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                            className="focus:bg-[rgba(201,169,110,0.08)] focus:text-[#E8D5A3]"
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.eventType && (
                      <p className="text-[#c97a8a] text-xs">{errors.eventType.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bk-date" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                      Желаемая дата
                    </Label>
                    <Input
                      id="bk-date"
                      placeholder="Например: 14 сентября 2026"
                      className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                      {...register('date')}
                    />
                  </div>
                </div>

                {/* Guests + Message */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bk-guests" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Количество гостей
                  </Label>
                  <Input
                    id="bk-guests"
                    placeholder="Например: 30–50 человек"
                    className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                    {...register('guests')}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bk-message" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Подробнее о мероприятии <span style={{ color: '#8B1A2B' }}>*</span>
                  </Label>
                  <Textarea
                    id="bk-message"
                    placeholder="Площадка, формат, желаемые номера, бюджет, особые пожелания..."
                    rows={4}
                    className="bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)] resize-none"
                    aria-invalid={!!errors.message}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-[#c97a8a] text-xs">{errors.message.message}</p>
                  )}
                </div>

                {/* Consent */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="bk-consent" className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      id="bk-consent"
                      checked={consentValue}
                      onCheckedChange={(v) =>
                        setValue('consent', v === true, { shouldValidate: true })
                      }
                      className="mt-0.5 border-[rgba(201,169,110,0.4)] data-[state=checked]:bg-[#C9A96E] data-[state=checked]:text-[#06020A] data-[state=checked]:border-[#C9A96E]"
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'rgba(245,230,211,0.6)' }}
                    >
                      Я согласен(на) на обработку персональных данных в соответствии
                      с политикой конфиденциальности.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[#c97a8a] text-xs">{errors.consent.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button h-12 mt-2 w-full rounded-sm border border-[rgba(232,213,163,0.4)] text-[#06020A] hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    boxShadow: '0 0 25px rgba(201,169,110,0.15)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={15} strokeWidth={2} />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer (sticky via mt-auto) */}
      <Footer />
    </main>
  )
}
