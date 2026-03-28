import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Phone, ChevronRight, MessageCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Ana Sayfa', path: '/' },
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'Hizmetlerimiz', path: '/hizmetler' },
  { label: 'Ürünler', path: '/urunler' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'İletişim', path: '/iletisim' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const lastScrollY = useRef(0)

  const handleNavClick = useCallback((e: React.MouseEvent, path: string) => {
    e.preventDefault()
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(path)
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      if (currentY > 300) {
        setHidden(currentY > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isOpen ? '#0a1628' : scrolled ? 'rgba(10, 22, 40, 0.85)' : 'transparent',
        backdropFilter: !isOpen && scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: !isOpen && scrolled ? 'blur(20px) saturate(180%)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.2), 0 0 40px rgba(0,102,255,0.05)' : 'none',
        borderBottom: scrolled || isOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transform: hidden && !isOpen ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="relative flex items-center gap-3 px-3 py-1.5 -ml-3 group"
          >
            {/* Glow efekti */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.55) 0%, rgba(0,102,255,0.25) 40%, transparent 70%)',
                filter: 'blur(16px)',
                transform: 'scale(1.8)',
              }}
            />
            {/* Logo icon */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="relative flex-shrink-0">
              {/* Şimşek + yaprak tarzı soyut logo */}
              <path
                d="M20 3L8 20h8l-2 13L28 16h-8l2-13z"
                fill="url(#logoGrad)"
              />
              <path
                d="M20 3L8 20h8l-2 13L28 16h-8l2-13z"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="logoGrad" x1="8" y1="3" x2="28" y2="33" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3b8bff" />
                  <stop offset="100%" stopColor="#0052cc" />
                </linearGradient>
              </defs>
            </svg>
            {/* Yazı */}
            <div className="relative">
              <div className="flex items-baseline gap-0.5 leading-none">
                <span className="font-bold text-sm sm:text-lg text-white tracking-tight">ÖZER</span>
                <span className="font-bold text-sm sm:text-lg tracking-tight" style={{ color: '#3b8bff' }}>OTO</span>
              </div>
              <span className="text-[10px] sm:text-xs leading-none mt-1 block uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Elektrik & Aksesuar</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 relative group"
                style={{
                  color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+905061252861"
              className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
            >
              <Phone size={15} />
              0506 125 28 61
            </a>

            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              }}
              title="Tema Değiştir"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ color: theme === 'dark' ? '#fbbf24' : '#6366f1' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>

            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-sm"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden overflow-hidden"
          style={{
            backgroundColor: '#0a1628',
            borderTop: '1px solid rgba(0,102,255,0.15)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <nav className="flex flex-col px-5 py-5 gap-0.5">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-sm text-sm font-medium"
                  style={{
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    background: isActive ? 'linear-gradient(90deg, rgba(0,102,255,0.2), rgba(0,102,255,0.05))' : 'transparent',
                    borderLeft: isActive ? '2px solid #0066ff' : '2px solid transparent',
                  }}
                >
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#0066ff', boxShadow: '0 0 6px #0066ff' }}
                    />
                  )}
                  {link.label}
                </Link>
              )
            })}

            {/* Ayırıcı */}
            <div className="h-px my-3 mx-2" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

            {/* Butonlar */}
            <div className="flex gap-2.5 px-2">
              <a
                href="tel:+905061252861"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-sm text-white"
                style={{ backgroundColor: '#0066ff', boxShadow: '0 4px 12px rgba(0,102,255,0.3)' }}
              >
                <Phone size={14} />
                Ara
              </a>
              <a
                href="https://wa.me/905061252861"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-sm text-white"
                style={{ backgroundColor: '#25D366', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
