'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

interface CurtainProps {
  onComplete: () => void
}

export default function Curtain({ onComplete }: CurtainProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const cordRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [flashVisible, setFlashVisible] = useState(false)

  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    document.body.classList.add('curtain-active')

    const tl = gsap.timeline({
      onComplete: () => {
        setFlashVisible(true)
        setTimeout(() => {
          document.body.classList.remove('curtain-active')
          handleComplete()
        }, 600)
      },
    })

    // Initial state
    gsap.set(leftPanelRef.current, { x: 0 })
    gsap.set(rightPanelRef.current, { x: 0 })
    gsap.set(cordRef.current, { opacity: 1, y: 0, scaleY: 1 })

    // Logo fades in with a slight glow pulse
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0
    )

    // Subtitle appears
    const subtitle = logoRef.current?.querySelector('.curtain-subtitle')
    if (subtitle) {
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 10 },
        { opacity: 0.7, y: 0, duration: 0.6, ease: 'power2.out' },
        0.6
      )
    }

    // Hold for dramatic tension
    tl.to({}, { duration: 1.2 })

    // Cord retracts with a swing
    tl.to(cordRef.current, {
      opacity: 0,
      y: -80,
      scaleY: 0.3,
      rotation: 5,
      duration: 0.6,
      ease: 'power3.in',
    })

    // Add opening class for gold edges
    if (containerRef.current) {
      containerRef.current.classList.add('curtain-opening')
    }

    // Dramatic curtain opening - starts slow, accelerates
    tl.to(
      leftPanelRef.current,
      {
        x: '-110%',
        duration: 2.5,
        ease: 'power4.inOut',
      },
      '-=0.2'
    )

    tl.to(
      rightPanelRef.current,
      {
        x: '110%',
        duration: 2.5,
        ease: 'power4.inOut',
      },
      '<'
    )

    // Logo fades out as curtains open
    tl.to(
      logoRef.current,
      {
        opacity: 0,
        scale: 1.1,
        y: -20,
        duration: 1.0,
        ease: 'power2.in',
      },
      '-=2.0'
    )

    return () => {
      document.body.classList.remove('curtain-active')
      tl.kill()
    }
  }, [handleComplete])

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999]"
        style={{ pointerEvents: 'all' }}
      >
        {/* Deep dark background behind curtains */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, #0A0310 0%, #06020A 100%)',
            zIndex: 1,
          }}
        />

        {/* Left curtain panel */}
        <div
          ref={leftPanelRef}
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          style={{ zIndex: 2 }}
        >
          {/* Main velvet texture - rich folds */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(90deg,
                  #3D0A12 0px, #4D0D16 3px, #5A0F1A 6px, #6B1220 10px,
                  #7B1A2B 14px, #6B1220 18px, #5A0F1A 22px, #4D0D16 26px,
                  #520E18 30px, #5A0F1A 34px, #6B1220 38px, #5A0F1A 42px
                )
              `,
            }}
          />
          {/* Subtle fold highlights */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(90deg,
                  transparent 0px,
                  rgba(139,26,43,0.15) 10px,
                  transparent 20px,
                  rgba(201,169,110,0.04) 30px,
                  transparent 42px
                )
              `,
            }}
          />
          {/* Deep inner shadow */}
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: '60px',
              background: 'linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 40%, transparent)',
            }}
          />
          {/* Top drape shadow */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            }}
          />
          {/* Gold edge - appears on opening */}
          <div
            className="absolute inset-y-0 right-0 curtain-gold-edge-left"
            style={{
              width: '3px',
              background: 'linear-gradient(180deg, transparent 5%, #E8D5A3 20%, #C9A96E 50%, #E8D5A3 80%, transparent 95%)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        </div>

        {/* Right curtain panel */}
        <div
          ref={rightPanelRef}
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          style={{ zIndex: 2 }}
        >
          {/* Main velvet texture - mirror folds */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(90deg,
                  #5A0F1A 0px, #6B1220 4px, #5A0F1A 8px, #4D0D16 12px,
                  #520E18 16px, #5A0F1A 20px, #6B1220 24px, #7B1A2B 28px,
                  #6B1220 32px, #5A0F1A 36px, #4D0D16 40px, #5A0F1A 44px
                )
              `,
            }}
          />
          {/* Subtle fold highlights */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(90deg,
                  transparent 0px,
                  rgba(201,169,110,0.04) 12px,
                  transparent 22px,
                  rgba(139,26,43,0.15) 34px,
                  transparent 42px
                )
              `,
            }}
          />
          {/* Deep inner shadow */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: '60px',
              background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 40%, transparent)',
            }}
          />
          {/* Top drape shadow */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            }}
          />
          {/* Gold edge - appears on opening */}
          <div
            className="absolute inset-y-0 left-0 curtain-gold-edge-right"
            style={{
              width: '3px',
              background: 'linear-gradient(180deg, transparent 5%, #E8D5A3 20%, #C9A96E 50%, #E8D5A3 80%, transparent 95%)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        </div>

        {/* Center content - logo */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <div ref={logoRef} className="flex flex-col items-center gap-4">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl tracking-[0.18em] font-bold text-center"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                textShadow:
                  '0 0 50px rgba(201,169,110,0.4), 0 0 100px rgba(201,169,110,0.15), 0 2px 15px rgba(0,0,0,0.6)',
              }}
            >
              МАДАМ БУМ
            </h1>
            <p
              className="curtain-subtitle text-xs md:text-sm tracking-[0.4em] uppercase"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: '#C9A96E',
                opacity: 0,
                fontWeight: 400,
              }}
            >
              представляет
            </p>
          </div>
        </div>

        {/* Gold cord with tassel */}
        <div
          ref={cordRef}
          className="curtain-cord"
          style={{ zIndex: 5 }}
        >
          <div className="curtain-tassel" />
        </div>
      </div>

      {/* Gold flash overlay on curtain open */}
      {flashVisible && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 110, 0.5) 0%, rgba(201, 169, 110, 0.1) 40%, transparent 70%)',
            zIndex: 9999,
            animation: 'flashFade 0.8s ease-out forwards',
          }}
        />
      )}
    </>
  )
}
