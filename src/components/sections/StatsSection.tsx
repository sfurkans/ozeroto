import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { stats } from '../../data/stats'

function parseNumericValue(val: string): { num: number; prefix: string; suffix: string } {
  const match = val.match(/^(%?)(\d+)(\+?)$/)
  if (!match) return { num: 0, prefix: '', suffix: '' }
  return { num: parseInt(match[2], 10), prefix: match[1], suffix: match[3] }
}

function AnimatedNumber({ value }: { value: string }) {
  const { num, prefix, suffix } = parseNumericValue(value)
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.max(1, Math.ceil(num / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= num) {
        setDisplay(num)
        clearInterval(timer)
      } else {
        setDisplay(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, num])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 50%, #0047b3 100%)',
      }}
    >
      {/* Decorative circles with parallax */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: '#fff', y: bgY }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10"
        style={{ backgroundColor: '#fff', y: bgY }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-white/70 text-sm font-semibold uppercase tracking-widest mb-10"
        >
          Rakamlarla Biz
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                <AnimatedNumber value={stat.value} />
              </div>
              <div
                className="w-8 h-0.5 mx-auto mb-3 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
              />
              <div className="text-xs sm:text-sm md:text-base text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
