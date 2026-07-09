'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Ticket, ChevronDown } from 'lucide-react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (deterministic to avoid hydration mismatch) ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 7) * 4 + 1,
    left: seededRandom(i * 13 + 1) * 100,
    top: seededRandom(i * 17 + 2) * 100,
    opacity: seededRandom(i * 19 + 3) * 0.2 + 0.03,
    duration: seededRandom(i * 23 + 4) * 20 + 15,
    delay: seededRandom(i * 29 + 5) * 15,
    driftX: seededRandom(i * 31 + 6) * 100 - 50,
    driftY: -(seededRandom(i * 37 + 7) * 140 + 30),
    driftX2: seededRandom(i * 41 + 8) * 80 - 40,
    driftY2: -(seededRandom(i * 43 + 9) * 180 + 50),
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

/* ─── Hero Section ─── */
interface HeroProps {
  animate: boolean
}

export default function Hero({ animate }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const stageBgRef = useRef<HTMLDivElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null) // unused (tagline removed) — kept to avoid touching later refs
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Stage background reveal
    tl.fromTo(
      stageBgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      0
    )

    // Ornament diamond
    tl.fromTo(
      ornamentRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.6, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      0.4
    )

    // Title — dramatic entrance from below
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out' },
      0.5
    )

    // Gold shimmer line
    tl.fromTo(
      lineRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
      1.1
    )

    // Subtitle "Бурлеск-Кабаре"
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.3
    )

    // City line
    tl.fromTo(
      cityRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      1.5
    )

    // Tagline — removed (user request); timeline jumps from city to buttons.

    // CTA buttons — fade in last
    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      2.0
    )

    return () => {
      tl.kill()
    }
  }, [animate])

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ═══ BACKGROUND LAYERS ═══ */}

      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #1A0812 30%, #2D0F1A 60%, #1A0812 85%, #06020A 100%)',
        }}
      />

      {/* Stage background image — heavily darkened */}
      <div
        ref={stageBgRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `url(/images/stage-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.25) saturate(0.6)',
          zIndex: 1,
        }}
      />

      {/* Burgundy radial glow behind the title */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(123, 26, 43, 0.35) 0%, rgba(90, 15, 26, 0.15) 35%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* Gold conic light streaks from top */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 170deg at 35% -10%, rgba(201,169,110,0.07) 0deg, transparent 30deg) 0 0 / 100% 60% no-repeat,
            conic-gradient(from 190deg at 65% -10%, rgba(201,169,110,0.05) 0deg, transparent 25deg) 0 0 / 100% 60% no-repeat
          `,
          zIndex: 3,
        }}
      />

      {/* Vignette overlay */}
      <div className="vignette" />

      {/* Mobile — brighter stage background */}
      <div className="absolute inset-0 lg:hidden" style={{ zIndex: 1 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/stage-bg.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) saturate(0.7)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(6,2,10,0.55) 55%, rgba(6,2,10,0.8) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(90, 15, 26, 0.2) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating gold particles */}
      <FloatingParticles />

      {/* ═══ CENTER CONTENT ═══ */}
      <div
        className="relative flex flex-col items-center w-full px-4"
        style={{ zIndex: 6, gap: 'clamp(8px, 1.5vh, 18px)' }}
      >
        {/* Decorative diamond ornament + thin lines */}
        <div
          ref={ornamentRef}
          className="flex items-center gap-3 opacity-0"
        >
          <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
          <div
            className="spin-slow"
            style={{
              width: '8px',
              height: '8px',
              border: '1px solid #C9A96E',
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
        </div>

        {/* Main logo (SVG) — replaces the "МАДАМ БУМ" text title */}
        <h1
          ref={titleRef}
          className="text-center opacity-0"
          style={{ lineHeight: 1 }}
        >
          <img
            src="/logo-boom.svg"
            alt="Мадам Бум — бурлеск-кабаре"
            style={{
              height: 'clamp(70px, 13vh, 150px)',
              width: 'auto',
              display: 'block',
              margin: '0 auto',
              maxWidth: '92vw',
              filter: 'drop-shadow(0 0 90px rgba(201,169,110,0.2)) drop-shadow(0 0 40px rgba(123,26,43,0.15)) drop-shadow(0 8px 28px rgba(0,0,0,0.55))',
            }}
          />
        </h1>

        {/* Gold shimmer line underneath */}
        <div
          ref={lineRef}
          className="gold-line-shimmer opacity-0"
          style={{ width: '100px', height: '1px' }}
        />

        {/* Subtitle — tagline (2 lines: "...магия сцены" / "превращает вечер в незабываемый праздник") */}
        <div ref={subtitleRef} className="opacity-0 text-center" style={{ maxWidth: '760px' }}>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#E8D5A3',
              fontWeight: 400,
              fontSize: 'clamp(15px, 2vw, 23px)',
              letterSpacing: '0.02em',
              lineHeight: 1.5,
            }}
          >
            Игривое и дерзкое бурлеск-шоу, где блеск, юмор и магия сцены
            <br />
            превращает вечер в незабываемый праздник
          </p>
        </div>

        {/* City line "Санкт-Петербург • Москва • Гастроли по России" */}
        <div ref={cityRef} className="opacity-0 text-center">
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.55)',
              fontWeight: 300,
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              letterSpacing: '0.2em',
            }}
          >
            Санкт-Петербург&ensp;•&ensp;Москва&ensp;•&ensp;Гастроли по России
          </p>
        </div>

        {/* ═══ CTA Buttons ═══ */}
        <div
          ref={buttonsRef}
          className="flex items-center gap-4 mt-2 opacity-0"
        >
          {/* Primary — Билеты */}
          <a
            href="https://madamboomgrimerka.ticketscloud.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button flex items-center gap-2 px-7 py-3 rounded-sm transition-all duration-400 hover:scale-105"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
              color: '#06020A',
              fontSize: 'clamp(11px, 1.3vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(232,213,163,0.4)',
            }}
          >
            <Ticket size={16} strokeWidth={2.2} />
            Билеты
          </a>

          {/* Outlined — О шоу */}
          <a
            href="/about"
            className="flex items-center gap-2 px-7 py-3 rounded-sm transition-all duration-400 hover:scale-105"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'transparent',
              color: '#C9A96E',
              fontSize: 'clamp(11px, 1.3vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(201,169,110,0.4)',
            }}
          >
            <ChevronDown size={16} strokeWidth={1.8} />
            О шоу
          </a>
        </div>
      </div>

      {/* ═══ Bottom scroll hint ═══ */}
      {animate && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 6, opacity: 0, animation: 'fadeUp 1s ease 2.8s forwards' }}
        >
          <div
            style={{
              width: '1px',
              height: '24px',
              background: 'linear-gradient(180deg, rgba(201,169,110,0.4), transparent)',
              animation: 'scrollPulse 2.5s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </section>
  )
}
