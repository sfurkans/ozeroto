import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ParticleBackground from '../ui/ParticleBackground'
import PageTransition from '../ui/PageTransition'
import FloatingButtons from '../ui/FloatingButtons'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          <main>
            <Outlet />
          </main>
          <Footer />
        </PageTransition>
      </AnimatePresence>
      <FloatingButtons />
      <ParticleBackground />
    </div>
  )
}
