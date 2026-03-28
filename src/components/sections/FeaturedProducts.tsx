import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { products } from '../../data/products'

export default function FeaturedProducts() {
  const featured = products.slice(0, 4)

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          title="Öne Çıkan Ürünler"
          subtitle="En çok tercih edilen aksesuar ve ekipmanlarımızdan bir seçki."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-sm overflow-hidden"
              style={{
                backgroundColor: '#0a1628',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'box-shadow 0.8s ease, border-color 0.8s ease, transform 0.8s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(0,102,255,0.5)'
                el.style.boxShadow = '0 0 24px rgba(0,102,255,0.2), 0 12px 40px rgba(0,0,0,0.12)'
                el.style.transform = 'translateY(-6px)'
                const img = el.querySelector('img')
                if (img) img.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
                const img = el.querySelector('img')
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              {/* Fotoğraf */}
              <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: '#0a1628' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  style={{ transition: 'opacity 0.5s ease', backgroundColor: 'rgba(0,102,255,0.15)' }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,102,255,0.85)', boxShadow: '0 4px 15px rgba(0,102,255,0.4)' }}
                  >
                    <ShoppingBag size={18} className="text-white" />
                  </div>
                </div>

                {/* Kategori badge */}
                <span
                  className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-sm"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                  }}
                >
                  {product.category}
                </span>

                {/* Fotoğraftan alt kısma yumuşak geçiş */}
                <div
                  className="absolute -bottom-px left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #0a1628, transparent)' }}
                />
              </div>

              {/* İçerik */}
              <div className="p-5 -mt-px" style={{ backgroundColor: '#0a1628' }}>
                <div
                  className="w-6 h-0.5 rounded-full mb-3 transition-all duration-[1s] ease-out group-hover:w-10"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <h3 className="font-bold text-sm mb-1.5 text-white">
                  {product.title}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-2 text-white/60">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/urunler"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Tüm Ürünleri Gör
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
