import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook GSAP reutilizable: revela un elemento al hacer scroll.
 * Respeta prefers-reduced-motion. Devuelve un ref que se asigna al nodo.
 *
 * @param {object} opts
 * @param {number} opts.y          desplazamiento inicial en px (default 40)
 * @param {number} opts.from       opacity inicial (default 0)
 * @param {number} opts.duration   duración (default 1)
 * @param {string} opts.start      ScrollTrigger start (default 'top 85%')
 * @param {number} opts.delay      delay (default 0)
 * @param {boolean} opts.scrub     usar scrub en vez de play once (default false)
 */
export function useScrubReveal(opts = {}) {
  const ref = useRef(null)

  const {
    y = 40,
    from = 0,
    duration = 1,
    start = 'top 85%',
    delay = 0,
    scrub = false,
  } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: from },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            ...(scrub
              ? { end: 'top 45%', scrub: 0.6 }
              : { toggleActions: 'play none none reverse' }),
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [y, from, duration, start, delay, scrub])

  return ref
}

export default useScrubReveal
