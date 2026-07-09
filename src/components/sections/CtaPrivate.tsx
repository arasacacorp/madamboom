'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

/* ─── CTA Private — компактный блок про частные выступления ─── */
export default function CtaPrivate() {
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06020A 0%, #0D0408 20%, #1A0812 50%, #0D0408 80%, #06020A 100%)',
        }}
      />
      {/* Burgundy radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 50% at 50% 50%, rgba(123,26,43,0.12) 0%, rgba(123,26,43,0.03) 50%, transparent 75%)',
          zIndex: 1,
        }}
      />

      <div
        className="relative max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center"
        style={{
          zIndex: 6,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Decorative diamond + lines */}
        <div className="flex items-center gap-3 mb-6">
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

        {/* Icon */}
        <div
          className="flex items-center justify-center mb-5"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(201,169,110,0.08)',
            border: '1px solid rgba(201,169,110,0.3)',
            color: '#C9A96E',
          }}
        >
          <Sparkles size={22} strokeWidth={1.5} />
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(22px, 3vw, 34px)',
            fontWeight: 600,
            color: '#C9A96E',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 0 40px rgba(201,169,110,0.1)',
            marginBottom: '12px',
          }}
        >
          Закажите <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>«Мадам Бум»</span> на ваше мероприятие
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            color: 'rgba(245,230,211,0.7)',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
            textAlign: 'center',
            maxWidth: '560px',
            marginBottom: '28px',
          }}
        >
          Частные праздники, девичники, корпоративы, фестивали и светские вечера.
          Отдельные номера или полноценное шоу — адаптируем под вашу площадку и формат.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Primary — Заказать выступление */}
          <a
            href="mailto:info@madamboom.ru?subject=Заказ выступления Мадам Бум"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
              color: '#06020A',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(232,213,163,0.4)',
              boxShadow: '0 0 25px rgba(201,169,110,0.15)',
            }}
          >
            Заказать выступление
            <ArrowRight size={16} strokeWidth={2} />
          </a>

          {/* Secondary — Узнать подробнее */}
          <a
            href="/about"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'transparent',
              color: '#C9A96E',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(201,169,110,0.35)',
            }}
          >
            Узнать подробнее
          </a>
        </div>
      </div>
    </section>
  )
}
