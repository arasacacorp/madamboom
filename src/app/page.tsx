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
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Curtain Preloader */}
      {!curtainComplete && (
        <Curtain onComplete={() => setCurtainComplete(true)} />
      )}

      {/* Hero — первый экран */}
      <Hero animate={curtainComplete} onBookingClick={handleBookingClick} />

      {/* Плашка «Сайт в разработке» — точно по центру */}
      {curtainComplete && (
        <div
          className="fixed inset-x-0 top-3 flex justify-center z-50 pointer-events-none"
        >
          <div
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-sm pointer-events-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0.08) 100%)',
              border: '1px solid rgba(201, 169, 110, 0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              opacity: 0,
              animation: 'fadeUpBadge 0.8s ease 0.3s forwards',
            }}
          >
            <div style={{ width: '3px', height: '3px', background: '#C9A96E', borderRadius: '50%' }} />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontSize: 'clamp(8px, 2vw, 10px)',
                letterSpacing: '0.2em',
                fontWeight: 400,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Сайт в разработке
            </span>
            <div style={{ width: '3px', height: '3px', background: '#C9A96E', borderRadius: '50%' }} />
          </div>
        </div>
      )}

      {/* Badge animation */}
      <style>{`
        @keyframes fadeUpBadge {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
