'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, Ticket, ChevronDown, Calendar } from 'lucide-react'

/* ─── Navigation structure ───
 * Three item types:
 *  - 'link': regular anchor link
 *  - 'dropdown': expandable group (О шоу → О Мадам Бум / Состав / Галерея)
 *  - 'button-outline': visually distinct CTA (Заказать мероприятие)
 * Primary CTA "Билеты" is rendered separately below.
 */
type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: { label: string; href: string }[] }
  | { type: 'button-outline'; label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  {
    type: 'dropdown',
    label: 'О шоу',
    items: [
      { label: 'О Мадам Бум', href: '/about' },
      { label: 'Состав', href: '/#cast' },
      { label: 'Галерея', href: '/#gallery' },
    ],
  },
  { type: 'link', label: 'Афиша', href: '/#afisha' },
  { type: 'link', label: 'Календарь событий', href: '/#calendar' },
  { type: 'link', label: 'Программы', href: '/#programs' },
  { type: 'link', label: 'Контакты', href: '/#contacts' },
  { type: 'button-outline', label: 'Заказать мероприятие', href: '/#corporate' },
]

const TICKETS_URL = 'https://madamboomgrimerka.ticketscloud.org/'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hover handlers with small delay (avoids flicker when moving between trigger and menu)
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current)
      dropdownTimerRef.current = null
    }
    setOpenDropdown(true)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current)
    }
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(false)
    }, 150)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Same-page anchor links (start with #): smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault()
        setDrawerOpen(false)
        setMobileExpanded(null)
        setOpenDropdown(false)
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return
      }

      // Cross-page links (start with /#section or /about): let browser navigate
      // For /#section links, the browser will navigate to / then scroll to anchor
      setDrawerOpen(false)
      setMobileExpanded(null)
      setOpenDropdown(false)
      // Don't preventDefault — allow natural navigation
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
        {/* Main navbar content */}
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="relative z-10 transition-opacity duration-300 hover:opacity-80"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              textShadow: '0 0 20px rgba(201,169,110,0.15)',
            }}
          >
            МАДАМ БУМ
          </a>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map((item, idx) => {
              if (item.type === 'dropdown') {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => setOpenDropdown((v) => !v)}
                      className="nav-link relative flex items-center gap-1.5 transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: openDropdown ? '#E8D5A3' : '#C9A96E',
                        fontSize: '13px',
                        fontWeight: 400,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 0',
                      }}
                      aria-expanded={openDropdown}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={1.8}
                        style={{
                          transition: 'transform 0.3s ease',
                          transform: openDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {openDropdown && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px]"
                        style={{
                          animation: 'navDropdownIn 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        {/* Decorative arrow */}
                        <div
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2"
                          style={{
                            width: 10,
                            height: 10,
                            background: 'rgba(13,4,8,0.95)',
                            borderLeft: '1px solid rgba(201,169,110,0.3)',
                            borderTop: '1px solid rgba(201,169,110,0.3)',
                            transform: 'translateX(-50%) rotate(45deg)',
                          }}
                        />
                        {/* Menu panel */}
                        <div
                          className="relative rounded-md overflow-hidden"
                          style={{
                            background: 'rgba(13,4,8,0.97)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(201,169,110,0.25)',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(123,26,43,0.15)',
                          }}
                        >
                          {/* Top gold accent line */}
                          <div
                            style={{
                              height: '1px',
                              background:
                                'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
                            }}
                          />
                          {item.items.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className="nav-dropdown-item block px-5 py-3 transition-all duration-300"
                              style={{
                                fontFamily: 'var(--font-inter)',
                                color: 'rgba(201,169,110,0.85)',
                                fontSize: '12px',
                                fontWeight: 400,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                borderBottom: '1px solid rgba(201,169,110,0.08)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

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

              // Regular link
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

          {/* Mobile hamburger */}
          <button
            className="relative z-10 flex lg:hidden items-center justify-center w-10 h-10 rounded-sm transition-colors duration-300"
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
          {NAV_ITEMS.map((item, i) => {
            if (item.type === 'dropdown') {
              const isExpanded = mobileExpanded === item.label
              return (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded((prev) => (prev === item.label ? null : item.label))
                    }
                    className="w-full flex items-center justify-between py-3 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      color: isExpanded ? '#E8D5A3' : '#C9A96E',
                      fontSize: '15px',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(201,169,110,0.08)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transitionDelay: drawerOpen ? `${i * 60}ms` : '0ms',
                      transform: drawerOpen ? 'translateX(0)' : 'translateX(20px)',
                      opacity: drawerOpen ? 1 : 0,
                    }}
                    aria-expanded={isExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      strokeWidth={1.8}
                      style={{
                        transition: 'transform 0.3s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {/* Sub-items (collapsible) */}
                  <div
                    style={{
                      maxHeight: isExpanded ? `${item.items.length * 48}px` : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {item.items.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={(e) => handleNavClick(e, sub.href)}
                        className="block w-full py-2.5 pl-5 transition-all duration-300"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'rgba(201,169,110,0.7)',
                          fontSize: '13px',
                          fontWeight: 400,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(201,169,110,0.04)',
                        }}
                      >
                        <span style={{ color: 'rgba(201,169,110,0.4)', marginRight: '8px' }}>—</span>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

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

            // Regular link
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

        /* Dropdown items hover */
        .nav-dropdown-item:hover {
          color: #E8D5A3 !important;
          background: rgba(201,169,110,0.06);
          padding-left: 24px !important;
        }

        /* Outline CTA hover */
        .nav-cta-outline:hover {
          background: rgba(201,169,110,0.08) !important;
          border-color: rgba(201,169,110,0.65) !important;
          color: #E8D5A3 !important;
          box-shadow: 0 0 18px rgba(201,169,110,0.15);
        }

        @keyframes navDropdownIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
