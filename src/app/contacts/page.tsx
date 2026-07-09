'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Send, CheckCircle2, Loader2, MessageSquare, MapPin, Clock, Ticket, Sparkles } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
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

/* ═══ Contacts Page (/contacts) ═══
 * Hero header + two-column layout:
 *   Left  → contact info cards (email, telegram, social, cities, hours)
 *   Right → feedback form (react-hook-form + zod → POST /api/contacts)
 * Sticky footer via min-h-screen flex flex-col + mt-auto.
 */

/* ─── Validation schema ─── */
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
    .refine(
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || // email
        /^[\d+()\-\s]{7,20}$/.test(v), // phone
      'Введите корректный email или телефон'
    ),
  topic: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(2000, 'Сообщение слишком длинное (максимум 2000 символов)'),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Необходимо согласие на обработку данных'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const TOPICS = [
  { value: 'tickets', label: 'Покупка билетов' },
  { value: 'private', label: 'Заказ мероприятия' },
  { value: 'collab', label: 'Сотрудничество' },
  { value: 'press', label: 'Пресса / Медиа' },
  { value: 'other', label: 'Другое' },
]

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Электронная почта',
    value: 'info@madamboom.ru',
    href: 'mailto:info@madamboom.ru',
  },
  {
    icon: MessageSquare,
    label: 'Telegram',
    value: '@madamboom',
    href: 'https://t.me/madamboom',
  },
  {
    icon: MapPin,
    label: 'Города',
    value: 'Санкт-Петербург · Москва · Гастроли',
    href: null,
  },
  {
    icon: Clock,
    label: 'Время ответа',
    value: 'Пн–Пт, 11:00–20:00 (МСК). Ответим в течение 24 часов.',
    href: null,
  },
]

export default function ContactsPage() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      contact: '',
      topic: undefined,
      message: '',
      consent: false,
    },
  })

  const consentValue = watch('consent')
  const topicValue = watch('topic')

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Ошибка сервера (${res.status})`)
      }
      toast({
        title: 'Заявка отправлена',
        description: 'Мы свяжемся с вами в ближайшее время.',
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

      {/* Spacer to clear fixed navbar (h-14 sm:h-16) */}
      <div style={{ height: '56px' }} className="sm:hidden" />
      <div style={{ height: '64px' }} className="hidden sm:block" />

      {/* ═══ Hero header ═══ */}
      <section className="relative pt-10 pb-8 md:pt-16 md:pb-12 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,26,43,0.14) 0%, transparent 70%)',
          }}
        />
        <div className="relative flex flex-col items-center px-4 text-center">
          {/* Decorative diamond + lines */}
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
            Свяжитесь с нами
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
            Контакты
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.65)',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            Напишите нам — обсудим выступление, билеты или сотрудничество.
            Ответим в течение 24 часов.
          </p>
        </div>
      </section>

      {/* ═══ Main content: info + form ═══ */}
      <section className="relative flex-1 px-4 sm:px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12">
          {/* ─── Left: contact info ─── */}
          <div className="flex flex-col gap-4">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon
              const inner = (
                <div
                  className="group flex items-start gap-4 p-5 rounded-md transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(13,4,8,0.6), rgba(6,2,10,0.4))',
                    border: '1px solid rgba(201,169,110,0.15)',
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.25)',
                      color: '#C9A96E',
                    }}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0">
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: 'rgba(201,169,110,0.5)',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {card.label}
                    </p>
                    <p
                      className="break-words"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: card.href ? '#E8D5A3' : '#F5E6D3',
                        fontSize: 'clamp(14px, 1.3vw, 16px)',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              )
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block rounded-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {inner}
                </a>
              ) : (
                <div key={card.label}>{inner}</div>
              )
            })}

            {/* Tickets CTA */}
            <a
              href="https://madamboomgrimerka.ticketscloud.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  'linear-gradient(135deg, rgba(123,26,43,0.25), rgba(91,15,26,0.15))',
                border: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(201,169,110,0.12)',
                  border: '1px solid rgba(201,169,110,0.35)',
                  color: '#E8D5A3',
                }}
              >
                <Ticket size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.55)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Билеты
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#E8D5A3',
                    fontSize: 'clamp(14px, 1.3vw, 16px)',
                    fontWeight: 500,
                  }}
                >
                  Купить билеты онлайн →
                </p>
              </div>
            </a>

            {/* Social row */}
            <div className="flex items-center gap-3 mt-2 px-1">
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(201,169,110,0.4)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Мы в соцсетях
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    label: 'Telegram',
                    href: 'https://t.me/madamboom',
                    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
                  },
                  {
                    label: 'VK',
                    href: 'https://vk.com/madamboom',
                    path: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.048-2.763-5.339-2.763-5.813 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.49c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z',
                  },
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/madamboomburlesque',
                    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      width: '38px',
                      height: '38px',
                      border: '1px solid rgba(201,169,110,0.25)',
                      color: '#C9A96E',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right: feedback form ─── */}
          <div
            className="relative p-6 sm:p-8 md:p-10 rounded-lg"
            style={{
              background:
                'linear-gradient(180deg, rgba(13,4,8,0.85) 0%, rgba(10,3,16,0.75) 100%)',
              border: '1px solid rgba(201,169,110,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(123,26,43,0.08)',
            }}
          >
            {/* Top gold accent */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
              }}
            />

            {submitted ? (
              /* ─── Success state ─── */
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
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 600,
                    color: '#E8D5A3',
                    marginBottom: '12px',
                  }}
                >
                  Спасибо за обращение!
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    color: 'rgba(245,230,211,0.7)',
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    maxWidth: '420px',
                    lineHeight: 1.6,
                    marginBottom: '28px',
                  }}
                >
                  Ваша заявка получена. Мы свяжемся с вами в течение 24 часов
                  по указанным контактам.
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
              /* ─── Form ─── */
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <div className="flex items-center gap-2.5 mb-1">
                  <Sparkles size={18} strokeWidth={1.5} style={{ color: '#C9A96E' }} />
                  <h2
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 'clamp(20px, 2.4vw, 26px)',
                      fontWeight: 600,
                      color: '#E8D5A3',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Форма обратной связи
                  </h2>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Имя <span style={{ color: '#8B1A2B' }}>*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Как к вам обращаться"
                    className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                    aria-invalid={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-[#c97a8a] text-xs">{errors.name.message}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Email или телефон <span style={{ color: '#8B1A2B' }}>*</span>
                  </Label>
                  <Input
                    id="contact"
                    placeholder="you@example.com  или  +7 999 123-45-67"
                    className="h-11 bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] placeholder:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]"
                    aria-invalid={!!errors.contact}
                    {...register('contact')}
                  />
                  {errors.contact && (
                    <p className="text-[#c97a8a] text-xs">{errors.contact.message}</p>
                  )}
                </div>

                {/* Topic */}
                <div className="flex flex-col gap-2">
                  <Label className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Тема обращения
                  </Label>
                  <Select
                    value={topicValue}
                    onValueChange={(v) => setValue('topic', v, { shouldValidate: false })}
                  >
                    <SelectTrigger className="h-11 w-full bg-[rgba(201,169,110,0.05)] border-[rgba(201,169,110,0.2)] text-[#F5E6D3] data-[placeholder]:text-[rgba(201,169,110,0.35)] focus-visible:border-[#C9A96E] focus-visible:ring-[rgba(201,169,110,0.2)]">
                      <SelectValue placeholder="Выберите тему (необязательно)" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0310] border-[rgba(201,169,110,0.25)] text-[#F5E6D3]">
                      {TOPICS.map((t) => (
                        <SelectItem
                          key={t.value}
                          value={t.value}
                          className="focus:bg-[rgba(201,169,110,0.08)] focus:text-[#E8D5A3] data-[state=checked]:text-[#E8D5A3]"
                        >
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-[#C9A96E] text-xs tracking-[0.16em] uppercase">
                    Сообщение <span style={{ color: '#8B1A2B' }}>*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите о вашем мероприятии, вопросе или предложении..."
                    rows={5}
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
                  <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer group">
                    <Checkbox
                      id="consent"
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

                <p
                  className="text-center text-xs"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.35)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Поля, отмеченные <span style={{ color: '#8B1A2B' }}>*</span>, обязательны для заполнения
                </p>
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
