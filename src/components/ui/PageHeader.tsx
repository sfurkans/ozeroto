import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Gradient arka plan */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(0,102,255,0.12) 0%, transparent 40%, rgba(0,102,255,0.06) 100%)',
        }}
      />

      {/* Hareket eden yatay çizgiler */}
      {[20, 50, 80].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.1), transparent)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Başlık */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          style={{ color: 'var(--text-heading)' }}
        >
          {title}
        </motion.h1>

        {/* Genişleyen çizgi */}
        <div className="flex justify-center mt-6">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
