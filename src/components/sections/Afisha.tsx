'use client'

import { useEffect, useRef, useState } from 'react'

interface Show {
  id: number
  day: string
  month: string
  weekday: string
  title: string
  description: string
  time: string
}

const shows: Show[] = [
  {
    id: 1,
    day: '14',
    month: 'МАРТА',
    weekday: 'ПЯТНИЦА',
    title: 'Красный Бархат',
    description: 'Премьера новой программы',
    time: '21:00',
  },
  {
    id: 2,
    day: '21',
    month: 'МАРТА',
    weekday: 'ПЯТНИЦА',
    title: 'Золотой Век',
    description: 'Классика бурлеска в современной подаче',
    time: '21:00',
  },
  {
    id: 3,
    day: '28',
    month: 'МАРТА',
    weekday: 'ПЯТНИЦА',
    title: 'Полуночный Сеанс',
    description: 'Специальный late-night формат',
    time: '23:00',
  },
]

function ShowCard({ show, index, visible, onBookingClick }: { show: Show; index: number; visible: boolean; onBookingClick?: (showTitle: string) => void }) {
  return (
    <div
      className={`show-card group rounded-lg p-6 md:p-8 flex flex-col gap-5 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        background: 'linear-gradient(160deg, rgba(90, 15, 26, 0.35) 0%, rgba(26, 10, 16, 0.7) 100%)',
        border: '1px solid rgba(201, 169, 110, 0.15)',
        transitionDelay: visible ? `${index * 180}ms` : '0ms',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Date header */}
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-5xl md:text-6xl leading-none"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(201,169,110,0.15)',
            }}
          >
            {show.day}
          </span>
          <div className="flex flex-col">
            <span
              className="text-xs tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontWeight: 300,
              }}
            >
              {show.month}
            </span>
            <span
              className="text-[9px] tracking-[0.15em] mt-0.5"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#F5E6D3',
                opacity: 0.35,
                fontWeight: 300,
              }}
            >
              {show.weekday}
            </span>
          </div>
        </div>

        {/* Time badge */}
        <div
          className="px-2.5 py-1 rounded-sm"
          style={{
            background: 'rgba(201, 169, 110, 0.08)',
            border: '1px solid rgba(201, 169, 110, 0.15)',
          }}
        >
          <span
            className="text-[10px] tracking-[0.15em]"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#C9A96E',
              fontWeight: 400,
            }}
          >
            {show.time}
          </span>
        </div>
      </div>

      {/* Gold separator */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(201,169,110,0.3), rgba(201,169,110,0.05))',
        }}
      />

      {/* Title */}
      <h3
        className="text-xl md:text-2xl"
        style={{
          fontFamily: 'var(--font-playfair)',
          color: '#F5E6D3',
          fontWeight: 600,
        }}
      >
        {show.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: 'var(--font-inter)',
          color: '#F5E6D3',
          opacity: 0.45,
          fontWeight: 300,
        }}
      >
        {show.description}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button */}
      <button
        className="self-start px-7 py-2.5 rounded-sm text-[10px] tracking-[0.22em] uppercase transition-all duration-400 cursor-pointer group-hover:border-[#E8D5A3]"
        style={{
          fontFamily: 'var(--font-inter)',
          background: 'transparent',
          border: '1px solid rgba(201, 169, 110, 0.4)',
          color: '#C9A96E',
          fontWeight: 400,
        }}
        onClick={() => onBookingClick?.(show.title)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#C9A96E'
          e.currentTarget.style.color = '#5A0F1A'
          e.currentTarget.style.borderColor = '#C9A96E'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#C9A96E'
          e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.4)'
        }}
      >
        ЗАБРОНИРОВАТЬ
      </button>
    </div>
  )
}

export default function Afisha({ onBookingClick }: { onBookingClick?: (showTitle: string) => void }) {
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
      id="afisha"
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(90, 15, 26, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#C9A96E',
              opacity: 0.4,
              fontWeight: 300,
            }}
          >
            Расписание
          </p>
          <h2
            className="text-2xl md:text-3xl tracking-[0.12em] uppercase"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 600,
            }}
          >
            БЛИЖАЙШИЕ ШОУ
          </h2>
          <div
            className="mx-auto mt-5 gold-line-shimmer"
            style={{ width: '60px', height: '1px' }}
          />
        </div>

        {/* Show cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {shows.map((show, i) => (
            <ShowCard key={show.id} show={show} index={i} visible={visible} onBookingClick={onBookingClick} />
          ))}
        </div>
      </div>
    </section>
  )
}
