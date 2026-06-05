import { useState, useEffect, useCallback } from 'react'
import { Box, Flex, Text, IconButton } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'

const MotionBox = motion(Box)
const MotionImg = motion(Box)

const spring = { type: 'spring', stiffness: 260, damping: 30 }

export function GallerySection() {
  const items = playerData.gallery
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const len = items.length
  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + len) % len),
    [len]
  )

  // teclado en lightbox
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, go])

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStart == null) return
    const dx = e.changedTouches[0].clientX - touchStart
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1)
    setTouchStart(null)
  }

  const current = items[index]
  const prev = items[(index - 1 + len) % len]
  const next = items[(index + 1) % len]

  return (
    <Box
      as="section"
      id="gallery"
      position="relative"
      minH="100vh"
      bg="#080C12"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 20, md: 28 }}
      overflow="hidden"
    >
      <Box className="deco-grid" />
      <Box
        position="absolute"
        bottom="0"
        left="-5%"
        w="50vw"
        h="50vw"
        background="radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="Momentos" title="GALE" accent="RÍA" />

        {/* Carrusel */}
        <Box position="relative">
          <Flex align="center" justify="center" minH={{ base: '60vh', md: '70vh' }}>
            {/* slide izquierdo (desktop) */}
            <MotionBox
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              left="2%"
              w="22vw"
              animate={{ scale: 0.84, opacity: 0.42 }}
              transition={spring}
              cursor="pointer"
              onClick={() => go(-1)}
            >
              <Box
                as="img"
                src={prev.src}
                alt={prev.alt}
                w="100%"
                sx={{ aspectRatio: prev.aspect }}
                objectFit="cover"
              />
            </MotionBox>

            {/* slide central */}
            <AnimatePresence mode="popLayout">
              <MotionBox
                key={current.id}
                w={{ base: '82vw', md: '48vw' }}
                zIndex={2}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={spring}
                cursor="zoom-in"
                onClick={() => setLightbox(true)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                position="relative"
              >
                <Box
                  as="img"
                  src={current.src}
                  alt={current.alt}
                  w="100%"
                  sx={{ aspectRatio: current.aspect }}
                  objectFit="cover"
                  border="1px solid"
                  borderColor="whiteAlpha.150"
                />
                <Flex
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  justify="space-between"
                  align="flex-end"
                  p={{ base: 4, md: 5 }}
                  bg="linear-gradient(180deg, transparent, rgba(8,12,18,0.85))"
                >
                  <Box>
                    <Text
                      fontFamily="condensed"
                      fontSize="10px"
                      letterSpacing="0.24em"
                      textTransform="uppercase"
                      color="brand.brown"
                    >
                      {current.category}
                    </Text>
                    <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }}>
                      {current.caption}
                    </Text>
                  </Box>
                  <Text fontFamily="heading" fontSize="md" color="whiteAlpha.600">
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(len).padStart(2, '0')}
                  </Text>
                </Flex>
              </MotionBox>
            </AnimatePresence>

            {/* slide derecho (desktop) */}
            <MotionBox
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              right="2%"
              w="22vw"
              animate={{ scale: 0.84, opacity: 0.42 }}
              transition={spring}
              cursor="pointer"
              onClick={() => go(1)}
            >
              <Box
                as="img"
                src={next.src}
                alt={next.alt}
                w="100%"
                sx={{ aspectRatio: next.aspect }}
                objectFit="cover"
              />
            </MotionBox>
          </Flex>

          {/* controles */}
          <Flex justify="center" gap={4} mt={8}>
            <IconButton
              aria-label="Anterior"
              icon={<FiChevronLeft size={20} />}
              onClick={() => go(-1)}
              variant="outline"
              borderRadius={0}
              borderColor="whiteAlpha.300"
              color="white"
              _hover={{ bg: 'brand.brown', borderColor: 'brand.brown' }}
            />
            <IconButton
              aria-label="Siguiente"
              icon={<FiChevronRight size={20} />}
              onClick={() => go(1)}
              variant="outline"
              borderRadius={0}
              borderColor="whiteAlpha.300"
              color="white"
              _hover={{ bg: 'brand.brown', borderColor: 'brand.brown' }}
            />
          </Flex>
        </Box>
      </Box>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <MotionBox
            position="fixed"
            inset={0}
            zIndex={2000}
            bg="rgba(3,5,8,0.96)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setLightbox(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* wings blureadas desktop */}
            <Box
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              w="20vw"
              backgroundImage={`url(${prev.src})`}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="blur(20px) brightness(0.4)"
              opacity={0.5}
            />
            <Box
              display={{ base: 'none', md: 'block' }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              w="20vw"
              backgroundImage={`url(${next.src})`}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="blur(20px) brightness(0.4)"
              opacity={0.5}
            />

            <IconButton
              aria-label="Cerrar"
              icon={<FiX size={28} />}
              position="absolute"
              top={6}
              right={6}
              variant="ghost"
              color="white"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(false)
              }}
              _hover={{ color: 'brand.brown' }}
            />
            <IconButton
              aria-label="Anterior"
              icon={<FiChevronLeft size={32} />}
              position="absolute"
              left={{ base: 2, md: 8 }}
              variant="ghost"
              color="white"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              _hover={{ color: 'brand.brown' }}
            />
            <IconButton
              aria-label="Siguiente"
              icon={<FiChevronRight size={32} />}
              position="absolute"
              right={{ base: 2, md: 8 }}
              variant="ghost"
              color="white"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              _hover={{ color: 'brand.brown' }}
            />

            <MotionImg
              key={current.id}
              as="img"
              src={current.src}
              alt={current.alt}
              maxH="85vh"
              maxW={{ base: '90vw', md: '60vw' }}
              objectFit="contain"
              zIndex={1}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default GallerySection
