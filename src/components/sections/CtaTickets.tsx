'use client'

import { useEffect, useRef, useState } from 'react'
import { Ticket } from 'lucide-react'

/* ─── CTA Tickets — компактный блок призыва к покупке билетов ─── */
export default function CtaTickets() {
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
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Subtle burgundy glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 60% at 50% 50%, rgba(123,26,43,0.1) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      <div
        className="relative flex flex-col items-center gap-5 px-4"
        style={{
          zIndex: 6,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Decorative diamond + lines */}
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 'clamp(30px, 5vw, 50px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
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
              width: 'clamp(30px, 5vw, 50px)',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
            }}
          />
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(20px, 2.5vw, 30px)',
            fontWeight: 600,
            color: '#C9A96E',
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 0 40px rgba(201,169,110,0.1)',
          }}
        >
          Не пропустите ближайшее шоу
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            color: 'rgba(245,230,211,0.6)',
            fontSize: 'clamp(14px, 1.3vw, 17px)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          Камерная атмосфера, живая музыка и бурлеск-кабаре нового поколения
        </p>

        {/* CTA button */}
        <a
          href="https://madamboomgrimerka.ticketscloud.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
          style={{
            fontFamily: 'var(--font-inter)',
            background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
            color: '#06020A',
            fontSize: 'clamp(12px, 1.2vw, 14px)',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid rgba(232,213,163,0.4)',
            boxShadow: '0 0 25px rgba(201,169,110,0.15)',
            marginTop: '4px',
          }}
        >
          <Ticket size={16} strokeWidth={2.2} />
          Купить билеты
        </a>
      </div>
    </section>
  )
}
