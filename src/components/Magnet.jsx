import { useEffect, useRef, useState } from 'react'

export default function Magnet({ children, className = '', padding = 84, strength = 3.4 }) {
  const wrapperRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!wrapperRef.current || event.pointerType === 'touch') return
      const { left, top, width, height } = wrapperRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const nearby = Math.abs(centerX - event.clientX) < width / 2 + padding
        && Math.abs(centerY - event.clientY) < height / 2 + padding
      setActive(nearby)
      setPosition(nearby
        ? { x: (event.clientX - centerX) / strength, y: (event.clientY - centerY) / strength }
        : { x: 0, y: 0 })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [padding, strength])

  return (
    <span ref={wrapperRef} className={`magnet ${className}`}>
      <span className="magnet-inner" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: active ? 'transform .24s ease-out' : 'transform .55s cubic-bezier(.22,1,.36,1)' }}>
        {children}
      </span>
    </span>
  )
}
