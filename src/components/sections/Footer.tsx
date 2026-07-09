'use client'

import { Ticket, Calendar, Mail, MessageSquare, MapPin, Clock, Phone, ArrowRight } from 'lucide-react'

/* ═══ Footer Component ═══
 * Redesigned with a burgundy-toned background to visually separate it
 * from the dark (#06020A) page sections above. Richer content: logo,
 * navigation, contacts, schedule, social, CTA, 18+ badge, copyright.
 * id="contacts" for the navbar anchor link. Used on all pages.
 */

const NAV_LINKS = [
  { label: 'О шоу', href: '/about' },
  { label: 'Календарь событий', href: '/events' },
  { label: 'Состав артистов', href: '/cast' },
  { label: 'Контакты', href: '/contacts' },
  { label: 'Заказать мероприятие', href: '/private-events' },
]

const TICKETS_URL = 'https://madamboomgrimerka.ticketscloud.org/'

const SOCIALS = [
  {
    label: 'Telegram',
    href: 'https://t.me/madamboom',
    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
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
]

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="relative w-full mt-auto overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #06020A 0%, #1A0610 12%, #2A0815 35%, #3A0A1A 55%, #2A0815 80%, #1A0610 100%)',
        borderTop: '1px solid rgba(201, 169, 110, 0.3)',
        boxShadow: 'inset 0 30px 60px -20px rgba(123, 26, 43, 0.5)',
      }}
    >
      {/* ── Decorative burgundy radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(123,26,43,0.28) 0%, rgba(123,26,43,0.06) 45%, transparent 75%)',
        }}
      />
      {/* ── Top gold accent line ── */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), rgba(201,169,110,0.7), rgba(201,169,110,0.5), transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
        {/* ══════ TOP SECTION: logo + intro + CTA ══════ */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 pt-12 md:pt-16 pb-10 md:pb-12">
          {/* ── Left: logo + tagline + socials ── */}
          <div className="flex flex-col items-start">
            <a
              href="/"
              className="transition-opacity duration-300 hover:opacity-80"
              aria-label="Мадам Бум — на главную"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="/logo-boom.svg"
                alt="Мадам Бум"
                style={{ height: '42px', width: 'auto', display: 'block' }}
              />
            </a>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'rgba(245,230,211,0.7)',
                fontSize: 'clamp(15px, 1.5vw, 19px)',
                lineHeight: 1.6,
                letterSpacing: '0.02em',
                maxWidth: '380px',
              }}
            >
              Игривое и дерзкое бурлеск-шоу, где блеск, юмор и магия сцены
              превращает вечер в незабываемый праздник.
            </p>

            {/* Cities */}
            <p
              className="mt-5 flex items-center gap-2.5"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(232,213,163,0.6)',
                fontSize: 'clamp(10px, 1.1vw, 12px)',
                letterSpacing: '0.22em',
                fontWeight: 400,
                textTransform: 'uppercase',
              }}
            >
              <MapPin size={13} strokeWidth={1.8} style={{ color: '#C9A96E' }} />
              Санкт-Петербург · Москва · Гастроли
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(201,169,110,0.3)',
                    color: '#C9A96E',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: CTA buttons + quick contacts ── */}
          <div className="flex flex-col items-start lg:items-end">
            <p
              className="mb-5"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(232,213,163,0.55)',
                fontSize: 'clamp(10px, 1.1vw, 12px)',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              Не пропустите шоу
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Билеты */}
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                  color: '#06020A',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid rgba(232,213,163,0.4)',
                  boxShadow: '0 0 25px rgba(201,169,110,0.15)',
                }}
              >
                <Ticket size={14} strokeWidth={2} />
                Билеты
              </a>

              {/* Заказать мероприятие */}
              <a
                href="/private-events"
                className="footer-cta-outline flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'transparent',
                  color: '#C9A96E',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid rgba(201,169,110,0.45)',
                }}
              >
                <Calendar size={14} strokeWidth={1.8} />
                Заказать мероприятие
              </a>
            </div>

            {/* Quick contacts */}
            <div className="flex flex-col gap-2.5 mt-7 lg:items-end">
              <a
                href="mailto:info@madamboom.ru"
                className="footer-contact flex items-center gap-2.5 transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(245,230,211,0.8)',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0 }} />
                info@madamboom.ru
              </a>
              <a
                href="https://t.me/madamboom"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact flex items-center gap-2.5 transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(245,230,211,0.8)',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={14} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0 }} />
                @madamboom
              </a>
            </div>
          </div>
        </div>

        {/* ══════ Decorative divider ══════ */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25))' }} />
          <div style={{ width: '6px', height: '6px', border: '1px solid rgba(201,169,110,0.5)', transform: 'rotate(45deg)', background: 'rgba(26,6,16,0.9)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.25), transparent)' }} />
        </div>

        {/* ══════ MIDDLE SECTION: 4 info columns ══════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 py-10 md:py-12">
          {/* ── Навигация ── */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Навигация
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer-nav-link transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'rgba(245,230,211,0.65)',
                      fontSize: '13px',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Шоу ── */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Шоу
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/#afisha"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none' }}
                >
                  Афиша
                </a>
              </li>
              <li>
                <a
                  href="/#programs"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none' }}
                >
                  Программы
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none' }}
                >
                  Галерея
                </a>
              </li>
              <li>
                <a
                  href="/#venues"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none' }}
                >
                  Площадки
                </a>
              </li>
            </ul>
          </div>

          {/* ── Расписание ── */}
          <div>
            <h4
              className="mb-4 flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <Clock size={12} strokeWidth={1.8} />
              Расписание
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px' }}>
                <span style={{ color: '#C9A96E' }}>Чт</span> · Санкт-Петербург
              </li>
              <li style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px' }}>
                <span style={{ color: '#C9A96E' }}>Пт</span> · Москва (классика)
              </li>
              <li style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px' }}>
                <span style={{ color: '#C9A96E' }}>Сб</span> · «Джазовый бунт»
              </li>
              <li>
                <a
                  href="/events"
                  className="footer-nav-link inline-flex items-center gap-1 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: '#E8D5A3', fontSize: '12px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em' }}
                >
                  Все события <ArrowRight size={11} strokeWidth={2} />
                </a>
              </li>
            </ul>
          </div>

          {/* ── Контакты ── */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Контакты
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2">
                <Mail size={12} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0, marginTop: '3px' }} />
                <a
                  href="mailto:info@madamboom.ru"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none', wordBreak: 'break-all' }}
                >
                  info@madamboom.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare size={12} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0, marginTop: '3px' }} />
                <a
                  href="https://t.me/madamboom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', textDecoration: 'none' }}
                >
                  @madamboom
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={12} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.65)', fontSize: '13px', lineHeight: 1.4 }}>
                  СПб · Москва<br />гастроли по России
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ══════ BOTTOM BAR: 18+ + copyright + disclaimer ══════ */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 md:py-7"
          style={{
            borderTop: '1px solid rgba(201,169,110,0.15)',
            marginTop: '4px',
          }}
        >
          {/* Left: 18+ + copyright */}
          <div className="flex items-center gap-5">
            <span
              className="flex items-center justify-center"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.4)',
                color: 'rgba(232,213,163,0.7)',
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                background: 'rgba(123,26,43,0.2)',
              }}
              title="Шоу только для зрителей 18+"
            >
              18+
            </span>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245,230,211,0.4)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              © {new Date().getFullYear()} Мадам Бум
            </p>
          </div>

          {/* Right: disclaimer */}
          <p
            className="text-center md:text-right"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(245,230,211,0.3)',
              fontSize: '11px',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              maxWidth: '460px',
            }}
          >
            Бурлеск-кабаре «Мадам Бум». Шоу для зрителей 18+.
            <br className="hidden md:block" />
            {' '}Безопасная оплата через TicketsCloud.
          </p>
        </div>
      </div>

      {/* ═══ Inline styles ═══ */}
      <style>{`
        .footer-nav-link:hover {
          color: #E8D5A3 !important;
        }
        .footer-contact:hover {
          color: #E8D5A3 !important;
        }
        .footer-social:hover {
          border-color: rgba(201,169,110,0.6) !important;
          background: rgba(201,169,110,0.08);
          color: #E8D5A3 !important;
        }
        .footer-cta-outline:hover {
          background: rgba(201,169,110,0.08) !important;
          border-color: rgba(201,169,110,0.65) !important;
          color: #E8D5A3 !important;
          box-shadow: 0 0 20px rgba(201,169,110,0.15);
        }
      `}</style>
    </footer>
  )
}
