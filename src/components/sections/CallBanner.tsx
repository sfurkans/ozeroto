import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function CallBanner() {
  return (
    <div className="relative z-20" style={{ marginTop: '-80px' }}>
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#0a1628',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex items-stretch">

          {/* Left: Car image - flush to left edge */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden md:block flex-shrink-0 relative"
            style={{ width: '300px', maxWidth: '35%' }}
          >
            <img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&h=400&fit=crop"
              alt="Araç"
              className="w-full h-full object-cover"
            />
            {/* Fade edge */}
            <div
              className="absolute inset-y-0 right-0 w-20"
              style={{ background: 'linear-gradient(to left, #0a1628, transparent)' }}
            />
          </motion.div>

          {/* Center: Phone number & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center flex-1 py-8 sm:py-10 md:py-12 px-4 sm:px-6"
          >
            <p
              className="text-sm md:text-base font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--accent)' }}
            >
              // Sorunuz mu var? Bizi Arayın //
            </p>
            <a
              href="tel:+905061252861"
              className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight hover:opacity-90 transition-opacity"
            >
              0 (506) 125 28 61
            </a>
            <a
              href="tel:+905061252861"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-sm font-bold text-sm text-white uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 min-h-[44px]"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Phone size={16} />
              Tıkla ve Ara
            </a>
          </motion.div>

          {/* Right: Person image - flush to right edge */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:block flex-shrink-0 relative"
            style={{ width: '240px', maxWidth: '25%' }}
          >
            {/* Fade edge */}
            <div
              className="absolute inset-y-0 left-0 w-20 z-10"
              style={{ background: 'linear-gradient(to right, #0a1628, transparent)' }}
            />
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=400&fit=crop&crop=top"
              alt="Uzman"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
