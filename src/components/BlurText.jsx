import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

const collectKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))])
  return Object.fromEntries([...keys].map((key) => [key, [from[key], ...steps.map((step) => step[key])]]))
}

export default function BlurText({ text, className = '', delay = 55, direction = 'bottom' }) {
  const characters = [...text]
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const from = useMemo(() => ({
    filter: 'blur(14px)',
    opacity: 0,
    y: direction === 'top' ? -34 : 34,
  }), [direction])

  const to = useMemo(() => [
    { filter: 'blur(5px)', opacity: 0.58, y: direction === 'top' ? 4 : -4 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ], [direction])

  return (
    <span ref={ref} className={`blur-text ${className}`} aria-label={text}>
      {characters.map((character, index) => (
        <motion.span
          aria-hidden="true"
          key={`${character}-${index}`}
          initial={reduceMotion ? false : from}
          animate={reduceMotion || inView ? (reduceMotion ? undefined : collectKeyframes(from, to)) : from}
          transition={{ duration: 0.72, times: [0, 0.45, 1], delay: index * delay / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {character === ' ' ? '\u00A0' : character}
        </motion.span>
      ))}
    </span>
  )
}
