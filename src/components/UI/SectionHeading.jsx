import { Box, Text } from '@chakra-ui/react'
import { useScrubReveal } from '../../hooks/useScrubReveal'

/**
 * Encabezado de sección: eyebrow + título grande con acento al final.
 * @param {string} eyebrow  texto pequeño superior
 * @param {string} title    título principal
 * @param {string} accent   parte final del título coloreada en brand.brown
 */
export function SectionHeading({ eyebrow, title, accent, align = 'left' }) {
  const ref = useScrubReveal({ y: 30 })

  return (
    <Box ref={ref} textAlign={align} mb={{ base: 10, md: 14 }}>
      {eyebrow && (
        <Text
          fontFamily="condensed"
          fontSize="11px"
          letterSpacing="0.36em"
          textTransform="uppercase"
          color="brand.brown"
          mb={3}
        >
          {eyebrow}
        </Text>
      )}
      <Text
        fontFamily="heading"
        fontSize={{ base: '5xl', md: '7xl' }}
        lineHeight={0.95}
        letterSpacing="0.01em"
      >
        {title}
        {accent && (
          <Box as="span" color="brand.brown">
            {accent}
          </Box>
        )}
      </Text>
    </Box>
  )
}

export default SectionHeading
