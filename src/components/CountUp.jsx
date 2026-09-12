import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

export default function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 / duration,
    stiffness: 100 / duration,
  })
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`
      return undefined
    }
    if (inView) motionValue.set(to)
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`
    })
  }, [inView, motionValue, reduceMotion, springValue, suffix, to])

  return <span ref={ref}>0{suffix}</span>
}
