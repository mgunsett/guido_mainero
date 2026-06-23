import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'

// ─── HELPERS ─────────────────────────────────────────────────────
const SLIDE_W_MD = '40vw' // ancho slide central desktop
const SLIDE_W_BASE = '82vw' // ancho slide central mobile
const SLIDE_H_MD = '62vh'
const SLIDE_H_BASE = '52vh'

// Distancia que recorren los slides laterales (% de su propio ancho)
const SIDE_X = '68%'

// ─── BOTÓN FLECHA ─────────────────────────────────────────────────
function ArrowBtn({ direction, onClick }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w={{ base: '48px', md: '48px' }}
      h={{ base: '48px', md: '48px' }}
      py={2}
      px={'5px'}
      bg="rgba(255,255,255,0.04)"
      color="white"
      fontSize={{ base: '22px', md: '20px' }}
      cursor="pointer"
      transition="all 0.25s ease"
      _hover={{
        bg: 'rgba(156,117,90,0.18)',
        borderColor: 'rgba(156,117,90,0.55)',
        transform: `translateX(${direction === 'prev' ? '-3px' : '3px'})`,
      }}
      _focus={{ outline: 'none' }}
      aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
    >
      {direction === 'prev' ? '⟨' : '⟩'}
    </Box>
  )
}

// ─── SLIDE INDIVIDUAL ─────────────────────────────────────────────
function Slide({ item, pos, onClick, isMobile }) {
  const isCenter = pos === 0
  const isVisible = Math.abs(pos) <= 1

  const xVal = pos === 0 ? '0%' : pos < 0 ? `-${SIDE_X}` : SIDE_X
  const scale = isCenter ? 1 : 0.84
  const opacity = !isVisible ? 0 : isCenter ? 1 : isMobile ? 0 : 0.42

  return (
    <motion.div
      animate={{ x: xVal, scale, opacity, zIndex: isCenter ? 3 : isVisible ? 2 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
      onClick={isCenter ? onClick : undefined}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: isMobile ? SLIDE_W_BASE : SLIDE_W_MD,
        height: isMobile ? SLIDE_H_BASE : SLIDE_H_MD,
        cursor: isCenter ? 'zoom-in' : 'default',
        pointerEvents: isVisible ? 'auto' : 'none',
        willChange: 'transform, opacity',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      {/* Imagen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${item.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isCenter ? 'brightness(1)' : 'brightness(0.7)',
          transition: 'filter 0.4s ease',
        }}
      />

      {/* Borde sutil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255,255,255,0.10)',
          pointerEvents: 'none',
        }}
      />

      {/* Overlay degradado */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(8,12,18,0.82) 0%, rgba(8,12,18,0) 50%, rgba(8,12,18,0.28) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Textura scan-line */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.07,
          mixBlendMode: 'overlay',
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
        }}
      />

      {/* Caption — solo en el central */}
      {isCenter && (
        <Box
          position="absolute"
          left={{ base: 4, md: 6 }}
          right={{ base: 4, md: 6 }}
          bottom={{ base: 4, md: 6 }}
        >
          <Box w="28px" h="1px" bg="brand.brown" mb={2} />
          <Text
            fontFamily="condensed"
            fontSize="9px"
            fontWeight="700"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="brand.brown"
            mb={1}
          >
            {item.category}
          </Text>
          <Text
            fontFamily="condensed"
            fontSize={{ base: '13px', md: '16px' }}
            fontWeight="600"
            letterSpacing="0.05em"
            color="white"
            lineHeight="1.3"
          >
            {item.caption}
          </Text>
        </Box>
      )}
    </motion.div>
  )
}

// ─── LIGHTBOX ──────────────────────────────────────────────────────
function Lightbox({ images, activeIndex, onClose, onPrev, onNext, isMobile }) {
  const item = images[activeIndex]
  const prevItem = images[(activeIndex - 1 + images.length) % images.length]
  const nextItem = images[(activeIndex + 1) % images.length]
  const touchStartX = useRef(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > 50) onPrev()
    else if (dx < -50) onNext()
  }

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(4,7,13,0.97)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cerrar */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.28)',
          color: 'white',
          width: 44,
          height: 44,
          borderRadius: '50%',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
        }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Contador */}
      <Box
        position="absolute"
        top="28px"
        left="28px"
        zIndex={200}
        fontFamily="condensed"
        fontSize="11px"
        fontWeight="700"
        letterSpacing="0.24em"
        textTransform="uppercase"
        color="rgba(255,255,255,0.4)"
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </Box>

      {isMobile ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ width: '100%', padding: '0 20px', display: 'flex', justifyContent: 'center' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: '100%',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  maxWidth: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.8))',
                }}
              />
              <Flex direction="column" align="center" gap="4px">
                <Text
                  fontFamily="condensed"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.28em"
                  textTransform="uppercase"
                  color="brand.brown"
                >
                  {item.category}
                </Text>
                <Text
                  fontFamily="condensed"
                  fontSize="12px"
                  letterSpacing="0.06em"
                  color="rgba(255,255,255,0.55)"
                  textAlign="center"
                >
                  {item.caption}
                </Text>
              </Flex>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '4px',
            padding: '0 12px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ala anterior */}
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(70px,13vw,180px)',
              height: '52vh',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0.52,
              cursor: 'pointer',
              transform: 'translateY(52px)',
              clipPath: 'polygon(0 0, 78% 0, 100% 18%, 100% 100%, 0 100%)',
            }}
            onClick={onPrev}
          >
            <img
              src={prevItem.src}
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(3px)',
                transform: 'scale(1.06)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(4,7,13,0.18) 0%, rgba(4,7,13,0.82) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '28%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 26,
                lineHeight: 1,
              }}
            >
              ‹
            </div>
          </div>

          {/* Central */}
          <div
            style={{ flex: '0 0 auto', width: 'min(56vw, 800px)', display: 'flex', justifyContent: 'center' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.8))',
                  }}
                />
                <Flex direction="column" align="center" gap="4px">
                  <Text
                    fontFamily="condensed"
                    fontSize="9px"
                    fontWeight="700"
                    letterSpacing="0.28em"
                    textTransform="uppercase"
                    color="brand.brown"
                  >
                    {item.category}
                  </Text>
                  <Text
                    fontFamily="condensed"
                    fontSize="13px"
                    letterSpacing="0.08em"
                    color="rgba(255,255,255,0.55)"
                  >
                    {item.caption}
                  </Text>
                </Flex>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ala siguiente */}
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(70px,13vw,200px)',
              height: '52vh',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0.52,
              cursor: 'pointer',
              transform: 'translateY(52px)',
              clipPath: 'polygon(0 18%, 22% 0, 100% 0, 100% 100%, 0 100%)',
            }}
            onClick={onNext}
          >
            <img
              src={nextItem.src}
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(3px)',
                transform: 'scale(1.06)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to left, rgba(4,7,13,0.18) 0%, rgba(4,7,13,0.82) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '28%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 26,
                lineHeight: 1,
              }}
            >
              ›
            </div>
          </div>
        </div>
      )}

      {/* Nav mobile */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            zIndex: 200,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            style={{
              background: 'rgba(156,117,90,0.2)',
              border: '1px solid rgba(156,117,90,0.45)',
              color: 'white',
              width: 52,
              height: 52,
              borderRadius: '50%',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            style={{
              background: 'rgba(156,117,90,0.2)',
              border: '1px solid rgba(156,117,90,0.45)',
              color: 'white',
              width: 52,
              height: 52,
              borderRadius: '50%',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────
export function GallerySection() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  const images = playerData.gallery ?? []
  const total = images.length

  const navigate = useCallback(
    (dir) => setActive((prev) => (prev + dir + total) % total),
    [total]
  )

  const openLightbox = useCallback(() => setLightbox(active), [active])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevLightbox = useCallback(() => setLightbox((i) => (i - 1 + total) % total), [total])
  const nextLightbox = useCallback(() => setLightbox((i) => (i + 1) % total), [total])

  // Flechas de teclado (solo con lightbox cerrado)
  useEffect(() => {
    if (lightbox !== null) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, lightbox])

  // Posición de cada slide relativa al activo
  const getPos = (i) => {
    let pos = i - active
    if (pos > total / 2) pos -= total
    if (pos < -total / 2) pos += total
    return pos
  }

  return (
    <Box
      as="section"
      id="gallery"
      bg="#080C12"
      position="relative"
      overflow="hidden"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      py={{ base: 16, md: 0 }}
    >
      {/* Decoración de fondo */}
      <Box className="deco-grid" />
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

      {/* Fades laterales — recortan limpiamente los slides */}
      <Box
        position="absolute"
        top={0}
        left={0}
        h="100%"
        w={{ base: '24px', md: '80px' }}
        zIndex={4}
        pointerEvents="none"
        bg="linear-gradient(to right, #080C12 0%, rgba(8,12,18,0) 100%)"
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        h="100%"
        w={{ base: '24px', md: '80px' }}
        zIndex={4}
        pointerEvents="none"
        bg="linear-gradient(to left, #080C12 0%, rgba(8,12,18,0) 100%)"
      />

      {/* Header */}
      <Box px={{ base: 6, md: 12, lg: 20 }} mb={{ base: 6, md: 8 }} position="relative" zIndex={5}>
        <Flex justify="space-between" align="flex-end">
          <SectionHeading eyebrow="galeria" title="FOT" accent="OS" />
          <Text
            display={{ base: 'none', md: 'block' }}
            fontFamily="condensed"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.24em"
            textTransform="uppercase"
            color="rgba(255,255,255,0.25)"
            mb={6}
          >
            {String(active + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
          </Text>
        </Flex>
      </Box>

      {/* Escenario del carrusel */}
      <Box
        position="relative"
        w="100%"
        h={{ base: SLIDE_H_BASE, md: SLIDE_H_MD }}
        zIndex={3}
        flexShrink={0}
      >
        {images.map((img, i) => (
          <Slide
            key={img.id ?? i}
            item={img}
            pos={getPos(i)}
            onClick={openLightbox}
            isMobile={isMobile}
          />
        ))}
      </Box>

      {/* Controles inferiores */}
      <Flex
        position="relative"
        zIndex={5}
        px={{ base: 6, md: 12, lg: 20 }}
        mt={{ base: 8, md: 10 }}
        align="center"
        justify="space-between"
      >
        {/* Flechas */}
        <Flex gap={3}>
          <ArrowBtn direction="prev" onClick={() => navigate(-1)} />
          <ArrowBtn direction="next" onClick={() => navigate(1)} />
        </Flex>

        {/* Indicadores (dots) */}
        <Flex gap="6px" align="center">
          {images.map((_, i) => (
            <Box
              key={i}
              as="button"
              onClick={() => setActive(i)}
              w={i === active ? '28px' : '6px'}
              h="6px"
              borderRadius="3px"
              bg={i === active ? 'brand.brown' : 'rgba(255,255,255,0.2)'}
              transition="all 0.35s ease"
              cursor="pointer"
              border="none"
              p={0}
              sx={{ boxShadow: i === active ? '0 0 10px rgba(156,117,90,0.7)' : 'none' }}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </Flex>

        {/* Hint */}
        <Text
          display={{ base: 'none', md: 'block' }}
          fontFamily="condensed"
          fontSize="10px"
          fontWeight="600"
          letterSpacing="0.24em"
          textTransform="uppercase"
          color="rgba(255,255,255,0.22)"
        >
          Click para ampliar
        </Text>
      </Flex>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={images}
            activeIndex={lightbox}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </Box>
  )
}

export default GallerySection
