import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiX, FiArrowRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import { useScrubReveal } from '../../hooks/useScrubReveal'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

// Pulso continuo del anillo del botón play
const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.5; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1.6); opacity: 0; }
`

function Bracket({ pos, hovered }) {
  const map = {
    tl: { top: 3, left: 3, borderTop: '2px solid', borderLeft: '2px solid' },
    tr: { top: 3, right: 3, borderTop: '2px solid', borderRight: '2px solid' },
    bl: { bottom: 3, left: 3, borderBottom: '2px solid', borderLeft: '2px solid' },
    br: { bottom: 3, right: 3, borderBottom: '2px solid', borderRight: '2px solid' },
  }
  return (
    <Box
      position="absolute"
      {...map[pos]}
      w={hovered ? { base: '34px', md: '48px' } : { base: '20px', md: '26px' }}
      h={hovered ? { base: '34px', md: '48px' } : { base: '20px', md: '26px' }}
      borderColor="brand.brown"
      transition="all 0.4s ease"
      boxShadow={hovered ? '0 0 16px rgba(156,117,90,0.6)' : 'none'}
      pointerEvents="none"
      zIndex={3}
    />
  )
}

export function VideosSection() {
  const video = playerData.videos[0]
  const headerRef = useScrubReveal({ y: 30 })
  const wrapRef = useRef(null)
  const revealRef = useRef(null)
  const previewRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  // Reveal via clipPath al scroll — el player es visible por defecto;
  // solo aplicamos el wipe desde JS y una sola vez, así si el trigger
  // no dispara (layout sticky del Hero) el video igual queda a la vista.
  useEffect(() => {
    const el = revealRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // hover preview
  useEffect(() => {
    const v = previewRef.current
    if (!v) return
    if (hovered) {
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [hovered])

  // cerrar con Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!video) return null

  return (
    <Box
      as="section"
      id="videos"
      position="relative"
      minH="100vh"
      bg="#080C12"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 20, md: 28 }}
      overflow="hidden"
    >
      <Box className="deco-grid" />
      {/* glow ambiental */}
      <Box
        position="absolute"
        top="0%"
        right="-10%"
        w="55vw"
        h="55vw"
        background="radial-gradient(ellipse, rgba(156,117,90,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-8%"
        w="45vw"
        h="45vw"
        background="radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box position="relative" zIndex={1} maxW="1200px" mx="auto">
        {/* ── Header: título + metadata ── */}
        <Flex
          ref={headerRef}
          justify="space-between"
          align="flex-end"
          gap={6}
          mb={{ base: 10, md: 14 }}
        >
          <Box>
            <Text
              fontFamily="condensed"
              fontSize="11px"
              letterSpacing="0.36em"
              textTransform="uppercase"
              color="brand.brown"
              mb={3}
            >
              Video
            </Text>
            <Text
              fontFamily="heading"
              fontSize={{ base: '5xl', md: '7xl' }}
              lineHeight={0.95}
              letterSpacing="0.01em"
            >
              HIGH
              <Box as="span" color="brand.brown">
                LIGHTS
              </Box>
            </Text>
          </Box>

          {/* metadata derecha — oculta en mobile */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            align="center"
            gap={3}
            flexShrink={0}
            pb={2}
          >
            <Box h="1px" w="40px" bg="brand.brown" opacity={0.6} />
            <Text
              fontFamily="condensed"
              fontSize="xs"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="whiteAlpha.700"
            >
              {playerData.currentClub}
            </Text>
          </Flex>
        </Flex>

        {/* ── Player ── */}
        <Box ref={wrapRef}>
          <Box
            ref={revealRef}
            position="relative"
            cursor="pointer"
            role="group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setOpen(true)}
            boxShadow="0 30px 80px rgba(0,0,0,0.5)"
          >
            <AspectRatio ratio={16 / 9}>
              <Box position="relative" overflow="hidden">
                {/* cover */}
                <Box
                  as="img"
                  src={video.cover}
                  alt={video.title}
                  position="absolute"
                  inset={0}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity={hovered ? 0 : 1}
                  transition="opacity 0.5s ease, transform 0.6s ease"
                  transform={hovered ? 'scale(1.04)' : 'scale(1)'}
                />
                {/* preview muted */}
                <Box
                  ref={previewRef}
                  as="video"
                  src={video.previewSrc}
                  muted
                  loop
                  playsInline
                  position="absolute"
                  inset={0}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity={hovered ? 1 : 0}
                  transition="opacity 0.5s ease"
                />
                {/* overlay */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(180deg, rgba(8,12,18,0.15) 0%, rgba(8,12,18,0.25) 45%, rgba(8,12,18,0.8) 100%)"
                />

                {/* badge categoría arriba-izq */}
                <Flex
                  position="absolute"
                  top={{ base: 3, md: 5 }}
                  left={{ base: 3, md: 5 }}
                  align="center"
                  gap={2}
                  bg="rgba(8,12,18,0.55)"
                  backdropFilter="blur(6px)"
                  border="1px solid"
                  borderColor="rgba(156,117,90,0.5)"
                  px={3}
                  py="6px"
                  zIndex={3}
                >
                  <Box w="6px" h="6px" borderRadius="full" bg="brand.brown" />
                  <Text
                    fontFamily="condensed"
                    fontSize="10px"
                    letterSpacing="0.24em"
                    textTransform="uppercase"
                    color="white"
                  >
                    {video.category}
                  </Text>
                </Flex>

                {/* play circular con pulso */}
                <Flex position="absolute" inset={0} align="center" justify="center" zIndex={3}>
                  <Box position="relative" w={{ base: '70px', md: '96px' }} h={{ base: '70px', md: '96px' }}>
                    {/* anillos de pulso */}
                    <Box
                      position="absolute"
                      inset={0}
                      borderRadius="full"
                      border="1px solid"
                      borderColor="brand.brown"
                      animation={`${pulse} 2.6s ease-out infinite`}
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      borderRadius="full"
                      border="1px solid"
                      borderColor="brand.brown"
                      animation={`${pulse} 2.6s ease-out infinite 1.3s`}
                    />
                    {/* botón */}
                    <Flex
                      position="absolute"
                      inset={0}
                      align="center"
                      justify="center"
                      borderRadius="full"
                      border="1px solid"
                      borderColor="whiteAlpha.700"
                      bg="rgba(156,117,90,0.22)"
                      backdropFilter="blur(8px)"
                      transition="all 0.35s ease"
                      transform={hovered ? 'scale(1.1)' : 'scale(1)'}
                      _groupHover={{ bg: 'rgba(156,117,90,0.4)', borderColor: 'white' }}
                    >
                      <Box
                        as={FiPlay}
                        fontSize={{ base: '26px', md: '34px' }}
                        ml="3px"
                        color="white"
                      />
                    </Flex>
                  </Box>
                </Flex>

                {/* hint inferior centrado */}
                <Flex
                  position="absolute"
                  bottom={{ base: 4, md: 6 }}
                  left={0}
                  right={0}
                  justify="center"
                  zIndex={3}
                  opacity={hovered ? 0 : 1}
                  transition="opacity 0.4s ease"
                  pointerEvents="none"
                >
                  <Text
                    fontFamily="condensed"
                    fontSize={{ base: '9px', md: '11px' }}
                    letterSpacing="0.3em"
                    textTransform="uppercase"
                    color="whiteAlpha.700"
                  >
                    <Box as="span" display={{ base: 'none', md: 'inline' }}>
                      Pasá el cursor para previsualizar
                    </Box>
                    <Box as="span" display={{ base: 'inline', md: 'none' }}>
                      Tocá para reproducir
                    </Box>
                  </Text>
                </Flex>

                <Bracket pos="tl" hovered={hovered} />
                <Bracket pos="tr" hovered={hovered} />
                <Bracket pos="bl" hovered={hovered} />
                <Bracket pos="br" hovered={hovered} />
              </Box>
            </AspectRatio>
          </Box>

          {/* ── Footer: info + ver completo ── */}
          <Flex
            mt={{ base: 5, md: 6 }}
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'flex-start', sm: 'center' }}
            justify="space-between"
            gap={{ base: 4, sm: 6 }}
          >
            <Flex align="center" gap={{ base: 3, md: 4 }} minW={0}>
              <Box h="1px" w={{ base: '24px', md: '48px' }} bg="brand.brown" flexShrink={0} />
              <Box minW={0}>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  lineHeight={1.1}
                  noOfLines={1}
                >
                  {video.title}
                </Text>
                <Text
                  fontFamily="condensed"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                  mt="2px"
                >
                  Duración {video.duration}
                </Text>
              </Box>
            </Flex>

            <Flex
              as="button"
              onClick={() => setOpen(true)}
              align="center"
              gap={2}
              flexShrink={0}
              role="group"
              color="whiteAlpha.800"
              transition="color 0.3s ease"
              _hover={{ color: 'brand.brown' }}
            >
              <Text
                fontFamily="condensed"
                fontSize="xs"
                letterSpacing="0.24em"
                textTransform="uppercase"
              >
                Ver completo
              </Text>
              <Box
                as={FiArrowRight}
                fontSize="16px"
                transition="transform 0.3s ease"
                _groupHover={{ transform: 'translateX(4px)' }}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {open && (
          <MotionBox
            position="fixed"
            inset={0}
            zIndex={2000}
            bg="rgba(3,5,8,0.95)"
            backdropFilter="blur(10px)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 12 }}
            onClick={() => setOpen(false)}
          >
            <Box
              as="button"
              position="absolute"
              top={6}
              right={6}
              color="white"
              onClick={() => setOpen(false)}
              _hover={{ color: 'brand.brown' }}
            >
              <Box as={FiX} fontSize="32px" />
            </Box>
            <MotionBox
              w="100%"
              maxW="1100px"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AspectRatio ratio={16 / 9}>
                <Box
                  as="video"
                  src={video.src}
                  controls
                  autoPlay
                  playsInline
                  w="100%"
                  h="100%"
                />
              </AspectRatio>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default VideosSection
