'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'АФИША', href: '#afisha' },
    { label: 'VIP', href: '#vip' },
    { label: 'О ШОУ', href: '#about' },
    { label: 'КОНТАКТЫ', href: '#contacts' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-blur py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-lg md:text-xl tracking-[0.12em] font-bold transition-opacity hover:opacity-80"
          style={{
            fontFamily: 'var(--font-playfair)',
            color: '#C9A96E',
            textShadow: '0 0 20px rgba(201,169,110,0.2)',
          }}
        >
          МАДАМ БУМ
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#E8D5A3]"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontWeight: 300,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
            style={{ backgroundColor: '#C9A96E' }}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
            style={{ backgroundColor: '#C9A96E' }}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
            style={{ backgroundColor: '#C9A96E' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          background: 'rgba(6, 2, 10, 0.95)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#E8D5A3]"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#C9A96E',
                fontWeight: 300,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
