'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PerformerCard {
  id: number
  name: string
  role: string
  image: string
  rotation: number
  // Position configs for different breakpoints
  posLg: { left?: string; right?: string; top: string }
  posXl: { left?: string; right?: string; top: string }
  enterFrom: { x: number; y: number; rot: number }
}

const performers: PerformerCard[] = [
  {
    id: 1,
    name: 'ДИАНА РУБИ',
    role: 'Примадонна',
    image: '/images/performer1.png',
    rotation: -5,
    posLg: { left: '1%', top: '8%' },
    posXl: { left: '4%', top: '8%' },
    enterFrom: { x: -200, y: -80, rot: -15 },
  },
  {
    id: 2,
    name: 'ВИКТОРИЯ НОЙР',
    role: 'Танцовщица',
    image: '/images/performer2.png',
    rotation: -2,
    posLg: { left: '14%', top: '26%' },
    posXl: { left: '20%', top: '24%' },
    enterFrom: { x: -180, y: 60, rot: -10 },
  },
  {
    id: 3,
    name: 'ЕВА СИЛЬВА',
    role: 'Иллюзионистка',
    image: '/images/performer3.png',
    rotation: 2,
    posLg: { right: '14%', top: '30%' },
    posXl: { right: '20%', top: '28%' },
    enterFrom: { x: 180, y: 60, rot: 10 },
  },
  {
    id: 4,
    name: 'МАРГО ФЛЁР',
    role: 'Шоугёл',
    image: '/images/performer4.png',
    rotation: 5,
    posLg: { right: '1%', top: '10%' },
    posXl: { right: '4%', top: '10%' },
    enterFrom: { x: 200, y: -80, rot: 15 },
  },
]

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

interface HeroProps {
  animate: boolean
  onBookingClick?: () => void
}

export default function Hero({ animate, onBookingClick }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const stageBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Stage background fades in first — cinematic reveal
    tl.fromTo(
      stageBgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      0
    )

    // Title — dramatic entrance from below with slight scale
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out' },
      0.3
    )

    // Gold line expands from center
    tl.fromTo(
      lineRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
      0.8
    )

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.0
    )

    // CINEMATIC VIDEO CARDS — Each card flies in from its own direction
    // Like cards being thrown onto a table — POLAROID STYLE
    const cards = cardsRef.current?.querySelectorAll('.performer-card')
    if (cards) {
      cards.forEach((card, i) => {
        const from = performers[i].enterFrom
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: from.x,
            y: from.y,
            scale: 0.5,
            rotation: from.rot,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          1.2 + i * 0.2
        )
      })
    }

    // CTA group
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      2.2
    )

    return () => {
      tl.kill()
    }
  }, [animate])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* === BACKGROUND LAYERS === */}

      {/* Layer 1: Deep burgundy base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #1A0812 30%, #2D0F1A 60%, #1A0812 85%, #06020A 100%)',
        }}
      />

      {/* Layer 2: Stage background image — cinematic theater */}
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

      {/* Layer 3: Rich burgundy radial glow from center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(90, 15, 26, 0.35) 0%, rgba(90, 15, 26, 0.1) 40%, transparent 70%)',
          zIndex: 2,
        }}
      />

      {/* Layer 4: Spotlight effects — 2 beams from above */}
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

      {/* Layer 5: Vignette — dark edges */}
      <div className="vignette" />

      {/* Layer 6: Floating gold particles */}
      <FloatingParticles />

      {/* === PERFORMER CARDS — Desktop lg+ === */}
      <div
        ref={cardsRef}
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{ zIndex: 4 }}
      >
        {performers.map((p) => (
          <div
            key={p.id}
            className={`performer-card performer-pos-${p.id} absolute pointer-events-auto cursor-pointer group`}
          >
            <div
              className="performer-card-inner rounded-lg overflow-hidden transition-all duration-700 group-hover:scale-[1.08] group-hover:shadow-[0_0_50px_rgba(123,26,43,0.6),0_8px_40px_rgba(0,0,0,0.8)]"
              style={{
                border: '1px solid rgba(123, 26, 43, 0.6)',
                transform: `rotate(${p.rotation}deg)`,
                boxShadow: '0 0 25px rgba(123,26,43,0.4), 0 8px 30px rgba(0,0,0,0.6)',
              }}
            >
              {/* Cinematic video frame */}
              <div className="relative" style={{ aspectRatio: '9/16' }}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-90"
                  style={{
                    filter: 'saturate(0.85) contrast(1.15) brightness(0.8)',
                  }}
                />

                {/* Cinematic top letterbox bar */}
                <div
                  className="absolute inset-x-0 top-0"
                  style={{
                    height: '8%',
                    background: 'linear-gradient(to bottom, rgba(6,2,10,0.5), transparent)',
                  }}
                />

                {/* Cinematic bottom gradient with performer info */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(180deg,
                        rgba(6,2,10,0.3) 0%,
                        transparent 25%,
                        transparent 55%,
                        rgba(90,15,26,0.5) 80%,
                        rgba(6,2,10,0.95) 100%
                      )
                    `,
                  }}
                />

                {/* Subtle film grain */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Gold border glow on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(201,169,110,0.15)',
                  }}
                />

                {/* Performer name and role */}
                <div className="absolute inset-x-0 bottom-0 pb-3 px-3 text-center">
                  <p
                    className="text-[8px] tracking-[0.3em] uppercase"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: '#C9A96E',
                      fontWeight: 400,
                    }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="text-[6px] tracking-[0.2em] uppercase mt-0.5"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: '#F5E6D3',
                      opacity: 0.4,
                      fontWeight: 300,
                    }}
                  >
                    {p.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === MOBILE HERO BACKGROUND === */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ zIndex: 1 }}
      >
        <div
          className="hero-mobile-bg-pulse absolute inset-0"
          style={{
            opacity: 0.2,
            backgroundImage: 'url(/images/performer1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            filter: 'brightness(0.6) saturate(0.7)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 15%, rgba(6,2,10,0.9) 60%)',
          }}
        />
      </div>

      {/* === CENTER CONTENT === */}
      <div
        className="relative flex flex-col items-center gap-5 px-4"
        style={{ zIndex: 6 }}
      >
        {/* Small decorative element above title */}
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
            style={{
              width: '7px',
              height: '7px',
              border: '1px solid #C9A96E',
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ width: '35px', height: '1px', background: '#C9A96E' }} />
        </div>

        {/* Main Title — big and dramatic */}
        <h1
          ref={titleRef}
          className="text-center leading-[0.85] opacity-0"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(52px, 10vw, 120px)',
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
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#C9A96E',
              fontWeight: 400,
              fontSize: 'clamp(12px, 2vw, 20px)',
            }}
          >
            Бурлеск-Кабаре
          </p>
          <p
            className="tracking-[0.35em] uppercase mt-1"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#F5E6D3',
              opacity: 0.3,
              fontWeight: 300,
              fontSize: 'clamp(8px, 1vw, 11px)',
            }}
          >
            Москва
          </p>
        </div>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center gap-3 mt-6 opacity-0"
        >
          <button
            className="cta-button px-12 py-4 rounded-sm transition-all duration-400 cursor-pointer"
            style={{
              background: 'rgba(90, 15, 26, 0.85)',
              border: '1px solid rgba(201, 169, 110, 0.5)',
              color: '#C9A96E',
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.25em',
              backdropFilter: 'blur(6px)',
            }}
            onClick={onBookingClick}
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
            БРОНИРОВАТЬ СТОЛ
          </button>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#C9A96E',
              fontSize: '9px',
              letterSpacing: '0.15em',
              fontWeight: 300,
              opacity: 0.5,
            }}
          >
            или позвоните +7 (495) 123-45-67
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 6, opacity: animate ? 1 : 0, transition: 'opacity 1s ease 2.5s' }}
      >
        <p
          className="text-[7px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: 'var(--font-inter)',
            color: '#C9A96E',
            opacity: 0.35,
            fontWeight: 300,
          }}
        >
          Scroll
        </p>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)',
            animation: 'scrollPulse 2.5s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
