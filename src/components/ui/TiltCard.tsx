import { ReactNode, useRef, useCallback } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function TiltCard({
  children,
  className = '',
  style,
  intensity = 6,
  onMouseEnter,
  onMouseLeave,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`
  }, [intensity])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e)
  }, [onMouseEnter])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    onMouseLeave?.(e)
  }, [onMouseLeave])

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: 'transform 0.2s ease-out', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
