import { useRef, useEffect, useMemo } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import MatchBox from './MatchBox'

gsap.registerPlugin(ScrollTrigger)


// ── HoverFloat: tilt 3D en hover (rotateX/Y con GSAP) ──
// ─── HOVER FLOAT ─────────────────────────────────────────────────
function HoverFloat({ children, intensity = 1 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2
    const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2
    gsap.to(el, {
      x: dx * 7 * intensity,
      y: dy * 5 * intensity,
      rotateX: -dy * 4 * intensity,
      rotateY:  dx * 4 * intensity,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 600,
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0, y: 0, rotateX: 0, rotateY: 0,
      duration: 0.55,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block', transformStyle: 'preserve-3d',  cursor: 'default' }}
    >
      {children}
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const ghostRef = useRef(null)
  const lettersRef = useRef(null)
  const photoRef = useRef(null)
  const glowRef = useRef(null)

  // Dos palabras apiladas: nombre (chico) + apellido (grande, con impacto).
  const words = useMemo(
    () => [
      {
        text: playerData.name.toUpperCase(),
        ghostFs: { base: '60vw', md: '11vw', lg: '18vw' },
        fs: { base: '35vw', md: '10vw', lg: '11vw' },
        spacing: { base: '-0.02em', md: '0.3em' },
        m: { base: '-0.02em', md: '0.3em', lg: '210px' },
        top: { base: '-280px', md: '-220px', lg: '0' },
      },
      {
        text: playerData.fullName.toUpperCase(),
        ghostFs: { base: '60vw', md: '24vw', lg: '32vw' },
        fs: { base: '40vw', md: '22vw', lg: '23vw' },
        spacing: { base: '-0.02em', md: '-0.04em' },
      },
    ],
    []
  )

  // ── Entry animation ───────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(photoRef.current, { clipPath: 'inset(0%)' })
        return
      }
      const letterEls = lettersRef.current?.querySelectorAll('[data-letter]')
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      if (letterEls?.length) {
        tl.fromTo(
          letterEls,
          { yPercent: 110, opacity: 0, rotateX: -40 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.08 },
          0
        )
      }
      tl.fromTo(
        photoRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06, filter: 'brightness(1.8) saturate(0.4)' },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, filter: 'brightness(1) saturate(1)', duration: 1.5 },
        0.25
      )
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.18, ease: 'power2.in',
            onComplete: () => gsap.to(glowRef.current, { opacity: 0, duration: 0.55, ease: 'power2.out' }),
          },
          1.55
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Mouse parallax — elemento individual + stagger ───
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const container = innerRef.current
    if (!container) return

    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      const xn = (e.clientX - rect.left) / rect.width - 0.5
      const yn = (e.clientY - rect.top) / rect.height - 0.5

      const ghostFirst = ghostRef.current?.querySelector('[data-ghost-first]')
      if (ghostFirst) gsap.to(ghostFirst, { x: xn * 4, y: yn * 2, duration: 1.8, ease: 'power2.out' })

      const ghostSecond = ghostRef.current?.querySelector('[data-ghost-second]')
      if (ghostSecond) gsap.to(ghostSecond, { x: xn * 6, y: yn * 3, duration: 1.6, ease: 'power2.out' })

      const letterEls = lettersRef.current?.querySelectorAll('[data-letter]')
      if (letterEls?.length) gsap.to(letterEls, { x: xn * 14, y: yn * 7, duration: 1.2, ease: 'power2.out', stagger: 0.02 })

    }

    container.addEventListener('mousemove', onMove)
    return () => container.removeEventListener('mousemove', onMove)
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
          {/* glow esquina superior izq (brand.brown) */}
          <Box
            position="absolute"
            top="-10%"
            left="-5%"
            w="60vw"
            h="60vw"
            background="radial-gradient(ellipse, rgba(156,117,90,0.10) 0%, transparent 70%)"
            pointerEvents="none"
          />
          {/* glow esquina inferior der (brand.brown) */}
          <Box
            position="absolute"
            bottom="-10%"
            right="-5%"
            w="55vw"
            h="55vw"
            background="radial-gradient(ellipse, rgba(156,117,90,0.07) 0%, transparent 70%)"
            pointerEvents="none"
          />

          {/* ── Letras Invisibles Bg ── */}
          <Flex
            position="absolute"
            inset={0}
            direction="column"
            align="center"
            justify="center"
            lineHeight={0.82}
          >
            <HoverFloat intensity={0.2}>
            {words.map((w, wi) => (
              <Text
                key={wi}
                data-ghost-first={wi === 0 ? true : undefined}
                data-ghost-second={wi === 1 ? true : undefined}
                fontFamily="heading"
                ml={w.m}
                fontSize={w.ghostFs}
                lineHeight={0.82}
                letterSpacing={w.spacing}
                color="transparent"
                sx={{ WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
                userSelect="none"
                whiteSpace="nowrap"
              >
                {w.text}
              </Text>
            ))}
            </HoverFloat>
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

        {/* ── Letras Visibles White ── */}
        <Box
          ref={lettersRef}
          position="absolute"
          inset={0}
          zIndex={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          {words.map((w, wi) => (
            <Flex key={wi} overflow="hidden" lineHeight={0.82} mt={w.top}>
              {w.text.split('').map((ch, i) => (
                <Box
                  key={`${wi}-${i}`}
                  data-letter
                  as="span"
                  display="inline-block"
                  fontFamily="heading"
                  fontSize={w.fs}
                  color="white"
                  letterSpacing={w.spacing}
                >
                  {ch}
                </Box>
              ))}
            </Flex>
          ))}
        </Box>

        {/* ── Layer 3: foto jugador con tilt 3D (z=10) ── */}
        <Flex
          position="absolute"
          inset={0}
          zIndex={10}
          align="flex-end"
          justify="center"
          pointerEvents="none"
        >
          <Image
            ref={photoRef}
            src={playerData.image}
            alt={playerData.fullName}
            h={{ base: '80vh', md: '86vh', lg: '92vh' }}
            objectFit="contain"
            objectPosition="bottom center"
            sx={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            draggable={false}
            loading="lazy"
          />
         </Flex>

        {/* ── Static UI Desktop ── */}
        <Box
          position="absolute"
          left={{ base: 6, md: 12, lg: 20 }}
          top={{ base: "62%", md: "50%", lg: "50%" }}
          transform="translateY(-50%)"
          zIndex={15}
        >
          <HoverFloat intensity={1.2}>
            <Text
              fontFamily="heading"
              fontSize={{ base: '60px', md: '130px' }}
              lineHeight={0.9}
              color="transparent"
              sx={{ WebkitTextStroke: '2px rgba(156,117,90,0.9)' }}
            >
              {playerData.number}
            </Text>
          </HoverFloat>
          <Box h="1px" w={{base:"60px", md: "70px", lg: "80px"}} bg="brand.brown" mb={3} />
          <Flex direction="column" align="flex-start" >
            <HoverFloat intensity={0.6}>
              <Text
                fontFamily="condensed"
                fontSize={{ base: '8px', md: 'xs' }}
                letterSpacing="0.28em"
                textTransform="uppercase"
                color="whiteAlpha.700"
                mt={{ base: 0, md: 2}}
              >
                {playerData.position}
              </Text>
            </HoverFloat>
            <HoverFloat intensity={1.2}>
              <Text
                fontFamily="condensed"
                fontSize={{ base: '8px', md: 'xs' }}
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.brown"
                mt={{ base: 0, md: 1 }}
              >
                {playerData.nationalityFlag} {playerData.nationality}
              </Text>
            </HoverFloat>
          </Flex>
          {/* Club: escudo + nombre inline */}
          <HoverFloat intensity={0.6}>
          <Flex align="center" gap={2} mt={{ base: 1, md: 3 }}>
            <Box
              as="img"
              src={playerData.logoCurrentClub}
              alt={playerData.currentClub}
              h={{ base: '18px', md: '38px' }}
              w={{ base: '18px', md: '38px' }}
              objectFit="contain"
              flexShrink={0}
            />
            <Text
              fontFamily="condensed"
              fontSize={{ base: '10px', md: 'xs' }}
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="whiteAlpha.700"
            >
              {playerData.currentClub}
            </Text>
          </Flex>
          </HoverFloat>
        </Box>

        {/* ── MatchBox float (der desktop, z=15) ── */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          right={20}
          top="60%"
          transform="translateY(-50%)"
          zIndex={15}
        >
          <MatchBox variant="float" />
        </Box>

        {/* ── MatchBox strip (mobile, z=15) ── */}
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="absolute"
          bottom="24px"
          left={0}
          right={0}
          px={1}
          zIndex={15}
        >
          <MatchBox variant="strip" />
        </Box>

        {/* ── ScrollIndicator (costado izq, desktop, z=16) ── */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <ScrollIndicator />
        </Box>

        {/* ── Marquee bottom (z=18) ── */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <MarqueeBar />
        </Box>

        {/* Noise overlay (z=22) */}
        <Box className="noise-overlay" zIndex={22} />

        {/* Vignette (z=24) — sutil y estática, sin oscurecer en scroll */}
        <Box
          position="absolute"
          inset={0}
          zIndex={24}
          pointerEvents="none"
          background="radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(8,12,18,0.35) 100%)"
        />
      </Box>
    </Box>
  )
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────

// motion.div es el elemento raíz — sin Chakra encima para que Framer
// reciba sus props directamente (y: [0,8,0] infinito).
function ScrollIndicator() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '24px',
        zIndex: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
      }}
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, transparent, #9c755a)',
        }}
      />
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        Scroll
      </span>
    </motion.div>
  )
}

function MarqueeBar() {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const anim = gsap.to(el, {
      x: () => -el.scrollWidth / 2,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })
    return () => anim.kill()
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 18,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(156,117,90,0.08)',
        backdropFilter: 'blur(8px)',
        padding: '10px 0',
        overflow: 'hidden',
      }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {[...playerData.marqueeItems, ...playerData.marqueeItems].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: item === '·' ? 300 : 600,
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: item === '·' ? '#9c755a' : 'rgba(255,255,255,0.48)',
              marginRight: '24px',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Hero
