import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const previewPhotos = [
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&fit=crop',
]

export default function GalleryPreview() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Çalışmalarımız" subtitle="Atölyemizden montaj ve uygulama fotoğrafları." />

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {previewPhotos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative overflow-hidden rounded-sm aspect-square"
              style={{
                boxShadow: '0 2px 8px var(--shadow)',
                transition: 'transform 0.8s ease, box-shadow 0.8s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.3), 0 8px 24px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  transition: 'opacity 0.5s ease',
                  border: '2px solid rgba(0,102,255,0.5)',
                  boxShadow: 'inset 0 0 20px rgba(0,102,255,0.1)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Devamı butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/galeri"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Tüm Galeriyi Gör
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
