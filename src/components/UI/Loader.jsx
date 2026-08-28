import { useEffect, useRef } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'

import { playerData } from '../../data/playerData'
import { useAppReady } from '../../hooks/useAppReady'

// Assets del primer viewport: la foto del Hero y el escudo del club.
const CRITICAL_ASSETS = [playerData.image, playerData.logoCurrentClub]

/**
 * Pantalla de carga: logo GM_ + barra de progreso real.
 *
 * @param {() => void} onReveal  Se dispara cuando arranca la cortina (el Hero
 *                               debe empezar a animar acá, para que la reveal
 *                               lo muestre ya en movimiento).
 * @param {() => void} onFinish  Se dispara al terminar la salida: desmontar.
 */
export function Loader({ onReveal, onFinish }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const { progress, complete } = useAppReady(CRITICAL_ASSETS)

  // Los callbacks se leen por ref para que la salida no se reinicie si el
  // padre re-renderiza con handlers nuevos.
  const cbRef = useRef({ onReveal, onFinish })
  useEffect(() => {
    cbRef.current = { onReveal, onFinish }
  })

  useEffect(() => {
    if (!complete) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      cbRef.current.onReveal?.()
      const tween = gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => cbRef.current.onFinish?.(),
      })
      return () => tween.kill()
    }

    const tl = gsap.timeline({ onComplete: () => cbRef.current.onFinish?.() })
    tl.to(contentRef.current, { opacity: 0, y: -14, duration: 0.35, ease: 'power2.in' }).to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.95,
        ease: 'expo.inOut',
        onStart: () => cbRef.current.onReveal?.(),
      },
      '-=0.05'
    )

    return () => tl.kill()
  }, [complete])

  return (
    <Box
      ref={overlayRef}
      position="fixed"
      inset={0}
      zIndex={9999}
      bg="brand.dark"
      willChange="transform"
      role="progressbar"
      aria-label="Cargando"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <Flex ref={contentRef} h="100%" direction="column" align="center" justify="center">
        {/* Logo — mismas iniciales que el Navbar */}
        <Text
          fontFamily="heading"
          fontSize={{ base: '56px', md: '72px' }}
          letterSpacing="0.08em"
          lineHeight="1"
          color="white"
          userSelect="none"
        >
          GM
          <Box as="span" color="brand.brown" ml="2px">
            _
          </Box>
        </Text>

        {/* Barra de progreso */}
        <Box
          mt={6}
          w={{ base: '150px', md: '190px' }}
          h="2px"
          bg="whiteAlpha.200"
          overflow="hidden"
        >
          <Box
            h="100%"
            w="100%"
            bg="brand.brown"
            boxShadow="0 0 12px rgba(156,117,90,0.55)"
            transformOrigin="left center"
            willChange="transform"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Loader
