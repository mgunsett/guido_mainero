import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

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
      w={hovered ? '48px' : '26px'}
      h={hovered ? '48px' : '26px'}
      borderColor="brand.brown"
      transition="all 0.4s ease"
      boxShadow={hovered ? '0 0 16px rgba(156,117,90,0.6)' : 'none'}
      pointerEvents="none"
    />
  )
}

export function VideosSection() {
  const video = playerData.videos[0]
  const wrapRef = useRef(null)
  const revealRef = useRef(null)
  const previewRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  // Reveal via clipPath al scroll
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
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.6,
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
    >
      <Box className="deco-grid" />
      <Box
        position="absolute"
        top="5%"
        right="-5%"
        w="50vw"
        h="50vw"
        background="radial-gradient(ellipse, rgba(156,117,90,0.06) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="En la cancha" title="VID" accent="EOS" />

        <Box ref={wrapRef}>
          <Box
            ref={revealRef}
            position="relative"
            cursor="pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setOpen(true)}
            sx={{ clipPath: 'inset(0 100% 0 0)' }}
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
                  transition="opacity 0.5s ease"
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
                  bg="linear-gradient(180deg, rgba(8,12,18,0.1) 0%, rgba(8,12,18,0.7) 100%)"
                />
                {/* play btn */}
                <Flex
                  position="absolute"
                  inset={0}
                  align="center"
                  justify="center"
                >
                  <Flex
                    align="center"
                    justify="center"
                    w={{ base: '64px', md: '88px' }}
                    h={{ base: '64px', md: '88px' }}
                    border="1px solid"
                    borderColor="whiteAlpha.700"
                    bg="rgba(156,117,90,0.15)"
                    backdropFilter="blur(6px)"
                    transition="all 0.3s ease"
                    transform={hovered ? 'scale(1.08)' : 'scale(1)'}
                  >
                    <Box as={FiPlay} fontSize={{ base: '24px', md: '32px' }} ml={1} />
                  </Flex>
                </Flex>
                <Bracket pos="tl" hovered={hovered} />
                <Bracket pos="tr" hovered={hovered} />
                <Bracket pos="bl" hovered={hovered} />
                <Bracket pos="br" hovered={hovered} />
              </Box>
            </AspectRatio>

            {/* barra inferior con sheen */}
            <Flex
              className="sheen-bar"
              align="center"
              justify="space-between"
              bg="rgba(255,255,255,0.03)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderTop="none"
              px={{ base: 4, md: 6 }}
              py={4}
            >
              <Box>
                <Text
                  fontFamily="condensed"
                  fontSize="10px"
                  letterSpacing="0.28em"
                  textTransform="uppercase"
                  color="brand.brown"
                  mb={1}
                >
                  {video.category}
                </Text>
                <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }}>
                  {video.title}
                </Text>
              </Box>
              <Text fontFamily="heading" fontSize="xl" color="whiteAlpha.700">
                {video.duration}
              </Text>
            </Flex>
          </Box>
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
