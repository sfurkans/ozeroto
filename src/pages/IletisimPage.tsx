import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

export default function IletisimPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000))
    alert('Mesajınız alındı! En kısa sürede dönüş yapacağız.')
    reset()
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    borderRadius: '2px',
    padding: '12px 16px',
    fontSize: '16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div className="pt-16 md:pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageHeader title="İletişim" />

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Bize Ulaşın</h2>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Phone, label: 'Telefon', value: '0506 125 28 61', href: 'tel:+905061252861' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '0506 125 28 61', href: 'https://wa.me/905061252861' },
                  { icon: Mail, label: 'E-Posta', value: 'info@otoelektrik.com', href: 'mailto:info@otoelektrik.com' },
                  { icon: MapPin, label: 'Adres', value: 'Ahi Evran, Ahi Mesut Blv. Otorey Galericiler Sitesi, Sincan/Ankara', href: 'https://maps.google.com/?q=Ahi+Evran+Ahi+Mesut+Blv+Otorey+Galericiler+Sitesi+Sincan+Ankara' },
                ].map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-sm transition-all duration-200"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 1px 3px var(--shadow)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-light)' }}
                    >
                      <item.icon size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>{item.label}</div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Harita */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-sm overflow-hidden" style={{ border: '1px solid var(--border)', zIndex: 10000 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3057.9701187113023!2d32.558063976490295!3d39.96442078304356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDU3JzUxLjkiTiAzMsKwMzMnMzguMyJF!5e0!3m2!1str!2str!4v1774518925590!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konum"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Mesaj Gönderin</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Ad Soyad *
                  </label>
                  <input
                    {...register('name', { required: 'Ad soyad gerekli' })}
                    style={inputStyle}
                    placeholder="Adınız Soyadınız"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.name ? '#ef4444' : 'var(--border)')}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Telefon *
                  </label>
                  <input
                    {...register('phone', { required: 'Telefon gerekli' })}
                    style={inputStyle}
                    placeholder="05xx xxx xx xx"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : 'var(--border)')}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    E-Posta
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    style={inputStyle}
                    placeholder="mail@ornek.com"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Mesajınız *
                  </label>
                  <textarea
                    {...register('message', { required: 'Mesaj gerekli' })}
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Nasıl yardımcı olabiliriz?"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.message ? '#ef4444' : 'var(--border)')}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-sm font-bold text-sm text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <Send size={15} />
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
