import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/UI/Loader'
import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'
import Hero from './components/Hero/Hero'
import StatsSection from './components/Stats/StatsSection'
import VideosSection from './components/Videos/VideosSection'
import GallerySection from './components/Gallery/GallerySection'
import PressSection from './components/Press/PressSection'
import ContactSection from './components/Contact/ContactSection'

function App() {
  // `revealed`: la cortina empezó a subir → Navbar y Hero arrancan sus entradas.
  // `loading`: el Loader sigue montado hasta que la cortina termina de salir.
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  // Bloqueo de scroll mientras carga (nativo + Lenis).
  useEffect(() => {
    if (revealed) return

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    // Lenis se instancia en el provider padre, así que sus efectos corren
    // después de los del hijo: se lo frena en el frame siguiente.
    const raf = requestAnimationFrame(() => window.__lenis?.stop())

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [revealed])

  // Los ScrollTrigger de las secciones se crearon con el scroll bloqueado:
  // re-medir una vez que el loader se fue y el layout quedó definitivo.
  useEffect(() => {
    if (loading) return
    ScrollTrigger.refresh()
  }, [loading])

  return (
    <>
      {loading && (
        <Loader onReveal={() => setRevealed(true)} onFinish={() => setLoading(false)} />
      )}

      <Box position="relative" bg="brand.dark" overflowX="hidden">
        <Navbar ready={revealed} />
        <Hero ready={revealed} />
        {/* StatsSection is pulled up −100vh so it slides over the still-pinned
            Hero (the "section reveal" cover). This −100vh mirrors the 100vh
            cover phase reserved by the Hero's tall sticky wrapper. zIndex 21
            guarantees it paints above the Hero (zIndex 1). */}
        <Box position="relative" zIndex={21} mt={{ base: '-100vh', md: '-100vh' }}>
          <StatsSection />
        </Box>
        <VideosSection />
        <GallerySection />
        <PressSection />
        <ContactSection />
        <Footer />
      </Box>
    </>
  )
}

export default App
