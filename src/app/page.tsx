'use client'

import { useState } from 'react'
import Curtain from '@/components/sections/Curtain'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Afisha from '@/components/sections/Afisha'
import WhatIsBurlesque from '@/components/sections/WhatIsBurlesque'
import Calendar from '@/components/sections/Calendar'
import Cast from '@/components/sections/Cast'
import Gallery from '@/components/sections/Gallery'
import Venues from '@/components/sections/Venues'
import Programs from '@/components/sections/Programs'
import Corporate from '@/components/sections/Corporate'
import CtaTickets from '@/components/sections/CtaTickets'
import CtaPrivate from '@/components/sections/CtaPrivate'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [curtainComplete, setCurtainComplete] = useState(false)

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: '#06020A',
        scrollBehavior: 'smooth',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Curtain Preloader */}
      {!curtainComplete && (
        <Curtain onComplete={() => setCurtainComplete(true)} />
      )}

      {/* Navbar */}
      {curtainComplete && <Navbar />}

      {/* 1. Hero — кинематографичный первый экран */}
      <Hero animate={curtainComplete} />

      {/* 2. Afisha — афиша событий (ближайшие шоу) */}
      {curtainComplete && <Afisha />}

      {/* 3. WhatIsBurlesque — что такое бурлеск + шоу-программа */}
      {curtainComplete && <WhatIsBurlesque />}

      {/* 4. Cast — наши звёзды бурлеска */}
      {curtainComplete && <Cast />}

      {/* 5. Programs — программы */}
      {curtainComplete && <Programs />}

      {/* 6. Calendar — календарь событий */}
      {curtainComplete && <Calendar />}

      {/* 7. Venues — площадки */}
      {curtainComplete && <Venues />}

      {/* 8. Corporate — гастроли и корпоративы (ВРЕМЕННО СКРЫТО) */}
      {/* Чтобы вернуть: заменить false на curtainComplete */}
      {false && curtainComplete && <Corporate />}

      {/* 9. CTA — купить билеты */}
      {curtainComplete && <CtaTickets />}

      {/* 10. Gallery — галерея (кадры с выступлений) */}
      {curtainComplete && <Gallery />}

      {/* 11. CTA — частное выступление */}
      {curtainComplete && <CtaPrivate />}

      {/* Footer (with id="contacts") */}
      {curtainComplete && <Footer />}
    </main>
  )
}
