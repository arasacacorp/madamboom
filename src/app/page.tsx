'use client'

import { useState } from 'react'
import Curtain from '@/components/sections/Curtain'
import Hero from '@/components/sections/Hero'

export default function Home() {
  const [curtainComplete, setCurtainComplete] = useState(false)

  const handleBookingClick = () => {
    window.open('https://23may.ticketscloud.org/', '_blank')
  }

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Curtain Preloader */}
      {!curtainComplete && (
        <Curtain onComplete={() => setCurtainComplete(true)} />
      )}

      {/* Hero — оригинальный первый экран */}
      <Hero animate={curtainComplete} onBookingClick={handleBookingClick} />

      {/* Маленькая плашка "Сайт в разработке" */}
      {curtainComplete && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-sm"
          style={{
            background: 'rgba(6, 2, 10, 0.85)',
            border: '1px solid rgba(201, 169, 110, 0.15)',
            backdropFilter: 'blur(12px)',
            opacity: 0,
            animation: 'fadeUpBadge 1s ease 3s forwards',
          }}
        >
          <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(245, 230, 211, 0.5)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              fontWeight: 300,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Сайт в разработке
          </span>
          <div
            style={{
              width: '1px',
              height: '12px',
              background: 'rgba(201, 169, 110, 0.2)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontSize: '11px',
              letterSpacing: '0.1em',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            23 МАЯ
          </span>
          <div style={{ width: '4px', height: '4px', background: '#C9A96E', borderRadius: '50%' }} />
        </div>
      )}

      {/* Badge fade-in animation */}
      <style>{`
        @keyframes fadeUpBadge {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </main>
  )
}
