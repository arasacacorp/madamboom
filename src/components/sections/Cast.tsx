'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (reduced count for section) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 50) * 3 + 1,
    left: seededRandom(i * 13 + 60) * 100,
    top: seededRandom(i * 17 + 70) * 100,
    opacity: seededRandom(i * 19 + 80) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 90) * 16 + 14,
    delay: seededRandom(i * 29 + 100) * 10,
    driftX: seededRandom(i * 31 + 110) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 120) * 80 + 20),
    driftX2: seededRandom(i * 41 + 130) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 140) * 100 + 30),
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

/* ─── Performer data ───
 * 7 артистов (Анна и Сергей Варлоки — отдельные карточки).
 * У каждого: frontImage (основное фото) + backImage (для flip).
 * Пока backImage = frontImage (фото предоставляются отдельно).
 */
interface Performer {
  name: string
  role: string
  description: string
  image: string
  objectPos?: string
  isProducer?: boolean
  bioHref: string
}

const performers: Performer[] = [
  {
    name: 'Олеся Волык',
    role: 'Хозяйка вечера · Конферансье',
    description: 'Энергия и юмор',
    image: '/images/performer-olesya.jpg',
    objectPos: 'center top',
    bioHref: '/cast#olesya-volyk',
  },
  {
    name: 'Сапфира Тайгерс',
    role: 'Прима · Художественное сердце',
    description: 'Лицо «Мадам Бум»',
    image: '/images/performer-saphaya.jpg',
    objectPos: '80% 5%',
    bioHref: '/cast#saphira-taigers',
  },
  {
    name: 'Кристал Дейзи',
    role: 'Девушка в золотом бокале',
    description: 'Мастер перевоплощений',
    image: '/images/performer-crystal.jpg',
    objectPos: 'center top',
    bioHref: '/cast#kristal-deyzi',
  },
  {
    name: 'Марлен',
    role: 'Джазовый вокал · «Джазовый бунт»',
    description: 'Голос проекта',
    image: '/images/performer-marlene.jpg',
    objectPos: 'center top',
    bioHref: '/cast#marlen',
  },
  {
    name: 'Анна Варлок',
    role: 'Ментализм · Иллюзия',
    description: 'Магия сцены',
    image: '/images/varlok-sergey.jpg',
    objectPos: 'center top',
    bioHref: '/cast#varloki',
  },
  {
    name: 'Сергей Варлок',
    role: 'Ментализм · Иллюзия',
    description: 'Элемент неожиданности',
    image: '/images/varlok-anna.jpg',
    objectPos: 'center top',
    bioHref: '/cast#varloki',
  },
  {
    name: 'Фрау Анаид',
    role: 'Классический бурлеск',
    description: 'Красота и грация',
    image: '/images/performer-frau-anaid.jpg',
    objectPos: 'center top',
    bioHref: '/cast#frau-anaid',
  },
  {
    name: 'Ксения Лапшина',
    role: 'Продюсер · Основатель',
    description: 'Создатель «Мадам Бум»',
    image: '/images/performer-ksenia.jpg',
    objectPos: 'center top',
    isProducer: true,
    bioHref: '/cast#kseniya-lapshina',
  },
]

/* ─── Performer Card Component (3D flip → "Узнать артиста" link to bio) ─── */
function PerformerCard({
  performer,
  delay,
  visible,
}: {
  performer: Performer
  delay: number
  visible: boolean
}) {
  const isProducer = performer.isProducer === true
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`cast-card cast-flip-card ${isProducer ? 'cast-card--producer' : ''} ${flipped ? 'is-flipped' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a.cast-flip-back')) return
        setFlipped((f) => !f)
      }}
    >
      <div className="cast-flip-inner">
        {/* ═══ FRONT ═══ */}
        <div className="cast-card-inner cast-flip-front">
        {/* Image */}
        <img
          src={performer.image}
          alt={`${performer.name} — ${performer.role}`}
          className="w-full h-full object-cover"
          style={{
            filter: isProducer
              ? 'saturate(1) contrast(1.1) brightness(0.95)'
              : 'saturate(0.9) contrast(1.05) brightness(0.85)',
            objectPosition: performer.objectPos || 'center top',
            transition: 'filter 0.5s ease, transform 0.6s ease',
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isProducer
              ? 'linear-gradient(180deg, transparent 0%, transparent 25%, rgba(123,26,43,0.3) 55%, rgba(6,2,10,0.95) 100%)'
              : 'linear-gradient(180deg, transparent 0%, transparent 35%, rgba(6,2,10,0.5) 60%, rgba(6,2,10,0.95) 100%)',
          }}
        />

        {/* Top gold accent line (ярче для продюсера) */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            top: '-1px',
            background: isProducer
              ? 'linear-gradient(90deg, transparent, rgba(232,213,163,0.8), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            zIndex: 2,
          }}
        />

        {/* Producer badge (только для Ксении) */}
        {isProducer && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-sm"
            style={{
              zIndex: 4,
              background: 'linear-gradient(135deg, rgba(201,169,110,0.95) 0%, rgba(232,213,163,0.95) 100%)',
              color: '#06020A',
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Продюсер
          </div>
        )}

        {/* Bottom content */}
        <div
          className="absolute inset-x-0 bottom-0 px-3 pb-4 text-center"
          style={{ zIndex: 3 }}
        >
          {/* Decorative diamond for producer */}
          {isProducer && (
            <div
              className="mx-auto mb-2"
              style={{
                width: '6px',
                height: '6px',
                border: '1px solid rgba(232,213,163,0.7)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
          )}

          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              color: isProducer ? '#E8D5A3' : '#E8D5A3',
              fontWeight: isProducer ? 700 : 600,
              fontSize: 'clamp(14px, 1.3vw, 18px)',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              marginBottom: '5px',
            }}
          >
            {performer.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: isProducer ? '#E8D5A3' : '#C9A96E',
              fontSize: 'clamp(9px, 0.82vw, 11px)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              marginBottom: '3px',
            }}
          >
            {performer.role}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: isProducer ? 'rgba(245,230,211,0.85)' : 'rgba(245,230,211,0.7)',
              fontSize: 'clamp(11px, 0.95vw, 13px)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.3,
            }}
          >
            {performer.description}
          </p>
        </div>

        {/* Hover glow overlay */}
        <div
          className="cast-card-glow absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: isProducer
              ? 'radial-gradient(ellipse at center, rgba(232,213,163,0.12) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 70%)',
            transition: 'opacity 0.5s ease',
          }}
        />
        </div>

        {/* ═══ BACK — "Узнать артиста" link to detailed bio ═══ */}
        <a
          href={performer.bioHref}
          className="cast-flip-back"
          aria-label={`Узнать артиста: ${performer.name}`}
        >
          {/* Background layers */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #0D0408 0%, #1A0812 50%, #0D0408 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isProducer
                ? 'radial-gradient(ellipse at center, rgba(232,213,163,0.14) 0%, transparent 65%)'
                : 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 65%)',
            }}
          />
          {/* Top gold accent */}
          <div
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{
              top: '-1px',
              background: isProducer
                ? 'linear-gradient(90deg, transparent, rgba(232,213,163,0.8), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
              zIndex: 2,
            }}
          />

          {/* Content */}
          <div
            className="relative flex flex-col items-center justify-center text-center px-4"
            style={{ zIndex: 3, height: '100%' }}
          >
            {/* Decorative diamond + lines */}
            <div className="flex items-center gap-2 mb-5">
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
                }}
              />
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  border: '1px solid rgba(201,169,110,0.6)',
                  transform: 'rotate(45deg)',
                  background: 'rgba(6,2,10,0.9)',
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
                }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-inter)',
                color: isProducer ? 'rgba(232,213,163,0.75)' : 'rgba(201,169,110,0.7)',
                fontSize: 'clamp(9px, 0.9vw, 11px)',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Узнать артиста
            </span>

            <span
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#E8D5A3',
                fontSize: 'clamp(15px, 1.4vw, 20px)',
                fontWeight: isProducer ? 700 : 600,
                letterSpacing: '0.03em',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              {performer.name}
            </span>

            {/* Arrow circle */}
            <div
              className="cast-flip-back-arrow-circle flex items-center justify-center"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.4)',
                color: '#C9A96E',
                transition: 'transform 0.4s ease, border-color 0.4s ease, background 0.4s ease, color 0.4s ease',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

/* ─── Cast Section — Наши звёзды бурлеска ───
 * hideCta: when true, hides the "Подробнее о составе" CTA (use on /cast page
 *          where the link would be a self-referential no-op). Default false
 *          preserves the original behavior on the main landing page.
 */
export default function Cast({ hideCta = false }: { hideCta?: boolean } = {}) {
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
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cast"
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06020A 0%, #0D0408 15%, #1A0812 45%, #0D0408 75%, #06020A 100%)',
        }}
      />
      {/* Burgundy radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123, 26, 43, 0.14) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
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
      <div className="relative max-w-5xl mx-auto px-4 md:px-6" style={{ zIndex: 6 }}>
        {/* ═══ Title block — centered ═══ */}
        <div
          className="mb-10 md:mb-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
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
              textShadow:
                '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            Наши звёзды{' '}
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>бурлеска</span>
          </h2>

          {/* Subtitle with symmetrical gold lines */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <div
              className="hidden sm:block"
              style={{
                width: 'clamp(30px, 5vw, 60px)',
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
                textAlign: 'center',
              }}
            >
              7 уникальных артистов · Один спектакль
            </span>
            <div
              className="hidden sm:block"
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>
        </div>

        {/* ═══ Performers Grid — все карточки одинакового размера ═══
            Desktop (lg+): 4 в ряд, 3 в ряду ниже — центрированы
            Tablet (md): 3 в ряд
            Mobile: 2 в ряд */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          {/* Ряд 1: 4 карточки */}
          <div className="cast-row grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 mb-4 sm:mb-5">
            <PerformerCard performer={performers[0]} delay={0.25} visible={isVisible} />
            <PerformerCard performer={performers[1]} delay={0.32} visible={isVisible} />
            <PerformerCard performer={performers[2]} delay={0.39} visible={isVisible} />
            <PerformerCard performer={performers[3]} delay={0.46} visible={isVisible} />
          </div>
          {/* Ряд 2: 4 карточки — той же ширины что и в ряду 1 */}
          <div className="cast-row grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
            <PerformerCard performer={performers[4]} delay={0.53} visible={isVisible} />
            <PerformerCard performer={performers[5]} delay={0.6} visible={isVisible} />
            <PerformerCard performer={performers[6]} delay={0.67} visible={isVisible} />
            <PerformerCard performer={performers[7]} delay={0.74} visible={isVisible} />
          </div>
        </div>

        {/* ═══ CTA: Подробнее о составе (hidden on /cast page via hideCta) ═══ */}
        {!hideCta && (
        <div
          className="mt-12 md:mt-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s',
          }}
        >
          {/* Decorative separator */}
          <div className="flex items-center gap-3 mb-6">
            <div
              style={{
                width: '30px',
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))',
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
                width: '30px',
                height: '1px',
                background:
                  'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)',
              }}
            />
          </div>

          <a href="/cast" className="cast-cta" aria-label="Перейти на страницу состава артистов">
            <span>Подробнее о составе</span>
            <svg
              width="16"
              height="16"
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
        </div>
        )}
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* ── Card inner ── */
        .cast-card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 6px;
          border: 1px solid rgba(201,169,110,0.25);
          box-shadow: 0 0 20px rgba(123,26,43,0.2), 0 4px 20px rgba(0,0,0,0.5);
          overflow: hidden;
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
        }
        .cast-card:hover .cast-card-inner {
          border-color: rgba(201,169,110,0.7);
          box-shadow: 0 0 32px rgba(201,169,110,0.28), 0 8px 30px rgba(0,0,0,0.5);
        }
        .cast-card:hover .cast-card-glow {
          opacity: 1 !important;
        }
        .cast-card:hover img {
          filter: saturate(1) contrast(1.1) brightness(0.95) !important;
          transform: scale(1.04);
        }

        /* ── Producer card — выделение ── */
        .cast-card--producer .cast-card-inner {
          border: 1.5px solid rgba(232,213,163,0.5);
          box-shadow: 0 0 25px rgba(232,213,163,0.15), 0 0 50px rgba(123,26,43,0.25), 0 6px 25px rgba(0,0,0,0.6);
        }
        .cast-card--producer:hover .cast-card-inner {
          border-color: rgba(232,213,163,0.85);
          box-shadow: 0 0 40px rgba(232,213,163,0.3), 0 0 60px rgba(123,26,43,0.3), 0 10px 35px rgba(0,0,0,0.6);
        }

        /* ── CTA button ── */
        .cast-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          font-family: var(--font-inter);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
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
        .cast-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(201,169,110,0.92), rgba(232,213,163,1));
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .cast-cta:hover {
          color: #06020A;
          border-color: #C9A96E;
          letter-spacing: 0.26em;
          box-shadow: 0 0 30px rgba(201,169,110,0.28), 0 4px 16px rgba(0,0,0,0.4);
        }
        .cast-cta:hover::before {
          transform: translateX(0);
        }
        .cast-cta > span,
        .cast-cta > svg {
          position: relative;
          z-index: 1;
        }
        .cast-cta svg {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cast-cta:hover svg {
          transform: translateX(5px);
        }

        /* ═══ 3D Flip Card ═══ */
        .cast-flip-card {
          perspective: 1200px;
          cursor: pointer;
        }
        .cast-flip-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cast-flip-card:hover .cast-flip-inner,
        .cast-flip-card.is-flipped .cast-flip-inner {
          transform: rotateY(180deg);
        }
        .cast-flip-front,
        .cast-flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        /* Back is non-interactive until flipped (so front receives taps on mobile) */
        .cast-flip-back {
          pointer-events: none;
        }
        .cast-flip-card:hover .cast-flip-back,
        .cast-flip-card.is-flipped .cast-flip-back {
          pointer-events: auto;
        }
        /* Front is non-interactive when flipped (so back link receives the click) */
        .cast-flip-card:hover .cast-flip-front,
        .cast-flip-card.is-flipped .cast-flip-front {
          pointer-events: none;
        }
        .cast-flip-back {
          transform: rotateY(180deg);
          border-radius: 6px;
          border: 1px solid rgba(201,169,110,0.25);
          box-shadow: 0 0 20px rgba(123,26,43,0.2), 0 4px 20px rgba(0,0,0,0.5);
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .cast-card--producer .cast-flip-back {
          border: 1.5px solid rgba(232,213,163,0.5);
          box-shadow: 0 0 25px rgba(232,213,163,0.15), 0 0 50px rgba(123,26,43,0.25), 0 6px 25px rgba(0,0,0,0.6);
        }
        .cast-flip-card:hover .cast-flip-back {
          border-color: rgba(201,169,110,0.7);
          box-shadow: 0 0 32px rgba(201,169,110,0.28), 0 8px 30px rgba(0,0,0,0.5);
        }
        .cast-card--producer:hover .cast-flip-back {
          border-color: rgba(232,213,163,0.85);
          box-shadow: 0 0 40px rgba(232,213,163,0.3), 0 0 60px rgba(123,26,43,0.3);
        }
        .cast-flip-back:hover .cast-flip-back-arrow-circle {
          transform: translateY(4px);
          border-color: rgba(201,169,110,0.8) !important;
          background: rgba(201,169,110,0.1);
          color: #E8D5A3 !important;
        }
      `}</style>
    </section>
  )
}
