import { useRef, useEffect, useState, useCallback } from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  SimpleGrid,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
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
            end: 'top 100%',
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
            end: 'top 100%',
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
        transform: 'translateY(-3px)!important',
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

function ClubCard({ club, isFirst, isLast }) {
  return (
    <Box
      data-club-card
      flex="0 0 auto"
      w={{ base: '230px', md: '264px' }}
      position="relative"
      sx={{ scrollSnapAlign: 'center' }}
    >
      {/* ── Línea de tiempo (continua, atraviesa los escudos) ── */}
      {/* -12px = mitad del gap entre cards, para empalmar con la vecina */}
      <Box
        position="absolute"
        top={{ base: '32px', md: '36px' }}
        left={isFirst ? '50%' : '-12px'}
        right={isLast ? '50%' : '-12px'}
        h="1px"
        bgGradient="linear(to-r, brand.brownDark, brand.brown, brand.brownDark)"
        opacity={0.55}
      />

      {/* ── Escudo = nodo de la trayectoria ── */}
      <Flex justify="center" mb={5} position="relative" zIndex={1}>
        <Flex
          align="center"
          justify="center"
          w={{ base: '64px', md: '72px' }}
          h={{ base: '64px', md: '72px' }}
          borderRadius="full"
          bg="#0A0E16"
          border="1px solid"
          borderColor="rgba(156,117,90,0.45)"
          boxShadow="0 0 0 6px #0A0E16, 0 6px 16px rgba(0,0,0,0.5)"
          transition="box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease"
          sx={{
            '[data-club-card]:hover &': {
              borderColor: 'brand.brown',
              boxShadow:
                '0 0 0 6px #0A0E16, 0 0 0 1px rgba(156,117,90,0.5), 0 0 14px 2px rgba(156,117,90,0.30)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {club.escudo ? (
            <Image
              src={club.escudo}
              alt={club.name}
              w={{ base: '38px', md: '44px' }}
              h={{ base: '38px', md: '44px' }}
              objectFit="contain"
              draggable={false}
            />
          ) : (
            <Box w="11px" h="11px" borderRadius="full" bg="brand.brown" />
          )}
        </Flex>
      </Flex>

      {/* ── Card de info encuadrada ── */}
      <Box
        mx={{ base: 2, md: 3 }}
        p={{ base: 4, md: 5 }}
        bg="rgba(255,255,255,0.02)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="10px"
        transition="all 0.35s ease"
        textAlign="center"
        _hover={{
          borderColor: 'rgba(156,117,90,0.5)',
          bg: 'rgba(156,117,90,0.04)',
        }}
      >
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
        <Text fontFamily="heading" fontSize="2xl" lineHeight={1.05}>
          {club.name}
        </Text>
        <Text
          fontFamily="condensed"
          fontSize="10px"
          letterSpacing="0.16em"
          textTransform="uppercase"
          color="whiteAlpha.600"
          mt={1}
        >
          {club.country}
        </Text>

        {club.info && (
          <Text fontFamily="body" fontSize="xs" color="whiteAlpha.700" mt={3}>
            {club.info}
          </Text>
        )}

        {club.titles?.length > 0 && (
          <>
            <Box h="1px" bg="whiteAlpha.100" my={4} />
            <VStack align="stretch" spacing={1.5}>
              {club.titles.map((t, ti) => (
                <Flex key={ti} align="center" justify="center" gap={2}>
                  <Text fontSize="10px" flexShrink={0}>🏆</Text>
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
          </>
        )}
      </Box>
    </Box>
  )
}

function ClubsTimeline() {
  const scrollRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  // ── Estado de los bordes (habilita/atenúa flechas) ──
  const updateEdges = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  // ── Desplazamiento con flechas (una card por click) ──
  const scrollByCards = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-club-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // ── Drag-to-scroll con mouse (touch es nativo) ──
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let startScroll = 0
    let moved = false

    const down = (e) => {
      isDown = true
      moved = false
      startX = e.pageX
      startScroll = el.scrollLeft
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!isDown) return
      if (Math.abs(e.pageX - startX) > 3) moved = true
      e.preventDefault()
      el.scrollLeft = startScroll - (e.pageX - startX)
    }
    const up = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    // evita que un drag dispare clicks accidentales en links internos
    const click = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    el.addEventListener('mousedown', down)
    el.addEventListener('click', click, true)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('click', click, true)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <Box mt={{ base: 16, md: 24 }}>
      {/* ── Encabezado + flechas de navegación ── */}
      <Flex justify="space-between" align="center" mb={{ base: 8, md: 10 }}>
        <Text
          fontFamily="condensed"
          fontSize="11px"
          letterSpacing="0.36em"
          textTransform="uppercase"
          color="brand.brown"
        >
          Trayectoria
        </Text>

        <Flex gap={2}>
          {[
            { dir: -1, icon: FaChevronLeft, enabled: canLeft, label: 'Anterior' },
            { dir: 1, icon: FaChevronRight, enabled: canRight, label: 'Siguiente' },
          ].map(({ dir, icon: Icon, enabled, label }) => (
            <IconButton
              key={label}
              aria-label={label}
              icon={<Icon size={13} />}
              onClick={() => scrollByCards(dir)}
              isDisabled={!enabled}
              size="sm"
              variant="unstyled"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="38px"
              h="38px"
              minW="38px"
              color="white"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="8px"
              opacity={enabled ? 1 : 0.3}
              transition="all 0.3s ease"
              _hover={
                enabled
                  ? { bg: 'brand.brown', borderColor: 'brand.brown' }
                  : {}
              }
            />
          ))}
        </Flex>
      </Flex>

      {/* ── Carril con scroll horizontal ── */}
      {/* py amplio: deja respirar el glow del escudo sin que el overflow lo recorte */}
      <Box
        ref={scrollRef}
        className="no-scrollbar"
        overflowX="auto"
        cursor="grab"
        mx={{ base: -2, md: -3 }}
        sx={{ scrollSnapType: 'x mandatory' }}
      >
        <Flex gap={6} minW="max-content" py={5}>
          {playerData.clubs.map((club, i) => (
            <ClubCard
              key={i}
              club={club}
              isFirst={i === 0}
              isLast={i === playerData.clubs.length - 1}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export function StatsSection() {
  return (
    // El desplazamiento −100vh que hace que esta sección suba sobre el
    // Hero pinneado vive en el wrapper de App.jsx (no aquí), para que el
    // "cover phase" del Hero (100vh) calce 1:1. Acá solo el look de panel:
    // fondo sólido, esquinas superiores redondeadas y sombra hacia arriba.
    <Box
      as="section"
      id="stats"
      position="relative"
      zIndex={20}
      bg="#0A0E16"
      px={{ base: 6, md: 12, lg: 20 }}
      pt={{ base: 24, md: 36 }}
      pb={{ base: 16, md: 24 }}
      sx={{
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 140px)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 140px)',
      }}
    >
      <Box className="deco-grid" opacity={0.6} />
       {/* imagen de fondo tenue, anclada a la derecha */}
            <Image
              src={playerData.imageContact}
              alt=""
              aria-hidden="true"
              position="absolute"
              top="0"
              right="0"
              h="100%"
              w={{ base: '60%', md: '50%', lg: '56%' }}
              objectFit="cover"
              objectPosition="top center"
              opacity={{ base: 0.09, md: 0.1 }}
              pointerEvents="none"
              zIndex={0}
              style={{
                WebkitMaskImage:
                  'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
                maskImage:
                  'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              }}
            />
      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="Ficha Técnica" title="ESTADIS" accent="TICAS" />

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1.1fr 1fr' }}
          gap={{ base: 10, lg: 12 }}
        >
          {/* Bio card */}
          <GridItem>
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
            <Box
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              p={{ base: 5, md: 6 }}
              h="91%"
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
              <VStack align="stretch" spacing={4}>
                {BIO.map((row) => (
                  <Flex
                    key={row.key}
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.50"
                    pb={3}
                    transition="all 0.3s ease"
                    _hover={{ 
                      borderColor: 'rgba(156,117,90,0.5)',
                      transform: 'translateY(-2px)',
                    }}
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
              Última temporada
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
