'use client'

import Navbar from '@/components/sections/Navbar'
import About from '@/components/sections/About'
import WhatIsBurlesqueAbout from '@/components/sections/WhatIsBurlesqueAbout'
import WhyUs from '@/components/sections/WhyUs'
import Footer from '@/components/sections/Footer'

/* ═══ About Page (/about) ═══
 * Hero = About component (О проекте — editorial layout with producer photo + text)
 * Then WhatIsBurlesqueAbout block (Что такое бурлеск? + Шоу-программа — copied
 *   from the main page's current WhatIsBurlesque section).
 * Then WhyUs block (Почему Мадам Бум?)
 * Then Footer.
 *
 * No Curtain preloader (direct content for secondary page).
 * Navbar is fixed, so we add padding-top to clear it.
 */
export default function AboutPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
      }}
    >
      <Navbar />

      {/* Spacer to clear fixed navbar (h-14 sm:h-16) */}
      <div style={{ height: '56px' }} className="sm:hidden" />
      <div style={{ height: '64px' }} className="hidden sm:block" />

      {/* Hero — About section (О проекте: title + producer photo + text + CTA) */}
      <About />

      {/* Что такое бурлеск? + Шоу-программа «Мадам Бум» (full current version) */}
      <WhatIsBurlesqueAbout />

      {/* Почему Мадам Бум? — 6 фишек шоу */}
      <WhyUs />

      {/* Footer (with id="contacts") */}
      <Footer />
    </main>
  )
}
