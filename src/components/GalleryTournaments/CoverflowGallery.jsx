import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { pad2 } from './galleryUtils'

/**
 * Carrusel coverflow + lightbox.
 * Es una copia adaptada del carrusel de GallerySection.jsx (que no se toca):
 * mismas medidas, springs, overlays y lightbox, pero recibe `images` y
 * `category` por props para poder reutilizarse con cada torneo.
 *
 * Tip: montalo con key={tournament.id} para que vuelva a la foto 1
 * cada vez que cambia el torneo.
 */

const SLIDE_W_MD = '40vw'
const SLIDE_W_BASE = '82vw'
const SLIDE_H_MD = '62vh'
const SLIDE_H_BASE = '52vh'
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
      w="48px"
      h="48px"
      bg="rgba(255,255,255,0.04)"
      color="white"
      fontSize="20px"
      transition="all 0.25s ease"
      _hover={{
        bg: 'rgba(156,117,90,0.18)',
        transform: `translateX(${direction === 'prev' ? '-3px' : '3px'})`,
      }}
      _focusVisible={{ outline: '1px solid', outlineColor: 'brand.brown', outlineOffset: '3px' }}
      aria-label={direction === 'prev' ? 'Foto anterior' : 'Foto siguiente'}
    >
      {direction === 'prev' ? '⟨' : '⟩'}
    </Box>
  )
}

// ─── SLIDE ────────────────────────────────────────────────────────
function Slide({ item, category, pos, onClick, isMobile, hidden }) {
  const isCenter = pos === 0
  const isVisible = Math.abs(pos) <= 1
  const xVal = pos === 0 ? '0%' : pos < 0 ? `-${SIDE_X}` : SIDE_X
  const opacity = hidden || !isVisible ? 0 : isCenter ? 1 : isMobile ? 0 : 0.42

  return (
    <motion.div
      // Si arranca oculto (transición portada → carrusel) no hay fade-out inicial
      initial={hidden ? { opacity: 0 } : undefined}
      animate={{ x: xVal, scale: isCenter ? 1 : 0.84, opacity, zIndex: isCenter ? 3 : isVisible ? 2 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
      onClick={onClick}
      data-center={isCenter}
      role="img"
      aria-label={item.alt}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: isMobile ? SLIDE_W_BASE : SLIDE_W_MD,
        height: isMobile ? SLIDE_H_BASE : SLIDE_H_MD,
        cursor: isCenter ? 'zoom-in' : 'pointer',
        pointerEvents: isVisible ? 'auto' : 'none',
        willChange: 'transform, opacity',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
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
      <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(8,12,18,0.82) 0%, rgba(8,12,18,0) 50%, rgba(8,12,18,0.28) 100%)',
          pointerEvents: 'none',
        }}
      />
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

      {isCenter && (
        <Box position="absolute" left={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }} bottom={{ base: 4, md: 6 }}>
          <Box w="28px" h="1px" bg="brand.brown" mb={2} />
          <Text fontFamily="condensed" fontSize="9px" fontWeight="700" letterSpacing="0.28em" textTransform="uppercase" color="brand.brown" mb={1}>
            {category}
          </Text>
          <Text fontFamily="condensed" fontSize={{ base: '13px', md: '16px' }} fontWeight="600" letterSpacing="0.05em" color="white" lineHeight="1.3">
            {item.caption}
          </Text>
        </Box>
      )}
    </motion.div>
  )
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────
const roundBtn = {
  color: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

function Wing({ item, side, onClick }) {
  const isPrev = side === 'prev'
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: 'clamp(70px,13vw,190px)',
        height: '52vh',
        position: 'relative',
        overflow: 'hidden',
        opacity: 0.52,
        cursor: 'pointer',
        transform: 'translateY(52px)',
        clipPath: isPrev
          ? 'polygon(0 0, 78% 0, 100% 18%, 100% 100%, 0 100%)'
          : 'polygon(0 18%, 22% 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      <img src={item.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)', transform: 'scale(1.06)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to ${isPrev ? 'right' : 'left'}, rgba(4,7,13,0.18) 0%, rgba(4,7,13,0.82) 100%)`,
        }}
      />
      <div style={{ position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 26 }}>
        {isPrev ? '‹' : '›'}
      </div>
    </div>
  )
}

function Lightbox({ images, category, activeIndex, onClose, onPrev, onNext, isMobile }) {
  const item = images[activeIndex]
  const prevItem = images[(activeIndex - 1 + images.length) % images.length]
  const nextItem = images[(activeIndex + 1) % images.length]
  const touchStartX = useRef(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [])

  const caption = (
    <Flex direction="column" align="center" gap="4px">
      <Text fontFamily="condensed" fontSize="9px" fontWeight="700" letterSpacing="0.28em" textTransform="uppercase" color="brand.brown">
        {category}
      </Text>
      
    </Flex>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${category}: foto ampliada`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(4,7,13,0.97)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (dx > 50) onPrev()
        else if (dx < -50) onNext()
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        style={{ ...roundBtn, position: 'absolute', top: 24, right: 28, width: 44, height: 44, fontSize: 20, zIndex: 200, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.28)' }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      <Box position="absolute" top="28px" left="28px" zIndex={200} fontFamily="condensed" fontSize="11px" fontWeight="700" letterSpacing="0.24em" textTransform="uppercase" color="rgba(255,255,255,0.4)">
        {pad2(activeIndex + 1)} / {pad2(images.length)}
      </Box>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 4, padding: isMobile ? '0 20px' : '0 12px' }}
      >
        {!isMobile && <Wing item={prevItem} side="prev" onClick={onPrev} />}

        <div style={{ flex: '0 0 auto', width: isMobile ? '100%' : 'min(56vw, 800px)', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={isMobile ? { opacity: 0, x: 28 } : { opacity: 0, scale: 0.97 }}
              animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1 }}
              exit={isMobile ? { opacity: 0, x: -28 } : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: isMobile ? '68vh' : '80vh',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.8))',
                }}
              />
              {caption}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isMobile && <Wing item={nextItem} side="next" onClick={onNext} />}
      </div>

      {isMobile && (
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 20, zIndex: 200 }}>
          {[
            ['‹', onPrev, 'Anterior'],
            ['›', onNext, 'Siguiente'],
          ].map(([icon, fn, label]) => (
            <button
              key={label}
              aria-label={label}
              onClick={(e) => {
                e.stopPropagation()
                fn()
              }}
              style={{ ...roundBtn, width: 52, height: 52, fontSize: 24, background: 'rgba(156,117,90,0.2)', border: '1px solid rgba(156,117,90,0.45)' }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── CARRUSEL ─────────────────────────────────────────────────────
/**
 * @param {number}  initialIndex  foto con la que arranca (la portada del torneo)
 * @param {boolean} intro         oculta slides y controles mientras corre la
 *                                transición "portada → carrusel"
 */
export function CoverflowGallery({ images, category, onIndexChange, keyboard = true, initialIndex = 0, intro = false }) {
  const [active, setActive] = useState(initialIndex)
  const [lightbox, setLightbox] = useState(null)
  const isMobile = useIsMobile()
  const total = images.length
  const touchStartX = useRef(0)

  const go = useCallback((i) => setActive(((i % total) + total) % total), [total])
  const navigate = useCallback((dir) => setActive((p) => (p + dir + total) % total), [total])

  useEffect(() => {
    onIndexChange?.(active, total)
  }, [active, total, onIndexChange])

  useEffect(() => {
    if (!keyboard || intro || lightbox !== null) return
    const onKey = (e) => {
      // No pisar la navegación por teclado de los tabs del selector
      if (e.target?.getAttribute?.('role') === 'tab') return
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, lightbox, keyboard, intro])

  const getPos = (i) => {
    let pos = i - active
    if (pos > total / 2) pos -= total
    if (pos < -total / 2) pos += total
    return pos
  }

  const closeLb = useCallback(() => setLightbox(null), [])
  const prevLb = useCallback(() => setLightbox((i) => (i - 1 + total) % total), [total])
  const nextLb = useCallback(() => setLightbox((i) => (i + 1) % total), [total])

  return (
    <>
      <Box
        position="relative"
        w="100%"
        h={{ base: SLIDE_H_BASE, md: SLIDE_H_MD }}
        zIndex={3}
        flexShrink={0}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1)
        }}
      >
        {images.map((img, i) => {
          const pos = getPos(i)
          return (
            <Slide
              key={img.id ?? i}
              item={img}
              category={category}
              pos={pos}
              isMobile={isMobile}
              hidden={intro}
              onClick={() => (pos === 0 ? setLightbox(active) : go(i))}
            />
          )
        })}
      </Box>

      <Flex
        position="relative"
        zIndex={5}
        px={{ base: 6, md: 12, lg: 20 }}
        mt={{ base: 8, md: 10 }}
        align="center"
        justify="space-between"
        gap={4}
        opacity={intro ? 0 : 1}
        transition="opacity .4s ease .15s"
      >
        <Flex gap={3}>
          <ArrowBtn direction="prev" onClick={() => navigate(-1)} />
          <ArrowBtn direction="next" onClick={() => navigate(1)} />
        </Flex>

        <Flex gap="6px" align="center" wrap="wrap" justify="center">
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
              p={0}
              sx={{ boxShadow: i === active ? '0 0 10px rgba(156,117,90,0.7)' : 'none' }}
              aria-label={`Foto ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </Flex>

        <Text display={{ base: 'none', md: 'block' }} fontFamily="condensed" fontSize="10px" fontWeight="600" letterSpacing="0.24em" textTransform="uppercase" color="rgba(255,255,255,0.22)">
          Click para ampliar
        </Text>
      </Flex>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={images}
            category={category}
            activeIndex={lightbox}
            onClose={closeLb}
            onPrev={prevLb}
            onNext={nextLb}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CoverflowGallery
