import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Zap } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[600px] sm:h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 60%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mb-8"
        >
          <span
            className="text-7xl sm:text-[10rem] md:text-[12rem] font-extrabold leading-none select-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,102,255,0.2) 0%, rgba(0,102,255,0.03) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </span>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0066ff, #3b8bff)', boxShadow: '0 8px 30px rgba(0,102,255,0.4)' }}
            >
              <Zap size={28} className="text-white" fill="white" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-extrabold mb-3"
          style={{ color: 'var(--text-heading)' }}
        >
          Sayfa Bulunamadı
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          <br />Aşağıdaki butonlarla yolunuzu bulabilirsiniz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: '#0066ff', boxShadow: '0 4px 20px rgba(0,102,255,0.3)' }}
          >
            <Home size={16} />
            Ana Sayfaya Dön
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <ArrowLeft size={16} />
            Geri Dön
          </button>
        </motion.div>
      </div>
    </div>
  )
}
