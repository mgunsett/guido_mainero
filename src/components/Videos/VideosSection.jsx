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

// Barrido de brillo diagonal al hacer hover
const sheen = keyframes`
  0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
  35%  { opacity: 0.55; }
  100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
`

// Anillo cónico que gira alrededor del botón play
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

// Parpadeo del punto REC / live
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.25; }
`

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
              mb={2}
            >
              Video
            </Text>
            <Text
              fontFamily="heading"
              fontSize={{ base: '5xl', md: '8xl' }}
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

      <Box position="relative" zIndex={1} maxW="1200px" mx="auto">        

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
            transition="box-shadow 0.5s ease, transform 0.5s ease"
            transform={hovered ? 'translateY(-4px)' : 'translateY(0)'}
            boxShadow={
              hovered
                ? '0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(156,117,90,0.5)'
                : '0 30px 80px rgba(0,0,0,0.5)'
            }
          >
            <AspectRatio ratio={{ base:3 / 4, md: 16/ 8.5 }}>
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
                {/* viñeta que se intensifica al hover */}
                <Box
                  position="absolute"
                  inset={0}
                  pointerEvents="none"
                  background="radial-gradient(ellipse at center, transparent 45%, rgba(3,5,8,0.75) 130%)"
                  opacity={hovered ? 1 : 0.35}
                  transition="opacity 0.5s ease"
                />

                {/* barras letterbox cinematográficas */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h={hovered ? { base: '22px', md: '34px' } : '0px'}
                  bg="rgba(3,5,8,0.92)"
                  transition="height 0.5s cubic-bezier(0.22,1,0.36,1)"
                  pointerEvents="none"
                  zIndex={2}
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h={hovered ? { base: '22px', md: '34px' } : '0px'}
                  bg="rgba(3,5,8,0.92)"
                  transition="height 0.5s cubic-bezier(0.22,1,0.36,1)"
                  pointerEvents="none"
                  zIndex={2}
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
                

                {/* play circular con anillo giratorio + pulso */}
                <Flex position="absolute" inset={0} align="center" justify="center" zIndex={4}>
                  <Box
                    position="relative"
                    w={{ base: '78px', md: '108px' }}
                    h={{ base: '78px', md: '108px' }}
                    transition="transform 0.45s cubic-bezier(0.22,1,0.36,1)"
                    transform={hovered ? 'scale(1.12)' : 'scale(1)'}
                  >
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

                    {/* anillo cónico giratorio (aparece al hover) */}
                    <Box
                      position="absolute"
                      inset="-7px"
                      borderRadius="full"
                      opacity={hovered ? 1 : 0}
                      transition="opacity 0.4s ease"
                      sx={{
                        background:
                          'conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.9) 80deg, rgba(156,117,90,0.95) 150deg, transparent 220deg, transparent 360deg)',
                        WebkitMask:
                          'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                      }}
                      animation={`${spin} 4s linear infinite`}
                    />

                    {/* arco estático de marca (siempre visible, sutil) */}
                    <Box
                      position="absolute"
                      inset="-7px"
                      borderRadius="full"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
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
                      bg="rgba(8,12,18,0.35)"
                      backdropFilter="blur(10px)"
                      transition="all 0.4s ease"
                      boxShadow={hovered ? '0 0 32px rgba(156,117,90,0.55)' : 'none'}
                      _groupHover={{
                        bg: 'rgba(156,117,90,0.45)',
                        borderColor: 'white',
                      }}
                    >
                      <Box
                        as={FiPlay}
                        fontSize={{ base: '28px', md: '38px' }}
                        ml="4px"
                        color="white"
                        transition="transform 0.4s ease"
                        transform={hovered ? 'scale(1.05)' : 'scale(1)'}
                      />
                    </Flex>
                  </Box>
                </Flex>

                      

                {/* título + CTA que aparece al hover (sube desde abajo) */}
                <Flex
                  position="absolute"
                  bottom={{ base: 5, md: 8 }}
                  left={{ base: 5, md: 8 }}
                  right={{ base: 5, md: 8 }}
                  align="flex-end"
                  justify="space-between"
                  gap={4}
                  zIndex={4}
                  opacity={hovered ? 1 : 0}
                  transform={hovered ? 'translateY(0)' : 'translateY(14px)'}
                  transition="opacity 0.45s ease 0.05s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s"
                  pointerEvents="none"
                >
                  <Box minW={0}>
                    <Text
                      fontFamily="condensed"
                      fontSize="10px"
                      letterSpacing="0.28em"
                      textTransform="uppercase"
                      color="brand.brown"
                      mb={1}
                    >
                      Jugadas destacadas
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: 'lg', md: '3xl' }}
                      lineHeight={1.05}
                      color="white"
                      noOfLines={1}
                    >
                      {playerData.name} {playerData.fullName}
                    </Text>
                  </Box>
                  <Flex
                    display={{ base: 'none', sm: 'flex' }}
                    align="center"
                    gap={2}
                    flexShrink={0}
                    pb={1}
                  >
                    <Text
                      fontFamily="condensed"
                      fontSize="11px"
                      letterSpacing="0.24em"
                      textTransform="uppercase"
                      color="white"
                    >
                      Reproducir
                    </Text>
                    <Box as={FiArrowRight} fontSize="16px" color="brand.brown" />
                  </Flex>
                </Flex>

                {/* barrido de brillo diagonal */}
                <Box
                  position="absolute"
                  inset={0}
                  overflow="hidden"
                  pointerEvents="none"
                  zIndex={2}
                >
                  {hovered && (
                    <Box
                      position="absolute"
                      top={0}
                      bottom={0}
                      left={0}
                      w="40%"
                      background="linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)"
                      animation={`${sheen} 1.1s ease-out`}
                    />
                  )}
                </Box>

                {/* línea de acento inferior que se expande al hover */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  h="3px"
                  w={hovered ? '100%' : '0%'}
                  bg="linear-gradient(90deg, rgba(156,117,90,1), rgba(201,168,76,0.9))"
                  transition="width 0.6s cubic-bezier(0.22,1,0.36,1)"
                  pointerEvents="none"
                  zIndex={3}
                />
              </Box>
            </AspectRatio>
          </Box>
        </Box>
      </Box>
      {/* ── Footer: info + ver completo ── */}
          <Flex
            mt={{ base: 5, md: 8 }}
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'flex-start', sm: 'center' }}
            justify="space-between"
            gap={{ base: 4, sm: 6 }}
          >
            <Flex align="center" gap={{ base: 3, md: 4 }} minW={0}>
              
              <Box minW={0}>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  lineHeight={1.1}
                  noOfLines={1}
                >
                  Temporada 2026
                </Text>
                <Text
                  fontFamily="condensed"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                  mt="2px"
                >
                  Liga Argentina
                </Text>
              </Box>
              <Box h="1px" w={{ base: '24px', md: '48px' }} bg="brand.brown" flexShrink={0} />
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
