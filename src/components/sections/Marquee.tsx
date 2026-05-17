'use client'

export default function Marquee() {
  const text = 'МАДАМ БУМ ★ БУРЛЕСК ★ КАБАРЕ ★ МОСКВА ★ ШОУ ★ АТМОСФЕРА ★ VIP ★ МАДАМ БУМ ★ БУРЛЕСК ★ КАБАРЕ ★ МОСКВА ★ ШОУ ★ АТМОСФЕРА ★ VIP ★ '

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top gold line */}
      <div
        className="w-full relative"
        style={{ height: '1px' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A96E 20%, #E8D5A3 50%, #C9A96E 80%, transparent 95%)' }}
        />
      </div>

      {/* Marquee strip */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #7B1A2B 0%, #5A0F1A 50%, #7B1A2B 100%)',
          height: '50px',
        }}
      >
        {/* Subtle inner shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.3)',
          }}
        />

        <div className="marquee-track flex items-center whitespace-nowrap h-full">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: '#C9A96E',
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textShadow: '0 0 10px rgba(201,169,110,0.2)',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div
        className="w-full relative"
        style={{ height: '1px' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A96E 20%, #E8D5A3 50%, #C9A96E 80%, transparent 95%)' }}
        />
      </div>
    </div>
  )
}
