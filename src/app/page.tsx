'use client'

import { useState } from 'react'
import Curtain from '@/components/sections/Curtain'

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <main
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Curtain Preloader */}
      {!ready && <Curtain onComplete={() => setReady(true)} />}

      {/* Coming Soon Content */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center"
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 1s ease 0.3s',
        }}
      >
        {/* Layer 1: Stage background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/stage-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.25) saturate(0.6)',
            zIndex: 0,
          }}
        />

        {/* Layer 2: Dark vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(90,15,26,0.25) 0%, rgba(6,2,10,0.85) 65%, #06020A 100%)',
            zIndex: 1,
          }}
        />

        {/* Layer 3: Subtle spotlights */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 170deg at 35% -10%, rgba(201,169,110,0.04) 0deg, transparent 30deg) 0 0 / 100% 60% no-repeat,
              conic-gradient(from 190deg at 65% -10%, rgba(201,169,110,0.03) 0deg, transparent 25deg) 0 0 / 100% 60% no-repeat
            `,
            zIndex: 2,
          }}
        />

        {/* Layer 4: Particles (pure CSS) */}
        <Particles />

        {/* Center Content */}
        <div className="relative flex flex-col items-center gap-6 px-6 text-center" style={{ zIndex: 10 }}>
          {/* Diamond ornament */}
          <div
            className="fade-up"
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <div
              className="flex items-center gap-3"
            >
              <div style={{ width: '40px', height: '1px', background: '#C9A96E' }} />
              <div
                className="spin-slow"
                style={{
                  width: '8px',
                  height: '8px',
                  border: '1px solid rgba(201,169,110,0.7)',
                  transform: 'rotate(45deg)',
                }}
              />
              <div style={{ width: '40px', height: '1px', background: '#C9A96E' }} />
            </div>
          </div>

          {/* Title */}
          <h1
            className="fade-up"
            style={{
              '--delay': '0.15s',
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(48px, 10vw, 110px)',
              fontWeight: 900,
              color: '#F5E6D3',
              letterSpacing: '0.06em',
              lineHeight: 0.9,
              textShadow: '0 0 80px rgba(201,169,110,0.12), 0 6px 30px rgba(0,0,0,0.5)',
            } as React.CSSProperties}
          >
            МАДАМ БУМ
          </h1>

          {/* Gold shimmer line */}
          <div
            className="fade-up"
            style={{ '--delay': '0.3s' } as React.CSSProperties}
          >
            <div
              className="gold-line-shimmer"
              style={{ width: '80px', height: '1px' }}
            />
          </div>

          {/* Subtitle — Coming Soon */}
          <div
            className="fade-up flex flex-col items-center gap-2"
            style={{ '--delay': '0.45s' } as React.CSSProperties}
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: '#C9A96E',
                fontWeight: 400,
                fontSize: 'clamp(16px, 3vw, 28px)',
                letterSpacing: '0.35em',
              }}
            >
              Бурлеск-Кабаре
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245,230,211,0.4)',
                fontWeight: 300,
                fontSize: 'clamp(8px, 1.2vw, 11px)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Москва
            </p>
          </div>

          {/* Separator */}
          <div
            className="fade-up"
            style={{ '--delay': '0.6s' } as React.CSSProperties}
          >
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)',
              }}
            />
          </div>

          {/* Coming Soon message */}
          <div
            className="fade-up flex flex-col items-center gap-4"
            style={{ '--delay': '0.75s' } as React.CSSProperties}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245,230,211,0.5)',
                fontWeight: 300,
                fontSize: 'clamp(11px, 1.5vw, 14px)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Сайт в разработке
            </p>

            {/* Date badge */}
            <div
              className="date-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 28px',
                border: '1px solid rgba(201,169,110,0.25)',
                background: 'rgba(90,15,26,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
              <span
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: '#C9A96E',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 2vw, 20px)',
                  letterSpacing: '0.15em',
                }}
              >
                23 МАЯ
              </span>
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245,230,211,0.35)',
                fontWeight: 300,
                fontSize: 'clamp(10px, 1.2vw, 12px)',
                letterSpacing: '0.15em',
              }}
            >
              Ближайшее мероприятие
            </p>
          </div>

          {/* CTA Button — link to tickets */}
          <div
            className="fade-up"
            style={{ '--delay': '0.95s' } as React.CSSProperties}
          >
            <a
              href="https://23may.ticketscloud.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-block px-10 py-4 rounded-sm"
              style={{
                background: 'rgba(90, 15, 26, 0.85)',
                border: '1px solid rgba(201, 169, 110, 0.5)',
                color: '#C9A96E',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                fontSize: '11px',
                letterSpacing: '0.25em',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(123, 26, 43, 0.95)'
                e.currentTarget.style.borderColor = '#C9A96E'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(201,169,110,0.3), inset 0 0 25px rgba(201,169,110,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(90, 15, 26, 0.85)'
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              КУПИТЬ БИЛЕТ
            </a>
          </div>

          {/* Phone */}
          <div
            className="fade-up"
            style={{ '--delay': '1.1s' } as React.CSSProperties}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.35)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                fontWeight: 300,
              }}
            >
              +7 (495) 123-45-67
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-8"
          style={{ zIndex: 10 }}
        >
          <div
            className="fade-up"
            style={{ '--delay': '1.3s' } as React.CSSProperties}
          >
            <div style={{ width: '60px', height: '1px', background: 'rgba(201,169,110,0.2)' }} />
          </div>
        </div>
      </div>
    </main>
  )
}

/* ─── Pure CSS Particles (zero JS runtime) ─── */
function Particles() {
  // Generate once at module level — never re-renders
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.15 + 0.03,
    duration: Math.random() * 22 + 16,
    delay: Math.random() * 18,
    driftX: Math.random() * 80 - 40,
    driftY: -(Math.random() * 120 + 40),
    driftX2: Math.random() * 60 - 30,
    driftY2: -(Math.random() * 160 + 60),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
      {dots.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={
            {
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
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
