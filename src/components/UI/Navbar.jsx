import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text, Button, IconButton, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'

const MotionBox = motion(Box)

const LINKS = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Perfil', id: 'stats' },
  { label: 'Videos', id: 'videos' },
  { label: 'Galería', id: 'gallery' },
  { label: 'Prensa', id: 'press' },
  { label: 'Contacto', id: 'contact' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -10, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: 'power3.out' }
    )
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <Box
      ref={navRef}
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 4, md: 5 }}
      transition="background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease"
      bg={scrolled ? 'rgba(8,12,18,0.85)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(16px)' : 'none'}
      borderBottom="1px solid"
      borderColor={scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}
    >
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Text
          fontFamily="heading"
          fontSize={{ base: '2xl', md: '3xl' }}
          letterSpacing="0.05em"
          lineHeight={1}
          cursor="pointer"
          onClick={() => go('hero')}
          userSelect="none"
        >
          GM
          <Box as="span" color="brand.brown">
            _
          </Box>
        </Text>

        {/* Links desktop */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          gap={8}
        >
          {LINKS.map((l) => (
            <Box
              key={l.id}
              as="button"
              onClick={() => go(l.id)}
              fontFamily="condensed"
              fontSize="sm"
              fontWeight={500}
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="whiteAlpha.800"
              position="relative"
              transition="color 0.25s ease"
              _hover={{ color: 'white' }}
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '-6px',
                  width: '0%',
                  height: '1px',
                  bg: 'brand.brown',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': { width: '100%' },
              }}
            >
              {l.label}
            </Box>
          ))}
          <Button variant="pioviSolid" size="sm" onClick={() => go('contact')}>
            Contratar
          </Button>
        </Flex>

        {/* Hamburguesa mobile */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Menú"
          icon={open ? <FiX size={22} /> : <FiMenu size={22} />}
          onClick={() => setOpen((v) => !v)}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.100' }}
          borderRadius={0}
        />
      </Flex>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <MotionBox
            display={{ base: 'block', md: 'none' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            overflow="hidden"
            mt={4}
          >
            <VStack
              align="stretch"
              spacing={0}
              borderTop="1px solid"
              borderColor="whiteAlpha.100"
              pt={4}
            >
              {LINKS.map((l) => (
                <Box
                  key={l.id}
                  as="button"
                  textAlign="left"
                  py={3}
                  onClick={() => go(l.id)}
                  fontFamily="condensed"
                  fontSize="lg"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="whiteAlpha.800"
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.50"
                  _active={{ color: 'brand.brown' }}
                >
                  {l.label}
                </Box>
              ))}
              <Button
                variant="pioviSolid"
                mt={4}
                onClick={() => go('contact')}
              >
                Contratar
              </Button>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default Navbar
