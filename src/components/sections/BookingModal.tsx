'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedShow?: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '4px',
  background: 'rgba(26, 10, 16, 0.9)',
  border: '1px solid rgba(201, 169, 110, 0.3)',
  color: '#F5E6D3',
  fontFamily: 'var(--font-inter)',
  fontSize: '13px',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-inter)',
  color: '#C9A96E',
  fontSize: '9px',
  letterSpacing: '0.2em',
  fontWeight: 400,
  marginBottom: '6px',
  textTransform: 'uppercase' as const,
}

const dateOptions = [
  { value: '14 марта', label: '14 марта — Пятница' },
  { value: '21 марта', label: '21 марта — Пятница' },
  { value: '28 марта', label: '28 марта — Пятница' },
]

const ticketOptions = [
  { value: 'Стандарт', label: 'Стандарт' },
  { value: 'VIP', label: 'VIP' },
]

export default function BookingModal({ open, onOpenChange, selectedShow }: BookingModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(selectedShow || '14 марта')
  const [ticketType, setTicketType] = useState('Стандарт')
  const [guests, setGuests] = useState(2)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 600))

    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')

    setSubmitting(false)
    setName('')
    setPhone('')
    setDate('14 марта')
    setTicketType('Стандарт')
    setGuests(2)
    onOpenChange(false)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#C9A96E'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.3)'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-0"
        style={{
          background: 'linear-gradient(160deg, rgba(90, 15, 26, 0.85) 0%, rgba(26, 10, 16, 0.95) 100%)',
          border: '1px solid rgba(201, 169, 110, 0.4)',
          borderRadius: '8px',
          boxShadow: '0 0 60px rgba(123, 26, 43, 0.3), 0 0 1px rgba(201, 169, 110, 0.5)',
        }}
        showCloseButton={false}
      >
        {/* Custom close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
          style={{
            color: '#C9A96E',
            fontSize: '20px',
            fontWeight: 300,
            background: 'transparent',
            border: 'none',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 169, 110, 0.1)'
            e.currentTarget.style.transform = 'rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'rotate(0deg)'
          }}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="px-6 pt-8 pb-6">
          {/* Title */}
          <DialogTitle
            className="text-center"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#C9A96E',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            БРОНИРОВАНИЕ
          </DialogTitle>

          {/* Gold separator */}
          <div className="mx-auto mt-4 mb-6" style={{ width: '60px', height: '1px' }}>
            <div
              className="gold-line-shimmer"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label style={labelStyle}>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Date */}
            <div>
              <label style={labelStyle}>Дата</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A96E' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                {dateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#1A0A10', color: '#F5E6D3' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ticket type */}
            <div>
              <label style={labelStyle}>Тип билета</label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A96E' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                {ticketOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#1A0A10', color: '#F5E6D3' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div>
              <label style={labelStyle}>Количество гостей</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                min={1}
                max={10}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3.5 rounded-sm text-[11px] tracking-[0.25em] uppercase transition-all duration-400 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-inter)',
                background: submitting
                  ? 'linear-gradient(135deg, rgba(201, 169, 110, 0.5), rgba(184, 149, 90, 0.5))'
                  : 'linear-gradient(135deg, #C9A96E, #B8955A)',
                border: 'none',
                color: '#0A0310',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(201, 169, 110, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E8D5A3, #C9A96E)'
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(201, 169, 110, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #B8955A)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 169, 110, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {submitting ? 'ОТПРАВКА...' : 'ЗАБРОНИРОВАТЬ'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
