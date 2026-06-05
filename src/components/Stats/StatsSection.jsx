import { useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const BIO = [
  { label: 'Edad', key: 'age' },
  { label: 'Altura', key: 'height' },
  { label: 'Peso', key: 'weight' },
  { label: 'Pie', key: 'foot' },
  { label: 'Nacimiento', key: 'birthDate' },
  { label: 'Lugar', key: 'birthPlace' },
]

function StatBar({ label, value }) {
  const fillRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: `${value}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      )
      gsap.fromTo(
        numRef.current,
        { textContent: 0 },
        {
          textContent: value,
          snap: { textContent: 1 },
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [value])

  return (
    <Box>
      <Flex justify="space-between" align="baseline" mb={2}>
        <Text
          fontFamily="condensed"
          fontSize="11px"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="whiteAlpha.800"
        >
          {label}
        </Text>
        <Text fontFamily="heading" fontSize="xl" color="brand.brown">
          <span ref={numRef}>0</span>
        </Text>
      </Flex>
      <Box h="3px" bg="whiteAlpha.100" overflow="hidden">
        <Box
          ref={fillRef}
          h="100%"
          w="0%"
          bgGradient="linear(to-r, brand.brownDark, brand.brownLight)"
        />
      </Box>
    </Box>
  )
}

function SeasonCard({ label, value }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      bg="rgba(255,255,255,0.02)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={{ base: 4, md: 5 }}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(156,117,90,0.5)',
      }}
    >
      <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} lineHeight={1}>
        {value}
      </Text>
      <Text
        fontFamily="condensed"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="whiteAlpha.600"
        mt={1}
      >
        {label}
      </Text>
    </Box>
  )
}

function ClubsTimeline() {
  const scrollRef = useRef(null)

  // drag-to-scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let startScroll = 0

    const down = (e) => {
      isDown = true
      startX = e.pageX
      startScroll = el.scrollLeft
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!isDown) return
      e.preventDefault()
      el.scrollLeft = startScroll - (e.pageX - startX)
    }
    const up = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    el.addEventListener('mousedown', down)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      el.removeEventListener('mousedown', down)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <Box mt={{ base: 16, md: 24 }}>
      <Text
        fontFamily="condensed"
        fontSize="11px"
        letterSpacing="0.36em"
        textTransform="uppercase"
        color="brand.brown"
        mb={8}
      >
        Trayectoria
      </Text>
      <Box
        ref={scrollRef}
        className="no-scrollbar"
        overflowX="auto"
        cursor="grab"
        sx={{ scrollSnapType: 'x mandatory' }}
        pb={4}
      >
        <Flex gap={0} minW="max-content">
          {playerData.clubs.map((club, i) => (
            <Box
              key={i}
              minW={{ base: '260px', md: '320px' }}
              pr={{ base: 8, md: 12 }}
              position="relative"
              sx={{ scrollSnapAlign: 'start' }}
            >
              {/* línea conectora */}
              <Box
                position="absolute"
                top="6px"
                left={0}
                right={0}
                h="1px"
                bg="whiteAlpha.150"
              />
              {/* nodo */}
              <Box
                position="absolute"
                top="0"
                left="0"
                w="13px"
                h="13px"
                borderRadius="full"
                bg="brand.brown"
                border="3px solid"
                borderColor="brand.dark"
                boxShadow="0 0 0 1px rgba(156,117,90,0.5)"
              />
              <Box pt={10}>
                <Text
                  fontFamily="condensed"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="brand.gold"
                  mb={1}
                >
                  {club.years}
                </Text>
                <Text fontFamily="heading" fontSize="2xl" lineHeight={1}>
                  {club.name}
                </Text>
                <Text
                  fontFamily="condensed"
                  fontSize="11px"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color="whiteAlpha.600"
                  mt={1}
                >
                  {club.country}
                </Text>
                {club.info && (
                  <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="whiteAlpha.700"
                    mt={3}
                  >
                    {club.info}
                  </Text>
                )}
                <VStack align="stretch" spacing={1} mt={4}>
                  {club.titles.map((t, ti) => (
                    <Flex key={ti} align="center" gap={2}>
                      <Box w="4px" h="4px" bg="brand.gold" />
                      <Text
                        fontFamily="condensed"
                        fontSize="xs"
                        letterSpacing="0.08em"
                        color="whiteAlpha.800"
                      >
                        {t}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export function StatsSection() {
  return (
    <Box
      as="section"
      id="stats"
      position="relative"
      zIndex={21}
      mt="-100vh"
      bg="#0A0E16"
      borderTopRadius="22px"
      boxShadow="0 -30px 60px rgba(0,0,0,0.6)"
      px={{ base: 6, md: 12, lg: 20 }}
      pt={{ base: 20, md: 28 }}
      pb={{ base: 16, md: 24 }}
    >
      <Box className="deco-grid" opacity={0.6} />
      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="Perfil del jugador" title="EL PER" accent="FIL" />

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1.1fr 1fr' }}
          gap={{ base: 10, lg: 12 }}
        >
          {/* Bio card */}
          <GridItem>
            <Box
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              p={{ base: 5, md: 6 }}
              h="100%"
              position="relative"
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '36px',
                  height: '3px',
                  bg: 'brand.brown',
                },
              }}
            >
              <Text
                fontFamily="condensed"
                fontSize="11px"
                letterSpacing="0.28em"
                textTransform="uppercase"
                color="whiteAlpha.600"
                mb={5}
              >
                Datos personales
              </Text>
              <VStack align="stretch" spacing={4}>
                {BIO.map((row) => (
                  <Flex
                    key={row.key}
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.50"
                    pb={3}
                  >
                    <Text
                      fontFamily="condensed"
                      fontSize="11px"
                      letterSpacing="0.18em"
                      textTransform="uppercase"
                      color="whiteAlpha.600"
                    >
                      {row.label}
                    </Text>
                    <Text fontFamily="body" fontSize="sm" fontWeight={500}>
                      {playerData[row.key]}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </GridItem>

          {/* Season stats 2x3 */}
          <GridItem>
            <Text
              fontFamily="condensed"
              fontSize="11px"
              letterSpacing="0.28em"
              textTransform="uppercase"
              color="whiteAlpha.600"
              mb={5}
            >
              Temporada actual
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              {playerData.seasonStats.map((s, i) => (
                <SeasonCard key={i} label={s.label} value={s.value} />
              ))}
            </SimpleGrid>
          </GridItem>

          {/* Barras técnicas */}
          <GridItem>
            <Text
              fontFamily="condensed"
              fontSize="11px"
              letterSpacing="0.28em"
              textTransform="uppercase"
              color="whiteAlpha.600"
              mb={5}
            >
              Atributos técnicos
            </Text>
            <VStack align="stretch" spacing={5}>
              {playerData.stats.map((s, i) => (
                <StatBar key={i} label={s.label} value={s.value} />
              ))}
            </VStack>
          </GridItem>
        </Grid>

        <ClubsTimeline />
      </Box>
    </Box>
  )
}

export default StatsSection
