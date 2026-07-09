'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Wine,
  Sparkles,
  Music,
  Theater,
  Eye,
  Users,
  Stars,
  Flower2,
  Gem,
  Heart,
  PartyPopper,
  Gift,
  Clapperboard,
  MapPin,
} from 'lucide-react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 500) * 3 + 1,
    left: seededRandom(i * 13 + 510) * 100,
    top: seededRandom(i * 17 + 520) * 100,
    opacity: seededRandom(i * 19 + 530) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 540) * 16 + 14,
    delay: seededRandom(i * 29 + 550) * 10,
    driftX: seededRandom(i * 31 + 560) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 570) * 80 + 20),
    driftX2: seededRandom(i * 41 + 580) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 590) * 100 + 30),
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

/* ─── Program element card (small, icon + label) ─── */
function ProgramElement({
  icon,
  label,
  delay,
  visible,
}: {
  icon: React.ReactNode
  label: string
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="program-element flex flex-col items-center text-center group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="program-element-icon flex items-center justify-center mb-3 transition-all duration-500"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(201,169,110,0.06)',
          border: '1px solid rgba(201,169,110,0.2)',
          color: '#C9A96E',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          color: 'rgba(245,230,211,0.7)',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Highlight card (larger, for бокал and Варлоки) ─── */
function HighlightCard({
  icon,
  title,
  text,
  accentLabel,
  delay,
  visible,
}: {
  icon: React.ReactNode
  title: string
  text: string
  accentLabel: string
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="highlight-card relative rounded-md overflow-hidden h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="highlight-card-inner relative h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(26,10,16,0.7) 0%, rgba(13,4,8,0.5) 100%)',
          border: '1px solid rgba(201,169,110,0.22)',
          padding: '28px 24px',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            top: '-1px',
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            zIndex: 2,
          }}
        />
        {/* Subtle radial glow on hover */}
        <div
          className="highlight-card-glow absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(201,169,110,0.08) 0%, transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Accent label (eyebrow) */}
        <div
          className="flex items-center gap-2 mb-4"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              width: '24px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.7), transparent)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(201,169,110,0.7)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {accentLabel}
          </span>
        </div>

        {/* Icon + title row */}
        <div
          className="flex items-center gap-4 mb-4"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.3)',
              color: '#E8D5A3',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#E8D5A3',
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h4>
        </div>

        {/* Text */}
        <p
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-cormorant)',
            color: 'rgba(245,230,211,0.72)',
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

/* ─── What Is Burlesque Section ─── */
export default function WhatIsBurlesque() {
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

  /* Program elements (7) */
  const programElements = [
    { icon: <Theater size={20} strokeWidth={1.5} />, label: 'Классический бурлеск' },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: 'Авторские постановки' },
    { icon: <Music size={20} strokeWidth={1.5} />, label: 'Живой вокал' },
    { icon: <Stars size={20} strokeWidth={1.5} />, label: 'Джазовые композиции' },
    { icon: <Eye size={20} strokeWidth={1.5} />, label: 'Ментализм и магия' },
    { icon: <Users size={20} strokeWidth={1.5} />, label: 'Интерактив со зрителями' },
    { icon: <Flower2 size={20} strokeWidth={1.5} />, label: 'Элементы кабаре' },
  ]

  return (
    <section
      ref={sectionRef}
      id="what-is-burlesque"
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#06020A', paddingTop: 'clamp(24px, 2.5vw, 32px)' }}
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
            'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123, 26, 43, 0.12) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
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
      <div className="relative max-w-6xl mx-auto px-4 md:px-8" style={{ zIndex: 6 }}>
        {/* ═══════════════════════════════════
            PART 1: Что такое бурлеск?
            ═══════════════════════════════════ */}

        {/* Title block — centered */}
        <div
          className="mb-10 md:mb-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Main heading */}
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
            Что такое{' '}
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>бурлеск?</span>
          </h2>

          {/* Subtitle with symmetrical gold lines — centered */}
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
              Искусство кабаре · Музыка · Театральность
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

        {/* ═══ Lead intro — centered text, no card/frame ═══ */}
        <div
          className="mb-12 md:mb-16 max-w-5xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
            transition:
              'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245,230,211,0.92)',
              fontSize: 'clamp(18px, 1.7vw, 24px)',
              fontWeight: 500,
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Бурлеск — это театральное искусство, в котором соединяются танец, музыка,
            юмор, актерская игра и яркие сценические образы. Современный бурлеск
            вдохновлен традициями европейских кабаре начала XX века, но сегодня это
            самостоятельный жанр, где главную роль играют артистизм, харизма, эстетика
            и мастерство исполнения.
          </p>
        </div>

        {/* ═══ Feature cards — 3 key ideas, full width grid ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {[
            {
              icon: <Gem size={22} strokeWidth={1.5} />,
              eyebrow: 'Искусство перевоплощения',
              title: 'Бурлеск — это не стриптиз',
              text:
                'В центре внимания не откровенность, а искусство перевоплощения, красивые костюмы, пластика, театральная подача и умение рассказать историю через сценический номер. Каждый выход артиста становится маленьким спектаклем, наполненным эмоциями, юмором и неожиданными образами.',
            },
            {
              icon: <Sparkles size={22} strokeWidth={1.5} />,
              eyebrow: 'Современное шоу',
              title: 'Атмосфера настоящего кабаре',
              text:
                'Бурлеск-кабаре «Мадам Бум» — это современное шоу, объединяющее бурлеск, живой джаз, вокал, конферанс и театральное действие. Мы создаем атмосферу настоящего кабаре, где зрители становятся частью происходящего, а каждый вечер превращается в яркое культурное событие.',
            },
            {
              icon: <Clapperboard size={22} strokeWidth={1.5} />,
              eyebrow: 'Синтез искусств',
              title: 'Классика и авторские постановки',
              text:
                'В репертуаре «Мадам Бум» представлены как классические номера в лучших традициях мирового бурлеска, так и современные авторские постановки. На одной сцене встречаются артисты бурлеска, джазовые музыканты, вокалисты и конферансье, создавая уникальное шоу.',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="burlesque-card relative rounded-md overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s`,
              }}
            >
              <div
                className="burlesque-card-inner relative h-full"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(26,10,16,0.7) 0%, rgba(13,4,8,0.5) 100%)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  padding: '26px 24px',
                  transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
                }}
              >
                {/* Top gold accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    top: '-1px',
                    background:
                      'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
                    zIndex: 2,
                  }}
                />
                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(201,169,110,0.08)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    color: '#C9A96E',
                  }}
                >
                  {card.icon}
                </div>
                {/* Eyebrow */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.7)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {card.eyebrow}
                </span>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#E8D5A3',
                    fontSize: 'clamp(18px, 1.7vw, 22px)',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    lineHeight: 1.25,
                    marginBottom: '14px',
                  }}
                >
                  {card.title}
                </h3>
                {/* Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'rgba(245,230,211,0.72)',
                    fontSize: 'clamp(14px, 1.15vw, 16px)',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    letterSpacing: '0.02em',
                  }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ "Когда прийти" — occasion cards, full width ═══ */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
          }}
        >
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              style={{
                width: 'clamp(30px, 5vw, 50px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
              }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.6)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
              }}
            >
              Идеальный выбор для повода
            </span>
            <div
              style={{
                width: 'clamp(30px, 5vw, 50px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
              }}
            />
          </div>

          {/* Occasion chips grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <Heart size={16} strokeWidth={1.6} />, label: 'Свидание' },
              { icon: <PartyPopper size={16} strokeWidth={1.6} />, label: 'Девичник' },
              { icon: <Gift size={16} strokeWidth={1.6} />, label: 'День рождения' },
              { icon: <Users size={16} strokeWidth={1.6} />, label: 'Корпоратив' },
              { icon: <MapPin size={16} strokeWidth={1.6} />, label: 'Москва · СПб' },
            ].map((chip, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 rounded-md"
                style={{
                  background: 'rgba(26,10,16,0.5)',
                  border: '1px solid rgba(201,169,110,0.18)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.65 + i * 0.08}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.65 + i * 0.08}s`,
                }}
              >
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(123,26,43,0.18)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    color: '#C9A96E',
                  }}
                >
                  {chip.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(245,230,211,0.8)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {chip.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Closing quote — full container width, richly framed ═══ */}
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s',
          }}
        >
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(123,26,43,0.22) 0%, rgba(26,10,16,0.72) 55%, rgba(13,4,8,0.55) 100%)',
              border: '1px solid rgba(201,169,110,0.38)',
              padding: '40px 36px md:52px 48px',
            }}
          >
            {/* Top gold accent line */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.75), transparent)',
              }}
            />
            {/* Bottom gold accent line */}
            <div
              className="absolute bottom-0 inset-x-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
              }}
            />
            {/* Left vertical gold accent bar */}
            <div
              className="absolute top-1/2 left-0 w-px"
              style={{
                height: '60%',
                transform: 'translateY(-50%)',
                background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.45), transparent)',
              }}
            />
            {/* Right vertical gold accent bar */}
            <div
              className="absolute top-1/2 right-0 w-px"
              style={{
                height: '60%',
                transform: 'translateY(-50%)',
                background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.45), transparent)',
              }}
            />

            <div className="flex flex-col items-center text-center">
              {/* Decorative diamond + lines */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  style={{
                    width: 'clamp(40px, 6vw, 80px)',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.55))',
                  }}
                />
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    border: '1px solid rgba(201,169,110,0.75)',
                    transform: 'rotate(45deg)',
                    background: 'rgba(6,2,10,0.9)',
                  }}
                />
                <div
                  style={{
                    width: 'clamp(40px, 6vw, 80px)',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(201,169,110,0.55), transparent)',
                  }}
                />
              </div>

              {/* Large decorative opening quote mark */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.6,
                  color: 'rgba(201,169,110,0.3)',
                  marginBottom: '8px',
                  fontWeight: 700,
                }}
              >
                “
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  color: '#E8D5A3',
                  fontSize: 'clamp(19px, 1.9vw, 27px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  letterSpacing: '0.02em',
                  maxWidth: '880px',
                  margin: 0,
                }}
              >
                Мадам Бум — это место, где бурлеск становится искусством, а каждый
                вечер превращается в незабываемое путешествие в мир красоты, живого
                джаза и театра.
              </p>

              {/* Small closing flourish */}
              <div className="flex items-center gap-3 mt-7">
                <div
                  style={{
                    width: 'clamp(30px, 4vw, 50px)',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.6)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}
                >
                  Мадам Бум
                </span>
                <div
                  style={{
                    width: 'clamp(30px, 4vw, 50px)',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            Gold Separator
            ═══════════════════════════════════ */}
        <div
          className="flex items-center gap-4 mb-14 md:mb-18 mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
            width: '100%',
            maxWidth: '700px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              border: '1px solid rgba(201,169,110,0.6)',
              transform: 'rotate(45deg)',
              background: 'rgba(6,2,10,0.9)',
            }}
          />
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)',
            }}
          />
        </div>

        {/* ═══════════════════════════════════
            PART 2: Шоу-программа «Мадам Бум»
            ═══════════════════════════════════ */}

        {/* Part 2 Title — centered */}
        <div
          className="mb-10 md:mb-12 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textShadow: '0 0 50px rgba(201,169,110,0.12), 0 4px 16px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
          >
            Шоу-программа{' '}
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>«Мадам Бум»</span>
          </h2>
        </div>

        {/* Конферанс description — centered, narrower */}
        <div
          className="max-w-3xl mx-auto mb-12 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.65s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.65s',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245,230,211,0.78)',
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}
          >
            Особое место в программе занимает искусство{' '}
            <span style={{ color: '#E8D5A3', fontStyle: 'italic' }}>конферанса</span> —
            тонкого и остроумного общения с публикой, которое превращает отдельные
            номера в единое театральное повествование. Благодаря ведущей вечер
            развивается как цельная история, наполненная юмором, импровизацией и живым
            взаимодействием со зрителями.
          </p>
        </div>

        {/* Program elements — 7 icon cards in grid */}
        <div
          className="mb-14 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.75s',
          }}
        >
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              style={{
                width: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))',
              }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.55)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.25em',
              }}
            >
              В программе представлены
            </span>
            <div
              style={{
                width: '30px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)',
              }}
            />
          </div>

          {/* Grid of 7 elements */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-5">
            {programElements.map((el, i) => (
              <ProgramElement
                key={i}
                icon={el.icon}
                label={el.label}
                delay={0.75 + i * 0.08}
                visible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Two highlight cards: Бокал + Варлоки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HighlightCard
            icon={<Wine size={22} strokeWidth={1.5} />}
            title="Девушка в бокале"
            accentLabel="Легендарный номер"
            text="Одним из главных украшений шоу является легендарный номер девушки в бокале с игристым — один из самых узнаваемых символов мирового бурлеска. В репертуаре «Мадам Бум» представлены сразу два номера в бокале с совершенно разной эстетикой и сценическими образами, что является редкостью даже для крупных международных бурлеск-проектов."
            delay={1.1}
            visible={isVisible}
          />
          <HighlightCard
            icon={<Eye size={22} strokeWidth={1.5} />}
            title="Анна и Сергей Варлоки"
            accentLabel="Ментализм и магия"
            text="Дополняют программу выступления менталистов Анны и Сергея Варлоки, создающих атмосферу настоящего сценического волшебства, где граница между реальностью и иллюзией становится почти незаметной."
            delay={1.2}
            visible={isVisible}
          />
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Burlesque cards hover (Part 1) — no translateY to avoid border being clipped by upper elements */
        .burlesque-card-inner:hover {
          box-shadow: 0 0 32px rgba(201,169,110,0.28), 0 8px 30px rgba(0,0,0,0.5);
          border: 1px solid rgba(201,169,110,0.7) !important;
          border-color: rgba(201,169,110,0.7) !important;
        }

        /* Program element hover */
        .program-element:hover .program-element-icon {
          background: rgba(201,169,110,0.15) !important;
          border-color: rgba(201,169,110,0.55) !important;
          transform: translateY(-3px);
          box-shadow: 0 0 18px rgba(201,169,110,0.2);
        }

        /* Highlight cards hover (Part 2) — no translateY, border stays visible on all sides */
        .highlight-card-inner:hover {
          box-shadow: 0 0 36px rgba(201,169,110,0.32), 0 10px 35px rgba(0,0,0,0.5);
          border: 1px solid rgba(201,169,110,0.7) !important;
          border-color: rgba(201,169,110,0.7) !important;
        }
        .highlight-card-inner:hover .highlight-card-glow {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
