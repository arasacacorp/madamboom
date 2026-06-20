'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (reduced count for section) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 50) * 3 + 1,
    left: seededRandom(i * 13 + 60) * 100,
    top: seededRandom(i * 17 + 70) * 100,
    opacity: seededRandom(i * 19 + 80) * 0.15 + 0.03,
    duration: seededRandom(i * 23 + 90) * 18 + 14,
    delay: seededRandom(i * 29 + 100) * 12,
    driftX: seededRandom(i * 31 + 110) * 60 - 30,
    driftY: -(seededRandom(i * 37 + 120) * 100 + 20),
    driftX2: seededRandom(i * 41 + 130) * 50 - 25,
    driftY2: -(seededRandom(i * 43 + 140) * 120 + 30),
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

/* ─── Performer data with fly-in direction ─── */
const performers = [
  { name: 'Ксения Лапшина', image: '/images/performer-ksenia.jpg', objectPos: 'center top', flyDir: 'left' as const, role: 'Основатель и продюсер' },
  { name: 'Олеся Волык', image: '/images/performer-olesya.jpg', objectPos: 'center top', flyDir: 'left' as const, role: 'Худ. руководитель, конферансье' },
  { name: 'Сапфира Тайгерс', image: '/images/performer-saphaya.jpg', objectPos: '80% 5%', flyDir: 'bottom' as const, role: 'Прима бурлеск-кабаре' },
  { name: 'Варлок', type: 'duo' as const, flyDir: 'bottom' as const },
  { name: 'Марлен', image: '/images/performer-marlene.jpg', objectPos: 'center top', flyDir: 'left' as const, role: 'Джазовый вокал' },
  { name: 'Фрау Анаид', image: '/images/performer-frau-anaid.jpg', objectPos: 'center top', flyDir: 'right' as const, role: 'Классический бурлеск' },
  { name: 'Кристал Дейзи', image: '/images/performer-crystal.jpg', objectPos: 'center top', flyDir: 'right' as const, role: 'Девушка в золотом бокале' },
]

/* ─── Get initial transform based on fly direction ─── */
function getFlyTransform(dir: 'left' | 'bottom' | 'right'): string {
  switch (dir) {
    case 'left': return 'translateX(-50px) translateY(20px)'
    case 'right': return 'translateX(50px) translateY(20px)'
    case 'bottom': return 'translateY(50px)'
  }
}

/* ─── Single Performer Card ─── */
function PerformerCard({
  name,
  image,
  objectPos,
  delay,
  visible,
  flyDir,
  role,
}: {
  name: string
  image: string
  objectPos?: string
  delay: number
  visible: boolean
  flyDir: 'left' | 'bottom' | 'right'
  role?: string
}) {
  return (
    <div
      className="cast-card flex-shrink-0"
      style={{
        width: 'clamp(110px, 13vw, 180px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateX(0)' : getFlyTransform(flyDir),
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="show-card relative rounded-md overflow-hidden cursor-pointer"
        style={{
          aspectRatio: '3/4',
          border: '1px solid rgba(201, 169, 110, 0.2)',
          boxShadow: '0 0 20px rgba(123,26,43,0.2), 0 4px 20px rgba(0,0,0,0.5)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          style={{
            filter: 'saturate(0.85) contrast(1.08) brightness(0.8)',
            objectPosition: objectPos || 'center top',
            transition: 'filter 0.5s ease, transform 0.5s ease',
          }}
          loading="lazy"
        />
        {/* Gradient overlay at bottom for name readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,2,10,0.85) 100%)' }}
        />
        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)' }}
        />
        {/* Side gold accent lines */}
        <div
          className="absolute top-0 left-0 w-px"
          style={{ height: '30%', background: 'linear-gradient(180deg, rgba(201,169,110,0.25), transparent)' }}
        />
        <div
          className="absolute top-0 right-0 w-px"
          style={{ height: '30%', background: 'linear-gradient(180deg, rgba(201,169,110,0.25), transparent)' }}
        />
        {/* Name */}
        <div className="absolute inset-x-0 bottom-0 pb-3 px-3 text-center">
          <p
            className="tracking-[0.15em] uppercase leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 500,
              fontSize: 'clamp(11px, 1.2vw, 15px)',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {name}
          </p>
          {role && (
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'rgba(201,169,110,0.6)',
                fontSize: 'clamp(9px, 0.9vw, 12px)',
                letterSpacing: '0.1em',
                marginTop: '2px',
              }}
            >
              {role}
            </p>
          )}
        </div>
        {/* Hover glow overlay */}
        <div
          className="cast-card-glow absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ─── Varlok Duo Card ─── */
function VarlokDuoCard({ delay, visible, flyDir }: { delay: number; visible: boolean; flyDir: 'left' | 'bottom' | 'right' }) {
  return (
    <div
      className="cast-card varlok-duo flex-shrink-0"
      style={{
        width: 'clamp(220px, 26vw, 360px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateX(0) scale(1)' : `${getFlyTransform(flyDir)} scale(0.95)`,
        transition: `opacity 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="show-card relative flex rounded-md overflow-hidden cursor-pointer"
        style={{
          border: '1px solid rgba(201, 169, 110, 0.35)',
          boxShadow: '0 0 35px rgba(123,26,43,0.3), 0 0 12px rgba(201,169,110,0.06), 0 8px 30px rgba(0,0,0,0.6)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
        }}
      >
        {/* Left half — Анна */}
        <div className="relative w-1/2" style={{ aspectRatio: '3/4' }}>
          <img
            src="/images/varlok-anna.jpg"
            alt="Анна Варлок"
            className="w-full h-full object-cover object-top"
            style={{
              filter: 'saturate(0.85) contrast(1.08) brightness(0.8)',
              transition: 'filter 0.5s ease',
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,2,10,0.85) 100%)' }}
          />
          <div className="absolute inset-x-0 px-2 text-center" style={{ bottom: '28px' }}>
            <p
              className="tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                fontWeight: 500,
                fontSize: 'clamp(11px, 1.1vw, 14px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Анна
            </p>
          </div>
        </div>

        {/* Right half — Сергей */}
        <div className="relative w-1/2" style={{ aspectRatio: '3/4' }}>
          <img
            src="/images/varlok-sergey.jpg"
            alt="Сергей Варлок"
            className="w-full h-full object-cover object-top"
            style={{
              filter: 'saturate(0.85) contrast(1.08) brightness(0.8)',
              transition: 'filter 0.5s ease',
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,2,10,0.85) 100%)' }}
          />
          <div className="absolute inset-x-0 px-2 text-center" style={{ bottom: '28px' }}>
            <p
              className="tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                fontWeight: 500,
                fontSize: 'clamp(11px, 1.1vw, 14px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Сергей
            </p>
          </div>
        </div>

        {/* Center vertical gold divider line */}
        <div
          className="absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2"
          style={{
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.4) 20%, rgba(201,169,110,0.7) 50%, rgba(201,169,110,0.4) 80%, transparent)',
            zIndex: 2,
          }}
        />

        {/* Center rotating gold diamond divider */}
        <div
          className="varlok-diamond"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '12px',
            height: '12px',
            marginTop: '-6px',
            marginLeft: '-6px',
            border: '1.5px solid rgba(201,169,110,0.8)',
            transform: 'rotate(45deg)',
            background: 'rgba(6,2,10,0.95)',
            zIndex: 3,
            boxShadow: '0 0 10px rgba(201,169,110,0.2)',
            animation: 'diamondRotate 8s linear infinite',
          }}
        />

        {/* Top gold accent line — enhanced for duo card */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), rgba(232,213,163,0.6), rgba(201,169,110,0.5), transparent)',
            zIndex: 2,
          }}
        />

        {/* Bottom "ВАРЛОК" label */}
        <div
          className="absolute inset-x-0 bottom-0 text-center"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(6,2,10,0.9) 60%)',
            paddingTop: '16px',
            paddingBottom: '6px',
            zIndex: 3,
          }}
        >
          <p
            className="tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#E8D5A3',
              fontWeight: 600,
              fontSize: 'clamp(13px, 1.4vw, 18px)',
              textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(201,169,110,0.15)',
            }}
          >
            Варлок
          </p>
        </div>

        {/* Hover glow overlay */}
        <div
          className="cast-card-glow absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ─── Cast Section ─── */
export default function Cast() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cast"
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #0D0408 20%, #1A0812 50%, #0D0408 80%, #06020A 100%)',
        }}
      />
      {/* Burgundy radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(123, 26, 43, 0.15) 0%, rgba(123, 26, 43, 0.05) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      {/* Gold conic light accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 170deg at 30% 0%, rgba(201,169,110,0.04) 0deg, transparent 25deg) 0 0 / 100% 50% no-repeat,
            conic-gradient(from 190deg at 70% 0%, rgba(201,169,110,0.03) 0deg, transparent 20deg) 0 0 / 100% 50% no-repeat
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
          {/* Decorative top diamond + lines */}
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

          {/* Title — "Состав" in gold */}
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.08em',
              textShadow: '0 0 60px rgba(201,169,110,0.2), 0 4px 20px rgba(0,0,0,0.5)',
              lineHeight: 1.1,
            }}
          >
            Состав
          </h2>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          {/* Subtitle — "СОЗДАТЕЛИ И АРТИСТЫ" in Cormorant */}
          <p
            className="tracking-[0.35em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#E8D5A3',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.4vw, 15px)',
            }}
          >
            Создатели и артисты
          </p>
        </div>

        {/* ── Performer Cards — Desktop ── */}
        <div
          className="hidden lg:flex items-end justify-center gap-6 xl:gap-8 w-full max-w-6xl px-8"
        >
          {performers.map((p, i) => {
            const baseDelay = 0.2 + i * 0.14
            if (p.type === 'duo') {
              return <VarlokDuoCard key={p.name} delay={baseDelay} visible={isVisible} flyDir={p.flyDir} />
            }
            return (
              <PerformerCard
                key={p.name}
                name={p.name}
                image={p.image!}
                objectPos={p.objectPos}
                delay={baseDelay}
                visible={isVisible}
                flyDir={p.flyDir}
                role={p.role}
              />
            )
          })}
        </div>

        {/* ── Performer Cards — Mobile (horizontal scroll with snap) ── */}
        <div
          ref={scrollContainerRef}
          className="lg:hidden cast-scroll w-full"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50vw - 80px)',
            paddingRight: 'calc(50vw - 80px)',
            maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex items-end gap-4 px-2" style={{ width: 'max-content' }}>
            {performers.map((p, i) => {
              const baseDelay = 0.2 + i * 0.12
              if (p.type === 'duo') {
                return <VarlokDuoCard key={p.name} delay={baseDelay} visible={isVisible} flyDir={p.flyDir} />
              }
              return (
                <PerformerCard
                  key={p.name}
                  name={p.name}
                  image={p.image!}
                  objectPos={p.objectPos}
                  delay={baseDelay}
                  visible={isVisible}
                  flyDir={p.flyDir}
                  role={p.role}
                />
              )
            })}
          </div>
        </div>

        {/* Swipe hint — mobile only */}
        <div
          className="lg:hidden flex items-center justify-center gap-2 mt-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 1.2s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(201,169,110,0.4)' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.4)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            Свайп
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(201,169,110,0.4)' }}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>

        {/* "и другие звёзды" label in bordered pill with gold decorative lines */}
        <div
          className="flex items-center justify-center gap-3 mt-8 md:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s',
          }}
        >
          <div
            style={{
              width: 'clamp(25px, 5vw, 50px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35))',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#C9A96E',
              fontSize: 'clamp(12px, 1.5vw, 16px)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              background: 'rgba(201,169,110,0.06)',
              border: '1px solid rgba(201,169,110,0.2)',
              borderRadius: '3px',
              padding: '4px 16px',
            }}
          >
            и приглашённые артисты
          </div>
          <div
            style={{
              width: 'clamp(25px, 5vw, 50px)',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.35), transparent)',
            }}
          />
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Cast card hover effects — lift, glow increase, brightness boost */
        .cast-card .show-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 35px rgba(123,26,43,0.4), 0 0 15px rgba(201,169,110,0.08), 0 12px 40px rgba(0,0,0,0.6);
        }

        .cast-card .show-card:hover img {
          filter: saturate(0.95) contrast(1.05) brightness(0.85) !important;
        }

        .cast-card .show-card:hover .cast-card-glow {
          opacity: 1 !important;
        }

        /* Varlok special hover — enhanced shadow and gold border */
        .varlok-duo .show-card:hover {
          box-shadow: 0 0 45px rgba(123,26,43,0.4), 0 0 20px rgba(201,169,110,0.1), 0 12px 50px rgba(0,0,0,0.7);
        }

        /* Rotating diamond animation */
        @keyframes diamondRotate {
          0%   { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }

        /* Diamond pulse glow */
        @keyframes diamondPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(201,169,110,0.2); }
          50% { box-shadow: 0 0 18px rgba(201,169,110,0.4); }
        }

        .varlok-diamond {
          animation: diamondRotate 8s linear infinite, diamondPulse 3s ease-in-out infinite;
        }

        /* Mobile scroll container */
        .cast-scroll::-webkit-scrollbar {
          display: none;
        }
        .cast-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .cast-scroll .cast-card {
          scroll-snap-align: center;
        }

        /* Mobile responsive card sizing */
        @media (max-width: 1023px) {
          .cast-scroll .cast-card:not(.varlok-duo) {
            width: clamp(140px, 42vw, 180px) !important;
          }
          .cast-scroll .varlok-duo {
            width: clamp(280px, 84vw, 360px) !important;
          }
          .cast-scroll .cast-card:not(.varlok-duo) > div {
            aspect-ratio: 3/4 !important;
          }
          .cast-scroll .varlok-duo .show-card > div:first-child,
          .cast-scroll .varlok-duo .show-card > div:nth-child(2) {
            aspect-ratio: 9/19 !important;
          }
        }

        @media (max-width: 359px) {
          .cast-scroll .cast-card:not(.varlok-duo) {
            width: clamp(120px, 50vw, 150px) !important;
          }
          .cast-scroll .varlok-duo {
            width: clamp(240px, 95vw, 300px) !important;
          }
        }

        /* Subtle card border glow on hover */
        .cast-card .show-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .cast-card .show-card:hover::after {
          border-color: rgba(201,169,110,0.3);
        }
      `}</style>
    </section>
  )
}
