'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles (8 particles) ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 300) * 3 + 1,
    left: seededRandom(i * 13 + 310) * 100,
    top: seededRandom(i * 17 + 320) * 100,
    opacity: seededRandom(i * 19 + 330) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 340) * 16 + 14,
    delay: seededRandom(i * 29 + 350) * 10,
    driftX: seededRandom(i * 31 + 360) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 370) * 80 + 20),
    driftX2: seededRandom(i * 41 + 380) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 390) * 100 + 30),
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

/* ─── Burlesque Card ─── */
function BurlesqueCard({
  title,
  text,
  icon,
  accentColor,
  delay,
  visible,
}: {
  title: string
  text: string
  icon: React.ReactNode
  accentColor: string
  delay: number
  visible: boolean
}) {
  return (
    <div
      className="about-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div
        className="about-card-inner relative rounded-md"
        style={{
          background: 'rgba(26, 10, 16, 0.6)',
          border: '1px solid rgba(201,169,110,0.2)',
          padding: '24px',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
          overflow: 'hidden',
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
        {/* Left gold accent bar */}
        <div
          className="absolute top-0 left-0 w-px"
          style={{
            height: '40%',
            background: `linear-gradient(180deg, ${accentColor}, transparent)`,
          }}
        />
        {/* Icon */}
        <div
          className="mb-4"
          style={{
            color: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            background: `${accentColor.replace(/[\d.]+\)$/, '0.08)')}`,
            border: `1px solid ${accentColor.replace(/[\d.]+\)$/, '0.2)')}`,
          }}
        >
          {icon}
        </div>
        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            color: '#C9A96E',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            lineHeight: 1.3,
            marginBottom: '12px',
          }}
        >
          {title}
        </h3>
        {/* Text */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'rgba(245, 230, 211, 0.6)',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </p>
        {/* Subtle glow overlay on hover */}
        <div
          className="about-card-glow absolute inset-0 pointer-events-none"
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

/* ─── About Section ─── */
export default function About() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const bodyParagraphs = [
    'Проект объединил ярких представительниц российской бурлеск-сцены, артистов театра, вокалистов и мастеров сценической магии, чтобы вернуть бурлеску его главную природу — быть не только красивым и соблазнительным, но прежде всего живым, остроумным и праздничным жанром.',
    'Мы создаём шоу, где роскошь встречается с юмором, а винтажная эстетика сочетается с современным взглядом на сценическое искусство.',
    'Каждое выступление «Мадам Бум» — это полноценное театральное представление, наполненное музыкой, импровизацией, красотой, лёгким флиртом и живым взаимодействием со зрителем.',
    'Сегодня бурлеск-кабаре «Мадам Бум» представляет свои программы в Санкт-Петербурге и Москве, а также выступает на гастролях, фестивалях, корпоративных мероприятиях, частных праздниках, девичниках, тематических вечерах и светских событиях по всей России.',
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #06020A 0%, #0D0408 15%, #1A0812 45%, #0D0408 75%, #06020A 100%)',
        }}
      />
      {/* Burgundy radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123, 26, 43, 0.12) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
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
      <div className="relative w-full" style={{ zIndex: 6 }}>

        {/* ═══════════════════════════════════
            PART 1: О проекте — Бурлеск-кабаре «Мадам Бум»
            Editorial magazine-style layout
            ═══════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* ── Title block — left aligned ── */}
          <div
            className="mb-10 md:mb-14 lg:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Eyebrow: О проекте */}
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 'clamp(28px, 4vw, 44px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.7), transparent)',
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(201,169,110,0.85)',
                  fontSize: 'clamp(11px, 1.1vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.35em',
                }}
              >
                О проекте
              </span>
            </div>

            {/* Main heading */}
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                color: '#C9A96E',
                letterSpacing: '0.02em',
                lineHeight: 1.08,
                textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
                textAlign: 'left',
              }}
            >
              Бурлеск-кабаре
              <br />
              <span
                style={{
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#E8D5A3',
                }}
              >
                «Мадам Бум»
              </span>
            </h2>

            {/* Subtitle with gold line */}
            <div className="flex items-center gap-3 mt-6">
              <div
                style={{
                  width: 'clamp(40px, 5vw, 60px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: 'rgba(201,169,110,0.65)',
                  fontSize: 'clamp(12px, 1.2vw, 15px)',
                  fontWeight: 400,
                  letterSpacing: '0.25em',
                }}
              >
                Независимое кабаре · Санкт-Петербург · 2025
              </span>
            </div>
          </div>

          {/* ── Content grid: portrait + text ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-24">

            {/* ── Image column: producer portrait ── */}
            <div className="md:col-span-5">
              <div
                className="producer-frame relative mx-auto md:mx-0"
                style={{
                  maxWidth: '380px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
                }}
              >
                {/* Burgundy glow behind frame */}
                <div
                  className="producer-glow absolute pointer-events-none"
                  style={{
                    inset: '-24px',
                    background: 'radial-gradient(ellipse at center, rgba(123,26,43,0.28) 0%, rgba(123,26,43,0.08) 45%, transparent 72%)',
                    zIndex: 0,
                    transition: 'opacity 0.6s ease',
                  }}
                />
                {/* Outer frame */}
                <div
                  className="relative"
                  style={{
                    zIndex: 1,
                    padding: '10px',
                    background: 'rgba(13,4,8,0.6)',
                    border: '1px solid rgba(201,169,110,0.3)',
                  }}
                >
                  {/* Inner frame */}
                  <div
                    className="producer-inner relative overflow-hidden"
                    style={{
                      border: '1px solid rgba(201,169,110,0.18)',
                      transition: 'border-color 0.5s ease',
                    }}
                  >
                    {/* Corner brackets — top-left */}
                    <span className="producer-corner producer-corner-tl" />
                    {/* Top-right */}
                    <span className="producer-corner producer-corner-tr" />
                    {/* Bottom-left */}
                    <span className="producer-corner producer-corner-bl" />
                    {/* Bottom-right */}
                    <span className="producer-corner producer-corner-br" />

                    {/* Producer portrait — placeholder, to be replaced with dedicated photo */}
                    <img
                      src="/images/performer-ksenia.jpg"
                      alt="Ксения Лапшина — продюсер и основатель бурлеск-кабаре «Мадам Бум»"
                      style={{
                        width: '100%',
                        aspectRatio: '3 / 4',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'saturate(0.92) contrast(1.05) brightness(0.96)',
                      }}
                    />
                    {/* Subtle top gold line */}
                    <div
                      className="absolute top-0 inset-x-0 pointer-events-none"
                      style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
                      }}
                    />
                    {/* Subtle bottom gradient for depth */}
                    <div
                      className="absolute bottom-0 inset-x-0 pointer-events-none"
                      style={{
                        height: '30%',
                        background: 'linear-gradient(180deg, transparent, rgba(6,2,10,0.4))',
                      }}
                    />
                  </div>
                </div>

                {/* Caption */}
                <div
                  className="relative text-center mt-5"
                  style={{ zIndex: 1 }}
                >
                  {/* Small decorative diamond */}
                  <div
                    className="mx-auto mb-3"
                    style={{
                      width: '6px',
                      height: '6px',
                      border: '1px solid rgba(201,169,110,0.6)',
                      transform: 'rotate(45deg)',
                      background: 'rgba(6,2,10,0.9)',
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      color: '#C9A96E',
                      fontSize: 'clamp(18px, 1.8vw, 22px)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                    }}
                  >
                    Ксения Лапшина
                  </h4>
                  <p
                    className="uppercase mt-1"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'rgba(232,213,163,0.5)',
                      fontSize: 'clamp(10px, 0.9vw, 12px)',
                      fontWeight: 400,
                      letterSpacing: '0.3em',
                    }}
                  >
                    Продюсер · Основатель
                  </p>
                </div>
              </div>
            </div>

            {/* ── Text column — left aligned ── */}
            <div className="md:col-span-7">

              {/* Lead paragraph with gold accent line */}
              <div
                className="relative pl-6 mb-6"
                style={{
                  borderLeft: '2px solid rgba(201,169,110,0.45)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                  transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'rgba(245,230,211,0.92)',
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    letterSpacing: '0.01em',
                    textAlign: 'left',
                  }}
                >
                  «Мадам Бум» — независимое бурлеск-кабаре из Санкт-Петербурга, созданное в декабре 2025 года продюсером Ксенией Лапшиной.
                </p>
              </div>

              {/* Body paragraphs */}
              {bodyParagraphs.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'rgba(245,230,211,0.72)',
                    fontSize: 'clamp(15px, 1.25vw, 18px)',
                    fontWeight: 400,
                    lineHeight: 1.85,
                    letterSpacing: '0.02em',
                    textAlign: 'left',
                    marginBottom: '16px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.1}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.1}s`,
                  }}
                >
                  {text}
                </p>
              ))}

              {/* CTA Button → future /about page */}
              <div
                className="mt-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.85s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.85s',
                }}
              >
                <a href="/about" className="about-cta" aria-label="Перейти на страницу с подробным описанием проекта">
                  <span>Подробнее о проекте</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            Gold Separator
            ═══════════════════════════════════ */}
        <div
          className="flex items-center gap-4 mb-12 md:mb-16 px-8 mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
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
              width: '6px',
              height: '6px',
              border: '1px solid rgba(201,169,110,0.5)',
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
            PART 2: Что такое бурлеск?
            ═══════════════════════════════════ */}
        <div className="relative flex flex-col items-center w-full">

          {/* Part 2 Header */}
          <div
            className="flex flex-col items-center gap-4 mb-10 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(22px, 3vw, 38px)',
                fontWeight: 700,
                color: '#C9A96E',
                letterSpacing: '0.08em',
                textShadow: '0 0 50px rgba(201,169,110,0.1), 0 4px 16px rgba(0,0,0,0.4)',
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              Что такое бурлеск?
            </h3>
            <div className="gold-line-shimmer" style={{ width: '60px', height: '1px' }} />
          </div>

          {/* Two Cards side by side / stacked */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-4xl px-4 md:px-8 mb-10 md:mb-12">
            <BurlesqueCard
              title="Классический бурлеск"
              text="Роскошный, чувственный и визуально впечатляющий. Перья, стразы, блеск, эффектные костюмы и эстетика золотой эпохи кабаре создают атмосферу настоящего праздника красоты."
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
                </svg>
              }
              accentColor="rgba(201,169,110,0.6)"
              delay={0.55}
              visible={isVisible}
            />
            <BurlesqueCard
              title="Бурлеск с перцем"
              text="Комедийные и самоироничные номера, в которых главным инструментом становятся юмор, актёрская игра и неожиданные сценические решения."
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
                </svg>
              }
              accentColor="rgba(232,213,163,0.5)"
              delay={0.65}
              visible={isVisible}
            />
          </div>

          {/* Elegant italic quote */}
          <div
            className="flex flex-col items-center px-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s',
            }}
          >
            {/* Small decorative elements around quote */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: 'clamp(20px, 3vw, 35px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))',
                }}
              />
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  border: '1px solid rgba(201,169,110,0.5)',
                  transform: 'rotate(45deg)',
                  background: 'rgba(6,2,10,0.9)',
                }}
              />
              <div
                style={{
                  width: 'clamp(20px, 3vw, 35px)',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'rgba(232, 213, 163, 0.7)',
                fontSize: 'clamp(16px, 1.6vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.7,
                letterSpacing: '0.04em',
                maxWidth: '580px',
                textAlign: 'center',
              }}
            >
              Такое сочетание делает каждое шоу одновременно элегантным, лёгким и по-настоящему живым.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Producer frame corner brackets */
        .producer-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 2;
          pointer-events: none;
          transition: border-color 0.5s ease;
        }
        .producer-corner-tl {
          top: 6px; left: 6px;
          border-top: 2px solid rgba(201,169,110,0.7);
          border-left: 2px solid rgba(201,169,110,0.7);
        }
        .producer-corner-tr {
          top: 6px; right: 6px;
          border-top: 2px solid rgba(201,169,110,0.7);
          border-right: 2px solid rgba(201,169,110,0.7);
        }
        .producer-corner-bl {
          bottom: 6px; left: 6px;
          border-bottom: 2px solid rgba(201,169,110,0.7);
          border-left: 2px solid rgba(201,169,110,0.7);
        }
        .producer-corner-br {
          bottom: 6px; right: 6px;
          border-bottom: 2px solid rgba(201,169,110,0.7);
          border-right: 2px solid rgba(201,169,110,0.7);
        }

        /* Producer frame hover */
        .producer-frame:hover .producer-inner {
          border-color: rgba(201,169,110,0.4) !important;
        }
        .producer-frame:hover .producer-corner {
          border-color: rgba(201,169,110,0.95) !important;
        }
        .producer-frame:hover .producer-glow {
          opacity: 1.3;
        }

        /* About CTA button */
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          font-family: var(--font-inter);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A96E;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.4);
          border-radius: 2px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      letter-spacing 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(201,169,110,0.92), rgba(201,169,110,1));
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .about-cta:hover {
          color: #06020A;
          border-color: #C9A96E;
          letter-spacing: 0.26em;
          box-shadow: 0 0 30px rgba(201,169,110,0.25), 0 4px 16px rgba(0,0,0,0.4);
        }
        .about-cta:hover::before {
          transform: translateX(0);
        }
        .about-cta > span,
        .about-cta > svg {
          position: relative;
          z-index: 1;
        }
        .about-cta svg {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-cta:hover svg {
          transform: translateX(5px);
        }

        /* About card hover effects (Part 2) */
        .about-card-inner:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(123,26,43,0.25), 0 0 12px rgba(201,169,110,0.06), 0 8px 30px rgba(0,0,0,0.5);
          border-color: rgba(201,169,110,0.4) !important;
        }

        .about-card-inner:hover .about-card-glow {
          opacity: 1 !important;
        }

        /* Card border glow on hover */
        .about-card-inner::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid rgba(201,169,110,0);
          transition: border-color 0.5s ease;
          pointer-events: none;
          z-index: 4;
        }

        .about-card-inner:hover::after {
          border-color: rgba(201,169,110,0.2);
        }
      `}</style>
    </section>
  )
}
