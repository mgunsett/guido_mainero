import { useRef, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-fade]'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      as="footer"
      bg="#050810"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 10, md: 14 }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={6}
      >
        <Text
          data-fade
          fontFamily="heading"
          fontSize="4xl"
          letterSpacing="0.05em"
          lineHeight={1}
        >
          GM
          <Box as="span" color="brand.brown">
            _
          </Box>
        </Text>

        <Text
          data-fade
          fontFamily="condensed"
          fontSize="xs"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="whiteAlpha.600"
        >
          © {new Date().getFullYear()} {playerData.fullName}. Todos los derechos
          reservados.
        </Text>

        <Text
          data-fade
          fontFamily="condensed"
          fontSize="xs"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="whiteAlpha.500"
        >
          Desarrollado por{' '}
          <Box as="span" color="brand.brown">
            Matías Gunsett
          </Box>
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
