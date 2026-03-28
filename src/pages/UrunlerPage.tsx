import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import PageHeader from '../components/ui/PageHeader'
import { products, categories } from '../data/products'
import { Eye } from 'lucide-react'

function FlipCard({ product }: { product: typeof products[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative cursor-pointer h-full rounded-sm overflow-hidden"
      style={{ perspective: '1000px', backgroundColor: '#0a1628' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="rounded-sm overflow-hidden flex flex-col h-full"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: '#0a1628',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 1px 3px var(--shadow)',
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            {/* Fotoğraftan alt kısma yumuşak geçiş */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #0a1628, transparent)' }}
            />
          </div>
          <div
            className="p-5 flex-1"
            style={{ backgroundColor: '#0a1628' }}
          >
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-sm mb-3 inline-block"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              {product.category}
            </span>
            <h3 className="font-bold mb-1 text-white">{product.title}</h3>
            <p className="text-xs flex items-center gap-1 text-white/60">
              <Eye size={12} /> Detay için üzerine gelin
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 50%, #3b8bff 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 30px rgba(0,102,255,0.3), 0 12px 40px rgba(0,102,255,0.2)',
          }}
        >
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-sm mb-3 inline-block w-fit"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            {product.category}
          </span>
          <h3 className="font-bold text-lg mb-3 text-white">{product.title}</h3>
          <p className="text-sm leading-relaxed mb-4 text-white/80">
            {product.description}
          </p>
          <a
            href="https://wa.me/905061252861"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm transition-opacity hover:opacity-90 min-h-[44px] w-fit"
            style={{ backgroundColor: '#fff', color: '#0066ff' }}
          >
            Bilgi Al
          </a>
        </div>
      </div>
    </div>
  )
}

export default function UrunlerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü')

  const filtered =
    activeCategory === 'Tümü'
      ? products
      : products.filter(p => p.category === activeCategory)

  return (
    <div className="pt-16 md:pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader title="Ürünlerimiz" />

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <FlipCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Yakında */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12 py-10 rounded-sm"
            style={{ border: '1px dashed var(--border)' }}
          >
            <p className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Yeni ürünler yakında eklenecektir...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
