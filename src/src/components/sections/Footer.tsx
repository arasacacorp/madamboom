'use client'

import { Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="relative"
      style={{ backgroundColor: '#06020A' }}
    >
      {/* Top separator with subtle gradient */}
      <div
        className="w-full relative"
        style={{ height: '1px' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(123, 26, 43, 0.6), rgba(201,169,110,0.3), rgba(123, 26, 43, 0.6), transparent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-xl tracking-[0.14em]"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#C9A96E',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(201,169,110,0.15)',
              }}
            >
              МАДАМ БУМ
            </p>
            <p
              className="text-[9px] tracking-[0.35em] uppercase"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                opacity: 0.4,
                fontWeight: 300,
              }}
            >
              Бурлеск-Кабаре • Москва
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-7">
            {/* VK */}
            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                color: '#C9A96E',
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.03)',
              }}
              aria-label="VKontakte"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.26 2.174 1.817.614.42 1.08.328 1.08.328l2.172-.03s1.136-.07.598-.964c-.044-.073-.314-.662-1.618-1.872-1.366-1.268-1.183-1.062.462-3.255.998-1.332 1.398-2.144 1.273-2.492-.12-.332-.856-.244-.856-.244l-2.444.015s-.181-.025-.316.056c-.131.079-.216.263-.216.263s-.387 1.03-.903 1.906c-1.089 1.856-1.524 1.953-1.702 1.838-.414-.268-.311-1.074-.311-1.647 0-1.79.272-2.536-.528-2.73-.266-.064-.461-.106-1.14-.113-.87-.009-1.606.003-2.023.207-.278.136-.492.438-.362.455.162.022.528.099.723.363.251.342.242 1.11.242 1.11s.145 2.113-.336 2.375c-.33.18-.783-.188-1.756-1.875-.498-.864-.874-1.82-.874-1.82s-.073-.178-.202-.274c-.157-.115-.375-.152-.375-.152l-2.323.015s-.349.01-.477.162c-.114.135-.01.414-.01.414s1.832 4.287 3.906 6.447c1.9 1.978 4.058 1.848 4.058 1.848h.978z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                color: '#C9A96E',
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.03)',
              }}
              aria-label="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                color: '#C9A96E',
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.03)',
              }}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
            <a
              href="tel:+74951234567"
              className="flex items-center gap-2.5 transition-colors hover:text-[#E8D5A3]"
              style={{ color: '#C9A96E' }}
            >
              <Phone size={14} style={{ opacity: 0.7 }} />
              <span
                className="text-xs tracking-[0.12em]"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                }}
              >
                +7 (495) 123-45-67
              </span>
            </a>
            <div
              className="flex items-center gap-2.5"
              style={{ color: '#C9A96E', opacity: 0.6 }}
            >
              <MapPin size={14} style={{ opacity: 0.7 }} />
              <span
                className="text-xs tracking-[0.12em]"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                }}
              >
                Москва, ул. Театральная, 12
              </span>
            </div>
            <div
              className="flex items-center gap-2.5"
              style={{ color: '#C9A96E', opacity: 0.6 }}
            >
              <Clock size={14} style={{ opacity: 0.7 }} />
              <span
                className="text-xs tracking-[0.12em]"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                }}
              >
                ПТ-СБ 21:00
              </span>
            </div>
          </div>

          {/* Separator */}
          <div
            className="w-full"
            style={{ height: '1px', background: 'rgba(201, 169, 110, 0.07)' }}
          />

          {/* Legal */}
          <div className="flex flex-col items-center gap-2.5">
            <p
              className="text-[10px] tracking-[0.12em] text-center"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#F5E6D3',
                opacity: 0.25,
                fontWeight: 300,
              }}
            >
              18+ Только для совершеннолетних посетителей
            </p>
            <p
              className="text-[9px] tracking-[0.1em] text-center"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#F5E6D3',
                opacity: 0.15,
                fontWeight: 300,
              }}
            >
              © 2025 МАДАМ БУМ. Все права защищены. ИП Бум О.А. ИНН 7700000000
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
