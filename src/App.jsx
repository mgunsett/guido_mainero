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
      <StatsSection />
      <VideosSection />
      <GallerySection />
      <PressSection />
      <ContactSection />
      <Footer />
    </Box>
  )
}

export default App
