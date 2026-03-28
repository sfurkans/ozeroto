import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const heroImages = [
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&h=900&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&h=900&fit=crop',
]

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 102, 255, ${p.alpha})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
}

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slideshow */}
      {heroImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2s]"
          style={{ opacity: i === currentImage ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: i === currentImage ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease-out',
            }}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)' }}
      />

      {/* Particle network */}
      <ParticleField />

      {/* Accent glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
            style={{
              backgroundColor: 'rgba(0,102,255,0.15)',
              color: '#60a5fa',
              border: '1px solid rgba(0,102,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Zap size={14} fill="#60a5fa" />
            Ankara'nın Güvenilir Oto Elektrik Merkezi
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-white"
          >
            Aracınız İçin
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #60a5fa 50%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Profesyonel
            </span>
            <br />
            Elektrik & Aksesuar
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg mb-10 leading-relaxed text-white/70 max-w-xl"
          >
            Oto elektrik, müzik sistemi, aydınlatma, kamera ve alarm sistemlerinde
            uzman kadromuz ile güvenilir çözümler sunuyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/hizmetler"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm font-semibold text-sm text-white transition-all duration-500 hover:-translate-y-1 min-h-[44px]"
              style={{
                backgroundColor: '#0066ff',
                boxShadow: '0 4px 20px rgba(0,102,255,0.4), 0 0 40px rgba(0,102,255,0.1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,102,255,0.5), 0 0 60px rgba(0,102,255,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,102,255,0.4), 0 0 40px rgba(0,102,255,0.1)'
              }}
            >
              Hizmetleri İncele
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+905061252861"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm font-semibold text-sm text-white transition-all duration-500 hover:-translate-y-1 min-h-[44px]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              <Phone size={16} />
              Bize Ulaşın
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-12 right-8 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className="w-8 h-1 rounded-full transition-all duration-500"
            style={{
              backgroundColor: i === currentImage ? '#0066ff' : 'rgba(255,255,255,0.25)',
              width: i === currentImage ? '32px' : '16px',
            }}
          />
        ))}
      </div>
    </section>
  )
}
