'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── Seeded pseudo-random for deterministic SSR ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating Particles ─── */
function SectionParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: seededRandom(i * 11 + 700) * 3 + 1,
    left: seededRandom(i * 13 + 710) * 100,
    top: seededRandom(i * 17 + 720) * 100,
    opacity: seededRandom(i * 19 + 730) * 0.12 + 0.03,
    duration: seededRandom(i * 23 + 740) * 16 + 14,
    delay: seededRandom(i * 29 + 750) * 10,
    driftX: seededRandom(i * 31 + 760) * 50 - 25,
    driftY: -(seededRandom(i * 37 + 770) * 80 + 20),
    driftX2: seededRandom(i * 41 + 780) * 40 - 20,
    driftY2: -(seededRandom(i * 43 + 790) * 100 + 30),
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

/* ─── Gallery images data ───
 * 14 горизонтальных фото — один ряд, одинаковая высота.
 */
interface GalleryImage {
  src: string
  alt: string
  orientation: 'horizontal' | 'vertical'
}

const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/0001.jpg', alt: 'Кадр с шоу «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0015.jpg', alt: 'Бурлеск-кабаре «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0022.jpg', alt: 'Выступление «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0029.jpg', alt: 'Сцена бурлеск-кабаре', orientation: 'horizontal' },
  { src: '/images/gallery/0031.jpg', alt: 'Шоу «Мадам Бум» в Москве', orientation: 'horizontal' },
  { src: '/images/gallery/0036.jpg', alt: 'Артистка «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0050.jpg', alt: 'Кадр с бурлеск-шоу', orientation: 'horizontal' },
  { src: '/images/gallery/0061.jpg', alt: 'Сцена из спектакля', orientation: 'horizontal' },
  { src: '/images/gallery/0078.jpg', alt: 'Бурлеск-кабаре в Москве', orientation: 'horizontal' },
  { src: '/images/gallery/0091.jpg', alt: 'Выступление «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0092.jpg', alt: 'Кадр со сцены', orientation: 'horizontal' },
  { src: '/images/gallery/0113.jpg', alt: 'Шоу «Мадам Бум»', orientation: 'horizontal' },
  { src: '/images/gallery/0120.jpg', alt: 'Бурлеск-кабаре', orientation: 'horizontal' },
  { src: '/images/gallery/0127.jpg', alt: 'Сцена шоу', orientation: 'horizontal' },
]

/* ─── Single Gallery Card ─── */
function GalleryCard({
  img,
  index,
  isVisible,
  width,
  aspectRatio,
}: {
  img: GalleryImage
  index: number
  isVisible: boolean
  width: string
  aspectRatio: string
}) {
  return (
    <div
      className="gallery-item flex-shrink-0"
      style={{
        width,
        scrollSnapAlign: 'start',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.25 + index * 0.06}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.25 + index * 0.06}s`,
      }}
    >
      <div
        className="gallery-item-inner relative rounded-md overflow-hidden cursor-pointer"
        style={{
          aspectRatio,
          border: '1px solid rgba(201,169,110,0.22)',
          boxShadow: '0 0 20px rgba(123,26,43,0.18), 0 4px 20px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover"
          style={{
            filter: 'saturate(0.92) contrast(1.05) brightness(0.88)',
            transition: 'filter 0.5s ease, transform 0.6s ease',
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="gallery-gradient absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(6,2,10,0.4) 80%, rgba(6,2,10,0.85) 100%)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Top gold accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            top: '-1px',
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            zIndex: 2,
          }}
        />

        {/* Caption (показывается при hover) */}
        <div
          className="gallery-caption absolute inset-x-0 bottom-0 px-4 pb-4 text-center pointer-events-none"
          style={{
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            zIndex: 3,
          }}
        >
          {/* Decorative diamond */}
          <div
            className="mx-auto mb-2"
            style={{
              width: '5px',
              height: '5px',
              border: '1px solid rgba(201,169,110,0.6)',
              transform: 'rotate(45deg)',
              background: 'rgba(6,2,10,0.9)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.9)',
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            {img.alt}
          </p>
        </div>

        {/* Hover glow */}
        <div
          className="gallery-item-glow absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background:
              'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ─── Gallery Section ─── */
export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

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

  // Update scroll button states
  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.8, 600)
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06020A 0%, #0D0408 15%, #1A0812 45%, #0D0408 75%, #06020A 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123, 26, 43, 0.14) 0%, rgba(123, 26, 43, 0.04) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
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
        {/* ═══ Title block — centered ═══ */}
        <div
          className="mb-10 md:mb-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
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
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>Галерея</span>
          </h2>

          {/* Subtitle with symmetrical gold lines */}
          <div className="flex items-center gap-3 mt-6">
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
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
                whiteSpace: 'nowrap',
              }}
            >
              Кадры с выступлений
            </span>
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>
        </div>

        {/* ═══ Gallery — 2 ряда одной высоты, горизонтальный скролл ═══ */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount('left')}
              aria-label="Прокрутить влево"
              className="gallery-scroll-btn gallery-scroll-left absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
            >
              <ChevronLeft size={22} strokeWidth={1.8} />
            </button>
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount('right')}
              aria-label="Прокрутить вправо"
              className="gallery-scroll-btn gallery-scroll-right absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
            >
              <ChevronRight size={22} strokeWidth={1.8} />
            </button>
          )}

          {/* Scrollable container — 1 ряд горизонтальных фото */}
          <div
            ref={scrollRef}
            className="gallery-scroll-container flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(201,169,110,0.3) transparent',
              padding: '0 4px',
              margin: '0 -4px',
            }}
          >
            {galleryImages.map((img, i) => (
              <GalleryCard
                key={i}
                img={img}
                index={i}
                isVisible={isVisible}
                width="clamp(300px, 36vw, 460px)"
                aspectRatio="3 / 2"
              />
            ))}
          </div>

          {/* Scroll hint (мобильный) */}
          <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
            <div
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.4)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              ← Листайте →
            </div>
          </div>
        </div>
      </div>

      {/* ═══ INLINE STYLES ═══ */}
      <style>{`
        /* Gallery item hover */
        .gallery-item-inner:hover {
          border-color: rgba(201,169,110,0.6) !important;
          box-shadow: 0 0 30px rgba(201,169,110,0.25), 0 8px 30px rgba(0,0,0,0.5) !important;
        }
        .gallery-item-inner:hover img {
          filter: saturate(1) contrast(1.1) brightness(0.95) !important;
          transform: scale(1.05);
        }
        .gallery-item-inner:hover .gallery-item-glow {
          opacity: 1 !important;
        }
        .gallery-item-inner:hover .gallery-gradient {
          opacity: 1 !important;
        }
        .gallery-item-inner:hover .gallery-caption {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Scroll buttons */
        .gallery-scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(6,2,10,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201,169,110,0.4);
          color: #C9A96E;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .gallery-scroll-btn:hover {
          background: rgba(201,169,110,0.15);
          border-color: rgba(201,169,110,0.7);
          color: #E8D5A3;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 25px rgba(201,169,110,0.3);
        }

        /* Custom scrollbar (webkit) */
        .gallery-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .gallery-scroll-container::-webkit-scrollbar-track {
          background: rgba(201,169,110,0.04);
          border-radius: 3px;
        }
        .gallery-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(201,169,110,0.3);
          border-radius: 3px;
        }
        .gallery-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(201,169,110,0.5);
        }
      `}</style>
    </section>
  )
}
