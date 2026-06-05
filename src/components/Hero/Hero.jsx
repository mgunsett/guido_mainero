import { useRef, useEffect, useMemo } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import MatchBox from './MatchBox'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const ghostRef = useRef(null)
  const lettersRef = useRef(null)
  const photoRef = useRef(null)
  const glowRef = useRef(null)
  const vignetteRef = useRef(null)

  // Palabra grande del hero: último término del nombre.
  const heroWord = useMemo(() => {
    const parts = playerData.name.trim().split(/\s+/)
    return (parts[parts.length - 1] || playerData.name).toUpperCase()
  }, [])

  const letters = useMemo(() => heroWord.split(''), [heroWord])

  // ── Entry animation + vignette scrub ──────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const letterEls = lettersRef.current?.querySelectorAll('[data-letter]')

      if (!reduced && letterEls?.length) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.fromTo(
          letterEls,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.4, stagger: 0.08 },
          0.2
        )
        tl.fromTo(
          photoRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 },
          0.5
        )
        // glow flash
        tl.fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 },
          1.55
        )
      } else {
        gsap.set(photoRef.current, { clipPath: 'inset(0%)' })
      }

      // Vignette se intensifica al hacer scroll
      gsap.fromTo(
        vignetteRef.current,
        { opacity: 0.35 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Mouse parallax ────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const inner = innerRef.current
    if (!inner) return

    const bgX = gsap.quickTo(ghostRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
    const bgY = gsap.quickTo(ghostRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
    const midX = gsap.quickTo(lettersRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
    const midY = gsap.quickTo(lettersRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
    const phX = gsap.quickTo(photoRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
    const phY = gsap.quickTo(photoRef.current, 'y', { duration: 0.6, ease: 'power2.out' })

    const onMove = (e) => {
      const r = inner.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      bgX(nx * 6)
      bgY(ny * 6)
      midX(nx * 14)
      midY(ny * 14)
      phX(nx * 28)
      phY(ny * 28)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Box
      ref={sectionRef}
      as="section"
      id="hero"
      position="relative"
      h="200vh"
      zIndex={1}
      bg="brand.dark"
    >
      {/* Inner sticky */}
      <Box
        ref={innerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
      >
        {/* ── Layer 1: ghost text + grid + glow (z=1) ── */}
        <Box ref={ghostRef} position="absolute" inset={0} zIndex={1}>
          <Box className="deco-grid" />
          {/* glow esquina superior izq */}
          <Box
            position="absolute"
            top="-10%"
            left="-5%"
            w="60vw"
            h="60vw"
            background="radial-gradient(ellipse, rgba(156,117,90,0.07) 0%, transparent 70%)"
            pointerEvents="none"
          />
          {/* glow esquina inferior der */}
          <Box
            position="absolute"
            bottom="-10%"
            right="-5%"
            w="55vw"
            h="55vw"
            background="radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)"
            pointerEvents="none"
          />
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="center"
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: '34vw', md: '28vw', lg: '24vw' }}
              lineHeight={0.85}
              letterSpacing="0.01em"
              color="transparent"
              sx={{
                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              }}
              userSelect="none"
              whiteSpace="nowrap"
            >
              {heroWord}
            </Text>
          </Flex>
        </Box>

        {/* glow flash overlay */}
        <Box
          ref={glowRef}
          position="absolute"
          inset={0}
          zIndex={2}
          opacity={0}
          pointerEvents="none"
          background="radial-gradient(ellipse at 50% 60%, rgba(156,117,90,0.18) 0%, transparent 60%)"
        />

        {/* ── Layer 2: letras visibles (z=5) ── */}
        <Box
          ref={lettersRef}
          position="absolute"
          inset={0}
          zIndex={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <Flex overflow="hidden" lineHeight={0.82}>
            {letters.map((ch, i) => (
              <Box
                key={i}
                data-letter
                as="span"
                display="inline-block"
                fontFamily="heading"
                fontSize={{ base: '20vw', md: '24vw', lg: '20vw' }}
                color="white"
                letterSpacing="-0.01em"
              >
                {ch}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* ── Layer 3: foto jugador (z=10) ── */}
        <Flex
          position="absolute"
          inset={0}
          zIndex={10}
          align="flex-end"
          justify="center"
          pointerEvents="none"
        >
          <Box
            ref={photoRef}
            as="img"
            src={playerData.image}
            alt={playerData.fullName}
            h={{ base: '72vh', md: '86vh', lg: '92vh' }}
            objectFit="contain"
            objectPosition="bottom center"
            sx={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            filter="drop-shadow(0 30px 60px rgba(0,0,0,0.6))"
          />
        </Flex>

        {/* ── Static UI: número + posición + club (izq) ── */}
        <Box
          position="absolute"
          left={{ base: 6, md: 12, lg: 20 }}
          top="50%"
          transform="translateY(-50%)"
          zIndex={20}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: '7xl', md: '8xl' }}
            lineHeight={0.9}
            color="transparent"
            sx={{ WebkitTextStroke: '2px rgba(156,117,90,0.9)' }}
          >
            {playerData.number}
          </Text>
          <Text
            fontFamily="condensed"
            fontSize={{ base: '10px', md: 'xs' }}
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="whiteAlpha.700"
            mt={2}
          >
            {playerData.position}
          </Text>
          <Text
            fontFamily="condensed"
            fontSize={{ base: '10px', md: 'xs' }}
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="brand.brown"
            mt={1}
          >
            {playerData.nationalityFlag} {playerData.nationality}
          </Text>
        </Box>

        {/* ── MatchBox float (der desktop) ── */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          right={20}
          top="50%"
          transform="translateY(-50%)"
          zIndex={20}
        >
          <MatchBox variant="float" />
        </Box>

        {/* ── MatchBox strip (mobile) ── */}
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="absolute"
          bottom="56px"
          left={0}
          right={0}
          px={6}
          zIndex={20}
        >
          <MatchBox variant="strip" />
        </Box>

        {/* ── Marquee bottom ── */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          zIndex={23}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
          bg="rgba(8,12,18,0.6)"
          backdropFilter="blur(8px)"
          py={2}
          overflow="hidden"
        >
          <Box className="marquee-track">
            {[...Array(2)].map((_, dup) => (
              <Flex key={dup} as="span" align="center">
                {playerData.marqueeItems.map((item, i) => (
                  <Text
                    key={`${dup}-${i}`}
                    as="span"
                    fontFamily="condensed"
                    fontSize="xs"
                    letterSpacing="0.24em"
                    textTransform="uppercase"
                    color="whiteAlpha.600"
                    px={6}
                  >
                    {item}
                  </Text>
                ))}
              </Flex>
            ))}
          </Box>
        </Box>

        {/* Noise overlay (z=22) */}
        <Box className="noise-overlay" zIndex={22} />

        {/* Vignette (z=24) */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={24}
          pointerEvents="none"
          background="radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(8,12,18,0.85) 100%)"
        />
      </Box>
    </Box>
  )
}

export default Hero
