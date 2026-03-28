import { Phone, MessageCircle, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuickContactBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ backgroundColor: 'var(--accent)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-white" />
            <span className="text-white font-semibold text-base">0506 125 28 61</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+905061252861"
              className="flex items-center gap-2 bg-white text-sm font-bold px-5 py-2.5 rounded-sm transition-all duration-200 hover:bg-gray-100 min-h-[44px]"
              style={{ color: 'var(--accent)' }}
            >
              <Phone size={14} />
              TIKLA VE ARA
            </a>
            <a
              href="https://wa.me/905061252861"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-sm transition-all duration-200 hover:bg-white/10 min-h-[44px]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="mailto:info@otoelektrik.com"
              className="hidden sm:flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-sm transition-all duration-200 hover:bg-white/10 min-h-[44px]"
            >
              <Mail size={16} />
              E-Posta
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
