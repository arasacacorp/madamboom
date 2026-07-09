'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (reduced for section) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 200) * 3 + 1,
    left: seededRandom(i * 13 + 210) * 100,
    top: seededRandom(i * 17 + 220) * 100,
    opacity: seededRandom(i * 19 + 230) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 240) * 16 + 14,
    delay: seededRandom(i * 29 + 250) * 10,
    driftX: seededRandom(i * 31 + 260) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 270) * 80 + 20),
    driftX2: seededRandom(i * 41 + 280) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 290) * 100 + 30),
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

/* ─── Event data ───
   Two afishas: Moscow + Saint Petersburg.
   - url       → TicketsCloud sales widget ("Билеты" button, external)
   - infoUrl   → internal city page ("Подробнее" button → /msk, /spb)
   date/city/show/venue kept for accessibility (alt text, aria-label);
   city is also rendered as a visible badge on the poster. */
const events = [
  {
    date: 'ИЮЛЬ 2025',
    city: 'Москва',
    show: 'Бурлеск-кабаре «Мадам Бум»',
    venue: 'Ресторан «Гримёрка»',
    image: '/images/afisha-msk.jpg',
    url: 'https://madamboommsk.ticketscloud.org/',
    infoUrl: '/msk',
    highlighted: false,
  },
  {
    date: 'ИЮЛЬ 2025',
    city: 'Санкт-Петербург',
    show: 'Ибица · Джазовый бунт',
    venue: 'Ibiza / Unity',
    image: '/images/afisha-spb.jpg',
    url: 'https://madamboomspb.ticketscloud.org/',
    infoUrl: '/spb',
    highlighted: false,
  },
]

/* ─── Corner bracket (for highlighted card) ─── */
function CornerBrackets() {
  return (
    <>
      <span className="afisha-corner afisha-corner-tl" />
      <span className="afisha-corner afisha-corner-tr" />
      <span className="afisha-corner afisha-corner-bl" />
      <span className="afisha-corner afisha-corner-br" />
    </>
  )
}

/* ─── Single Afisha Card — clean poster + ticket button ─── */
function AfishaCard({
  image,
  url,
  infoUrl,
  city,
  altText,
  highlighted,
  delay,
  visible,
}: {
  image: string
  url: string
  infoUrl: string
  city: string
  altText: string
  highlighted: boolean
  delay: number
  visible: boolean
}) {
  return (
    <div
      className={`afisha-card ${highlighted ? 'afisha-card--featured' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? (highlighted ? 'translateY(-28px)' : 'translateY(0)')
          : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {/* City badge — above the poster, centered.
          Москва → gold gradient; Санкт-Петербург → burgundy (matches calendar SPb color #7B1A2B) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
        <span
          className="afisha-city-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 16px',
            borderRadius: '20px',
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#06020A',
            background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 100%)',
            border: '1px solid rgba(232,213,163,0.5)',
            boxShadow: '0 0 14px rgba(201,169,110,0.25)',
            whiteSpace: 'nowrap',
            ...(city === 'Санкт-Петербург'
              ? {
                  color: '#E8D5A3',
                  background: 'linear-gradient(135deg, #7B1A2B 0%, #5A0F1A 100%)',
                  border: '1px solid rgba(201,169,110,0.45)',
                  boxShadow: '0 0 14px rgba(123,26,43,0.45)',
                }
              : {}),
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#06020A',
              ...(city === 'Санкт-Петербург' ? { background: '#E8D5A3' } : {}),
            }}
          />
          {city}
        </span>
      </div>

      {/* ── Poster frame ── */}
      <div
        className="afisha-poster-frame relative"
        style={{
          padding: '6px',
          background: 'rgba(13,4,8,0.55)',
          border: highlighted
            ? '2px solid rgba(201,169,110,0.65)'
            : '1px solid rgba(201,169,110,0.28)',
          boxShadow: highlighted
            ? '0 0 45px rgba(201,169,110,0.16), 0 0 80px rgba(123,26,43,0.28), 0 14px 45px rgba(0,0,0,0.65)'
            : '0 6px 26px rgba(0,0,0,0.45)',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Inner image container — clean, no overlays */}
        <div
          className="afisha-poster-inner relative overflow-hidden"
          style={{
            aspectRatio: highlighted ? '3 / 4.55' : '3 / 4',
            border: '1px solid rgba(201,169,110,0.15)',
          }}
        >
          <img
            src={image}
            alt={altText}
            className="afisha-poster-img w-full h-full object-cover"
            style={{
              filter: highlighted
                ? 'saturate(1) brightness(0.96)'
                : 'saturate(0.92) brightness(0.86)',
              transition: 'filter 0.5s ease, transform 0.6s ease',
            }}
            loading="lazy"
          />

          {/* Corner brackets — only on featured card, on the frame edges */}
          {highlighted && <CornerBrackets />}
        </div>
      </div>

      {/* ── Action buttons — Билеты (primary) + Подробнее (secondary, internal) ── */}
      <div
        className="afisha-actions"
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'nowrap',
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="afisha-ticket-btn"
          aria-label={`Купить билеты: ${altText}`}
        >
          <span>Билеты</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        {/* Подробнее — secondary CTA → city page (/msk or /spb) */}
        <a
          href={infoUrl}
          className="afisha-info-btn"
          aria-label={`Подробнее: ${altText}`}
        >
          <span>Подробнее</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

/* ─── Afisha Section ─── */
export default function Afisha() {
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
      id="afisha"
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
      {/* Burgundy radial glow centered on featured card */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 45% 45% at 50% 40%, rgba(123, 26, 43, 0.16) 0%, rgba(123, 26, 43, 0.05) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      {/* Gold conic light accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 175deg at 25% 5%, rgba(201,169,110,0.04) 0deg, transparent 20deg) 0 0 / 100% 40% no-repeat,
            conic-gradient(from 185deg at 75% 5%, rgba(201,169,110,0.03) 0deg, transparent 18deg) 0 0 / 100% 40% no-repeat
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
          className="flex flex-col items-center gap-4 mb-12 md:mb-16 lg:mb-20"
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

          {/* "Афиша" heading */}
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
            Афиша
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          {/* "БЛИЖАЙШИЕ ШОУ" subtitle */}
          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(201,169,110,0.7)',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.4vw, 15px)',
            }}
          >
            Ближайшие шоу
          </p>
        </div>

        {/* ── Event Cards — Desktop / Tablet (2 posters, centered as a pair) ── */}
        <div
          className="hidden md:flex items-start justify-center gap-8 lg:gap-10 xl:gap-12 w-full max-w-5xl px-6 lg:px-8 pb-8"
        >
          {events.map((evt, i) => (
            <AfishaCard
              key={evt.city}
              image={evt.image}
              url={evt.url}
              infoUrl={evt.infoUrl}
              city={evt.city}
              altText={`${evt.show}. ${evt.city}. ${evt.date}`}
              highlighted={evt.highlighted}
              delay={0.2 + i * 0.15}
              visible={isVisible}
            />
          ))}
        </div>

        {/* ── Event Cards — Mobile (stacked, no elevation) ── */}
        <div className="md:hidden flex flex-col items-center gap-8 w-full max-w-sm px-4 pb-8">
          {events.map((evt, i) => (
            <AfishaCardMobile
              key={evt.city}
              image={evt.image}
              url={evt.url}
              infoUrl={evt.infoUrl}
              city={evt.city}
              altText={`${evt.show}. ${evt.city}. ${evt.date}`}
              highlighted={evt.highlighted}
              delay={0.15 + i * 0.12}
              visible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* ── Card width (original size) ── */
        .afisha-card {
          width: clamp(260px, 24vw, 360px);
        }
        .afisha-card--featured {
          width: clamp(280px, 26vw, 400px);
        }

        /* ── Poster frame hover ── */
        .afisha-poster-frame:hover {
          transform: translateY(-6px);
          border-color: rgba(201,169,110,0.55) !important;
          box-shadow: 0 0 50px rgba(123,26,43,0.35), 0 0 18px rgba(201,169,110,0.12), 0 14px 45px rgba(0,0,0,0.65) !important;
        }
        .afisha-card--featured .afisha-poster-frame:hover {
          transform: translateY(-32px);
          border-color: rgba(201,169,110,0.85) !important;
          box-shadow: 0 0 55px rgba(123,26,43,0.4), 0 0 28px rgba(201,169,110,0.18), 0 16px 50px rgba(0,0,0,0.7) !important;
        }
        .afisha-poster-frame:hover .afisha-poster-img {
          filter: saturate(1.02) brightness(0.96) !important;
          transform: scale(1.04);
        }
        .afisha-card--featured .afisha-poster-frame:hover .afisha-poster-img {
          filter: saturate(1.06) brightness(1) !important;
        }

        /* ── Corner brackets (featured only) ── */
        .afisha-corner {
          position: absolute;
          width: 22px;
          height: 22px;
          z-index: 3;
          pointer-events: none;
          transition: border-color 0.5s ease;
        }
        .afisha-corner-tl {
          top: 6px; left: 6px;
          border-top: 2px solid rgba(201,169,110,0.75);
          border-left: 2px solid rgba(201,169,110,0.75);
        }
        .afisha-corner-tr {
          top: 6px; right: 6px;
          border-top: 2px solid rgba(201,169,110,0.75);
          border-right: 2px solid rgba(201,169,110,0.75);
        }
        .afisha-corner-bl {
          bottom: 6px; left: 6px;
          border-bottom: 2px solid rgba(201,169,110,0.75);
          border-left: 2px solid rgba(201,169,110,0.75);
        }
        .afisha-corner-br {
          bottom: 6px; right: 6px;
          border-bottom: 2px solid rgba(201,169,110,0.75);
          border-right: 2px solid rgba(201,169,110,0.75);
        }
        .afisha-card--featured:hover .afisha-corner {
          border-color: rgba(232,213,163,0.95) !important;
        }

        /* ── Ticket button (primary) ── */
        .afisha-ticket-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A96E;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.4);
          border-radius: 2px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      letter-spacing 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .afisha-ticket-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(201,169,110,0.92), rgba(232,213,163,1));
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .afisha-ticket-btn:hover {
          color: #06020A;
          border-color: #C9A96E;
          letter-spacing: 0.21em;
          box-shadow: 0 0 28px rgba(201,169,110,0.28), 0 4px 16px rgba(0,0,0,0.4);
        }
        .afisha-ticket-btn:hover::before {
          transform: translateX(0);
        }
        .afisha-ticket-btn > span,
        .afisha-ticket-btn > svg {
          position: relative;
          z-index: 1;
        }
        .afisha-ticket-btn svg {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .afisha-ticket-btn:hover svg {
          transform: translateX(5px);
        }

        /* Featured card button — slightly more prominent */
        .afisha-card--featured .afisha-ticket-btn {
          border-color: rgba(201,169,110,0.6);
          background: rgba(201,169,110,0.06);
          color: #E8D5A3;
        }

        /* ── Secondary button «О программе» — subtle, no fill slide ── */
        .afisha-info-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.65);
          background: transparent;
          border: 1px solid rgba(201,169,110,0.22);
          border-radius: 2px;
          text-decoration: none;
          position: relative;
          transition: color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      letter-spacing 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .afisha-info-btn:hover {
          color: #C9A96E;
          border-color: rgba(201,169,110,0.5);
          background: rgba(201,169,110,0.05);
          letter-spacing: 0.19em;
          box-shadow: 0 0 18px rgba(201,169,110,0.12), 0 4px 14px rgba(0,0,0,0.35);
        }
        .afisha-info-btn svg {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .afisha-info-btn:hover svg {
          transform: scale(1.08);
        }

        /* Featured secondary button — slightly brighter to match primary */
        .afisha-card--featured .afisha-info-btn {
          border-color: rgba(201,169,110,0.32);
          color: rgba(232,213,163,0.75);
        }
        .afisha-card--featured .afisha-info-btn:hover {
          color: #E8D5A3;
          border-color: rgba(201,169,110,0.6);
        }
      `}</style>
    </section>
  )
}

/* ─── Mobile Afisha Card — clean poster + button, no elevation ─── */
function AfishaCardMobile({
  image,
  url,
  infoUrl,
  city,
  altText,
  highlighted,
  delay,
  visible,
}: {
  image: string
  url: string
  infoUrl: string
  city: string
  altText: string
  highlighted: boolean
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="afisha-card-mobile"
      style={{
        width: '100%',
        maxWidth: '340px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {/* City badge — above the poster, centered.
          Москва → gold gradient; Санкт-Петербург → burgundy (matches calendar SPb color #7B1A2B) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#06020A',
            background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 100%)',
            border: '1px solid rgba(232,213,163,0.5)',
            boxShadow: '0 0 12px rgba(201,169,110,0.25)',
            whiteSpace: 'nowrap',
            ...(city === 'Санкт-Петербург'
              ? {
                  color: '#E8D5A3',
                  background: 'linear-gradient(135deg, #7B1A2B 0%, #5A0F1A 100%)',
                  border: '1px solid rgba(201,169,110,0.45)',
                  boxShadow: '0 0 12px rgba(123,26,43,0.45)',
                }
              : {}),
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#06020A',
              ...(city === 'Санкт-Петербург' ? { background: '#E8D5A3' } : {}),
            }}
          />
          {city}
        </span>
      </div>

      {/* Poster frame */}
      <div
        className="afisha-poster-frame relative"
        style={{
          padding: '5px',
          background: 'rgba(13,4,8,0.55)',
          border: highlighted
            ? '2px solid rgba(201,169,110,0.6)'
            : '1px solid rgba(201,169,110,0.28)',
          boxShadow: highlighted
            ? '0 0 30px rgba(201,169,110,0.12), 0 0 50px rgba(123,26,43,0.2), 0 8px 30px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '3 / 4.2',
            border: '1px solid rgba(201,169,110,0.15)',
          }}
        >
          <img
            src={image}
            alt={altText}
            className="w-full h-full object-cover"
            style={{
              filter: highlighted ? 'saturate(1) brightness(0.95)' : 'saturate(0.92) brightness(0.86)',
            }}
            loading="lazy"
          />
          {highlighted && <CornerBrackets />}
        </div>
      </div>

      {/* Action buttons — Билеты + Подробнее, single row */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'nowrap' }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="afisha-ticket-btn"
          aria-label={`Купить билеты: ${altText}`}
        >
          <span>Билеты</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a
          href={infoUrl}
          className="afisha-info-btn"
          aria-label={`Подробнее: ${altText}`}
        >
          <span>Подробнее</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
