'use client'

import { useState } from 'react'
import Curtain from '@/components/sections/Curtain'
import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import AboutShow from '@/components/sections/AboutShow'
import SectionDivider from '@/components/sections/SectionDivider'
import Gallery from '@/components/sections/Gallery'
import Afisha from '@/components/sections/Afisha'
import VipSection from '@/components/sections/VipSection'
import Footer from '@/components/sections/Footer'
import BookingModal from '@/components/sections/BookingModal'
import { Toaster } from 'sonner'

export default function Home() {
  const [curtainComplete, setCurtainComplete] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedShow, setSelectedShow] = useState<string | undefined>(undefined)

  const handleBookingClick = (showTitle?: string) => {
    setSelectedShow(showTitle)
    setBookingOpen(true)
  }

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Sonner toaster with custom theme */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(26, 10, 16, 0.95)',
            border: '1px solid rgba(201, 169, 110, 0.3)',
            color: '#F5E6D3',
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            borderRadius: '6px',
            boxShadow: '0 0 30px rgba(123, 26, 43, 0.4)',
          },
        }}
      />

      {/* Curtain Preloader */}
      {!curtainComplete && (
        <Curtain onComplete={() => setCurtainComplete(true)} />
      )}

      {/* Navigation */}
      {curtainComplete && <Navigation />}

      {/* Hero Section */}
      <Hero animate={curtainComplete} onBookingClick={() => handleBookingClick()} />

      {/* Marquee */}
      <Marquee />

      {/* About Show */}
      <AboutShow />

      {/* Divider */}
      <SectionDivider />

      {/* Gallery */}
      <Gallery />

      {/* Divider */}
      <SectionDivider />

      {/* Afisha */}
      <Afisha onBookingClick={(showTitle) => handleBookingClick(showTitle)} />

      {/* VIP Section */}
      <VipSection onBookingClick={() => handleBookingClick()} />

      {/* Footer - mt-auto for sticky footer */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selectedShow={selectedShow}
      />
    </main>
  )
}
