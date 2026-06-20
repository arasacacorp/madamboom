'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (8 particles, offset 500+) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 500) * 3 + 1,
    left: seededRandom(i * 13 + 510) * 100,
    top: seededRandom(i * 17 + 520) * 100,
    opacity: seededRandom(i * 19 + 530) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 540) * 16 + 14,
    delay: seededRandom(i * 29 + 550) * 10,
    driftX: seededRandom(i * 31 + 560) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 570) * 80 + 20),
    driftX2: seededRandom(i * 41 + 580) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 590) * 100 + 30),
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

/* ─── Event Type Data ─── */
const eventTypes = [
  {
    label: 'Корпоративы',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12.01" />
      </svg>
    ),
  },
  {
    label: 'Фестивали',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    label: 'Презентации',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: 'Девичники',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
      </svg>
    ),
  },
  {
    label: 'Светские вечера',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
      </svg>
    ),
  },
  {
    label: 'Частные праздники',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

/* ─── Event Type Item ─── */
function EventTypeItem({
  icon,
  label,
  delay,
  visible,
}: {
  icon: React.ReactNode
  label: string
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="corporate-event-item flex items-center gap-3 rounded-md px-4 py-3"
      style={{
        background: 'rgba(26, 10, 16, 0.4)',
        border: '1px solid rgba(201,169,110,0.15)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        style={{
          color: '#C9A96E',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          color: '#E8D5A3',
          fontSize: 'clamp(12px, 1.1vw, 15px)',
          fontWeight: 400,
          letterSpacing: '0.04em',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Corporate Section ─── */
export default function Corporate() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="corporate"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #0D0408 15%, #1A0812 45%, #0D0408 75%, #06020A 100%)',
        }}
      />
      {/* Burgundy radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(123, 26, 43, 0.14) 0%, rgba(123, 26, 43, 0.05) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      {/* Gold conic light accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 176deg at 28% 5%, rgba(201,169,110,0.04) 0deg, transparent 20deg) 0 0 / 100% 40% no-repeat,
            conic-gradient(from 184deg at 72% 5%, rgba(201,169,110,0.03) 0deg, transparent 18deg) 0 0 / 100% 40% no-repeat
          `,
          zIndex: 1,
        }}
      />
      <SectionParticles />
      <div className="vignette" style={{ position: 'absolute' }} />

      {/* ── Content ── */}
      <div className="relative flex flex-col items-center w-full" style={{ zIndex: 6 }}>

        {/* Section header */}
        <div
          className="flex flex-col items-center gap-4 mb-10 md:mb-14 lg:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Decorative diamond + gold lines */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                border: '1px solid rgba(201,169,110,0.7)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>

          {/* "Гастроли и корпоративы" heading */}
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.1em',
              textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              lineHeight: 1.1,
            }}
          >
            Гастроли и корпоративы
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          {/* "ШОУ ДЛЯ ВАШЕГО МЕРОПРИЯТИЯ" subtitle */}
          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(201,169,110,0.7)',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.4vw, 15px)',
            }}
          >
            Шоу для вашего мероприятия
          </p>
        </div>

        {/* ── Two-column layout: Image left, Content right ── */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center w-full max-w-6xl px-4 md:px-8 gap-8 lg:gap-12">

          {/* Left side — Background image with dark overlay */}
          <div
            className="corporate-image-panel relative rounded-md overflow-hidden lg:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
              minHeight: '280px',
              border: '1px solid rgba(201,169,110,0.15)',
              boxShadow: '0 0 30px rgba(123,26,43,0.2), 0 8px 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Image */}
            <img
              src="/images/corporate-event.jpg"
              alt="Корпоративное мероприятие Мадам Бум"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'saturate(0.8) contrast(1.1) brightness(0.65)',
              }}
              loading="lazy"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(6,2,10,0.5) 0%, rgba(6,2,10,0.7) 60%, rgba(6,2,10,0.85) 100%)',
              }}
            />
            {/* Burgundy overlay tint */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 30% 70%, rgba(123,26,43,0.15) 0%, transparent 70%)',
              }}
            />
            {/* Top gold accent line */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
              }}
            />
            {/* Left gold accent bar */}
            <div
              className="absolute top-0 left-0 w-px"
              style={{
                height: '40%',
                background: 'linear-gradient(180deg, rgba(201,169,110,0.35), transparent)',
              }}
            />
            {/* Overlay text for mobile banner effect */}
            <div className="absolute inset-0 flex items-end p-6 lg:hidden">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: 'rgba(232, 213, 163, 0.6)',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  lineHeight: 1.6,
                }}
              >
                Шоу, которое запомнится
              </p>
            </div>
            {/* Hover glow overlay */}
            <div
              className="corporate-image-glow absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)',
                opacity: 0,
                transition: 'opacity 0.5s ease',
              }}
            />
          </div>

          {/* Right side — Text content */}
          <div
            className="flex flex-col justify-center lg:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s',
            }}
          >
            {/* Description paragraphs */}
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(245, 230, 211, 0.85)',
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                fontWeight: 400,
                lineHeight: 1.8,
                letterSpacing: '0.02em',
                marginBottom: '16px',
              }}
            >
              Бурлеск-кабаре «Мадам Бум» регулярно выступает на корпоративных мероприятиях, презентациях, фестивалях, светских вечерах, частных праздниках и девичниках.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(245, 230, 211, 0.85)',
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                fontWeight: 400,
                lineHeight: 1.8,
                letterSpacing: '0.02em',
                marginBottom: '28px',
              }}
            >
              Мы предлагаем как отдельные номера, так и полноценные шоу-программы, адаптированные под площадку и формат мероприятия.
            </p>

            {/* Event type grid (3x2 desktop, 2x3 tablet, 2x3 mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {eventTypes.map((type, i) => (
                <EventTypeItem
                  key={type.label}
                  icon={type.icon}
                  label={type.label}
                  delay={0.5 + i * 0.08}
                  visible={isVisible}
                />
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="mailto:madamboom@email.com"
              className="corporate-cta-btn inline-flex items-center justify-center gap-2 self-start"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: 'clamp(12px, 1vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                borderRadius: '3px',
                padding: '12px 32px',
                border: '1.5px solid rgba(201,169,110,0.5)',
                transition: 'all 0.4s ease',
              }}
            >
              Заказать выступление
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transition: 'transform 0.3s ease' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Image panel hover effects */
        .corporate-image-panel:hover {
          box-shadow: 0 0 40px rgba(123,26,43,0.3), 0 0 15px rgba(201,169,110,0.08), 0 12px 40px rgba(0,0,0,0.6) !important;
          border-color: rgba(201,169,110,0.3) !important;
        }

        .corporate-image-panel:hover .corporate-image-glow {
          opacity: 1 !important;
        }

        .corporate-image-panel:hover img {
          filter: saturate(0.85) contrast(1.05) brightness(0.7) !important;
        }

        /* Event type item hover */
        .corporate-event-item:hover {
          background: rgba(201,169,110,0.06) !important;
          border-color: rgba(201,169,110,0.3) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .corporate-event-item {
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease !important;
        }

        /* CTA button hover effects */
        .corporate-cta-btn:hover {
          background: rgba(201,169,110,0.1) !important;
          border-color: rgba(201,169,110,0.8) !important;
          box-shadow: 0 0 20px rgba(201,169,110,0.15), 0 0 40px rgba(123,26,43,0.1);
          color: #E8D5A3 !important;
        }

        .corporate-cta-btn:hover svg {
          transform: translateX(3px);
        }

        /* Image panel border glow on hover via pseudo-element */
        .corporate-image-panel::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .corporate-image-panel:hover::after {
          border-color: rgba(201,169,110,0.25);
        }
      `}</style>
    </section>
  )
}
