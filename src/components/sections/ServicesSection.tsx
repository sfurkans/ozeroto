import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import TiltCard from '../ui/TiltCard'
import { services } from '../../data/services'

export default function ServicesSection() {
  return (
    <section className="pt-12 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 relative" style={{ background: 'var(--gradient-section)' }}>
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          title="Hizmetlerimiz"
          subtitle="Aracınız için ihtiyacınız olan tüm elektrik ve aksesuar hizmetleri tek çatı altında."
          gradient
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard
                className="block h-full rounded-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 1px 3px var(--shadow)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.2), 0 12px 40px rgba(0,102,255,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = '0 1px 3px var(--shadow)'
                }}
              >
                <Link to="/hizmetler" className="block h-full p-6 group">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl mb-5 transition-colors duration-300"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-heading)' }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Detaylar <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
