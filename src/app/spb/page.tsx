'use client'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Calendar from '@/components/sections/Calendar'
import { Ticket, Clock, Sparkles, CalendarDays, MapPin, Music } from 'lucide-react'

/* ═══ Афиша в Санкт-Петербурге (/spb) ═══
 * Editorial page: hero + afisha poster + descriptive text + schedule/info cards
 * + SPB-only calendar (TicketsCloud widget madamboomspb.ticketscloud.org)
 * + CTA + footer (sticky).
 *
 * SPB venues (from project config + afisha):
 *  - Ibiza (Садовая ул., 12)            — Saturdays, «Джазовый бунт»
 *  - Unity / Сенная (пер. Гривцова, 4)  — Thursdays, классическая программа
 */

const SPB_TICKETS_URL = 'https://madamboomspb.ticketscloud.org/'

export default function SpbPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <Navbar />

      {/* Spacer to clear fixed navbar (h-14 sm:h-16) */}
      <div style={{ height: '56px' }} className="sm:hidden" />
      <div style={{ height: '64px' }} className="hidden sm:block" />

      {/* ═══ Hero header ═══ */}
      <section className="relative pt-10 pb-6 md:pt-16 md:pb-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,26,43,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative flex flex-col items-center px-4 text-center">
          {/* City badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(123,26,43,0.18)',
              border: '1px solid rgba(201,169,110,0.4)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <MapPin size={13} strokeWidth={2} style={{ color: '#C9A96E' }} />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#E8D5A3',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              Афиша · Санкт-Петербург
            </span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 'clamp(40px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))',
              }}
            />
            <div
              style={{
                width: '7px',
                height: '7px',
                border: '1px solid rgba(201,169,110,0.6)',
                transform: 'rotate(45deg)',
                background: 'rgba(6,2,10,0.9)',
              }}
            />
            <div
              style={{
                width: 'clamp(40px, 6vw, 70px)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(30px, 5.5vw, 60px)',
              fontWeight: 700,
              color: '#E8D5A3',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(201,169,110,0.18)',
              maxWidth: '900px',
              marginBottom: '18px',
            }}
          >
            Бурлеск-кабаре «Мадам Бум» в Санкт-Петербурге
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.7)',
              fontSize: 'clamp(16px, 1.6vw, 21px)',
              maxWidth: '680px',
              lineHeight: 1.6,
            }}
          >
            Бурлеск, живой джаз и театральная атмосфера на двух культовых площадках
            Северной столицы.
          </p>
        </div>
      </section>

      {/* ═══ Editorial block: afisha poster + intro text ═══ */}
      <section className="relative py-10 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06020A 0%, #0D0408 30%, #1A0812 50%, #0D0408 70%, #06020A 100%)',
          }}
        />
        <div
          className="relative max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          style={{ zIndex: 6 }}
        >
          {/* Afisha poster */}
          <div className="flex justify-center lg:justify-start order-1">
            <div
              className="relative"
              style={{
                maxWidth: '420px',
                width: '100%',
                padding: '8px',
                background: 'rgba(13,4,8,0.55)',
                border: '2px solid rgba(201,169,110,0.5)',
                boxShadow: '0 0 50px rgba(201,169,110,0.14), 0 0 90px rgba(123,26,43,0.28), 0 16px 50px rgba(0,0,0,0.65)',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3 / 4.2', border: '1px solid rgba(201,169,110,0.2)' }}
              >
                <img
                  src="/images/afisha-spb.jpg"
                  alt="Афиша бурлеск-кабаре «Мадам Бум» в Санкт-Петербурге — Ibiza, Джазовый бунт, Unity, июль"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(1) brightness(0.97)' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#E8D5A3',
                    background: 'rgba(6,2,10,0.78)',
                    border: '1px solid rgba(201,169,110,0.5)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A96E', boxShadow: '0 0 6px rgba(201,169,110,0.8)' }} />
                  Санкт-Петербург
                </span>
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div className="order-2">
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(201,169,110,0.55)',
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Бурлеск-кабаре на Неве
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(22px, 3vw, 34px)',
                fontWeight: 600,
                color: '#C9A96E',
                lineHeight: 1.25,
                marginBottom: '20px',
              }}
            >
              Две площадки — два настроения
            </h2>
            <div
              className="gold-line-shimmer"
              style={{ width: '60px', height: '1px', marginBottom: '24px' }}
            />
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'rgba(245,230,211,0.82)',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.8,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <p>
                Бурлеск-кабаре «Мадам Бум» — одно из самых ярких вечерних шоу
                Санкт-Петербурга, объединяющее современный бурлеск, живой джаз, театр,
                конферанс и атмосферу классического кабаре.
              </p>
              <p>
                Каждый четверг мы встречаемся в ресторане «Юнити», где проходит
                классическая программа «Мадам Бум». Это вечер живой музыки, авторских
                бурлеск-номеров, изысканной эстетики, тонкого юмора и настоящего
                театрального действия. Гостей встречает сбор гостей с бокалом игристого,
                после чего начинается путешествие в мир кабаре, где каждый номер становится
                маленьким спектаклем.
              </p>
              <p>
                По субботам в клубе «Ибица» проходит программа «Джазовый бум» — авторское
                джазовое шоу, в котором виртуозная живая музыка встречается с бурлеском,
                танцем и театром. Это более динамичный формат, наполненный энергией,
                импровизацией и атмосферой большого праздника.
              </p>
              <p>
                Если вы ищете, куда сходить вечером в Санкт-Петербурге, хотите увидеть
                современный бурлеск, услышать живой джаз и провести незабываемый вечер,
                бурлеск-кабаре «Мадам Бум» станет идеальным выбором.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Info cards: сбор гостей / начало шоу / дресс-код ═══ */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: <Clock size={20} strokeWidth={1.6} />, label: 'Сбор гостей', value: '19:00' },
              { icon: <Ticket size={20} strokeWidth={1.6} />, label: 'Начало шоу', value: '20:00' },
              { icon: <Sparkles size={20} strokeWidth={1.6} />, label: 'Дресс-код', value: 'Вечерний' },
            ].map((card) => (
              <div
                key={card.label}
                className="flex flex-col items-center text-center p-6 rounded-lg"
                style={{
                  background: 'linear-gradient(180deg, rgba(26,10,16,0.85) 0%, rgba(10,3,16,0.9) 100%)',
                  border: '1px solid rgba(201,169,110,0.18)',
                }}
              >
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(201,169,110,0.08)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    color: '#C9A96E',
                  }}
                >
                  {card.icon}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(201,169,110,0.6)',
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#E8D5A3',
                    fontSize: '22px',
                    fontWeight: 600,
                  }}
                >
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Dress-code note */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.6)',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '24px auto 0',
            }}
          >
            Дресс-код приветствуется: вечерние образы, блеск, перья, винтаж и
            ретро-эстетика.
          </p>
        </div>
      </section>

      {/* ═══ Schedule block ═══ */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06020A 0%, #0D0408 25%, #1A0812 50%, #0D0408 75%, #06020A 100%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8" style={{ zIndex: 6 }}>
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
              <div style={{ width: '6px', height: '6px', border: '1px solid rgba(201,169,110,0.5)', transform: 'rotate(45deg)', background: 'rgba(6,2,10,0.9)' }} />
              <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(24px, 3.5vw, 38px)',
                fontWeight: 700,
                color: '#C9A96E',
                letterSpacing: '0.04em',
                textAlign: 'center',
              }}
            >
              Расписание
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-5 md:p-6 rounded-lg"
              style={{
                background: 'rgba(26,10,16,0.7)',
                border: '1px solid rgba(201,169,110,0.18)',
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(123,26,43,0.2) 100%)',
                  border: '1px solid rgba(201,169,110,0.35)',
                  color: '#C9A96E',
                }}
              >
                <CalendarDays size={22} strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#E8D5A3',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Четверг
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'rgba(245,230,211,0.85)',
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    lineHeight: 1.5,
                  }}
                >
                  Классическая программа «Мадам Бум», ресторан «Юнити», переулок
                  Гривцова, 4.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-5 md:p-6 rounded-lg"
              style={{
                background: 'rgba(26,10,16,0.7)',
                border: '1px solid rgba(201,169,110,0.18)',
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(123,26,43,0.2) 100%)',
                  border: '1px solid rgba(201,169,110,0.35)',
                  color: '#C9A96E',
                }}
              >
                <Music size={22} strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: '#E8D5A3',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Суббота
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'rgba(245,230,211,0.85)',
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    lineHeight: 1.5,
                  }}
                >
                  Джазовое шоу «Джазовый бунт», клуб «Ибица».
                </p>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#E8D5A3',
              fontSize: 'clamp(17px, 2vw, 22px)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '40px auto 0',
            }}
          >
            «Мадам Бум» — место, где живой джаз, бурлеск и театр создают атмосферу
            настоящего кабаре.
          </p>
        </div>
      </section>

      {/* ═══ SPB-only calendar ═══
       * cityFilter='СПб'  → /api/calendar?city=spb (only Saint Petersburg events)
       * widgetOverride    → all "Купить билеты" buttons open madamboomspb widget
       * title             → "Календарь событий в Санкт-Петербурге" */}
      <Calendar
        cityFilter="СПб"
        widgetOverride={SPB_TICKETS_URL}
        title="Календарь событий в Санкт-Петербурге"
      />

      {/* ═══ Closing CTA ═══ */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06020A 0%, #0D0408 20%, #1A0812 50%, #0D0408 80%, #06020A 100%)',
          }}
        />
        <div
          className="relative max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center"
          style={{ zIndex: 6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
            <div style={{ width: '6px', height: '6px', border: '1px solid rgba(201,169,110,0.5)', transform: 'rotate(45deg)', background: 'rgba(6,2,10,0.9)' }} />
            <div style={{ width: 'clamp(30px, 5vw, 50px)', height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 600,
              color: '#C9A96E',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            Купить билеты в Санкт-Петербурге
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'rgba(245,230,211,0.7)',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '520px',
              marginBottom: '28px',
            }}
          >
            Безопасная оплата через TicketsCloud. Выберите дату в календаре выше или
            перейдите к виджету продаж.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={SPB_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(135deg, #C9A96E 0%, #B8963D 100%)',
                color: '#06020A',
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(232,213,163,0.4)',
                boxShadow: '0 0 25px rgba(201,169,110,0.15)',
              }}
            >
              <Ticket size={16} strokeWidth={2} />
              Билеты
            </a>
            <a
              href="/contacts"
              className="flex items-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-400 hover:scale-105"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(201,169,110,0.35)',
              }}
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </section>

      {/* Footer (sticky via mt-auto) */}
      <Footer />
    </main>
  )
}
