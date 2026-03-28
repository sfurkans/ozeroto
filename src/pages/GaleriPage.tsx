import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

const photos = [
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop',
  'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&fit=crop',
  'https://images.unsplash.com/photo-1609592806596-b8b6b1b5c7f2?w=800&fit=crop',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&fit=crop',
  'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&fit=crop',
]

export default function GaleriPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const goNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % photos.length : null)
  }, [])
  const goPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null)
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Swipe support
  const touchStart = useRef<number | null>(null)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }, [])
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStart.current = null
  }, [goNext, goPrev])

  return (
    <div className="pt-16 md:pt-20 min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <PageHeader title="Galeri" />

      {/* 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-16 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative cursor-pointer overflow-hidden rounded-sm aspect-square"
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.8s ease, transform 0.8s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.5), 0 0 40px rgba(0,102,255,0.2), 0 8px 32px rgba(0,0,0,0.5)'
                e.currentTarget.style.transform = 'translateY(-6px)'
                const img = e.currentTarget.querySelector('img')
                if (img) img.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)'
                e.currentTarget.style.transform = 'translateY(0)'
                const img = e.currentTarget.querySelector('img')
                if (img) img.style.transform = 'scale(1)'
              }}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                loading="lazy"
              />

              {/* Glow border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  border: '2px solid rgba(0,102,255,0.6)',
                  boxShadow: 'inset 0 0 20px rgba(0,102,255,0.15)',
                }}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 drop-shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-2 sm:left-8 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
            >
              <ChevronLeft size={30} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={photos[lightboxIndex].replace('w=800', 'w=1400')}
                alt=""
                className="max-w-[90vw] max-h-[90vh] object-contain"
                style={{ borderRadius: '2px' }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <button
              className="absolute right-2 sm:right-8 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goNext() }}
            >
              <ChevronRight size={30} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: i === lightboxIndex ? '#fff' : 'rgba(255,255,255,0.25)',
                    transform: i === lightboxIndex ? 'scale(1.4)' : 'scale(1)',
                  }}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
