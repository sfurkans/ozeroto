import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section
      className="py-14 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'var(--gradient-alt)' }}
    >
      <div className="absolute inset-0 pattern-diagonal opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
        }}
      />

      {/* Decorative floating shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-5"
        style={{ backgroundColor: 'var(--accent)' }}
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-32 h-32 rounded-full opacity-5"
        style={{ backgroundColor: 'var(--accent)' }}
        animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--text-heading)' }}
        >
          Aracınız İçin <span className="gradient-text">Doğru Çözüm</span> Burada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base md:text-lg mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Ücretsiz keşif ve fiyat teklifi için hemen bize ulaşın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-sm font-bold text-sm text-white uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 min-h-[44px]"
            style={{
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 20px rgba(0,102,255,0.3), 0 8px 32px rgba(0,102,255,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,102,255,0.5), 0 12px 40px rgba(0,102,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.3), 0 8px 32px rgba(0,102,255,0.2)'
            }}
          >
            İletişime Geç <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
