'use client'

import { useEffect, useRef, useState } from 'react'

export default function AboutShow() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 40% 60% at 30% 50%, rgba(90, 15, 26, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row gap-16 md:gap-20">
        {/* Left - Quote */}
        <div
          className={`md:w-[42%] transition-all duration-1200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Decorative opening quote mark */}
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontSize: '72px',
              lineHeight: 0.5,
              opacity: 0.25,
            }}
          >
            &ldquo;
          </div>

          <blockquote
            className="text-2xl md:text-3xl lg:text-[2.4rem] leading-snug md:leading-snug"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#F5E6D3',
              fontWeight: 400,
            }}
          >
            Каждый вечер — это отдельная история, рассказанная языком тела, света и музыки.
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            {/* Gold line */}
            <div
              style={{ width: '40px', height: '1px', background: '#C9A96E' }}
            />
            <p
              className="text-sm tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: '#C9A96E',
                fontWeight: 500,
              }}
            >
              Мадам Бум
            </p>
          </div>
        </div>

        {/* Right - Description */}
        <div
          className={`md:w-[58%] flex flex-col justify-center transition-all duration-1200 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p
            className="text-sm md:text-[15px] leading-relaxed mb-5"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#F5E6D3',
              opacity: 0.55,
              fontWeight: 300,
            }}
          >
            Программа меняется каждую неделю. В шоу — профессиональные артисты бурлеска, танцовщицы, иллюзионисты. Камерный зал на 80 посадочных мест создаёт атмосферу интимности и погружения. Интерактив с публикой — вы не просто зритель, вы часть происходящего.
          </p>
          <p
            className="text-sm md:text-[15px] leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#F5E6D3',
              opacity: 0.55,
              fontWeight: 300,
            }}
          >
            Полный запрет на телефонные съёмки — мы хотим, чтобы вы прожили момент, а не снимали его. Каждое выступление существует только здесь и сейчас.
          </p>

          {/* Decorative detail */}
          <div className="mt-8 flex items-center gap-3">
            <div
              style={{
                width: '5px',
                height: '5px',
                border: '1px solid rgba(201,169,110,0.3)',
                transform: 'rotate(45deg)',
              }}
            />
            <p
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                opacity: 0.4,
                fontWeight: 300,
              }}
            >
              Камерный зал • 80 мест
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
