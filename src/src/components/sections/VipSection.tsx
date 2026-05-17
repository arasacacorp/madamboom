'use client'

import { useEffect, useRef, useState } from 'react'
import { Crown, Wine, UserCheck, Sparkles, Camera, DoorOpen } from 'lucide-react'

const features = [
  {
    icon: Crown,
    title: 'Место у сцены',
    text: 'Индивидуальный стол в первых рядах с идеальным обзором',
  },
  {
    icon: Wine,
    title: 'Приветственный напиток',
    text: 'Бокал шампанского от нашего сомелье',
  },
  {
    icon: UserCheck,
    title: 'Персональный хостес',
    text: 'Забота о вашем комфорте на протяжении всего вечера',
  },
  {
    icon: Sparkles,
    title: 'Эксклюзивный номер',
    text: 'Возможность заказать персональный номер от артиста',
  },
  {
    icon: Camera,
    title: 'Фотосессия',
    text: 'Профессиональная фотосессия с артистами после шоу',
  },
  {
    icon: DoorOpen,
    title: 'VIP-lobby',
    text: 'Закрытая зона ожидания с напитками до начала шоу',
  },
]

export default function VipSection({ onBookingClick }: { onBookingClick?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="vip"
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06020A 0%, #5A0F1A 15%, #3D0A12 50%, #0A0310 85%, #06020A 100%)',
      }}
    >
      {/* Decorative top gold line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(139, 26, 43, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#C9A96E',
              opacity: 0.4,
              fontWeight: 300,
            }}
          >
            Эксклюзив
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl tracking-[0.08em]"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#F5E6D3',
              fontWeight: 700,
            }}
          >
            VIP-ПРИВИЛЕГИИ
          </h2>
          <div
            className="mx-auto mt-5 gold-line-shimmer"
            style={{ width: '80px', height: '1px' }}
          />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-16">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className={`vip-feature group flex items-start gap-4 p-5 md:p-6 rounded-lg transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  background: 'rgba(90, 15, 26, 0.15)',
                  border: '1px solid rgba(201, 169, 110, 0.08)',
                  transitionDelay: visible ? `${i * 100 + 200}ms` : '0ms',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(201, 169, 110, 0.08)',
                    border: '1px solid rgba(201, 169, 110, 0.15)',
                  }}
                >
                  <Icon size={18} style={{ color: '#C9A96E' }} />
                </div>
                <div className="flex flex-col gap-1">
                  <p
                    className="text-sm font-medium"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      color: '#F5E6D3',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: '#F5E6D3',
                      opacity: 0.45,
                      fontWeight: 300,
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1200 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button
            className="px-12 py-4 rounded-sm text-[11px] tracking-[0.22em] uppercase transition-all duration-400 cursor-pointer"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(135deg, #C9A96E, #B8955A)',
              border: 'none',
              color: '#0A0310',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(201, 169, 110, 0.2)',
            }}
            onClick={onBookingClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E8D5A3, #C9A96E)'
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(201, 169, 110, 0.4)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #B8955A)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 169, 110, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            УЗНАТЬ О VIP-БРОНИРОВАНИИ
          </button>
        </div>
      </div>
    </section>
  )
}
