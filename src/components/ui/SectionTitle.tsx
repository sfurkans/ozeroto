import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  gradient?: boolean
}

export default function SectionTitle({ title, subtitle, centered = true, gradient = false }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${gradient ? 'gradient-text' : ''}`}
        style={gradient ? undefined : { color: 'var(--text-heading)' }}
      >
        {title}
      </h2>
      <div className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className="h-1 w-10 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        <div className="h-1 w-4 rounded-full" style={{ backgroundColor: 'var(--accent)', opacity: 0.5 }} />
      </div>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
