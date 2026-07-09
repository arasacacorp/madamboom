'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Ticket, Calendar } from 'lucide-react'

/* ─── Navigation structure ───
 * Centered-logo navbar:
 *   Left links  |  Logo (center)  |  Right links + buttons
 * Two item types:
 *  - 'link': regular nav link
 *  - 'button-outline': visually distinct CTA
 * Primary CTA "Билеты" is rendered separately in the right group.
 */

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'button-outline'; label: string; href: string }

/* Left side of the centered logo (links only) */
const LEFT_LINKS: { label: string; href: string }[] = [
  { label: 'О шоу', href: '/about' },
  { label: 'Календарь событий', href: '/events' },
  { label: 'Состав', href: '/cast' },
]

/* Right side of the centered logo (links + outline button) */
const RIGHT_ITEMS: NavItem[] = [
  { type: 'link', label: 'Контакты', href: '/contacts' },
  { type: 'button-outline', label: 'Заказать мероприятие', href: '/private-events' },
]

const TICKETS_URL = 'https://madamboomgrimerka.ticketscloud.org/'

/* Full list for the mobile drawer (left + right + primary CTA) */
const DRAWER_ITEMS: NavItem[] = [
  ...LEFT_LINKS.map((l) => ({ type: 'link' as const, ...l })),
  ...RIGHT_ITEMS,
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Same-page anchor links (start with #): smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault()
        setDrawerOpen(false)
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return
      }
      // Cross-page links: let browser navigate naturally
      setDrawerOpen(false)
    },
    []
  )

  // Logo click: scroll to top on home, navigate home elsewhere
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.location.pathname === '/') {
        e.preventDefault()
        setDrawerOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      // else: let the anchor navigate to "/"
    },
    []
  )

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          background: scrolled
            ? 'rgba(6, 2, 10, 0.85)'
            : 'transparent',
        }}
      >
        {/* ═══ Desktop navbar (lg+): centered-logo 3-column grid ═══ */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16">
          {/* ── Left links (justify-end → push toward center/logo) ── */}
          <div className="flex items-center justify-end gap-5 xl:gap-7">
            {LEFT_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link relative transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: '#C9A96E',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── Center logo ── */}
          <div className="flex items-center justify-center px-5 xl:px-8">
            <a
              href="/"
              onClick={handleLogoClick}
              className="transition-opacity duration-300 hover:opacity-80"
              aria-label="Мадам Бум — на главную"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="/logo-boom.svg"
                alt="Мадам Бум"
                style={{
                  height: '34px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </div>

          {/* ── Right links + buttons (justify-start → flow from center) ── */}
          <div className="flex items-center justify-start gap-5 xl:gap-7">
            {RIGHT_ITEMS.map((item) => {
              if (item.type === 'button-outline') {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="nav-cta-outline flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: '#C9A96E',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      background: 'transparent',
                      border: '1px solid rgba(201,169,110,0.4)',
                    }}
                  >
                    <Calendar size={13} strokeWidth={1.8} />
                    {item.label}
                  </a>
                )
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link relative transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#C9A96E',
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '0.14em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </a>
              )
            })}

            {/* Primary CTA — Билеты */}
            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button flex items-center gap-2 px-5 py-2 rounded-sm transition-all duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                color: '#06020A',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(232,213,163,0.3)',
              }}
            >
              <Ticket size={14} strokeWidth={2} />
              Билеты
            </a>
          </div>
        </div>

        {/* ═══ Mobile navbar (<lg): centered logo + hamburger right ═══ */}
        <div className="flex lg:hidden items-center w-full px-5 h-14">
          {/* Left spacer (balances hamburger width to keep logo centered) */}
          <div className="w-10 shrink-0" />

          {/* Center logo */}
          <div className="flex-1 flex items-center justify-center">
            <a
              href="/"
              onClick={handleLogoClick}
              className="transition-opacity duration-300 hover:opacity-80"
              aria-label="Мадам Бум — на главную"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="/logo-boom.svg"
                alt="Мадам Бум"
                style={{
                  height: '30px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-sm transition-colors duration-300"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? 'Закрыть меню' : 'Открыть меню'}
            style={{
              color: '#C9A96E',
              background: drawerOpen ? 'rgba(201,169,110,0.08)' : 'transparent',
            }}
          >
            {drawerOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Thin gold line at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), rgba(201,169,110,0.6), rgba(201,169,110,0.4), transparent)',
            opacity: scrolled ? 1 : 0.3,
          }}
        />
      </nav>

      {/* ═══ Mobile Drawer Overlay ═══ */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-opacity duration-400"
        style={{
          background: 'rgba(6, 2, 10, 0.75)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ═══ Mobile Slide-out Drawer ═══ */}
      <div
        className="fixed top-0 right-0 z-40 lg:hidden h-full transition-transform duration-500 ease-out overflow-y-auto"
        style={{
          width: 'min(300px, 85vw)',
          background: 'linear-gradient(180deg, #0A0310 0%, #06020A 100%)',
          borderLeft: '1px solid rgba(201,169,110,0.15)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer top ornament */}
        <div className="flex items-center justify-center pt-14 pb-6">
          <div className="flex items-center gap-3">
            <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }} />
            <div style={{ width: '5px', height: '5px', border: '1px solid #C9A96E', transform: 'rotate(45deg)' }} />
            <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
          </div>
        </div>

        {/* Drawer links */}
        <div className="flex flex-col gap-1 px-6 pb-12">
          {DRAWER_ITEMS.map((item, i) => {
            if (item.type === 'button-outline') {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-cta-outline flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-sm transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#C9A96E',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    background: 'transparent',
                    border: '1px solid rgba(201,169,110,0.4)',
                    transitionDelay: drawerOpen ? `${i * 60}ms` : '0ms',
                    transform: drawerOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: drawerOpen ? 1 : 0,
                  }}
                >
                  <Calendar size={14} strokeWidth={1.8} />
                  {item.label}
                </a>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="w-full text-center py-3 transition-all duration-300 rounded-sm"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: '#C9A96E',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(201,169,110,0.08)',
                  transitionDelay: drawerOpen ? `${i * 60}ms` : '0ms',
                  transform: drawerOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: drawerOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            )
          })}

          {/* Primary CTA — Билеты */}
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button flex items-center justify-center gap-2 w-full mt-5 py-3.5 rounded-sm transition-all duration-300"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
              color: '#06020A',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(232,213,163,0.3)',
            }}
          >
            <Ticket size={16} strokeWidth={2} />
            Билеты
          </a>
        </div>

        {/* Drawer bottom ornament */}
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))' }} />
            <div style={{ width: '4px', height: '4px', border: '1px solid rgba(201,169,110,0.4)', transform: 'rotate(45deg)' }} />
            <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)' }} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.3)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            18+
          </p>
        </div>
      </div>

      {/* ═══ Inline Styles ═══ */}
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A96E, transparent);
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-link:hover {
          color: #E8D5A3 !important;
        }

        /* Outline CTA hover */
        .nav-cta-outline:hover {
          background: rgba(201,169,110,0.08) !important;
          border-color: rgba(201,169,110,0.65) !important;
          color: #E8D5A3 !important;
          box-shadow: 0 0 18px rgba(201,169,110,0.15);
        }
      `}</style>
    </>
  )
}
