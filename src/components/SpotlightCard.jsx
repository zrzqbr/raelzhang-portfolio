import { useRef } from 'react'

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(132, 233, 255, 0.16)', ...props }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch' || !cardRef.current) return
    const bounds = cardRef.current.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const edgeDistance = Math.min(x, y, bounds.width - x, bounds.height - y)
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor)
    cardRef.current.style.setProperty('--edge-opacity', `${Math.max(0, Math.min(1, (86 - edgeDistance) / 52))}`)
  }

  const handlePointerLeave = () => cardRef.current?.style.setProperty('--edge-opacity', '0')

  return (
    <div ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={`card-spotlight ${className}`} {...props}>
      {children}
    </div>
  )
}
