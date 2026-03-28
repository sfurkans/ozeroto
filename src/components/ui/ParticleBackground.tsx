import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Spark {
  fromIndex: number
  toIndex: number
  progress: number
  speed: number
  life: number
  maxLife: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: Node[] = []
    let sparks: Spark[] = []
    let w = 0
    let h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createNodes = () => {
      const count = Math.min(Math.floor((w * h) / 15000), 90)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8,
      }))
    }

    const maxDist = 140

    const maybeSpawnSpark = () => {
      if (sparks.length > 10) return
      if (Math.random() > 0.04) return

      const i = Math.floor(Math.random() * nodes.length)
      let closest = -1
      let closestDist = maxDist

      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < closestDist) {
          closestDist = dist
          closest = j
        }
      }

      if (closest !== -1) {
        const life = 30 + Math.random() * 30
        sparks.push({
          fromIndex: i,
          toIndex: closest,
          progress: 0,
          speed: 0.025 + Math.random() * 0.035,
          life,
          maxLife: life,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const isDark = themeRef.current === 'dark'
      const nodeAlpha = isDark ? 0.5 : 0.4
      const lineBase = isDark ? 0.12 : 0.08

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy

        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        // Node dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,102,255,${nodeAlpha})`
        ctx.fill()

        // Faint connection lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * lineBase
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = `rgba(0,102,255,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Spawn sparks
      maybeSpawnSpark()

      // Update & draw sparks (electric current effect)
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s]
        spark.progress += spark.speed
        spark.life--

        if (spark.life <= 0 || spark.progress > 1) {
          sparks.splice(s, 1)
          continue
        }

        const from = nodes[spark.fromIndex]
        const to = nodes[spark.toIndex]
        if (!from || !to) { sparks.splice(s, 1); continue }

        const x = from.x + (to.x - from.x) * spark.progress
        const y = from.y + (to.y - from.y) * spark.progress

        const fadeIn = Math.min(spark.progress / 0.15, 1)
        const fadeOut = Math.min(spark.life / 12, 1)
        const alpha = fadeIn * fadeOut

        // Electric trail line
        const trailAlpha = isDark ? alpha * 0.9 : alpha * 0.8
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(0,102,255,${trailAlpha})`
        ctx.lineWidth = 3
        ctx.stroke()

        // Bright spark head
        const headAlpha = isDark ? alpha : alpha * 0.9
        const headSize = 4

        ctx.beginPath()
        ctx.arc(x, y, headSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100,180,255,${headAlpha})`
        ctx.fill()

        // Outer glow
        const glowSize = headSize * 5
        ctx.beginPath()
        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        grad.addColorStop(0, `rgba(0,102,255,${headAlpha * 0.7})`)
        grad.addColorStop(0.5, `rgba(0,102,255,${headAlpha * 0.15})`)
        grad.addColorStop(1, 'rgba(0,102,255,0)')
        ctx.fillStyle = grad
        ctx.fill()

        // Flash the source node
        if (spark.progress < 0.15) {
          ctx.beginPath()
          ctx.arc(from.x, from.y, 6, 0, Math.PI * 2)
          const nodeGrad = ctx.createRadialGradient(from.x, from.y, 0, from.x, from.y, 6)
          nodeGrad.addColorStop(0, `rgba(0,102,255,${alpha * 0.6})`)
          nodeGrad.addColorStop(1, 'rgba(0,102,255,0)')
          ctx.fillStyle = nodeGrad
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createNodes()
    draw()

    const onResize = () => {
      resize()
      createNodes()
      sparks = []
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
