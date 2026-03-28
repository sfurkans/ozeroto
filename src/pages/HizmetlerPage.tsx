import { motion } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import PageHeader from '../components/ui/PageHeader'

interface ServiceCard {
  title: string
  image: string
  description: string
}

const services: ServiceCard[] = [
  {
    title: 'Oto Kalorifer Tamiri ve Petek Temizliği',
    image: 'https://images.unsplash.com/photo-1587121892719-1711ec9cc798?w=1080&fit=crop',
    description: 'Aracınızın kalorifer sistemi ve petekleri profesyonel ekipmanlarla temizlenir, arızalı parçalar onarılır. Kış aylarında verimli ısınma, yaz aylarında sağlıklı hava akışı için düzenli bakım yapılır.',
  },
  {
    title: 'Oto Merkezi Kilit Sistemleri',
    image: 'https://images.unsplash.com/photo-1710006548781-eff5670376fa?w=1080&fit=crop',
    description: 'Aracınız için merkezi kilit sistemi montajı, arıza tespiti ve onarımı yapılır. Kumanda programlama, kapı kilit motoru değişimi ve immobilizer sorunları uzman kadromuz tarafından çözüme kavuşturulur.',
  },
  {
    title: 'Oto Klima Tamiri ve Gaz Dolumu',
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1080&fit=crop',
    description: 'Klima sisteminizin soğutma performansı düştüyse veya hiç çalışmıyorsa, kompresör, kondenser ve evaporatör kontrolü yapılır. Freon gazı dolumu, kaçak tespiti ve tüm klima arızaları profesyonelce giderilir.',
  },
  {
    title: 'Gösterge Renk Değişimi ve Araç İçi Işıklandırma',
    image: 'https://celalituning.com/wp-content/uploads/2023/08/64-renk-arac-ici-ambiyans-aydinlatma2.jpg',
    description: 'Gösterge paneli aydınlatma rengini istediğiniz renge dönüştürüyoruz. Araç içi ambiyans LED aydınlatma, kapı altı logo projektör ve ayak altı ışıklandırma montajı ile aracınıza modern ve kişisel bir hava katıyoruz.',
  },
]

export default function HizmetlerPage() {
  return (
    <div className="pt-16 md:pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader title="Hizmetlerimiz" />

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-7">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative rounded-sm overflow-hidden cursor-default flex flex-col sm:flex-row"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 8px var(--shadow)',
                  transition: 'box-shadow 0.8s ease, border-color 0.8s ease, transform 0.8s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(0,102,255,0.5)'
                  el.style.boxShadow = '0 0 24px rgba(0,102,255,0.25), 0 12px 40px rgba(0,0,0,0.15)'
                  el.style.transform = 'translateY(-6px)'
                  const img = el.querySelector('img')
                  if (img) img.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'var(--border)'
                  el.style.boxShadow = '0 2px 8px var(--shadow)'
                  el.style.transform = 'translateY(0)'
                  const img = el.querySelector('img')
                  if (img) img.style.transform = 'scale(1)'
                }}
              >
                  {/* Arka plan fotoğraf */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                />

                {/* Overlay: soldan sağa koyu geçiş */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)' }}
                />

                {/* İçerik: ortada */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-5 sm:p-8 w-full min-h-[240px] sm:min-h-[320px]">
                  <div
                    className="w-8 h-1 rounded-full mb-4 mx-auto transition-all duration-[1s] ease-out group-hover:w-14"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <h3 className="font-extrabold text-2xl sm:text-3xl mb-3 text-white drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90 drop-shadow-md max-w-lg">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Devamı gelecek */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12 py-10 rounded-sm"
            style={{ border: '1px dashed var(--border)' }}
          >
            <p className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Diğer hizmetlerimiz yakında eklenecektir...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
