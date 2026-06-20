'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (8 particles, unique seed offsets for this section) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 300) * 3 + 1,
    left: seededRandom(i * 13 + 310) * 100,
    top: seededRandom(i * 17 + 320) * 100,
    opacity: seededRandom(i * 19 + 330) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 340) * 16 + 14,
    delay: seededRandom(i * 29 + 350) * 10,
    driftX: seededRandom(i * 31 + 360) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 370) * 80 + 20),
    driftX2: seededRandom(i * 41 + 380) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 390) * 100 + 30),
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

/* ─── Gold diamond bullet ─── */
function GoldDiamond() {
  return (
    <span
      className="inline-block flex-shrink-0 mt-[3px]"
      style={{
        width: '5px',
        height: '5px',
        background: '#C9A96E',
        transform: 'rotate(45deg)',
      }}
    />
  )
}

/* ─── Program Card ─── */
interface ProgramCardProps {
  name: string
  subtitle: string
  description: string
  features: string[]
  highlighted: boolean
  timeBadge?: string
  url: string
  delay: number
  visible: boolean
}

function ProgramCard({
  name,
  subtitle,
  description,
  features,
  highlighted,
  timeBadge,
  url,
  delay,
  visible,
}: ProgramCardProps) {
  return (
    <div
      className="program-card"
      style={{
        flex: highlighted ? '1.15' : '1',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="program-card-inner relative rounded-md overflow-hidden"
        style={{
          backgroundColor: 'rgba(26, 10, 16, 0.8)',
          border: highlighted
            ? '2px solid rgba(201,169,110,0.5)'
            : '1px solid rgba(201,169,110,0.2)',
          boxShadow: highlighted
            ? '0 0 35px rgba(201,169,110,0.1), 0 0 60px rgba(123,26,43,0.15), 0 8px 32px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: highlighted
              ? 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), rgba(232,213,163,0.8), rgba(201,169,110,0.6), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)',
            zIndex: 3,
          }}
        />
        {highlighted && (
          <div
            className="absolute top-0 inset-x-0"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.7), rgba(232,213,163,0.9), rgba(201,169,110,0.7), transparent)',
              zIndex: 3,
            }}
          />
        )}

        {/* Inner content */}
        <div className="p-6 md:p-8">
          {/* Program name */}
          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              color: highlighted ? '#E8D5A3' : '#C9A96E',
              fontSize: highlighted ? 'clamp(24px, 2.5vw, 36px)' : 'clamp(20px, 2.2vw, 32px)',
              fontWeight: highlighted ? 700 : 600,
              letterSpacing: '0.08em',
              lineHeight: 1.2,
              marginBottom: '6px',
            }}
          >
            {name}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#F5E6D3',
              fontSize: 'clamp(15px, 1.4vw, 20px)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              marginBottom: '16px',
            }}
          >
            {subtitle}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(245, 230, 211, 0.65)',
              fontSize: 'clamp(13px, 1vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.65,
              letterSpacing: '0.02em',
              marginBottom: '20px',
            }}
          >
            {description}
          </p>

          {/* Feature list */}
          <ul className="space-y-2.5 mb-6">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(245, 230, 211, 0.7)',
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                }}
              >
                <GoldDiamond />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Time badge (for Джазовый бунт) */}
          {timeBadge && (
            <div
              className="inline-block mb-6"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
                color: '#06020A',
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '6px 16px',
                borderRadius: '3px',
              }}
            >
              {timeBadge}
            </div>
          )}

          {/* CTA button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="program-cta-btn inline-flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
              color: '#06020A',
              fontSize: 'clamp(11px, 0.95vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              borderRadius: '3px',
              padding: '10px 28px',
              border: '1px solid rgba(232,213,163,0.4)',
              transition: 'all 0.4s ease',
            }}
          >
            Билеты
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
  )
}

/* ─── Programs Section ─── */
export default function Programs() {
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
      id="programs"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ═══ Background layers ═══ */}
      {/* Base gradient */}
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
          background: 'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123, 26, 43, 0.12) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      {/* Gold conic light accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 178deg at 30% 5%, rgba(201,169,110,0.04) 0deg, transparent 18deg) 0 0 / 100% 40% no-repeat,
            conic-gradient(from 182deg at 70% 5%, rgba(201,169,110,0.03) 0deg, transparent 16deg) 0 0 / 100% 40% no-repeat
          `,
          zIndex: 1,
        }}
      />
      <SectionParticles />
      <div className="vignette" style={{ position: 'absolute' }} />

      {/* ═══ Content ═══ */}
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

          {/* "Программы" heading */}
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
            Программы
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          {/* Subtitle */}
          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(201,169,110,0.7)',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.4vw, 15px)',
            }}
          >
            Две уникальные шоу-программы
          </p>
        </div>

        {/* ── Program Cards — Desktop ── */}
        <div className="hidden md:flex items-stretch justify-center gap-8 w-full max-w-6xl px-8">
          <ProgramCard
            name="Мадам Бум"
            subtitle="Классическая программа"
            description="Роскошное бурлеск-шоу, живой джаз, вокал, сценическая магия и атмосфера настоящего европейского кабаре. Каждое выступление — полноценное театральное представление, наполненное музыкой, импровизацией и красотой."
            features={[
              'Классический бурлеск',
              'Авторские постановочные номера',
              'Живой вокал',
              'Сценическая магия и ментализм',
              'Конферанс и интерактив',
              'Девушка в золотом бокале ✦',
            ]}
            highlighted={true}
            url="https://madamboomgrimerka.ticketscloud.org/"
            delay={0.2}
            visible={isVisible}
          />
          <ProgramCard
            name="Джазовый бунт"
            subtitle="Джазовое кабаре"
            description="Авторская программа, вдохновлённая легендарными кабаре Парижа, Берлина и Нью-Йорка XX века. Уникальное сочетание живого джаза, бурлеска, вокала и театрального действия."
            features={[
              'Приветственный бокал игристого с 19:00',
              'Шоу в двух отделениях с антрактом',
              'Джазовые вокалисты',
              'Бурлеск-номера и миниатюры',
              'Живой джаз-ансамбль',
              'Конферанс и интерактив',
            ]}
            highlighted={false}
            timeBadge="19:00 — приветственный бокал · 20:00 — шоу"
            url="https://madamboomgrimerka.ticketscloud.org/"
            delay={0.4}
            visible={isVisible}
          />
        </div>

        {/* ── Program Cards — Mobile ── */}
        <div className="md:hidden flex flex-col gap-6 w-full max-w-md px-4">
          <ProgramCard
            name="Мадам Бум"
            subtitle="Классическая программа"
            description="Роскошное бурлеск-шоу, живой джаз, вокал, сценическая магия и атмосфера настоящего европейского кабаре. Каждое выступление — полноценное театральное представление, наполненное музыкой, импровизацией и красотой."
            features={[
              'Классический бурлеск',
              'Авторские постановочные номера',
              'Живой вокал',
              'Сценическая магия и ментализм',
              'Конферанс и интерактив',
              'Девушка в золотом бокале ✦',
            ]}
            highlighted={true}
            url="https://madamboomgrimerka.ticketscloud.org/"
            delay={0.15}
            visible={isVisible}
          />
          <ProgramCard
            name="Джазовый бунт"
            subtitle="Джазовое кабаре"
            description="Авторская программа, вдохновлённая легендарными кабаре Парижа, Берлина и Нью-Йорка XX века. Уникальное сочетание живого джаза, бурлеска, вокала и театрального действия."
            features={[
              'Приветственный бокал игристого с 19:00',
              'Шоу в двух отделениях с антрактом',
              'Джазовые вокалисты',
              'Бурлеск-номера и миниатюры',
              'Живой джаз-ансамбль',
              'Конферанс и интерактив',
            ]}
            highlighted={false}
            timeBadge="19:00 — приветственный бокал · 20:00 — шоу"
            url="https://madamboomgrimerka.ticketscloud.org/"
            delay={0.3}
            visible={isVisible}
          />
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* ── Program card hover effects ── */
        .program-card-inner:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 0 40px rgba(123,26,43,0.3), 0 0 15px rgba(201,169,110,0.1), 0 12px 40px rgba(0,0,0,0.6) !important;
          border-color: rgba(201,169,110,0.45) !important;
        }

        /* Highlighted card hover — stronger glow */
        .program-card:first-child .program-card-inner:hover,
        .program-card:first-child .program-card-inner:hover {
          box-shadow: 0 0 50px rgba(123,26,43,0.4), 0 0 25px rgba(201,169,110,0.15), 0 14px 50px rgba(0,0,0,0.7) !important;
          border-color: rgba(201,169,110,0.75) !important;
        }

        /* CTA button hover */
        .program-cta-btn:hover {
          filter: brightness(1.1);
          box-shadow: 0 0 20px rgba(201,169,110,0.2);
        }

        .program-cta-btn:hover svg {
          transform: translateX(3px);
        }

        /* Subtle border glow on hover via pseudo-element */
        .program-card-inner::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .program-card-inner:hover::after {
          border-color: rgba(201,169,110,0.25);
        }

        /* Highlighted card inner glow pulse */
        @keyframes programHighlightPulse {
          0%, 100% {
            box-shadow: inset 0 0 30px rgba(201,169,110,0.04);
          }
          50% {
            box-shadow: inset 0 0 40px rgba(201,169,110,0.08);
          }
        }

        .program-card:first-child .program-card-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          animation: programHighlightPulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
