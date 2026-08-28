import { useState, useEffect } from 'react'

// Coincide con el breakpoint `md` de Chakra (48em): todo lo de abajo es mobile.
const MOBILE_QUERY = '(max-width: 47.99em)'

/**
 * Devuelve true cuando el viewport es mobile. Se usa para desactivar
 * animaciones pesadas (GSAP/Framer) en pantallas chicas.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
