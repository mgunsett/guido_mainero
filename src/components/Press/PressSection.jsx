import { useRef, useEffect } from 'react'
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MotionFlex = motion(Box)

import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const mediaLogos = ['ESPN', 'CONMEBOL Libertadores', 'TyC Sports', 'Olé', 'Fox Sports', 'ESPN', 'CONMEBOL Libertadores', 'TyC Sports', 'Olé', 'Fox Sports']


function PressCard({ item }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.6,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      as="a"
      href={item.url}
      target={item.url?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      display="block"
      bg="rgba(255,255,255,0.02)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={{ base: 5, md: 6 }}
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(156,117,90,0.55)',
      }}
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '32px',
          height: '2px',
          bg: 'brand.brown',
        },
      }}
    >
      <Flex justify="space-between" align="flex-start" mb={6}>
        <Text
          fontFamily="heading"
          fontSize="2xl"
          letterSpacing="0.04em"
          color="whiteAlpha.900"
        >
          {item.media}
        </Text>
        <Box as={FiArrowUpRight} fontSize="20px" color="brand.brown" />
      </Flex>
      <Text fontFamily="body" fontSize="md" fontWeight={500} mb={4} lineHeight={1.4}>
        {item.title}
      </Text>
      <Text
        fontFamily="condensed"
        fontSize="10px"
        letterSpacing="0.24em"
        textTransform="uppercase"
        color="whiteAlpha.500"
      >
        {item.date}
      </Text>
    </Box>
  )
}

export function PressSection() {
  const logos = [...playerData.press, ...playerData.press]

  return (
    <Box
      as="section"
      id="press"
      position="relative"
      bg="#0A0E16"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 20, md: 28 }}
      overflow="hidden"
    >
      <Box className="deco-grid" />
      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="Medios" title="PREN" accent="SA" />

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {playerData.press.map((item, i) => (
            <PressCard key={i} item={item} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Marquee de logos
      <Box mt={{ base: 16, md: 24 }} overflow="hidden" position="relative" zIndex={1}>
        <MotionFlex
          display="flex"
          alignItems="center"
          width="max-content"
          willChange="transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {mediaLogos.map((p, i) => (
            <Text
              key={i}
              as="span"
              fontFamily="heading"
              fontSize={{ base: '4xl', md: '6xl' }}
              color="whiteAlpha.200"
              letterSpacing="0.05em"
              px={10}
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {p}
            </Text>
          ))}
        </MotionFlex>
      </Box> */}
    </Box>
  )
}

export default PressSection
