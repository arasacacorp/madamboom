'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (8 particles, offset 600+) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 600) * 3 + 1,
    left: seededRandom(i * 13 + 610) * 100,
    top: seededRandom(i * 17 + 620) * 100,
    opacity: seededRandom(i * 19 + 630) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 640) * 16 + 14,
    delay: seededRandom(i * 29 + 650) * 10,
    driftX: seededRandom(i * 31 + 660) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 670) * 80 + 20),
    driftX2: seededRandom(i * 41 + 680) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 690) * 100 + 30),
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

/* ─── Feature Data ─── */
const features = [
  {
    emoji: '🥂',
    title: 'Девушка в золотом бокале',
    description: 'Легендарный номер — визитная карточка шоу и один из самых фотографируемых моментов вечера',
    highlighted: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8" />
        <path d="M12 15v6" />
        <path d="M12 15C8.5 15 6 12.5 6 9V3h12v6c0 3.5-2.5 6-6 6z" />
        <path d="M6 3C4 3 2 5 2 7" />
        <path d="M18 3c2 0 4 2 4 4" />
      </svg>
    ),
  },
  {
    emoji: '🎤',
    title: 'Живой вокал',
    description: 'Джазовые вокалистки с бархатными тембрами и утончённой манерой',
    highlighted: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    emoji: '🔮',
    title: 'Ментализм и магия',
    description: 'Анна и Сергей Варлоки — загадка и сценическое волшебство',
    highlighted: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    emoji: '🎭',
    title: 'Конферанс',
    description: 'Остроумное общение с публикой, превращающее номера в единую историю',
    highlighted: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
      </svg>
    ),
  },
  {
    emoji: '✨',
    title: '7 уникальных артистов',
    description: 'Каждый с собственным ярким характером и сценической историей',
    highlighted: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      </svg>
    ),
  },
  {
    emoji: '🎪',
    title: 'Две программы',
    description: 'Классическая «Мадам Бум» и джазовое кабаре «Джазовый бунт»',
    highlighted: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </svg>
    ),
  },
]

/* ─── Feature Card ─── */
function FeatureCard({
  icon,
  emoji,
  title,
  description,
  highlighted,
  delay,
  visible,
}: {
  icon: React.ReactNode
  emoji: string
  title: string
  description: string
  highlighted: boolean
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="whyus-feature-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(25px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="whyus-feature-inner relative rounded-md"
        style={{
          background: highlighted
            ? 'rgba(201,169,110,0.06)'
            : 'rgba(26, 10, 16, 0.5)',
          border: highlighted
            ? '2px solid rgba(201,169,110,0.5)'
            : '1px solid rgba(201,169,110,0.18)',
          padding: '24px',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
          overflow: 'hidden',
          boxShadow: highlighted
            ? '0 0 25px rgba(201,169,110,0.08), 0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: highlighted
              ? 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), rgba(232,213,163,0.8), rgba(201,169,110,0.6), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)',
          }}
        />
        {/* Left gold accent bar */}
        <div
          className="absolute top-0 left-0 w-px"
          style={{
            height: '35%',
            background: highlighted
              ? 'linear-gradient(180deg, rgba(201,169,110,0.5), transparent)'
              : 'linear-gradient(180deg, rgba(201,169,110,0.2), transparent)',
          }}
        />
        {/* Icon + Emoji area */}
        <div
          className="mb-4 flex items-center gap-3"
        >
          <div
            style={{
              color: '#C9A96E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              background: highlighted
                ? 'rgba(201,169,110,0.12)'
                : 'rgba(201,169,110,0.06)',
              border: highlighted
                ? '1px solid rgba(201,169,110,0.3)'
                : '1px solid rgba(201,169,110,0.15)',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: '20px',
              lineHeight: 1,
            }}
          >
            {emoji}
          </span>
        </div>
        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            color: highlighted ? '#E8D5A3' : '#C9A96E',
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            fontWeight: highlighted ? 700 : 600,
            letterSpacing: '0.06em',
            lineHeight: 1.3,
            marginBottom: '10px',
          }}
        >
          {title}
        </h3>
        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            color: highlighted ? 'rgba(245, 230, 211, 0.7)' : 'rgba(245, 230, 211, 0.55)',
            fontSize: 'clamp(13px, 1.05vw, 15px)',
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {description}
        </p>
        {/* Subtle glow overlay on hover */}
        <div
          className="whyus-feature-glow absolute inset-0 pointer-events-none"
          style={{
            background: highlighted
              ? 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ─── WhyUs Section ─── */
export default function WhyUs() {
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
      id="whyus"
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
          background: 'radial-gradient(ellipse 55% 45% at 50% 35%, rgba(123, 26, 43, 0.13) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      {/* Gold conic light accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 177deg at 25% 5%, rgba(201,169,110,0.04) 0deg, transparent 18deg) 0 0 / 100% 40% no-repeat,
            conic-gradient(from 183deg at 75% 5%, rgba(201,169,110,0.03) 0deg, transparent 16deg) 0 0 / 100% 40% no-repeat
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

          {/* "Почему Мадам Бум?" heading */}
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
            Почему Мадам Бум?
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />
        </div>

        {/* Prominent quote — large italic Cormorant */}
        <div
          className="flex flex-col items-center px-4 mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
            transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
          }}
        >
          {/* Decorative elements around quote */}
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 'clamp(20px, 3vw, 40px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
              }}
            />
            <div
              style={{
                width: '5px',
                height: '5px',
                border: '1px solid rgba(201,169,110,0.5)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(20px, 3vw, 40px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#E8D5A3',
              fontSize: 'clamp(24px, 3vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: '0.04em',
              maxWidth: '700px',
              textAlign: 'center',
              textShadow: '0 0 40px rgba(201,169,110,0.1)',
            }}
          >
            Это не просто бурлеск-шоу
          </p>
        </div>

        {/* Supporting description */}
        <div
          className="flex flex-col items-center px-4 mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245, 230, 211, 0.75)',
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: '0.03em',
              maxWidth: '640px',
              textAlign: 'center',
            }}
          >
            Это вечер, где живой джаз встречается с кабаре, красота — с юмором, а роскошная сценическая эстетика — с настоящими эмоциями.
          </p>
        </div>

        {/* 3x2 Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-8 mb-14 md:mb-18">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
              highlighted={feature.highlighted}
              delay={0.4 + i * 0.1}
              visible={isVisible}
            />
          ))}
        </div>

        {/* Final CTA — large italic Cormorant */}
        <div
          className="flex flex-col items-center px-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.1s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.1s',
          }}
        >
          {/* Decorative elements around CTA */}
          <div className="flex items-center gap-4 mb-5">
            <div
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35))',
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
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.35), transparent)',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#C9A96E',
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '0.04em',
              maxWidth: '600px',
              textAlign: 'center',
              textShadow: '0 0 30px rgba(201,169,110,0.1)',
            }}
          >
            Мы создаём не программу. Мы создаём событие.
          </p>
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Feature card hover effects */
        .whyus-feature-inner:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(123,26,43,0.2), 0 0 12px rgba(201,169,110,0.06), 0 8px 28px rgba(0,0,0,0.4) !important;
          border-color: rgba(201,169,110,0.35) !important;
        }

        /* Highlighted card hover — enhanced glow */
        .whyus-feature-card:first-child .whyus-feature-inner:hover {
          box-shadow: 0 0 40px rgba(123,26,43,0.3), 0 0 20px rgba(201,169,110,0.12), 0 10px 36px rgba(0,0,0,0.5) !important;
          border-color: rgba(201,169,110,0.7) !important;
        }

        .whyus-feature-inner:hover .whyus-feature-glow {
          opacity: 1 !important;
        }

        /* Card border glow on hover */
        .whyus-feature-inner::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .whyus-feature-inner:hover::after {
          border-color: rgba(201,169,110,0.2);
        }

        /* Highlighted card inner glow pulse */
        @keyframes whyusHighlightPulse {
          0%, 100% {
            box-shadow: inset 0 0 25px rgba(201,169,110,0.03);
          }
          50% {
            box-shadow: inset 0 0 35px rgba(201,169,110,0.07);
          }
        }

        .whyus-feature-card:first-child .whyus-feature-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          animation: whyusHighlightPulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
