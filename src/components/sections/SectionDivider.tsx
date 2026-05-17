'use client'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ height: '40px', backgroundColor: '#06020A' }}
    >
      {/* Left gold line */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.3))',
        }}
      />

      {/* Center diamond */}
      <div
        style={{
          width: '6px',
          height: '6px',
          border: '1px solid rgba(201, 169, 110, 0.4)',
          transform: 'rotate(45deg)',
          margin: '0 12px',
          flexShrink: 0,
        }}
      />

      {/* Right gold line */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(201, 169, 110, 0.3), transparent)',
        }}
      />
    </div>
  )
}
