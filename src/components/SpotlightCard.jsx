import { useRef } from 'react'

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(132, 233, 255, 0.16)' }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch' || !cardRef.current) return
    const bounds = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <article ref={cardRef} onPointerMove={handlePointerMove} className={`card-spotlight ${className}`}>
      {children}
    </article>
  )
}
