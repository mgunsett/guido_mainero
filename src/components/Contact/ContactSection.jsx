import { Box, Flex, Text, SimpleGrid, Grid } from '@chakra-ui/react'
import { playerData } from '../../data/playerData'
import SectionHeading from '../UI/SectionHeading'
import { useScrubReveal } from '../../hooks/useScrubReveal'

function SocialCard({ item }) {
  const Icon = item.icon
  return (
    <Box
      as="a"
      href={item.url}
      target={item.url?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      position="relative"
      overflow="hidden"
      bg="rgba(255,255,255,0.02)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={{ base: 6, md: 8 }}
      transition="all 0.3s ease"
      role="group"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(156,117,90,0.5)',
      }}
    >
      {/* watermark gigante */}
      <Box
        position="absolute"
        right="-10px"
        bottom="-20px"
        opacity={0.05}
        transition="all 0.4s ease"
        _groupHover={{ opacity: 0.18, color: item.hoverColor }}
        color="white"
        pointerEvents="none"
      >
        <Box as={Icon} fontSize="140px" />
      </Box>
      <Box position="relative">
        <Box
          as={Icon}
          fontSize="28px"
          mb={6}
          color="whiteAlpha.700"
          transition="color 0.3s ease"
          _groupHover={{ color: item.hoverColor }}
        />
        <Text
          fontFamily="condensed"
          fontSize="10px"
          letterSpacing="0.24em"
          textTransform="uppercase"
          color="whiteAlpha.500"
          mb={1}
        >
          {item.label}
        </Text>
        <Text fontFamily="heading" fontSize="2xl">
          {item.handle}
        </Text>
      </Box>
    </Box>
  )
}

function ContactRow({ item, gold }) {
  const Icon = item.icon
  return (
    <Box
      as="a"
      href={item.url}
      target={item.url?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      display="block"
      bg="rgba(255,255,255,0.02)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderLeft={gold ? '3px solid' : '1px solid'}
      borderLeftColor={gold ? 'brand.gold' : 'whiteAlpha.100'}
      p={{ base: 5, md: 6 }}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: gold ? 'brand.gold' : 'rgba(156,117,90,0.5)',
        borderLeftColor: gold ? 'brand.gold' : 'rgba(156,117,90,0.5)',
      }}
    >
      <Flex align="center" gap={4}>
        <Box
          as={Icon}
          fontSize="22px"
          color={gold ? 'brand.gold' : 'brand.brown'}
        />
        <Box>
          <Text
            fontFamily="condensed"
            fontSize="10px"
            letterSpacing="0.24em"
            textTransform="uppercase"
            color="whiteAlpha.500"
          >
            {item.label}
          </Text>
          <Text fontFamily="body" fontSize="md" fontWeight={500}>
            {item.handle}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export function ContactSection() {
  const professional = playerData.contact.filter(
    (c) => c.title === 'Contacto profesional'
  )
  const representative = playerData.contact.filter(
    (c) => c.title === 'Representante'
  )

  const socialRef = useScrubReveal({ y: 40 })
  const proRef = useScrubReveal({ y: 40, delay: 0.05 })
  const repRef = useScrubReveal({ y: 40, delay: 0.1 })

  return (
    <Box
      as="section"
      id="contact"
      position="relative"
      bg="#080C12"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 20, md: 28 }}
      overflow="hidden"
    >
      <Box className="deco-grid" />
      <Box
        position="absolute"
        top="0"
        right="-5%"
        w="50vw"
        h="50vw"
        background="radial-gradient(ellipse, rgba(156,117,90,0.06) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box position="relative" zIndex={1}>
        <SectionHeading eyebrow="#Redes" title="CONT" accent="ACTO" />

        {/* Social media */}
        <Box ref={socialRef} mb={10}>
          <Text
            fontFamily="condensed"
            fontSize="11px"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="whiteAlpha.600"
            mb={5}
          >
            Redes sociales
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 2 }} spacing={4}>
            {playerData.socialMedia.map((s, i) => (
              <SocialCard key={i} item={s} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Contacto profesional */}
        <Box ref={proRef} mb={10}>
          <Text
            fontFamily="condensed"
            fontSize="11px"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="whiteAlpha.600"
            mb={5}
          >
            Contacto profesional
          </Text>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {professional.map((c, i) => (
              <ContactRow key={i} item={c} />
            ))}
          </Grid>
        </Box>

        {/* Representante */}
        <Box ref={repRef}>
          <Text
            fontFamily="condensed"
            fontSize="11px"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="brand.gold"
            mb={5}
          >
            Representante de marketing
          </Text>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {representative.map((c, i) => (
              <ContactRow key={i} item={c} gold />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactSection
