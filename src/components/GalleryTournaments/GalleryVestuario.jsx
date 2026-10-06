import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useTournamentGallery } from '../../hooks/useTournamentGallery'
import { useIsMobile } from '../../hooks/useIsMobile'
import GalleryFrame from './GalleryFrame'
import CoverflowGallery from './CoverflowGallery'
import { formatCounter } from './galleryUtils'

gsap.registerPlugin(ScrollTrigger)

/**
 * GALERÍA POR TORNEOS · "VESTUARIO"
 *
 * El usuario primero elige el torneo entre tres paneles tipo acordeón.
 *
 * @param {'morph'|'expand'} transition
 *   - 'morph'  (nueva): la portada del panel viaja y se convierte en la
 *              foto central del carrusel.
 *   - 'expand' (anterior): el panel se expande a todo el ancho y el
 *              carrusel aparece con un fundido.
 *
 * Extras: Esc vuelve a los torneos · precarga de fotos al pasar el mouse ·
 * entrada de los paneles con ScrollTrigger · respeta prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1]
const PX = { base: 6, md: 12, lg: 20 }
const FADE_OTHERS_MS = 300 // morph: tiempo en que se apagan los otros paneles
const ENTER_MS = 450 // entrada de los paneles al aparecer en el viewport
// Encuadre de las portadas: las fotos son verticales (4:5) dentro de paneles
// apaisados, así que `cover` recorta arriba y abajo. 50% 25% privilegia la
// parte alta de la foto (cabezas). Se puede ajustar por torneo con `coverPos`.
const COVER_POS = '50% 25%'
const EXPAND_MS = '6' // expand: tiempo de expansión del panel

// ─── PANEL DE TORNEO ──────────────────────────────────────────────
function TournamentPanel({ t, grow, faded, isHot, isChosen, contentHidden, onSelect, onHover }) {
  const lit = isHot || isChosen
  return (
    <Box
      as="button"
      type="button"
      data-panel
      onClick={(e) => onSelect(t, e.currentTarget)}
      onMouseEnter={() => onHover(t)}
      onFocus={() => onHover(t)}
      aria-label={`${t.name} ${t.year ?? ''}. Ver galería`}
      position="relative"
      overflow="hidden"
      textAlign="left"
      minW={0}
      minH={{ base: '24vh', md: 0 }}
      flexBasis={0}
      flexGrow={grow}
      flexShrink={1}
      opacity={faded ? 0 : 1}
      transition={`flex-grow 0.8s cubic-bezier(.22,1,.36,1), all 0.95s ease`}
      sx={{ containerType: 'inline-size', isolation: 'isolate' }}
      _focusVisible={{ outline: '1px solid', outlineColor: 'brand.brown', outlineOffset: '3px' }}
    >
      {/* Portada */}
      <Box
        position="absolute"
        inset={0}
        zIndex={-2}
        bgImage={`url(${t.cover.src})`}
        bgSize="cover"
        bgPos={t.coverPos ?? COVER_POS}
        filter={{
          base: 'brightness(0.55)',
          md: isChosen ? 'brightness(0.8)' : isHot ? 'brightness(0.72) saturate(1)' : 'brightness(0.32) saturate(0.6)',
        }}
        transition="filter 0.6s ease"
      />
      {/* Overlays: degradado + scan-line + borde */}
      <Box
        position="absolute"
        inset={0}
        zIndex={-1}
        pointerEvents="none"
        border="1px solid rgba(255,255,255,0.10)"
        bg="repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px), linear-gradient(to top, rgba(8,12,18,0.92) 0%, rgba(8,12,18,0.25) 55%, rgba(8,12,18,0.55) 100%)"
      />

      <Box opacity={contentHidden ? 0 : 1} transition="opacity .25s ease">
        {/* Año, en contorno */}
        {t.year && (
          <Text
            aria-hidden="true"
            position="absolute"
            top={3}
            right={4}
            fontFamily="heading"
            lineHeight={1}
            fontSize={{ base: 'clamp(44px, 15cqi, 68px)', md: 'clamp(30px, 26cqi, 48px)' }}
            color="transparent"
            sx={{
              WebkitTextStroke: `1px ${lit ? '#9c755a' : 'rgba(156,117,90,0.55)'}`,
              transition: 'all .1s ease',
            }}
          >
            {t.year}
          </Text>
        )}

        <Flex direction="column" position="absolute" left={{ base: 5, md: 8 }} right={{ base: 5, md: 8 }} bottom={{ base: 5, md: 8 }}>
          
          <Text
            fontFamily="heading"
            textTransform="uppercase"
            lineHeight={0.92}
            letterSpacing="0.01em"
            color="white"
            fontSize={{ base: 'clamp(30px, 10cqi, 44px)', md: 'clamp(34px, 17cqi, 76px)' }}
          >
            {t.lines.map((l) => (
              <Box as="span" display="block" key={l}>
                {l}
              </Box>
            ))}
          </Text>
          <Box
            as="span"
            alignSelf="flex-start"
            mt={5}
            px={{ base: 3.5, md: 4.5 }}
            py={{ base: 2, md: 2.5 }}
            bg="brand.brown"
            color="white"
            fontFamily="condensed"
            fontWeight="600"
            fontSize={{ base: '12px', md: '13px' }}
            letterSpacing="0.1em"
            textTransform="uppercase"
            opacity={{ base: 1, md: isHot && !isChosen ? 1 : 0 }}
            transform={{ base: 'none', md: isHot ? 'none' : 'translateY(10px)' }}
            transition="opacity .4s ease, transform .5s cubic-bezier(.22,1,.36,1)"
          >
            Ver galería
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

// ─── BOTÓN "OTRO TORNEO" ──────────────────────────────────────────
function OtherTournament({ t, onClick, onHover }) {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-label={`Ver ${t.name}`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2.5}
      flex={{ base: 1, md: 'none' }}
      p={{ base: '10px 12px', md: '4px 12px 4px 4px' }}
      border="1px solid rgba(255,255,255,0.10)"
      bg="rgba(255,255,255,0.02)"
      transition="background .3s ease, border-color .3s ease"
      _hover={{ borderColor: 'rgba(156,117,90,0.6)', bg: 'rgba(156,117,90,0.12)' }}
      _focusVisible={{ outline: '1px solid', outlineColor: 'brand.brown', outlineOffset: '3px' }}
    >
      <Box display={{ base: 'none', md: 'block' }} w="52px" h="36px" bgImage={`url(${t.cover.src})`} bgSize="cover" bgPos={t.coverPos ?? COVER_POS} filter="brightness(0.7)" />
      <Text fontFamily="condensed" fontSize="12px" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase">
        {t.name}
      </Text>
    </Box>
  )
}

// ─── TRANSICIÓN "PORTADA → CARRUSEL" ──────────────────────────────
/**
 * Se monta junto con la galería. Crea una copia de la portada en la
 * posición exacta del panel y la lleva hasta el slide central. Al llegar
 * avisa con onDone() para mostrar el carrusel real y se desvanece.
 */
function MorphGhost({ morph, stageRef, onDone }) {
  useLayoutEffect(() => {
    const target = stageRef.current?.querySelector('[data-center="true"]')
    if (!target) {
      onDone()
      return undefined
    }
    const { from, src } = morph
    const to = target.getBoundingClientRect()

    const ghost = document.createElement('div')
    Object.assign(ghost.style, {
      position: 'fixed',
      zIndex: 90,
      pointerEvents: 'none',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      filter: 'brightness(0.72)',
      borderRadius: '2px',
    })
    document.body.appendChild(ghost)
    window.__lenis?.stop() // que nadie scrollee mientras viaja

    const tl = gsap
      .timeline({
        onComplete: () => {
          window.__lenis?.start()
          ghost.remove()
        },
      })
      .to(ghost, {
        left: to.left,
        top: to.top,
        width: to.width,
        height: to.height,
        filter: 'brightness(1)',
        duration: 0.85,
        ease: 'power3.inOut',
      })
      .add(onDone)
      .to(ghost, { opacity: 0, duration: 0.3, delay: 0.1 })

    return () => {
      tl.kill()
      ghost.remove()
      window.__lenis?.start()
    }
    // Solo al montar: la transición corre una vez por elección
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

// ─── MAIN ─────────────────────────────────────────────────────────
export function GalleryVestuario({ transition = 'morph' }) {
  const { tournaments } = useTournamentGallery()
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

  const [selectedId, setSelectedId] = useState(null)
  const [choosingId, setChoosingId] = useState(null) // panel elegido, durante la salida
  const [hoverId, setHoverId] = useState(null)
  const [morph, setMorph] = useState(null) // { from: DOMRect, src }
  const [counter, setCounter] = useState('')

  const timer = useRef(null)
  const panelsRef = useRef(null)
  const stageRef = useRef(null)
  const prefetched = useRef(new Set())

  useEffect(() => () => clearTimeout(timer.current), [])

  const selected = tournaments.find((t) => t.id === selectedId) ?? null
  // En mobile se entra derecho al carrusel: la transición no llega a leerse
  // en pantalla chica y retrasa la aparición de las fotos.
  const instant = isMobile || reduced
  const useMorph = transition === 'morph' && !instant

  // Precarga de las fotos de un torneo (al pasar el mouse o hacer foco)
  const prefetch = useCallback((t) => {
    if (prefetched.current.has(t.id)) return
    prefetched.current.add(t.id)
    t.photos.forEach((p) => {
      const img = new Image()
      img.src = p.src
    })
  }, [])

  const onHover = useCallback(
    (t) => {
      setHoverId(t.id)
      prefetch(t)
    },
    [prefetch],
  )

  const choose = useCallback(
    (t, panelEl) => {
      if (choosingId) return
      prefetch(t)

      if (instant) return setSelectedId(t.id)

      if (useMorph) {
        // 1) se apagan los otros paneles  2) la portada viaja al carrusel
        setChoosingId(t.id)
        timer.current = setTimeout(() => {
          setMorph({ from: panelEl.getBoundingClientRect(), src: t.cover.src })
          setSelectedId(t.id)
          setChoosingId(null)
          setHoverId(null)
        }, FADE_OTHERS_MS)
        return
      }

      // Transición 'expand'
      setChoosingId(t.id)
      timer.current = setTimeout(() => {
        setSelectedId(t.id)
        setChoosingId(null)
        setHoverId(null)
      }, EXPAND_MS)
    },
    [choosingId, instant, useMorph, prefetch],
  )

  const back = useCallback(() => {
    setSelectedId(null)
    setMorph(null)
    setCounter('')
  }, [])

  // Esc vuelve a los torneos (si el lightbox está abierto, Esc solo lo cierra)
  useEffect(() => {
    if (!selected) return undefined
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return
      const r = document.getElementById('gallery')?.getBoundingClientRect()
      if (r && (r.bottom < 0 || r.top > window.innerHeight)) return
      back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, back])

  // Entrada de los paneles al hacer scroll (y al volver de una galería).
  // Arranca antes (top 92%) y dura poco: la idea es que los paneles ya estén
  // puestos cuando la sección termina de entrar, no acompañar todo el scroll.
  useEffect(() => {
    if (selected || reduced || !panelsRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-panel]',
        { y: 36, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: ENTER_MS / 1000,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,clipPath',
          scrollTrigger: { trigger: panelsRef.current, start: 'top 92%', once: true },
        },
      )
    }, panelsRef)
    return () => ctx.revert()
  }, [selected, reduced])

  const onIndexChange = useCallback((i, total) => setCounter(formatCounter(i, total)), [])
  const endMorph = useCallback(() => setMorph(null), [])

  const growFor = (id) => {
    if (choosingId && !useMorph) return id === choosingId ? 1 : 0.0001
    if (!isMobile && hoverId) return id === hoverId ? 2.2 : 0.8
    return 1
  }

  if (!tournaments.length) return <GalleryFrame label="Galería de fotos" meta="" />

  const intro = Boolean(morph)
  const coverIndex = selected ? Math.max(0, selected.photos.findIndex((p) => p.id === selected.cover.id)) : 0

  return (
    <GalleryFrame label="Galería de fotos por torneo" meta={selected ? counter : 'Elegí un torneo'}>
      <AnimatePresence mode="wait" initial={false}>
        {!selected ? (
          // ── Vista 1: elegir torneo ──
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: morph || instant ? 0 : 0.3 } }}
            transition={{ duration: instant ? 0 : 0.25 }}
            style={{ position: 'relative', zIndex: 5 }}
          >
            <Flex
              ref={panelsRef}
              px={PX}
              direction={{ base: 'column', md: 'row' }}
              gap="4px"
              h={{ md: '66vh' }}
              onMouseLeave={() => setHoverId(null)}
            >
              {tournaments.map((t) => {
                const isChoosing = choosingId === t.id
                return (
                  <TournamentPanel
                    key={t.id}
                    t={t}
                    grow={growFor(t.id)}
                    faded={Boolean(choosingId) && !isChoosing}
                    isHot={!isMobile && (hoverId === t.id || isChoosing)}
                    isChosen={isChoosing && !useMorph}
                    contentHidden={isChoosing && useMorph}
                    onSelect={choose}
                    onHover={onHover}
                  />
                )
              })}
            </Flex>
          </motion.div>
        ) : (
          // ── Vista 2: galería del torneo ──
          <motion.div
            key="gallery"
            initial={morph || instant ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: instant ? 0 : 0.5, ease: EASE }}
            style={{ position: 'relative', zIndex: 5 }}
          >
            <Flex
              px={PX}
              mb={6}
              align="center"
              justify="space-between"
              gap={4}
              wrap="wrap"
              opacity={intro ? 0 : 1}
              transform={intro ? 'translateY(14px)' : 'none'}
              transition="opacity .45s ease, transform .45s cubic-bezier(.22,1,.36,1)"
            >
              <Box
                as="button"
                type="button"
                onClick={back}
                display="flex"
                alignItems="center"
                gap={2.5}
                px={4}
                py={2.5}
                border="1px solid rgba(255,255,255,0.18)"
                fontFamily="condensed"
                fontWeight="600"
                fontSize="13px"
                letterSpacing="0.1em"
                textTransform="uppercase"
                transition="background .3s ease, border-color .3s ease"
                _hover={{ bg: 'brand.brown', borderColor: 'brand.brown' }}
                _focusVisible={{ outline: '1px solid', outlineColor: 'brand.brown', outlineOffset: '3px' }}
              >
                <span aria-hidden="true">⟨</span> Torneos
              </Box>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginRight: 'auto', order: isMobile ? -1 : 0, width: isMobile ? '100%' : 'auto' }}
                >
                  <Flex align="baseline" gap={3.5}>
                    <Text as="h3" fontFamily="heading" textTransform="uppercase" lineHeight={1} fontSize="clamp(32px, 4vw, 56px)">
                      {selected.name}
                    </Text>
                    {selected.year && (
                      <Text fontFamily="condensed" fontSize="12px" fontWeight="600" letterSpacing="0.24em" textTransform="uppercase" color="brand.brown">
                        {selected.year}
                      </Text>
                    )}
                  </Flex>
                </motion.div>
              </AnimatePresence>

              <Flex gap={2} w={{ base: '100%', md: 'auto' }}>
                {tournaments
                  .filter((t) => t.id !== selected.id)
                  .map((t) => (
                    <OtherTournament key={t.id} t={t} onClick={() => setSelectedId(t.id)} onHover={() => prefetch(t)} />
                  ))}
              </Flex>
            </Flex>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                ref={stageRef}
                // En el morph no hay desplazamiento inicial: el slide central
                // tiene que estar en su lugar final para medirlo.
                initial={morph ? false : { opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <CoverflowGallery
                  images={selected.photos}
                  category={selected.name}
                  initialIndex={coverIndex}
                  intro={intro}
                  onIndexChange={onIndexChange}
                />
              </motion.div>
            </AnimatePresence>

            {morph && <MorphGhost morph={morph} stageRef={stageRef} onDone={endMorph} />}
          </motion.div>
        )}
      </AnimatePresence>
    </GalleryFrame>
  )
}

export default GalleryVestuario
