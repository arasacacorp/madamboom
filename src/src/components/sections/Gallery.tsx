'use client'

import { useEffect, useRef, useState } from 'react'

interface GalleryItem {
  id: number
  src: string
  alt: string
  span: string
  gridColumn: string
  gridRow: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/images/performer1.png',
    alt: 'Артистка бурлеска',
    span: 'row-span-2',
    gridColumn: '1',
    gridRow: '1 / 3',
  },
  {
    id: 2,
    src: '/images/hero-bg.png',
    alt: 'Сцена кабаре',
    span: '',
    gridColumn: '2',
    gridRow: '1',
  },
  {
    id: 3,
    src: '/images/performer3.png',
    alt: 'Выступление',
    span: '',
    gridColumn: '2',
    gridRow: '2',
  },
  {
    id: 4,
    src: '/images/performer2.png',
    alt: 'Танец',
    span: '',
    gridColumn: '1',
    gridRow: '3',
  },
  {
    id: 5,
    src: '/images/hero-bg.png',
    alt: 'Атмосфера',
    span: '',
    gridColumn: '1',
    gridRow: '4',
  },
  {
    id: 6,
    src: '/images/performer4.png',
    alt: 'Шоу',
    span: 'row-span-2',
    gridColumn: '2',
    gridRow: '3 / 5',
  },
]

function GalleryImage({
  item,
  index,
  visible,
}: {
  item: GalleryItem
  index: number
  visible: boolean
}) {
  return (
    <div
      className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        gridColumn: item.gridColumn,
        gridRow: item.gridRow,
        border: '1px solid rgba(201, 169, 110, 0.15)',
        transitionDelay: visible ? `${index * 120}ms` : '0ms',
        minHeight: '0',
      }}
    >
      {/* Image */}
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={{
          filter: 'saturate(0.8) contrast(1.1) brightness(0.8)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 40%, rgba(90, 15, 26, 0.6) 100%)',
        }}
      />

      {/* Hover border brighten + shadow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-500"
        style={{
          border: '1px solid transparent',
        }}
      />

      {/* Hover state overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow:
            '0 0 20px rgba(201, 169, 110, 0.15), 0 8px 30px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(201, 169, 110, 0.3)',
        }}
      />
    </div>
  )
}

export default function Gallery() {
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
      id="gallery"
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 50% at 50% 40%, rgba(90, 15, 26, 0.06) 0%, transparent 70%)',
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
            Атмосфера шоу
          </p>
          <h2
            className="text-2xl md:text-3xl tracking-[0.12em] uppercase"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontWeight: 600,
            }}
          >
            ГАЛЕРЕЯ
          </h2>
          <div
            className="mx-auto mt-5 gold-line-shimmer"
            style={{ width: '60px', height: '1px' }}
          />
        </div>

        {/* Masonry grid - desktop */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(4, 200px)',
          }}
        >
          {galleryItems.map((item, i) => (
            <GalleryImage key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* Mobile layout - single column with varied heights */}
        <div className="md:hidden flex flex-col gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                border: '1px solid rgba(201, 169, 110, 0.15)',
                transitionDelay: visible ? `${i * 120}ms` : '0ms',
                aspectRatio: item.span === 'row-span-2' ? '9/16' : '4/5',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                  filter: 'saturate(0.8) contrast(1.1) brightness(0.8)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(90, 15, 26, 0.6) 100%)',
                }}
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow:
                    '0 0 20px rgba(201, 169, 110, 0.15), 0 8px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(201, 169, 110, 0.3)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
