'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (8 particles, seed offsets 400+) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 400) * 3 + 1,
    left: seededRandom(i * 13 + 410) * 100,
    top: seededRandom(i * 17 + 420) * 100,
    opacity: seededRandom(i * 19 + 430) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 440) * 16 + 14,
    delay: seededRandom(i * 29 + 450) * 10,
    driftX: seededRandom(i * 31 + 460) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 470) * 80 + 20),
    driftX2: seededRandom(i * 41 + 480) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 490) * 100 + 30),
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

/* ─── Venue Card ─── */
function VenueCard({
  backgroundImage,
  useGradientBg,
  city,
  venueName,
  description,
  address,
  programs,
  delay,
  visible,
}: {
  backgroundImage?: string
  useGradientBg?: boolean
  city: string
  venueName: string
  description: string
  address?: string
  programs: string[]
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="venue-card-wrapper"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        flex: '1 1 0%',
        minWidth: 0,
      }}
    >
      <div
        className="venue-card relative rounded-md overflow-hidden cursor-pointer"
        style={{
          minHeight: '320px',
          border: '1px solid rgba(201,169,110,0.15)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Background layer */}
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt={venueName}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.4) saturate(0.7)',
              zIndex: 0,
            }}
            loading="lazy"
          />
        ) : useGradientBg ? (
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, #1A0812 0%, #2D0F1A 25%, #7B1A2B 50%, #2D0F1A 75%, #1A0812 100%)
              `,
              zIndex: 0,
            }}
          />
        ) : null}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: backgroundImage
              ? 'linear-gradient(180deg, rgba(6,2,10,0.2) 0%, rgba(6,2,10,0.5) 50%, rgba(6,2,10,0.85) 100%)'
              : 'linear-gradient(180deg, rgba(6,2,10,0.1) 0%, rgba(6,2,10,0.4) 50%, rgba(6,2,10,0.8) 100%)',
            zIndex: 1,
          }}
        />

        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
            zIndex: 3,
          }}
        />

        {/* Side gold accent lines */}
        <div
          className="absolute top-0 left-0 w-px"
          style={{ height: '35%', background: 'linear-gradient(180deg, rgba(201,169,110,0.25), transparent)', zIndex: 3 }}
        />
        <div
          className="absolute top-0 right-0 w-px"
          style={{ height: '35%', background: 'linear-gradient(180deg, rgba(201,169,110,0.25), transparent)', zIndex: 3 }}
        />

        {/* Content overlay — anchored to bottom */}
        <div
          className="absolute inset-x-0 bottom-0 p-6"
          style={{ zIndex: 2 }}
        >
          {/* City badge */}
          <div
            className="inline-block mb-3"
            style={{
              background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
              borderRadius: '9999px',
              padding: '3px 14px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#06020A',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {city}
            </span>
          </div>

          {/* Venue name */}
          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#F5E6D3',
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              marginBottom: '10px',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            {venueName}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245, 230, 211, 0.75)',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              fontWeight: 400,
              lineHeight: 1.65,
              letterSpacing: '0.02em',
              marginBottom: '14px',
            }}
          >
            {description}
          </p>

          {/* Address (if provided) */}
          {address && (
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201, 169, 110, 0.45)',
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.06em',
                marginBottom: '14px',
              }}
            >
              {address}
            </p>
          )}

          {/* Program badges */}
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <span
                key={program}
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: '#C9A96E',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: '3px',
                  padding: '3px 10px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow overlay */}
        <div
          className="venue-card-glow absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
            zIndex: 3,
          }}
        />
      </div>
    </div>
  )
}

/* ─── Venues Section ─── */
export default function Venues() {
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
      id="venues"
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
          background: 'radial-gradient(ellipse 50% 40% at 50% 40%, rgba(123, 26, 43, 0.12) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
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

        {/* Section header: diamond ornament + gold lines → heading → gold shimmer line → subtitle */}
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

          {/* "Площадки" heading */}
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
            Площадки
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          {/* "ГДЕ ПРОХОДЯТ НАШИ ШОУ" subtitle */}
          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(201,169,110,0.7)',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.4vw, 15px)',
            }}
          >
            Где проходят наши шоу
          </p>
        </div>

        {/* ── Venue Cards ── */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 w-full max-w-5xl px-4 md:px-8 mb-8 md:mb-10">
          {/* Card 1: Москва — Клуб «Гримёрка» */}
          <VenueCard
            backgroundImage="/images/venue-grimerka.jpg"
            city="Москва"
            venueName="Клуб-ресторан «Гримёрка»"
            description="Атмосферное пространство в историческом центре столицы рядом с Кузнецким Мостом. Регулярные показы шоу «Мадам Бум» и программы «Джазовый бунт»."
            address="Москва, ул. Кузнецкий Мост"
            programs={['Мадам Бум', 'Джазовый бунт']}
            delay={0.2}
            visible={isVisible}
          />

          {/* Card 2: Санкт-Петербург */}
          <VenueCard
            useGradientBg
            city="Санкт-Петербург"
            venueName="Площадки города"
            description="Проект активно развивается в Санкт-Петербурге — колыбели русского бурлеска. Следите за афишей, чтобы не пропустить ближайшие шоу."
            programs={['Мадам Бум']}
            delay={0.35}
            visible={isVisible}
          />
        </div>

        {/* ── Subtle "А также гастроли" row ── */}
        <div
          className="flex items-center justify-center gap-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s',
          }}
        >
          <div
            style={{
              width: 'clamp(20px, 3vw, 40px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(232, 213, 163, 0.55)',
              fontSize: 'clamp(14px, 1.4vw, 18px)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
            }}
          >
            А также гастроли по всей России
          </p>
          <div
            style={{
              width: 'clamp(20px, 3vw, 40px)',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)',
            }}
          />
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Venue card hover effects — lift, glow increase, border brighten */
        .venue-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(123,26,43,0.3), 0 0 12px rgba(201,169,110,0.06), 0 8px 30px rgba(0,0,0,0.5);
          border-color: rgba(201,169,110,0.35) !important;
        }

        .venue-card:hover .venue-card-glow {
          opacity: 1 !important;
        }

        /* Venue card border glow on hover */
        .venue-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .venue-card:hover::after {
          border-color: rgba(201,169,110,0.25);
        }

        /* Gradient bg subtle animation for SPb card */
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  )
}
