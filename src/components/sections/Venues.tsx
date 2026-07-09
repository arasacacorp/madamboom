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
interface VenueData {
  backgroundImage?: string
  useGradientBg?: boolean
  city: string
  venueName: string
  description: string
  address?: string
  programs: string[]
  highlighted?: boolean
}

function VenueCard({
  backgroundImage,
  useGradientBg,
  city,
  venueName,
  description,
  address,
  programs,
  highlighted = false,
  delay,
  visible,
}: VenueData & { delay: number; visible: boolean }) {
  return (
    <div
      className="venue-card-wrapper"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <div
        className={`venue-card relative rounded-md overflow-hidden cursor-pointer ${highlighted ? 'venue-card--featured' : ''}`}
        style={{
          minHeight: '380px',
          height: '100%',
          width: '100%',
          border: highlighted
            ? '2px solid rgba(201,169,110,0.5)'
            : '1px solid rgba(201,169,110,0.15)',
          boxShadow: highlighted
            ? '0 0 35px rgba(201,169,110,0.1), 0 0 60px rgba(123,26,43,0.15), 0 8px 32px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
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
            top: '-1px',
            background: highlighted
              ? 'linear-gradient(90deg, transparent, rgba(232,213,163,0.8), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
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
              background: highlighted
                ? 'linear-gradient(135deg, #E8D5A3 0%, #C9A96E 50%, #E8D5A3 100%)'
                : 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
              borderRadius: '9999px',
              padding: '3px 12px',
              maxWidth: '100%',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#06020A',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {city}
            </span>
          </div>

          {/* Venue name */}
          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              color: highlighted ? '#E8D5A3' : '#F5E6D3',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              fontWeight: highlighted ? 700 : 600,
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
              fontSize: 'clamp(14px, 1.3vw, 16px)',
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
                color: 'rgba(201, 169, 110, 0.55)',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                marginBottom: '14px',
                lineHeight: 1.5,
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
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#06020A', paddingTop: 'clamp(24px, 2.5vw, 32px)' }}
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
      <div className="relative max-w-6xl mx-auto px-4 md:px-8" style={{ zIndex: 6 }}>
        {/* ═══ Gold Separator (плавный переход от Calendar) ═══ */}
        <div
          className="flex items-center gap-4 mx-auto mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.1s',
            width: '100%',
            maxWidth: '700px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              border: '1px solid rgba(201,169,110,0.6)',
              transform: 'rotate(45deg)',
              background: 'rgba(6,2,10,0.9)',
            }}
          />
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)',
            }}
          />
        </div>

        {/* Section header — centered */}
        <div
          className="mb-10 md:mb-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(30px, 4.5vw, 56px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>Площадки</span>
          </h2>

          {/* Subtitle with symmetrical gold lines */}
          <div className="flex items-center gap-3 mt-6">
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(201,169,110,0.65)',
                fontSize: 'clamp(12px, 1.2vw, 15px)',
                fontWeight: 400,
                letterSpacing: '0.22em',
                whiteSpace: 'nowrap',
              }}
            >
              Где проходят наши шоу
            </span>
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>
        </div>

        {/* ═══ Venue Cards — horizontal scroll ═══ */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          {/* Static grid — 3 карточки одинаковой высоты, Гримёрка по центру */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {/* Card 1: Ибица (СПб) */}
            <VenueCard
              useGradientBg
              city="Санкт-Петербург"
              venueName="Клуб-ресторан «Ibiza»"
              description="Один из самых крупных и технологичных клубов Северной столицы. ~1000 кв.м, 200 посадочных мест, большая концертная площадка, 3 VIP-зоны. Интерьер в стиле ар-деко с элементами средиземноморского острова."
              address="Санкт-Петербург, ул. Садовая, 12"
              programs={['Джазовый бунт']}
              delay={0.25}
              visible={isVisible}
            />

            {/* Card 2: Гримёрка (Москва) — highlighted, по центру */}
            <VenueCard
              backgroundImage="/images/venue-grimerka.jpg"
              city="Москва"
              venueName="Клуб-ресторан «Гримёрка»"
              description="Атмосферное пространство в историческом центре столицы рядом с Кузнецким Мостом. Регулярные показы шоу «Мадам Бум» и программы «Джазовый бунт»."
              address="Москва, ул. Пушечная, 9/6"
              programs={['Мадам Бум', 'Джазовый бунт']}
              highlighted={true}
              delay={0.35}
              visible={isVisible}
            />

            {/* Card 3: Unity (СПб) */}
            <VenueCard
              useGradientBg
              city="Санкт-Петербург"
              venueName="Ресторан «Unity Sennaya»"
              description="Стильный ресторан в центре Петербурга. Светлый интерьер с яркими дизайнерскими элементами — столики под мрамор, золотые люстры. Идеальное место для дружеских встреч и камерных шоу."
              address="Санкт-Петербург, пер. Гривцова, 4"
              programs={['Мадам Бум']}
              delay={0.45}
              visible={isVisible}
            />
          </div>
        </div>

        {/* ── Subtle "А также гастроли" row ── */}
        <div
          className="flex items-center justify-center gap-3 mt-10 md:mt-12"
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
        /* Venue card hover effects */
        .venue-card:hover {
          box-shadow: 0 0 30px rgba(123,26,43,0.3), 0 0 12px rgba(201,169,110,0.1), 0 8px 30px rgba(0,0,0,0.5) !important;
          border-color: rgba(201,169,110,0.6) !important;
        }
        .venue-card--featured:hover {
          box-shadow: 0 0 40px rgba(201,169,110,0.25), 0 0 60px rgba(123,26,43,0.3), 0 10px 35px rgba(0,0,0,0.6) !important;
          border-color: rgba(232,213,163,0.8) !important;
        }

        .venue-card:hover .venue-card-glow {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
