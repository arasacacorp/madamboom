'use client'

import { useState } from 'react'
import Curtain from '@/components/sections/Curtain'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Afisha from '@/components/sections/Afisha'
import Calendar from '@/components/sections/Calendar'
import Cast from '@/components/sections/Cast'
import About from '@/components/sections/About'
import Venues from '@/components/sections/Venues'
import Programs from '@/components/sections/Programs'
import Corporate from '@/components/sections/Corporate'
import WhyUs from '@/components/sections/WhyUs'

export default function Home() {
  const [curtainComplete, setCurtainComplete] = useState(false)

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

      {/* Navbar */}
      {curtainComplete && <Navbar />}

      {/* 1. Hero — кинематографичный первый экран */}
      <Hero animate={curtainComplete} />

      {/* 2. Afisha — афиша событий (ближайшие шоу) */}
      {curtainComplete && <Afisha />}

      {/* 3. Calendar — календарь событий */}
      {curtainComplete && <Calendar />}

      {/* 4. About — о проекте */}
      {curtainComplete && <About />}

      {/* 5. Programs — программы */}
      {curtainComplete && <Programs />}

      {/* 6. Cast — состав перформеров */}
      {curtainComplete && <Cast />}

      {/* 7. Venues — площадки */}
      {curtainComplete && <Venues />}

      {/* 8. Corporate — гастроли и корпоративы */}
      {curtainComplete && <Corporate />}

      {/* 9. WhyUs — почему Мадам Бум */}
      {curtainComplete && <WhyUs />}

      {/* Footer */}
      {curtainComplete && (
        <footer
          className="relative w-full py-12 mt-auto"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #06020A 30%)',
            borderTop: '1px solid rgba(201, 169, 110, 0.1)',
          }}
        >
          <div className="flex flex-col items-center gap-6 px-4">
            {/* Decorative separator */}
            <div className="flex items-center gap-3">
              <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
              <div style={{ width: '6px', height: '6px', border: '1px solid #C9A96E', transform: 'rotate(45deg)' }} />
              <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
            </div>

            {/* Footer tagline */}
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'rgba(201,169,110,0.5)',
                fontSize: 'clamp(13px, 1.5vw, 17px)',
                letterSpacing: '0.1em',
                textAlign: 'center',
              }}
            >
              Бурлеск-кабаре нового поколения
            </p>

            {/* Cities */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.35)',
                fontSize: 'clamp(10px, 1.2vw, 13px)',
                letterSpacing: '0.2em',
                fontWeight: 300,
              }}
            >
              САНКТ-ПЕТЕРБУРГ&ensp;·&ensp;МОСКВА&ensp;·&ensp;ГАСТРОЛИ
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/madamboom"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center rounded-full transition-all duration-300 hover:border-opacity-60 hover:scale-110"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(201,169,110,0.25)',
                  color: '#C9A96E',
                }}
                aria-label="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://vk.com/madamboom"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center rounded-full transition-all duration-300 hover:border-opacity-60 hover:scale-110"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(201,169,110,0.25)',
                  color: '#C9A96E',
                }}
                aria-label="VK"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.048-2.763-5.339-2.763-5.813 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.49c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/madamboomburlesque"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center rounded-full transition-all duration-300 hover:border-opacity-60 hover:scale-110"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(201,169,110,0.25)',
                  color: '#C9A96E',
                }}
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>

            {/* 18+ age marker */}
            <div className="flex items-center gap-2">
              <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25))' }} />
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(201,169,110,0.3)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  fontWeight: 400,
                }}
              >
                18+
              </span>
              <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.25), transparent)' }} />
            </div>

            {/* Copyright */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.3)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              © {new Date().getFullYear()} МАДАМ БУМ
            </p>
          </div>
        </footer>
      )}
    </main>
  )
}
