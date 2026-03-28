import { motion } from 'framer-motion'
import { ShieldCheck, Wrench, Clock, BadgeCheck } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import TiltCard from '../ui/TiltCard'

const features = [
  {
    icon: BadgeCheck,
    title: 'Orijinal Ürün Garantisi',
    desc: 'Tüm ürünlerimiz yetkili distribütörlerden temin edilir, fatura ve garanti belgesiyle teslim edilir.',
  },
  {
    icon: Wrench,
    title: 'Uzman Teknisyen Kadro',
    desc: '10 yılı aşkın deneyimiyle alanında uzman teknisyenlerimiz en doğru çözümü sunar.',
  },
  {
    icon: Clock,
    title: 'Hızlı Teslim',
    desc: 'Çoğu işlem aynı gün tamamlanır. Zamanınıza saygı gösteririz.',
  },
  {
    icon: ShieldCheck,
    title: 'İşçilik Garantisi',
    desc: 'Gerçekleştirilen tüm montaj ve onarım işlemlerine 1 yıl işçilik garantisi veriyoruz.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="pt-16 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 relative" style={{ background: 'var(--gradient-alt)' }}>
      <div className="absolute inset-0 pattern-cross opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle title="Neden Bizi Tercih Etmelisiniz?" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                className="p-5 rounded-sm text-center h-full glass"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.2), 0 8px 32px rgba(0,102,255,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <f.icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-heading)' }}>{f.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
