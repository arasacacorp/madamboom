'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ─── Floating Particles ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.2 + 0.03,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 15,
    driftX: Math.random() * 100 - 50,
    driftY: -(Math.random() * 140 + 30),
    driftX2: Math.random() * 80 - 40,
    driftY2: -(Math.random() * 180 + 50),
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

/* ─── Single performer card ─── */
function PerformerCard({ name, image, delay, wide, objectPos }: {
  name: string; image: string; delay: string; wide?: boolean; objectPos?: string
}) {
  return (
    <div
      className="flex-shrink-0 card-snap-item"
      style={{
        width: wide ? 'clamp(160px, 20vw, 260px)' : 'clamp(75px, 9vw, 120px)',
        opacity: 0,
        transform: 'translateY(30px)',
        animation: `fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay} forwards`,
      }}
    >
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          aspectRatio: wide ? '3/2' : '3/4',
          border: wide ? '1px solid rgba(201, 169, 110, 0.3)' : '1px solid rgba(123, 26, 43, 0.5)',
          boxShadow: wide
            ? '0 0 40px rgba(123,26,43,0.35), 0 0 15px rgba(201,169,110,0.08), 0 10px 40px rgba(0,0,0,0.6)'
            : '0 0 20px rgba(123,26,43,0.25), 0 6px 24px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          style={{ filter: 'saturate(0.85) contrast(1.08) brightness(0.8)', objectPosition: objectPos || 'center top' }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(6,2,10,0.9) 100%)' }}
        />
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: wide
            ? 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)'
          }}
        />
        <div className="absolute inset-x-0 bottom-0 pb-2 px-2 text-center">
          <p
            className="tracking-[0.2em] uppercase leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 500,
              fontSize: wide ? 'clamp(11px, 1.3vw, 15px)' : 'clamp(8px, 1vw, 11px)',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Varlok Duo Card ─── */
function VarlokDuoCard() {
  return (
    <div
      id="varlok-card"
      className="flex-shrink-0 card-snap-item varlok-duo"
      style={{
        width: 'clamp(180px, 24vw, 280px)',
        opacity: 0,
        transform: 'translateY(30px) scale(0.95)',
        animation: 'fadeSlideUp 1s cubic-bezier(0.22, 1, 0.36, 1) 2.2s forwards',
      }}
    >
      <div
        className="relative flex rounded-lg overflow-hidden"
        style={{
          border: '1px solid rgba(201, 169, 110, 0.3)',
          boxShadow: '0 0 40px rgba(123,26,43,0.35), 0 0 15px rgba(201,169,110,0.08), 0 10px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Left — Сергей */}
        <div className="relative w-1/2 varlok-half" style={{ aspectRatio: '3/4' }}>
          <img
            src="/images/varlok-sergey.jpg"
            alt="Сергей Варлок"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'saturate(0.85) contrast(1.08) brightness(0.8)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,2,10,0.85) 100%)' }}
          />
          <div className="absolute inset-x-0 px-2 text-center" style={{ bottom: '24px' }}>
            <p
              className="tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                fontWeight: 500,
                fontSize: 'clamp(9px, 1.1vw, 12px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Анна
            </p>
          </div>
        </div>

        {/* Right — Анна */}
        <div className="relative w-1/2 varlok-half" style={{ aspectRatio: '3/4' }}>
          <img
            src="/images/varlok-anna.jpg"
            alt="Анна Варлок"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'saturate(0.85) contrast(1.08) brightness(0.8)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,2,10,0.85) 100%)' }}
          />
          <div className="absolute inset-x-0 px-2 text-center" style={{ bottom: '24px' }}>
            <p
              className="tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                fontWeight: 500,
                fontSize: 'clamp(9px, 1.1vw, 12px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Сергей
            </p>
          </div>
        </div>

        {/* Gold center divider */}
        <div
          className="absolute top-[12%] bottom-[12%] left-1/2 -translate-x-1/2"
          style={{
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.4) 25%, rgba(201,169,110,0.6) 50%, rgba(201,169,110,0.4) 75%, transparent)',
            zIndex: 2,
          }}
        />
        {/* Diamond ornament center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '10px',
            height: '10px',
            marginTop: '-5px',
            marginLeft: '-5px',
            border: '1px solid rgba(201,169,110,0.7)',
            transform: 'rotate(45deg)',
            background: 'rgba(6,2,10,0.95)',
            zIndex: 3,
          }}
        />

        {/* Top gold accent */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)', zIndex: 2 }}
        />

        {/* Shared surname banner */}
        <div
          className="absolute inset-x-0 bottom-0 text-center"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(6,2,10,0.85) 70%)',
            paddingTop: '14px',
            paddingBottom: '6px',
            zIndex: 3,
          }}
        >
          <p
            className="tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 500,
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            Варлок
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Hero Section ─── */
interface HeroProps {
  animate: boolean
  onBookingClick?: () => void
}

export default function Hero({ animate, onBookingClick }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardsRowRef = useRef<HTMLDivElement>(null)
  const stageBgRef = useRef<HTMLDivElement>(null)
  const swipeHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      stageBgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      0
    )

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out' },
      0.3
    )

    tl.fromTo(
      lineRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
      0.8
    )

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.0
    )

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.6
    )

    tl.fromTo(
      cardsRowRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      1.9
    )

    // Fade out swipe hint after 4 seconds on mobile
    if (swipeHintRef.current) {
      gsap.fromTo(
        swipeHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 3.0 }
      )
      gsap.to(swipeHintRef.current, {
        opacity: 0,
        duration: 1,
        delay: 7,
      })
    }

    // On mobile: scroll to center the Varlok card after animations finish
    tl.eventCallback('onComplete', () => {
      if (window.innerWidth < 1024 && cardsRowRef.current) {
        const varlokEl = document.getElementById('varlok-card')
        if (varlokEl) {
          const container = cardsRowRef.current
          const scrollLeft = varlokEl.offsetLeft - container.offsetWidth / 2 + varlokEl.offsetWidth / 2
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
        }
      }
    })

    return () => {
      tl.kill()
    }
  }, [animate])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* === BACKGROUND LAYERS === */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #1A0812 30%, #2D0F1A 60%, #1A0812 85%, #06020A 100%)',
        }}
      />
      <div
        ref={stageBgRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: 'url(/images/stage-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(0.7)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(90, 15, 26, 0.35) 0%, rgba(90, 15, 26, 0.1) 40%, transparent 70%)',
          zIndex: 2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 170deg at 35% -10%, rgba(201,169,110,0.06) 0deg, transparent 30deg) 0 0 / 100% 60% no-repeat,
            conic-gradient(from 190deg at 65% -10%, rgba(201,169,110,0.04) 0deg, transparent 25deg) 0 0 / 100% 60% no-repeat
          `,
          zIndex: 3,
        }}
      />
      <div className="vignette" />
      <FloatingParticles />

      {/* === MOBILE — brighter stage background === */}
      <div className="absolute inset-0 lg:hidden" style={{ zIndex: 1 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/stage-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5) saturate(0.8)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(6,2,10,0.5) 60%, rgba(6,2,10,0.75) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(90, 15, 26, 0.25) 0%, transparent 70%)' }}
        />
      </div>

      {/* === CENTER CONTENT === */}
      <div
        className="relative flex flex-col items-center gap-4 px-4 w-full"
        style={{ zIndex: 6 }}
      >
        {/* Decorative element */}
        <div
          className="flex items-center gap-3"
          ref={(el) => {
            if (el && animate) {
              gsap.fromTo(el, { opacity: 0 }, { opacity: 0.5, duration: 1, delay: 0.5 })
            }
          }}
        >
          <div style={{ width: '35px', height: '1px', background: '#C9A96E' }} />
          <div
            style={{ width: '7px', height: '7px', border: '1px solid #C9A96E', transform: 'rotate(45deg)' }}
          />
          <div style={{ width: '35px', height: '1px', background: '#C9A96E' }} />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-center leading-[0.85] opacity-0"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: 900,
            color: '#F5E6D3',
            letterSpacing: '0.06em',
            textShadow: '0 0 100px rgba(201,169,110,0.15), 0 6px 30px rgba(0,0,0,0.6)',
          }}
        >
          МАДАМ БУМ
        </h1>

        {/* Gold shimmer line */}
        <div
          ref={lineRef}
          className="gold-line-shimmer opacity-0"
          style={{ width: '90px', height: '1px' }}
        />

        {/* Subtitle */}
        <div ref={subtitleRef} className="opacity-0 text-center">
          <p
            className="tracking-[0.5em] uppercase"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A96E', fontWeight: 400, fontSize: 'clamp(11px, 2vw, 20px)' }}
          >
            Бурлеск-Кабаре
          </p>
        </div>

        {/* ═══ SHOWS NAVIGATION ═══ */}
        <div ref={ctaRef} className="flex items-center justify-center gap-3 sm:gap-5 mt-4 opacity-0 flex-wrap px-2 max-w-full">
          {/* Left — Афиша СПб */}
          <a
            href="https://madamboomdouglas.ticketscloud.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="afisha-card flex items-center justify-center gap-2 rounded-sm transition-all duration-300"
              style={{
                width: 'clamp(100px, 18vw, 150px)',
                padding: '8px 6px',
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'
                e.currentTarget.style.background = 'rgba(201,169,110,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)'
                e.currentTarget.style.background = 'rgba(201,169,110,0.04)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#C9A96E', opacity: 0.6, flexShrink: 0 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div className="text-center">
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#C9A96E',
                    fontSize: 'clamp(6px, 1.6vw, 9px)',
                    letterSpacing: '0.15em',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    opacity: 0.7,
                  }}
                >
                  Афиша
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#F5E6D3',
                    fontSize: 'clamp(6px, 1.4vw, 8px)',
                    letterSpacing: '0.08em',
                    fontWeight: 300,
                    whiteSpace: 'nowrap',
                    opacity: 0.4,
                  }}
                >
                  Санкт-Петербург
                </p>
              </div>
            </div>
          </a>

          {/* Center — Ближайшее шоу */}
          <a
            href="https://23may.ticketscloud.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button group flex flex-col items-center gap-1 rounded-sm transition-all duration-300 cursor-pointer"
            style={{
              background: 'rgba(90, 15, 26, 0.85)',
              border: '1px solid rgba(201, 169, 110, 0.5)',
              padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 4vw, 36px)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(123, 26, 43, 0.95)'
              e.currentTarget.style.borderColor = '#C9A96E'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(201,169,110,0.3), inset 0 0 25px rgba(201,169,110,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(90, 15, 26, 0.85)'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: 'clamp(6px, 1.6vw, 9px)',
                letterSpacing: '0.15em',
                fontWeight: 400,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Ближайшее шоу
            </p>
            <p
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#F5E6D3',
                fontSize: 'clamp(12px, 2.5vw, 15px)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
                textShadow: '0 0 20px rgba(201,169,110,0.2)',
              }}
            >
              23 МАЯ
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: 'clamp(6px, 1.4vw, 9px)',
                letterSpacing: '0.12em',
                fontWeight: 300,
                whiteSpace: 'nowrap',
                opacity: 0.6,
              }}
            >
              Забронировать стол
            </p>
          </a>

          {/* Right — Афиша Москва */}
          <a
            href="https://madamboomshow.ticketscloud.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="afisha-card flex items-center justify-center gap-2 rounded-sm transition-all duration-300"
              style={{
                width: 'clamp(100px, 18vw, 150px)',
                padding: '8px 6px',
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'
                e.currentTarget.style.background = 'rgba(201,169,110,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)'
                e.currentTarget.style.background = 'rgba(201,169,110,0.04)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#C9A96E', opacity: 0.6, flexShrink: 0 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div className="text-center">
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#C9A96E',
                    fontSize: 'clamp(6px, 1.6vw, 9px)',
                    letterSpacing: '0.15em',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    opacity: 0.7,
                  }}
                >
                  Афиша
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#F5E6D3',
                    fontSize: 'clamp(6px, 1.4vw, 8px)',
                    letterSpacing: '0.08em',
                    fontWeight: 300,
                    whiteSpace: 'nowrap',
                    opacity: 0.4,
                  }}
                >
                  Москва
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* ═══ BOTTOM: ALL CARDS IN A ROW ═══ */}
        {/* Desktop: centered flex row | Mobile: horizontal swipe carousel */}
        <div
          ref={cardsRowRef}
          className="flex items-end justify-center gap-3 lg:gap-3 mt-4 lg:mt-6 pb-4 opacity-0
            lg:overflow-visible lg:justify-center
            cards-swipe"
          style={{ maxWidth: '100%' }}
        >
          {/* Mobile left spacer — centers the first card initially */}
          <div className="cards-spacer" aria-hidden="true" />

          <PerformerCard name="Олеся Волык" image="/images/performer-olesya.jpg" delay="2.0s" />
          <PerformerCard name="Сапфая Тайгресс" image="/images/performer-saphaya.jpg" delay="2.1s" objectPos="80% 5%" />
          <VarlokDuoCard />
          <PerformerCard name="Инна Айвори" image="/images/performer-inna.jpg" delay="2.1s" objectPos="65% top" />
          <PerformerCard name="Кристал Дейзи" image="/images/performer-crystal.jpg" delay="2.0s" />

          {/* Mobile right spacer */}
          <div className="cards-spacer" aria-hidden="true" />
        </div>

        {/* Mobile swipe hint */}
        <div ref={swipeHintRef} className="lg:hidden flex items-center justify-center gap-2 pb-2 opacity-0" style={{ zIndex: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(201,169,110,0.35)' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.35)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            Свайп
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(201,169,110,0.35)' }}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(var(--scale, 1)); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Mobile swipeable cards ── */
        .cards-swipe {
          /* Desktop: normal centered flex */
          /* Mobile: horizontal scroll */
        }

        @media (max-width: 1023px) {
          .cards-swipe {
            overflow-x: auto;
            overflow-y: hidden;
            justify-content: flex-start !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-left: 0;
            padding-right: 0;
            scroll-padding: 0 calc(50vw - 70px);
            mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
            -webkit-mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
          }

          .cards-swipe::-webkit-scrollbar {
            display: none;
          }
          .cards-swipe {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .card-snap-item {
            scroll-snap-align: center;
          }

          .cards-spacer {
            flex-shrink: 0;
            width: calc(50vw - 70px);
            min-width: calc(50vw - 70px);
          }

          /* ── Bigger performer cards on mobile (skip Varlok duo card) ── */
          .card-snap-item:not(.varlok-duo) > div {
            aspect-ratio: 3/4 !important;
          }

          /* ── Varlok duo: taller halves on mobile to match regular card height ── */
          .varlok-duo .varlok-half {
            aspect-ratio: 9/19 !important;
          }

          /* Bigger poster/afisha cards on mobile */
          .afisha-card {
            width: clamp(105px, 26vw, 155px) !important;
            padding: 10px 8px !important;
          }
          .afisha-card .afisha-title {
            font-size: clamp(7px, 2vw, 9px) !important;
          }
          .afisha-card .afisha-city {
            font-size: clamp(6px, 1.6vw, 8px) !important;
          }
        }

        @media (min-width: 360px) and (max-width: 1023px) {
          .card-snap-item {
            min-width: 130px;
          }
        }

        @media (max-width: 359px) {
          .card-snap-item {
            min-width: 110px;
          }
          .cards-spacer {
            width: calc(50vw - 60px) !important;
            min-width: calc(50vw - 60px) !important;
          }
        }

        /* ── Swipe hint pulse ── */
        @keyframes swipeHintSlide {
          0%, 100% { transform: translateX(0); opacity: 0.35; }
          25% { transform: translateX(4px); opacity: 0.5; }
          75% { transform: translateX(-4px); opacity: 0.5; }
        }
      `}</style>
    </section>
  )
}
