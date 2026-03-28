import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import { stats } from '../data/stats'
import { Target, Eye } from 'lucide-react'

export default function HakkimizdaPage() {
  return (
    <div className="pt-16 md:pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Biz Kimiz - Full width hero style */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%)' }}
          />
          {/* Alt kenar yumuşak geçiş */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div
              className="w-16 h-1 rounded-full mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
              Biz Kimiz?
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-base leading-relaxed text-white/80">
              <p>
                OtoElektrik & Aksesuar olarak 10 yılı aşkın deneyimimizle Ankara'da araç sahiplerine
                profesyonel oto elektrik ve aksesuar hizmetleri sunuyoruz.
              </p>
              <p>
                Uzman teknisyen kadromuz, orijinal ürünler ve modern ekipmanlarla aracınıza en iyi
                çözümü sunmak için çalışıyoruz. Müşteri memnuniyeti her zaman birinci önceliğimizdir.
              </p>
              <p>
                Oto elektrik arızalarından müzik sistemine, aydınlatmadan güvenlik sistemlerine kadar
                geniş hizmet yelpazesiyle yanınızdayız.
              </p>
            </div>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-center py-6 rounded-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: 'var(--accent)' }}>{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-0">
          {[
            {
              icon: Target,
              title: 'Misyonumuz',
              image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop',
              texts: [
                'Araç sahiplerine en kaliteli oto elektrik ve aksesuar hizmetini sunarak, güvenli ve konforlu bir sürüş deneyimi sağlamak. Her müşterimize özel çözümler üreterek sektörde fark yaratmak.',
                'Orijinal ürünler, uzman işçilik ve dürüst fiyat politikamızla müşterilerimizin güvenini kazanmaya ve korumaya devam etmek en temel amacımızdır.',
              ],
            },
            {
              icon: Eye,
              title: 'Vizyonumuz',
              image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800&h=500&fit=crop',
              texts: [
                "Ankara'nın ve Türkiye'nin en güvenilir oto elektrik ve aksesuar markası olmak. Teknolojiyi yakından takip ederek müşterilerimize her zaman en güncel çözümleri sunmak.",
                'Büyüyen ekibimiz ve genişleyen hizmet ağımızla sektörde lider konuma ulaşarak, müşteri memnuniyetinde referans noktası olmayı hedefliyoruz.',
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative flex flex-col overflow-hidden rounded-sm ${i === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              style={{ minHeight: 'auto' }}
            >
              {/* Fotoğraf */}
              <div className="relative sm:w-1/2 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  style={{
                    minHeight: '240px',
                    transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                />
                {/* Gradient geçiş */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: i === 0
                      ? 'linear-gradient(to right, transparent 40%, var(--bg-primary) 100%)'
                      : 'linear-gradient(to left, transparent 40%, var(--bg-primary) 100%)',
                  }}
                />
                {/* Alt gradient (mobil için) */}
                <div
                  className="absolute inset-0 sm:hidden pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--bg-primary) 100%)' }}
                />
              </div>

              {/* İçerik */}
              <div className="relative sm:w-1/2 flex flex-col justify-center p-6 sm:p-10 -mt-8 sm:mt-0">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), rgba(0,102,255,0.6))',
                      boxShadow: '0 4px 15px rgba(0,102,255,0.3)',
                    }}
                  >
                    <card.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold" style={{ color: 'var(--text-heading)' }}>
                    {card.title}
                  </h3>
                </div>

                <div
                  className="w-12 h-0.5 rounded-full mb-5"
                  style={{ backgroundColor: 'var(--accent)' }}
                />

                <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {card.texts.map((t, j) => (
                    <p key={j}>{t}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
