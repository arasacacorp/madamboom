'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

/* ─── Data ─── */
const performers = [
  {
    id: 1,
    name: 'ДИАНА РУБИ',
    role: 'Примадонна',
    image: '/images/performer1.png',
    rotation: -5,
  },
  {
    id: 2,
    name: 'ВИКТОРИЯ НОЙР',
    role: 'Танцовщица',
    image: '/images/performer2.png',
    rotation: -2,
  },
  {
    id: 3,
    name: 'ЕВА СИЛЬВА',
    role: 'Иллюзионистка',
    image: '/images/performer3.png',
    rotation: 2,
  },
  {
    id: 4,
    name: 'МАРГО ФЛЁР',
    role: 'Шоугёл',
    image: '/images/performer4.png',
    rotation: 5,
  },
]

// Pre-generated once — never re-renders
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

/* ═══════════════════════════════════════════
   CURTAIN  — exact copy from the original
   ═══════════════════════════════════════════ */
function Curtain({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const cordRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [flashVisible, setFlashVisible] = useState(false)
  const stableComplete = useCallback(onComplete, [onComplete])

  useEffect(() => {
    document.body.classList.add('curtain-active')

    const tl = gsap.timeline({
      onComplete: () => {
        setFlashVisible(true)
        setTimeout(() => {
          document.body.classList.remove('curtain-active')
          stableComplete()
        }, 600)
      },
    })

    gsap.set(leftRef.current, { x: 0 })
    gsap.set(rightRef.current, { x: 0 })
    gsap.set(cordRef.current, { opacity: 1, y: 0, scaleY: 1 })

    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0)

    const goldLine = logoRef.current?.querySelector('.curtain-gold-line')
    if (goldLine) tl.fromTo(goldLine, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.6)

    const subtitle = logoRef.current?.querySelector('.curtain-subtitle')
    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 0.6, y: 0, duration: 0.6, ease: 'power2.out' }, 0.9)

    tl.to({}, { duration: 1.2 })

    tl.to(cordRef.current, { opacity: 0, y: -80, scaleY: 0.3, rotation: 5, duration: 0.6, ease: 'power3.in' })

    if (containerRef.current) containerRef.current.classList.add('curtain-opening')

    tl.to(leftRef.current, { x: '-110%', duration: 2.5, ease: 'power4.inOut' }, '-=0.2')
    tl.to(rightRef.current, { x: '110%', duration: 2.5, ease: 'power4.inOut' }, '<')
    tl.to(logoRef.current, { opacity: 0, scale: 1.1, y: -20, duration: 1.0, ease: 'power2.in' }, '-=2.0')

    return () => { document.body.classList.remove('curtain-active'); tl.kill() }
  }, [stableComplete])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'all' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #0A0310 0%, #06020A 100%)', zIndex: 1 }} />

        {/* Left panel */}
        <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, #3D0A12 0px, #4D0D16 3px, #5A0F1A 6px, #6B1220 10px, #7B1A2B 14px, #6B1220 18px, #5A0F1A 22px, #4D0D16 26px, #520E18 30px, #5A0F1A 34px, #6B1220 38px, #5A0F1A 42px)' }} />
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(139,26,43,0.15) 10px, transparent 20px, rgba(201,169,110,0.04) 30px, transparent 42px)' }} />
          <div className="absolute inset-y-0 right-0" style={{ width: '60px', background: 'linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 40%, transparent)' }} />
          <div className="absolute inset-x-0 top-0" style={{ height: '120px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }} />
          <div className="absolute inset-y-0 right-0 curtain-gold-edge-left" style={{ width: '3px', background: 'linear-gradient(180deg, transparent 5%, #E8D5A3 20%, #C9A96E 50%, #E8D5A3 80%, transparent 95%)', opacity: 0, transition: 'opacity 0.5s ease' }} />
        </div>

        {/* Right panel */}
        <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, #5A0F1A 0px, #6B1220 4px, #5A0F1A 8px, #4D0D16 12px, #520E18 16px, #5A0F1A 20px, #6B1220 24px, #7B1A2B 28px, #6B1220 32px, #5A0F1A 36px, #4D0D16 40px, #5A0F1A 44px)' }} />
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(201,169,110,0.04) 12px, transparent 22px, rgba(139,26,43,0.15) 34px, transparent 42px)' }} />
          <div className="absolute inset-y-0 left-0" style={{ width: '60px', background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 40%, transparent)' }} />
          <div className="absolute inset-x-0 top-0" style={{ height: '120px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }} />
          <div className="absolute inset-y-0 left-0 curtain-gold-edge-right" style={{ width: '3px', background: 'linear-gradient(180deg, transparent 5%, #E8D5A3 20%, #C9A96E 50%, #E8D5A3 80%, transparent 95%)', opacity: 0, transition: 'opacity 0.5s ease' }} />
        </div>

        {/* Center logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
          <div ref={logoRef} className="flex flex-col items-center gap-5">
            <div className="mb-2" style={{ width: '10px', height: '10px', border: '1.5px solid rgba(201,169,110,0.6)', transform: 'rotate(45deg)' }} />
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-[0.18em] font-bold text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#C9A96E', textShadow: '0 0 50px rgba(201,169,110,0.4), 0 0 100px rgba(201,169,110,0.15), 0 2px 15px rgba(0,0,0,0.6)' }}>
              МАДАМ БУМ
            </h1>
            <div className="curtain-gold-line gold-line-shimmer" style={{ width: '90px', height: '1px', transformOrigin: 'center' }} />
            <p className="curtain-subtitle text-xs md:text-sm tracking-[0.45em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: '#C9A96E', opacity: 0, fontWeight: 300 }}>
              Бурлеск-Кабаре
            </p>
          </div>
        </div>

        {/* Gold cord */}
        <div ref={cordRef} className="curtain-cord" style={{ zIndex: 5 }}>
          <div className="curtain-tassel" />
        </div>
      </div>

      {flashVisible && (
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.5) 0%, rgba(201,169,110,0.1) 40%, transparent 70%)', zIndex: 9999, animation: 'flashFade 0.8s ease-out forwards' }} />
      )}
    </>
  )
}

/* ═══════════════════════════════════════════
   PERFORMER CARD
   ═══════════════════════════════════════════ */
function PerformerCard({ p, index }: { p: typeof performers[number]; index: number }) {
  return (
    <div
      className={`performer-card performer-pos-${p.id} absolute pointer-events-auto cursor-pointer group`}
      style={{
        opacity: 0,
        animation: `cardFlyIn 1.2s cubic-bezier(0.22,1,0.36,1) forwards`,
        animationDelay: `${1.4 + index * 0.2}s`,
      }}
    >
      <div
        className="performer-card-inner rounded-lg overflow-hidden transition-all duration-700 group-hover:scale-[1.08] group-hover:shadow-[0_0_50px_rgba(123,26,43,0.6),0_8px_40px_rgba(0,0,0,0.8)]"
        style={{
          border: '1px solid rgba(123,26,43,0.6)',
          transform: `rotate(${p.rotation}deg)`,
          boxShadow: '0 0 25px rgba(123,26,43,0.4), 0 8px 30px rgba(0,0,0,0.6)',
        }}
      >
        <div className="relative" style={{ aspectRatio: '9/16' }}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-90"
            style={{ filter: 'saturate(0.85) contrast(1.15) brightness(0.8)' }}
          />
          <div className="absolute inset-x-0 top-0" style={{ height: '8%', background: 'linear-gradient(to bottom, rgba(6,2,10,0.5), transparent)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,2,10,0.3) 0%, transparent 25%, transparent 55%, rgba(90,15,26,0.5) 80%, rgba(6,2,10,0.95) 100%)' }} />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 20px rgba(201,169,110,0.15)' }} />
          <div className="absolute inset-x-0 bottom-0 pb-3 px-3 text-center">
            <p className="text-[8px] tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: '#C9A96E', fontWeight: 400 }}>{p.name}</p>
            <p className="text-[6px] tracking-[0.2em] uppercase mt-0.5" style={{ fontFamily: 'var(--font-inter)', color: '#F5E6D3', opacity: 0.4, fontWeight: 300 }}>{p.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [curtainDone, setCurtainDone] = useState(false)

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#06020A' }}>
      {/* ── Curtain ── */}
      {!curtainDone && <Curtain onComplete={() => setCurtainDone(true)} />}

      {/* ── Hero (full first screen) ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity: curtainDone ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        {/* BG Layer 1 — deep burgundy gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #06020A 0%, #1A0812 30%, #2D0F1A 60%, #1A0812 85%, #06020A 100%)' }} />

        {/* BG Layer 2 — stage background image */}
        <div
          className="hero-bg-reveal absolute inset-0"
          style={{
            backgroundImage: 'url(/images/stage-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) saturate(0.7)',
            zIndex: 1,
          }}
        />

        {/* BG Layer 3 — burgundy radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(90,15,26,0.35) 0%, rgba(90,15,26,0.1) 40%, transparent 70%)', zIndex: 2 }} />

        {/* BG Layer 4 — spotlights */}
        <div className="absolute inset-0" style={{ background: 'conic-gradient(from 170deg at 35% -10%, rgba(201,169,110,0.06) 0deg, transparent 30deg) 0 0 / 100% 60% no-repeat, conic-gradient(from 190deg at 65% -10%, rgba(201,169,110,0.04) 0deg, transparent 25deg) 0 0 / 100% 60% no-repeat', zIndex: 3 }} />

        {/* BG Layer 5 — vignette */}
        <div className="vignette" />

        {/* BG Layer 6 — floating particles */}
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

        {/* ── Performer Cards (desktop lg+) ── */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{ zIndex: 4 }}>
          {performers.map((p, i) => (
            <PerformerCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* ── Mobile hero bg ── */}
        <div className="absolute inset-0 lg:hidden" style={{ zIndex: 1 }}>
          <div className="hero-mobile-bg-pulse absolute inset-0" style={{ opacity: 0.2, backgroundImage: 'url(/images/performer1.png)', backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'brightness(0.6) saturate(0.7)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 15%, rgba(6,2,10,0.9) 60%)' }} />
        </div>

        {/* ═══ CENTER CONTENT ═══ */}
        <div className="relative flex flex-col items-center gap-5 px-4" style={{ zIndex: 6 }}>
          {/* Decorative element */}
          <div className="flex items-center gap-3 fade-up" style={{ '--delay': '0s' } as React.CSSProperties}>
            <div style={{ width: '35px', height: '1px', background: '#C9A96E' }} />
            <div className="spin-slow" style={{ width: '7px', height: '7px', border: '1px solid #C9A96E', transform: 'rotate(45deg)' }} />
            <div style={{ width: '35px', height: '1px', background: '#C9A96E' }} />
          </div>

          {/* Title */}
          <h1
            className="text-center leading-[0.85] fade-up"
            style={{
              '--delay': '0.15s',
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(52px, 10vw, 120px)',
              fontWeight: 900,
              color: '#F5E6D3',
              letterSpacing: '0.06em',
              textShadow: '0 0 100px rgba(201,169,110,0.15), 0 6px 30px rgba(0,0,0,0.6)',
            } as React.CSSProperties}
          >
            МАДАМ БУМ
          </h1>

          {/* Gold shimmer line */}
          <div className="gold-line-shimmer fade-up" style={{ width: '90px', height: '1px', '--delay': '0.3s' } as React.CSSProperties} />

          {/* Subtitle */}
          <div className="text-center fade-up" style={{ '--delay': '0.45s' } as React.CSSProperties}>
            <p className="tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-cormorant)', color: '#C9A96E', fontWeight: 400, fontSize: 'clamp(12px, 2vw, 20px)' }}>
              Бурлеск-Кабаре
            </p>
            <p className="tracking-[0.35em] uppercase mt-1" style={{ fontFamily: 'var(--font-inter)', color: '#F5E6D3', opacity: 0.3, fontWeight: 300, fontSize: 'clamp(8px, 1vw, 11px)' }}>
              Москва
            </p>
          </div>

          {/* ── Coming Soon Block ── */}
          <div className="flex flex-col items-center gap-4 mt-4 fade-up" style={{ '--delay': '0.65s' } as React.CSSProperties}>
            {/* Date badge */}
            <div
              className="date-badge inline-flex items-center gap-3"
              style={{
                padding: '10px 24px',
                border: '1px solid rgba(201,169,110,0.3)',
                background: 'rgba(90,15,26,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
              <span style={{ fontFamily: 'var(--font-playfair)', color: '#C9A96E', fontWeight: 500, fontSize: 'clamp(15px, 2.2vw, 22px)', letterSpacing: '0.15em' }}>
                23 МАЯ
              </span>
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
            </div>

            <p style={{ fontFamily: 'var(--font-inter)', color: 'rgba(245,230,211,0.4)', fontWeight: 300, fontSize: 'clamp(9px, 1.2vw, 11px)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Сайт в разработке
            </p>
          </div>

          {/* CTA — Buy ticket */}
          <div className="flex flex-col items-center gap-3 mt-2 fade-up" style={{ '--delay': '0.85s' } as React.CSSProperties}>
            <a
              href="https://23may.ticketscloud.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-block px-12 py-4 rounded-sm"
              style={{
                background: 'rgba(90,15,26,0.85)',
                border: '1px solid rgba(201,169,110,0.5)',
                color: '#C9A96E',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                fontSize: '11px',
                letterSpacing: '0.25em',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.background = 'rgba(123,26,43,0.95)'
                t.style.borderColor = '#C9A96E'
                t.style.boxShadow = '0 0 30px rgba(201,169,110,0.3), inset 0 0 25px rgba(201,169,110,0.08)'
                t.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.background = 'rgba(90,15,26,0.85)'
                t.style.borderColor = 'rgba(201,169,110,0.5)'
                t.style.boxShadow = 'none'
                t.style.transform = 'translateY(0)'
              }}
            >
              КУПИТЬ БИЛЕТ
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.15em', fontWeight: 300, opacity: 0.5 }}>
              или позвоните +7 (495) 123-45-67
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
