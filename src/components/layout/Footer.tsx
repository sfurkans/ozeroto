import { Link } from 'react-router-dom'
import { Phone, MessageCircle, MapPin, Clock, Zap, ArrowUpRight, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Ana Sayfa', path: '/' },
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'Hizmetler', path: '/hizmetler' },
  { label: 'Ürünler', path: '/urunler' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'İletişim', path: '/iletisim' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#060e1a' }}>
      {/* Üst dekoratif çizgi */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #0066ff, transparent)' }} />

      {/* Arka plan glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,102,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Ana içerik */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo + açıklama */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #0066ff, #3b8bff)' }}
              >
                <Zap size={20} fill="white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-none">Özer Oto Elektrik</span>
                <span className="text-xs text-gray-600 leading-none">& Aksesuar</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 mb-5">
              Profesyonel oto elektrik, aksesuar montaj ve onarım hizmetleri.
            </p>
            {/* Social-like icons */}
            <div className="flex gap-2">
              <a
                href="tel:+905061252861"
                className="w-11 h-11 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Phone size={14} className="text-gray-400" />
              </a>
              <a
                href="https://wa.me/905061252861"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <MessageCircle size={14} className="text-gray-400" />
              </a>
              <a
                href="mailto:info@otoelektrik.com"
                className="w-11 h-11 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Mail size={14} className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Sayfalar</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs text-gray-500 transition-all duration-200 hover:text-white hover:translate-x-1 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: '#0066ff' }} />
                  {link.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">İletişim</h4>
            <div className="space-y-4">
              <a href="tel:+905061252861" className="flex items-start gap-2.5 group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-gray-600 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-white transition-colors">0506 125 28 61</span>
              </a>
              <a href="mailto:info@otoelektrik.com" className="flex items-start gap-2.5 group">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-gray-600 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-white transition-colors">info@otoelektrik.com</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-600" />
                <span className="text-xs text-gray-500 break-words">Ahi Evran, Ahi Mesut Blv. Otorey Galericiler Sitesi, Sincan/Ankara</span>
              </div>
            </div>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Çalışma Saatleri</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 flex-shrink-0 text-gray-600" />
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between gap-4">
                    <span>Pazartesi - Cumartesi</span>
                    <span className="text-white/70">09:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Pazar</span>
                    <span className="text-red-400/70">Kapalı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Özer Oto Elektrik & Aksesuar. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-700">
            Sincan / Ankara
          </p>
        </div>
      </div>
    </footer>
  )
}
