import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import BlurText from './BlurText'

export default function HeroMotion() {
  const heroRef = useRef(null)
  const frameRef = useRef(0)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch' || !heroRef.current) return
    const bounds = heroRef.current.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const nx = (x / bounds.width - 0.5) * 2
    const ny = (y / bounds.height - 0.5) * 2

    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      if (!heroRef.current) return
      heroRef.current.style.setProperty('--hero-x', `${x}px`)
      heroRef.current.style.setProperty('--hero-y', `${y}px`)
      heroRef.current.style.setProperty('--hero-nx', nx.toFixed(3))
      heroRef.current.style.setProperty('--hero-ny', ny.toFixed(3))
      heroRef.current.style.setProperty('--title-x', `${nx * -18}px`)
      heroRef.current.style.setProperty('--title-y', `${ny * -12}px`)
      heroRef.current.style.setProperty('--media-x', `${nx * 15}px`)
      heroRef.current.style.setProperty('--media-y', `${ny * 10}px`)
      heroRef.current.style.setProperty('--tilt-x', `${ny * -1.4}deg`)
      heroRef.current.style.setProperty('--tilt-y', `${nx * 2}deg`)
      heroRef.current.classList.add('is-pointer-active')
    })
  }

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current)
    if (!heroRef.current) return
    heroRef.current.style.setProperty('--hero-x', '64%')
    heroRef.current.style.setProperty('--hero-y', '42%')
    heroRef.current.style.setProperty('--hero-nx', '0')
    heroRef.current.style.setProperty('--hero-ny', '0')
    heroRef.current.style.setProperty('--title-x', '0px')
    heroRef.current.style.setProperty('--title-y', '0px')
    heroRef.current.style.setProperty('--media-x', '0px')
    heroRef.current.style.setProperty('--media-y', '0px')
    heroRef.current.style.setProperty('--tilt-x', '0deg')
    heroRef.current.style.setProperty('--tilt-y', '0deg')
    heroRef.current.classList.remove('is-pointer-active')
  }

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/ambient-tech.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-pointer-light" aria-hidden="true" />
      <div className="hero-inner shell">
        <p className="hero-label">PORTFOLIO / 2026</p>
        <h1 className="cursor-target"><BlurText text="ZHANGRUI" /></h1>
        <div className="hero-bottom">
          <div className="hero-number"><strong>700<sup>万+</sup></strong><span>项目专项全网曝光</span></div>
          <p>AI 产品技术运营与客户经理。<br />连接产品、用户与商业结果。</p>
          <strong className="hero-manifesto"><em>TECH</em> IS NOT<br />THE ENDPOINT</strong>
        </div>
        <a className="scroll-cue cursor-target" href="#profile" aria-label="查看个人介绍"><ArrowDown size={17} /></a>
      </div>
    </section>
  )
}
