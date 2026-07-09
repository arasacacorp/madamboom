'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══ Cast Bios Section ═══
 * Detailed editorial-style bios for each artist on the /cast page.
 * Alternating two-column layout (image | text) with scroll-reveal.
 * Producer (Ксения) gets a highlighted frame; Варлоки share a duo block
 * with two side-by-side portraits.
 */

interface ArtistBio {
  name: string
  slug: string
  role: string
  bio: string[]
  image: string
  imageAlt: string
  objectPos?: string
  isProducer?: boolean
  isDuo?: boolean
  secondImage?: string
  secondImageAlt?: string
}

const ARTIST_BIOS: ArtistBio[] = [
  {
    name: 'Ксения Лапшина',
    slug: 'kseniya-lapshina',
    role: 'Основатель и продюсер «Мадам Бум»',
    image: '/images/performer-ksenia.jpg',
    imageAlt: 'Ксения Лапшина — основатель и продюсер «Мадам Бум»',
    objectPos: 'center top',
    isProducer: true,
    bio: [
      'Ксения Лапшина — создатель и продюсер бурлеск-кабаре «Мадам Бум». Более двадцати лет она работает в сфере событийной индустрии, PR, музыкального менеджмента и ресторанного бизнеса, создавая мероприятия, концертные проекты и культурные события. По образованию Ксения — продюсер кино и телевидения.',
      'Создавая «Мадам Бум», она стремилась не просто запустить новое шоу, а объединить талантливых артистов в пространстве, где можно свободно творить, развивать сценические образы и создавать яркие авторские номера. Музыка, танец и живые выступления всегда были важной частью её жизни.',
      'Именно поэтому главной ценностью проекта для неё остаются эмоции зрителей, атмосфера праздника и возможность дарить людям незабываемые впечатления. Сегодня «Мадам Бум» — это воплощение её любви к сцене, красоте и живому искусству.',
    ],
  },
  {
    name: 'Олеся Волык',
    slug: 'olesya-volyk',
    role: 'Художественный руководитель · Конферансье',
    image: '/images/performer-olesya.jpg',
    imageAlt: 'Олеся Волык — художественный руководитель «Мадам Бум»',
    objectPos: 'center top',
    bio: [
      'Олеся Волык — художественный руководитель бурлеск-кабаре «Мадам Бум», яркая ведущая, певица и хозяйка вечера. Она не просто объявляет номера, а создаёт настроение всего шоу, задаёт его ритм и превращает программу в единое театральное действие. Благодаря её харизме, юмору, вокалу и таланту импровизации каждый вечер приобретает собственный характер и остаётся неповторимым.',
      'Как художественный руководитель проекта, Олеся принимает участие в формировании творческой концепции шоу, объединяя артистов, музыку и сценическое действие в цельную историю, наполненную атмосферой настоящего кабаре. Именно её энергия, остроумие и живое общение со зрителями делают «Мадам Бум» таким ярким, тёплым и запоминающимся.',
    ],
  },
  {
    name: 'Сапфира Тайгерс',
    slug: 'saphira-taigers',
    role: 'Прима бурлеск-кабаре',
    image: '/images/performer-saphaya.jpg',
    imageAlt: 'Сапфира Тайгерс — прима «Мадам Бум»',
    objectPos: '80% 5%',
    bio: [
      'Сапфира Тайгерс — художественное сердце и прима проекта. Её выступления воплощают лучшие традиции современного бурлеска: роскошные сценические образы, выразительную пластику, живой вокал и драматическую подачу. Каждый номер Сапфиры — это самостоятельная история, в которой музыка, эмоции, красота костюма и сценическое обаяние объединяются в единое художественное произведение.',
      'Именно её выступления во многом формируют уникальный стиль «Мадам Бум» — элегантный, чувственный и по-настоящему театральный.',
    ],
  },
  {
    name: 'Марлен',
    slug: 'marlen',
    role: 'Голос «Джазового бунта»',
    image: '/images/performer-marlene.jpg',
    imageAlt: 'Марлен — джазовая вокалистка «Мадам Бум»',
    objectPos: 'center top',
    bio: [
      'Марлен — джазовая вокалистка и одна из ключевых фигур музыкального направления бурлеск-кабаре «Мадам Бум». Обладательница выразительного бархатного тембра и утончённой сценической манеры, Марлен переносит зрителей в эпоху джазовых див, роскошных концертных залов и ночных клубов золотой эпохи свинга. В её исполнении звучат мировые джазовые хиты, наполненные элегантностью, чувственностью и лёгким сценическим флиртом.',
      'Марлен принимает активное участие в развитии и формировании концепции программы «Джазовый бунт», благодаря чему музыкальная составляющая проекта остаётся живой, стильной и узнаваемой. Её выступления создают особую атмосферу, в которой джаз, бурлеск и театральное действие соединяются в единое художественное пространство.',
    ],
  },
  {
    name: 'Кристал Дейзи',
    slug: 'kristal-deyzi',
    role: 'Королева перевоплощений',
    image: '/images/performer-crystal.jpg',
    imageAlt: 'Кристал Дейзи — артистка «Мадам Бум»',
    objectPos: 'center top',
    bio: [
      'Кристал Дейзи — артистка с безупречным чувством стиля, тонким юмором и яркой сценической индивидуальностью. Она мастерски создаёт запоминающиеся образы, сочетая лёгкий флирт, театральность и блестящее чувство игры со зрителем.',
      'Именно Кристал исполняет один из самых известных номеров проекта — легендарный номер девушки в золотом бокале, ставший настоящей визитной карточкой шоу и одним из самых фотографируемых моментов вечера.',
    ],
  },
  {
    name: 'Фрау Анаид',
    slug: 'frau-anaid',
    role: 'Воплощение классического бурлеска',
    image: '/images/performer-frau-anaid.jpg',
    imageAlt: 'Фрау Анаид — артистка классического бурлеска «Мадам Бум»',
    objectPos: 'center top',
    bio: [
      'Фрау Анаид — артистка, в которой словно оживают лучшие традиции золотой эпохи кабаре. Томная, загадочная и невероятно женственная, она создаёт на сцене образы, наполненные утончённостью, грацией и магнетическим обаянием. Её часто называют фарфоровой куколкой бурлеск-кабаре «Мадам Бум» — настолько органично в её выступлениях сочетаются красота, пластика, изысканность и безупречное чувство стиля.',
      'Каждое появление Фрау Анаид на сцене превращается в эстетическое наслаждение. Плавные линии движений, выразительная хореография, роскошные костюмы и тонкая работа с образом создают атмосферу классического европейского бурлеска. В её номерах нет случайных деталей — только красота, элегантность и искусство сценического соблазнения, исполненное со вкусом и чувством меры.',
    ],
  },
  {
    name: 'Анна и Сергей Варлоки',
    slug: 'varloki',
    role: 'Магия внутри шоу',
    image: '/images/varlok-anna.jpg',
    imageAlt: 'Анна Варлок — ментализм и сценическая иллюзия',
    secondImage: '/images/varlok-sergey.jpg',
    secondImageAlt: 'Сергей Варлок — ментализм и сценическая иллюзия',
    objectPos: 'center top',
    isDuo: true,
    bio: [
      'Профессиональные менталисты и мастера сценической иллюзии создают атмосферу загадки и настоящего сценического волшебства. Их выступления вовлекают зрителей в интерактивное действие и добавляют программе элемент непредсказуемости.',
      'Каждый вечер они напоминают публике о том, что настоящее кабаре всегда оставляет место чуду.',
    ],
  },
]

/* ─── Image Frame ─── */
function ImageFrame({
  src,
  alt,
  objectPos,
  isProducer,
}: {
  src: string
  alt: string
  objectPos?: string
  isProducer?: boolean
}) {
  return (
    <div
      className="relative"
      style={{
        padding: '6px',
        background: 'rgba(13,4,8,0.55)',
        border: isProducer
          ? '1.5px solid rgba(232,213,163,0.5)'
          : '1px solid rgba(201,169,110,0.28)',
        boxShadow: isProducer
          ? '0 0 30px rgba(232,213,163,0.12), 0 0 50px rgba(123,26,43,0.2), 0 8px 30px rgba(0,0,0,0.5)'
          : '0 6px 26px rgba(0,0,0,0.45)',
        transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '3 / 4',
          border: '1px solid rgba(201,169,110,0.15)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            filter: isProducer
              ? 'saturate(1) contrast(1.1) brightness(0.95)'
              : 'saturate(0.92) brightness(0.86)',
            objectPosition: objectPos || 'center top',
            transition: 'filter 0.5s ease, transform 0.6s ease',
          }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isProducer
              ? 'linear-gradient(180deg, transparent 0%, transparent 60%, rgba(123,26,43,0.15) 90%, rgba(6,2,10,0.5) 100%)'
              : 'linear-gradient(180deg, transparent 0%, transparent 70%, rgba(6,2,10,0.3) 100%)',
          }}
        />
        {/* Top gold accent */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            top: '-1px',
            background: isProducer
              ? 'linear-gradient(90deg, transparent, rgba(232,213,163,0.7), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
          }}
        />
      </div>
    </div>
  )
}

/* ─── Single Bio Block ─── */
function BioBlock({ artist, index }: { artist: ArtistBio; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal when in viewport OR already scrolled past (anchor-jump fix)
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const reversed = index % 2 === 1
  const isProducer = artist.isProducer === true
  const isDuo = artist.isDuo === true

  return (
    <div
      ref={ref}
      id={artist.slug}
      className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition:
          'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        scrollMarginTop: '80px',
      }}
    >
      {/* ── Image column ──
       * Same two-column layout for ALL artists (incl. duo).
       * Single: 380px (420px producer) portrait, centered in the half-column.
       * Duo (Варлоки): two portraits side-by-side, filling the half-column width
       *   so each is as large as the column allows (no narrow cap). */}
      <div
        className={reversed ? 'lg:order-2' : 'lg:order-1'}
        style={{
          maxWidth: isDuo ? 'none' : isProducer ? '420px' : '380px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {artist.isDuo ? (
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            style={{ width: '100%', margin: '0 auto' }}
          >
            <ImageFrame
              src={artist.image}
              alt={artist.imageAlt}
              objectPos={artist.objectPos}
            />
            <ImageFrame
              src={artist.secondImage!}
              alt={artist.secondImageAlt!}
              objectPos={artist.objectPos}
            />
          </div>
        ) : (
          <ImageFrame
            src={artist.image}
            alt={artist.imageAlt}
            objectPos={artist.objectPos}
            isProducer={isProducer}
          />
        )}
      </div>

      {/* ── Text column ── */}
      <div className={reversed ? 'lg:order-1' : 'lg:order-2'}>
        {/* Producer badge */}
        {isProducer && (
          <span
            className="inline-block mb-4 px-3 py-1 rounded-sm"
            style={{
              background:
                'linear-gradient(135deg, rgba(201,169,110,0.95) 0%, rgba(232,213,163,0.95) 100%)',
              color: '#06020A',
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Продюсер
          </span>
        )}

        {/* Role eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            color: isProducer ? 'rgba(232,213,163,0.7)' : 'rgba(201,169,110,0.55)',
            fontSize: 'clamp(10px, 1.1vw, 12px)',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          {artist.role}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            fontWeight: 700,
            color: '#E8D5A3',
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            marginBottom: '16px',
          }}
        >
          {artist.name}
        </h3>

        {/* Gold separator */}
        <div
          className="gold-line-shimmer"
          style={{ width: '60px', height: '1px', marginBottom: '24px' }}
        />

        {/* Bio paragraphs */}
        <div className="flex flex-col gap-4">
          {artist.bio.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(245,230,211,0.75)',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.75,
                letterSpacing: '0.01em',
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export default function CastBios() {
  return (
    <section
      id="cast-bios"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06020A 0%, #0D0408 10%, #06020A 90%, #06020A 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(123,26,43,0.1) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <div className="vignette" style={{ position: 'absolute' }} />

      {/* ── Content ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 6 }}>
        {/* Section header */}
        <div className="flex flex-col items-center mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                border: '1px solid rgba(201,169,110,0.7)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.08em',
              textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            Подробнее об артистах
          </h2>

          <div className="gold-line-shimmer" style={{ width: '80px', height: '1px' }} />

          <p
            className="tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(201,169,110,0.55)',
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.3vw, 14px)',
              marginTop: '16px',
            }}
          >
            Лица и истории «Мадам Бум»
          </p>
        </div>

        {/* Bio blocks */}
        <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
          {ARTIST_BIOS.map((artist, i) => (
            <BioBlock key={artist.name} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
