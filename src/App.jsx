import { Box } from '@chakra-ui/react'

import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'
import Hero from './components/Hero/Hero'
import StatsSection from './components/Stats/StatsSection'
import VideosSection from './components/Videos/VideosSection'
import GallerySection from './components/Gallery/GallerySection'
import PressSection from './components/Press/PressSection'
import ContactSection from './components/Contact/ContactSection'

function App() {
  return (
    <Box position="relative" bg="brand.dark" overflowX="hidden">
      <Navbar />
      <Hero />
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
  )
}

export default App
