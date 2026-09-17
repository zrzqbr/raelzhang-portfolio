import { useEffect, useRef } from 'react'

export default function EyeFollow() {
  const eyeRef = useRef(null)
  const pupilRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const handlePointerMove = (event) => {
      if (!eyeRef.current || !pupilRef.current) return
      const bounds = eyeRef.current.getBoundingClientRect()
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) - Math.PI / 4
      const distance = Math.min(7, Math.hypot(event.clientX - centerX, event.clientY - centerY) / 40)
      pupilRef.current.style.transform = `translate3d(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px, 0)`
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div className="eye-orbit" ref={eyeRef} aria-label="会跟随指针转动的眼睛">
      <span className="orbit-tick tick-a" />
      <span className="orbit-tick tick-b" />
      <div className="eye-shell">
        <div className="eye-pupil" ref={pupilRef}><span /></div>
      </div>
    </div>
  )
}
