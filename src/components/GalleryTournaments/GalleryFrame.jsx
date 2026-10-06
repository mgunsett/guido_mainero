import { Box, Flex, Text } from '@chakra-ui/react'
import SectionHeading from '../UI/SectionHeading'

/**
 * Contenedor común a ambas propuestas: mismo fondo, glows, fades laterales
 * y encabezado "FOTOS" que la sección original. `meta` es el texto chico
 * de la derecha (contador o indicación).
 */
export function GalleryFrame({ meta, children, label }) {
  return (
    <Box
      as="section"
      id="gallery"
      aria-label={label}
      bg="#080C12"
      position="relative"
      overflow="hidden"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      py={{ base: 16, md: 16 }}
    >
      <Box
        position="absolute"
        top="0"
        right="-80px"
        w="500px"
        h="500px"
        bg="radial-gradient(ellipse, rgba(156,117,90,0.07) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        left="-80px"
        w="400px"
        h="400px"
        bg="radial-gradient(ellipse, rgba(156,117,90,0.05) 0%, transparent 70%)"
        pointerEvents="none"
      />
      {['left', 'right'].map((side) => (
        <Box
          key={side}
          position="absolute"
          top={0}
          {...{ [side]: 0 }}
          h="100%"
          w={{ base: '24px', md: '80px' }}
          zIndex={4}
          pointerEvents="none"
          bg={`linear-gradient(to ${side === 'left' ? 'right' : 'left'}, #080C12 0%, rgba(8,12,18,0) 100%)`}
        />
      ))}

      <Box px={{ base: 6, md: 12, lg: 20 }} position="relative" zIndex={5}>
        <Flex justify="space-between" align="flex-end">
          <SectionHeading eyebrow="galeria" title="FOT" accent="OS" />
          <Text
            fontFamily="condensed"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.24em"
            textTransform="uppercase"
            color="rgba(255,255,255,0.25)"
            mb={{ base: 10, md: 14 }}
            whiteSpace="nowrap"
            aria-live="polite"
          >
            {meta}
          </Text>
        </Flex>
      </Box>

      {children}
    </Box>
  )
}

export default GalleryFrame
