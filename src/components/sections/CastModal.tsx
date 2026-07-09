'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

/* ═══ Cast Modal Section ═══
 * Cast grid where clicking a card opens a Dialog popup with the artist's
 * full bio. Self-contained — used on the /private-events page.
 *
 * Data combines performer card info (from Cast.tsx) + detailed bios
 * (from CastBios.tsx / the user-provided attachment).
 */

interface PerformerBio {
  name: string
  role: string
  shortDesc: string
  bio: string[]
  image: string
  objectPos?: string
  isProducer?: boolean
  isDuo?: boolean
  secondImage?: string
}

const PERFORMERS: PerformerBio[] = [
  {
    name: 'Олеся Волык',
    role: 'Художественный руководитель · Конферансье',
    shortDesc: 'Энергия и юмор',
    image: '/images/performer-olesya.jpg',
    objectPos: 'center top',
    bio: [
      'Олеся Волык — художественный руководитель бурлеск-кабаре «Мадам Бум», яркая ведущая, певица и хозяйка вечера. Она не просто объявляет номера, а создаёт настроение всего шоу, задаёт его ритм и превращает программу в единое театральное действие. Благодаря её харизме, юмору, вокалу и таланту импровизации каждый вечер приобретает собственный характер и остаётся неповторимым.',
      'Как художественный руководитель проекта, Олеся принимает участие в формировании творческой концепции шоу, объединяя артистов, музыку и сценическое действие в цельную историю, наполненную атмосферой настоящего кабаре. Именно её энергия, остроумие и живое общение со зрителями делают «Мадам Бум» таким ярким, тёплым и запоминающимся.',
    ],
  },
  {
    name: 'Сапфира Тайгерс',
    role: 'Прима бурлеск-кабаре',
    shortDesc: 'Лицо «Мадам Бум»',
    image: '/images/performer-saphaya.jpg',
    objectPos: '80% 5%',
    bio: [
      'Сапфира Тайгерс — художественное сердце и прима проекта. Её выступления воплощают лучшие традиции современного бурлеска: роскошные сценические образы, выразительную пластику, живой вокал и драматическую подачу. Каждый номер Сапфиры — это самостоятельная история, в которой музыка, эмоции, красота костюма и сценическое обаяние объединяются в единое художественное произведение.',
      'Именно её выступления во многом формируют уникальный стиль «Мадам Бум» — элегантный, чувственный и по-настоящему театральный.',
    ],
  },
  {
    name: 'Кристал Дейзи',
    role: 'Королева перевоплощений',
    shortDesc: 'Мастер перевоплощений',
    image: '/images/performer-crystal.jpg',
    objectPos: 'center top',
    bio: [
      'Кристал Дейзи — артистка с безупречным чувством стиля, тонким юмором и яркой сценической индивидуальностью. Она мастерски создаёт запоминающиеся образы, сочетая лёгкий флирт, театральность и блестящее чувство игры со зрителем.',
      'Именно Кристал исполняет один из самых известных номеров проекта — легендарный номер девушки в золотом бокале, ставший настоящей визитной карточкой шоу и одним из самых фотографируемых моментов вечера.',
    ],
  },
  {
    name: 'Марлен',
    role: 'Голос «Джазового бунта»',
    shortDesc: 'Голос проекта',
    image: '/images/performer-marlene.jpg',
    objectPos: 'center top',
    bio: [
      'Марлен — джазовая вокалистка и одна из ключевых фигур музыкального направления бурлеск-кабаре «Мадам Бум». Обладательница выразительного бархатного тембра и утончённой сценической манеры, Марлен переносит зрителей в эпоху джазовых див, роскошных концертных залов и ночных клубов золотой эпохи свинга. В её исполнении звучат мировые джазовые хиты, наполненные элегантностью, чувственностью и лёгким сценическим флиртом.',
      'Марлен принимает активное участие в развитии и формировании концепции программы «Джазовый бунт», благодаря чему музыкальная составляющая проекта остаётся живой, стильной и узнаваемой. Её выступления создают особую атмосферу, в которой джаз, бурлеск и театральное действие соединяются в единое художественное пространство.',
    ],
  },
  {
    name: 'Анна и Сергей Варлоки',
    role: 'Ментализм · Иллюзия',
    shortDesc: 'Магия сцены',
    image: '/images/varlok-anna.jpg',
    secondImage: '/images/varlok-sergey.jpg',
    objectPos: 'center top',
    isDuo: true,
    bio: [
      'Профессиональные менталисты и мастера сценической иллюзии создают атмосферу загадки и настоящего сценического волшебства. Их выступления вовлекают зрителей в интерактивное действие и добавляют программе элемент непредсказуемости.',
      'Каждый вечер они напоминают публике о том, что настоящее кабаре всегда оставляет место чуду.',
    ],
  },
  {
    name: 'Фрау Анаид',
    role: 'Классический бурлеск',
    shortDesc: 'Красота и грация',
    image: '/images/performer-frau-anaid.jpg',
    objectPos: 'center top',
    bio: [
      'Фрау Анаид — артистка, в которой словно оживают лучшие традиции золотой эпохи кабаре. Томная, загадочная и невероятно женственная, она создаёт на сцене образы, наполненные утончённостью, грацией и магнетическим обаянием. Её часто называют фарфоровой куколкой бурлеск-кабаре «Мадам Бум» — настолько органично в её выступлениях сочетаются красота, пластика, изысканность и безупречное чувство стиля.',
      'Каждое появление Фрау Анаид на сцене превращается в эстетическое наслаждение. Плавные линии движений, выразительная хореография, роскошные костюмы и тонкая работа с образом создают атмосферу классического европейского бурлеска. В её номерах нет случайных деталей — только красота, элегантность и искусство сценического соблазнения, исполненное со вкусом и чувством меры.',
    ],
  },
  {
    name: 'Ксения Лапшина',
    role: 'Продюсер · Основатель',
    shortDesc: 'Создатель «Мадам Бум»',
    image: '/images/performer-ksenia.jpg',
    objectPos: 'center top',
    isProducer: true,
    bio: [
      'Ксения Лапшина — создатель и продюсер бурлеск-кабаре «Мадам Бум». Более двадцати лет она работает в сфере событийной индустрии, PR, музыкального менеджмента и ресторанного бизнеса, создавая мероприятия, концертные проекты и культурные события. По образованию Ксения — продюсер кино и телевидения.',
      'Создавая «Мадам Бум», она стремилась не просто запустить новое шоу, а объединить талантливых артистов в пространстве, где можно свободно творить, развивать сценические образы и создавать яркие авторские номера. Музыка, танец и живые выступления всегда были важной частью её жизни.',
      'Именно поэтому главной ценностью проекта для неё остаются эмоции зрителей, атмосфера праздника и возможность дарить людям незабываемые впечатления. Сегодня «Мадам Бум» — это воплощение её любви к сцене, красоте и живому искусству.',
    ],
  },
]

/* ─── Performer Card (front-only, clickable → opens dialog) ─── */
function PerformerCardModal({
  performer,
  delay,
  visible,
  onOpen,
}: {
  performer: PerformerBio
  delay: number
  visible: boolean
  onOpen: () => void
}) {
  const isProducer = performer.isProducer === true

  return (
    <div
      className={`cast-modal-card ${isProducer ? 'cast-modal-card--producer' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <button
        onClick={onOpen}
        className="cast-modal-card-inner"
        aria-label={`Подробнее об артисте: ${performer.name}`}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: '6px',
          border: isProducer
            ? '1.5px solid rgba(232,213,163,0.5)'
            : '1px solid rgba(201,169,110,0.25)',
          boxShadow: isProducer
            ? '0 0 25px rgba(232,213,163,0.15), 0 0 50px rgba(123,26,43,0.25), 0 6px 25px rgba(0,0,0,0.6)'
            : '0 0 20px rgba(123,26,43,0.2), 0 4px 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          cursor: 'pointer',
          padding: 0,
          background: 'transparent',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease, transform 0.3s ease',
        }}
      >
        {/* Image */}
        <img
          src={performer.image}
          alt={`${performer.name} — ${performer.role}`}
          className="w-full h-full object-cover"
          style={{
            filter: isProducer
              ? 'saturate(1) contrast(1.1) brightness(0.95)'
              : 'saturate(0.9) contrast(1.05) brightness(0.85)',
            objectPosition: performer.objectPos || 'center top',
            transition: 'filter 0.5s ease, transform 0.6s ease',
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isProducer
              ? 'linear-gradient(180deg, transparent 0%, transparent 25%, rgba(123,26,43,0.3) 55%, rgba(6,2,10,0.95) 100%)'
              : 'linear-gradient(180deg, transparent 0%, transparent 35%, rgba(6,2,10,0.5) 60%, rgba(6,2,10,0.95) 100%)',
          }}
        />

        {/* Top gold accent */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            top: '-1px',
            background: isProducer
              ? 'linear-gradient(90deg, transparent, rgba(232,213,163,0.8), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            zIndex: 2,
          }}
        />

        {/* Producer badge */}
        {isProducer && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-sm"
            style={{
              zIndex: 4,
              background: 'linear-gradient(135deg, rgba(201,169,110,0.95) 0%, rgba(232,213,163,0.95) 100%)',
              color: '#06020A',
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Продюсер
          </div>
        )}

        {/* Bottom content */}
        <div
          className="absolute inset-x-0 bottom-0 px-3 pb-4 text-center"
          style={{ zIndex: 3 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#E8D5A3',
              fontWeight: isProducer ? 700 : 600,
              fontSize: 'clamp(14px, 1.3vw, 18px)',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              marginBottom: '5px',
            }}
          >
            {performer.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: isProducer ? '#E8D5A3' : '#C9A96E',
              fontSize: 'clamp(9px, 0.82vw, 11px)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              marginBottom: '3px',
            }}
          >
            {performer.role}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: isProducer ? 'rgba(245,230,211,0.85)' : 'rgba(245,230,211,0.7)',
              fontSize: 'clamp(11px, 0.95vw, 13px)',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
            }}
          >
            {performer.shortDesc}
          </p>
        </div>

        {/* "Подробнее" hint pill */}
        <div
          className="cast-modal-hint"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            zIndex: 4,
            padding: '8px 18px',
            borderRadius: '3px',
            background: 'rgba(6,2,10,0.85)',
            border: '1px solid rgba(201,169,110,0.5)',
            color: '#C9A96E',
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          Подробнее →
        </div>
      </button>
    </div>
  )
}

/* ─── Main Section ─── */
export default function CastModal() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const activePerformer = openIndex !== null ? PERFORMERS[openIndex] : null

  return (
    <section
      ref={sectionRef}
      id="cast-modal"
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #06020A 0%, #0D0408 15%, #1A0812 45%, #0D0408 75%, #06020A 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 35%, rgba(123,26,43,0.14) 0%, rgba(123,26,43,0.04) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <div className="vignette" style={{ position: 'absolute' }} />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6" style={{ zIndex: 6 }}>
        {/* Header */}
        <div
          className="mb-10 md:mb-14 flex flex-col items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition:
              'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
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
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 700,
              color: '#C9A96E',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            Наши звёзды{' '}
            <span style={{ fontStyle: 'italic', color: '#E8D5A3' }}>бурлеска</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            <div
              className="hidden sm:block"
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(201,169,110,0.65)',
                fontSize: 'clamp(11px, 1.2vw, 14px)',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textAlign: 'center',
              }}
            >
              Нажмите на карточку, чтобы узнать больше
            </span>
            <div
              className="hidden sm:block"
              style={{
                width: 'clamp(30px, 5vw, 60px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          <div className="cast-row grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
            {PERFORMERS.slice(0, 4).map((p, i) => (
              <PerformerCardModal
                key={p.name}
                performer={p}
                delay={0.25 + i * 0.07}
                visible={isVisible}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </div>
          <div className="cast-row grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {PERFORMERS.slice(4).map((p, i) => (
              <PerformerCardModal
                key={p.name}
                performer={p}
                delay={0.53 + i * 0.07}
                visible={isVisible}
                onOpen={() => setOpenIndex(i + 4)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Dialog Popup ═══ */}
      <Dialog open={openIndex !== null} onOpenChange={(v) => !v && setOpenIndex(null)}>
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden border-[rgba(201,169,110,0.3)] bg-[#0A0310]"
          style={{
            borderRadius: '8px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(123,26,43,0.15)',
          }}
        >
          {activePerformer && (
            <div className="flex flex-col sm:flex-row max-h-[85vh] overflow-hidden">
              {/* Image side */}
              <div
                className="sm:w-2/5 shrink-0"
                style={{
                  maxHeight: '200px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={activePerformer.image}
                  alt={activePerformer.name}
                  className="w-full h-full object-cover"
                  style={{
                    height: '100%',
                    minHeight: '200px',
                    objectPosition: activePerformer.objectPos || 'center top',
                    filter: 'saturate(0.95) brightness(0.9)',
                  }}
                />
              </div>

              {/* Text side */}
              <div className="sm:w-3/5 flex flex-col overflow-y-auto p-6 sm:p-8">
                <DialogHeader className="mb-4">
                  {activePerformer.isProducer && (
                    <span
                      className="inline-block mb-3 px-3 py-1 rounded-sm self-start"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(201,169,110,0.95) 0%, rgba(232,213,163,0.95) 100%)',
                        color: '#06020A',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Продюсер
                    </span>
                  )}
                  <DialogTitle
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 'clamp(22px, 3vw, 30px)',
                      fontWeight: 700,
                      color: '#E8D5A3',
                      letterSpacing: '0.02em',
                      lineHeight: 1.15,
                    }}
                  >
                    {activePerformer.name}
                  </DialogTitle>
                  <DialogDescription
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: activePerformer.isProducer ? '#E8D5A3' : '#C9A96E',
                      fontSize: 'clamp(10px, 1.1vw, 12px)',
                      fontWeight: 500,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginTop: '8px',
                    }}
                  >
                    {activePerformer.role}
                  </DialogDescription>
                </DialogHeader>

                {/* Gold separator */}
                <div
                  className="gold-line-shimmer mb-5"
                  style={{ width: '50px', height: '1px' }}
                />

                {/* Bio paragraphs */}
                <div className="flex flex-col gap-3.5">
                  {activePerformer.bio.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        color: 'rgba(245,230,211,0.8)',
                        fontSize: 'clamp(14px, 1.2vw, 17px)',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inline styles */}
      <style>{`
        .cast-modal-card:hover .cast-modal-card-inner {
          transform: translateY(-4px);
          border-color: rgba(201,169,110,0.7) !important;
          box-shadow: 0 0 32px rgba(201,169,110,0.28), 0 8px 30px rgba(0,0,0,0.5) !important;
        }
        .cast-modal-card--producer:hover .cast-modal-card-inner {
          border-color: rgba(232,213,163,0.85) !important;
          box-shadow: 0 0 40px rgba(232,213,163,0.3), 0 0 60px rgba(123,26,43,0.3) !important;
        }
        .cast-modal-card:hover .cast-modal-card-inner img {
          filter: saturate(1) contrast(1.1) brightness(0.95) !important;
          transform: scale(1.04);
        }
        .cast-modal-card:hover .cast-modal-hint {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
