'use client'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Calendar from '@/components/sections/Calendar'
import Afisha from '@/components/sections/Afisha'
import { Ticket, CalendarDays, Sparkles } from 'lucide-react'

/* ═══ Events Page (/events) ═══
 * Dedicated ticket-purchase hub:
 *   1. Hero header ("События и билеты")
 *   2. <Calendar/> — full calendar grid from the main page (reused as-is).
 *      Click a date → event modal → TicketsCloud widget (buy tickets).
 *   3. <Afisha/> — posters of upcoming shows (reused as-is).
 *      Each card → "Билеты" button → TicketsCloud widget.
 *   4. Footer (sticky via mt-auto).
 *
 * Both Calendar and Afisha are self-contained sections (own data fetching,
 * animations, headers) — reused without modification.
 */

export default function EventsPage() {
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
      <section className="relative pt-10 pb-4 md:pt-16 md:pb-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,26,43,0.16) 0%, transparent 70%)',
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
            Купить билеты
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
            События и билеты
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.65)',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              maxWidth: '620px',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            Выберите дату в календаре или посмотрите афишу ближайших шоу.
            Безопасная оплата через TicketsCloud.
          </p>

          {/* Quick-jump pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#calendar"
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
              <CalendarDays size={14} strokeWidth={2} />
              Календарь
            </a>
            <a
              href="#afisha"
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
              <Ticket size={14} strokeWidth={2} />
              Афиша
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Calendar section (reused from main page) ═══
       * Self-contained: fetches /api/calendar, renders month grid + event modal.
       * Click a date with a show → modal → "Купить билеты" → TicketsCloud widget. */}
      <Calendar />

      {/* ═══ Afisha section (reused from main page) ═══
       * Self-contained: posters of upcoming shows with "Билеты" buttons. */}
      <Afisha />

      {/* ═══ Closing CTA ═══ */}
      <section className="relative py-14 md:py-20 overflow-hidden">
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
        <div
          className="relative max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center"
          style={{ zIndex: 6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              style={{
                width: 'clamp(30px, 5vw, 50px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                border: '1px solid rgba(201,169,110,0.5)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(30px, 5vw, 50px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
              }}
            />
          </div>

          <div
            className="flex items-center justify-center mb-5"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(201,169,110,0.08)',
              border: '1px solid rgba(201,169,110,0.3)',
              color: '#C9A96E',
            }}
          >
            <Sparkles size={22} strokeWidth={1.5} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 600,
              color: '#C9A96E',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              textAlign: 'center',
              textShadow: '0 0 40px rgba(201,169,110,0.1)',
              marginBottom: '12px',
            }}
          >
            Не нашли подходящую дату?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245,230,211,0.7)',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              letterSpacing: '0.02em',
              textAlign: 'center',
              maxWidth: '560px',
              marginBottom: '28px',
            }}
          >
            Закажите частное выступление или корпоративное шоу —
            адаптируем программу под вашу площадку и формат.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/contacts"
              className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                color: '#06020A',
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(232,213,163,0.4)',
                boxShadow: '0 0 25px rgba(201,169,110,0.15)',
              }}
            >
              Связаться с нами
            </a>
            <a
              href="/about"
              className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(201,169,110,0.35)',
              }}
            >
              О шоу
            </a>
          </div>
        </div>
      </section>

      {/* Footer (sticky via mt-auto) */}
      <Footer />
    </main>
  )
}
