import { Box, Flex, Text, Divider } from '@chakra-ui/react'
import { useMatches } from '../../hooks/useMatches'

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
    })
  } catch {
    return ''
  }
}

function formatTime(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

const STATUS_LABEL = {
  upcoming: 'Próximo',
  live: 'En vivo',
  finished: 'Final',
}

export function MatchBox({ variant = 'float' }) {
  const { matches } = useMatches()

  // Tomamos el primer próximo, o el primero disponible.
  const next =
    matches.find((m) => m.status === 'upcoming') || matches[0]
  if (!next) return null

  const isFinished = next.status === 'finished'
  const isStrip = variant === 'strip'

  return (
    <Box
      bg="rgba(8,12,18,0.7)"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="whiteAlpha.150"
      px={{ base: 5, md: 6 }}
      py={{ base: 4, md: 5 }}
      w={isStrip ? '100%' : { base: 'auto', lg: '300px' }}
      position="relative"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '32px',
          height: '3px',
          bg: 'brand.brown',
        },
      }}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Text
          fontFamily="condensed"
          fontSize="10px"
          letterSpacing="0.28em"
          textTransform="uppercase"
          color="whiteAlpha.600"
          noOfLines={1}
        >
          {next.competition}
        </Text>
        <Flex align="center" gap={1.5}>
          {next.status === 'live' && (
            <Box w="6px" h="6px" borderRadius="full" bg="red.400" />
          )}
          <Text
            fontFamily="condensed"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={next.status === 'live' ? 'red.300' : 'brand.brown'}
          >
            {STATUS_LABEL[next.status] || ''}
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        direction={isStrip ? 'row' : 'column'}
        gap={isStrip ? 6 : 2}
      >
        <Box flex={isStrip ? '1' : 'none'} w={isStrip ? 'auto' : '100%'}>
          <Flex align="center" justify="space-between" gap={4}>
            <Text fontFamily="condensed" fontSize="md" fontWeight={600} noOfLines={1}>
              {next.home_team}
            </Text>
            {isFinished && (
              <Text fontFamily="heading" fontSize="2xl" color="white">
                {next.home_score}
              </Text>
            )}
          </Flex>
          <Flex align="center" justify="space-between" gap={4} mt={1}>
            <Text fontFamily="condensed" fontSize="md" fontWeight={600} noOfLines={1}>
              {next.away_team}
            </Text>
            {isFinished && (
              <Text fontFamily="heading" fontSize="2xl" color="white">
                {next.away_score}
              </Text>
            )}
          </Flex>
        </Box>

        {!isStrip && <Divider borderColor="whiteAlpha.100" />}

        <Flex
          direction={isStrip ? 'column' : 'row'}
          align={isStrip ? 'flex-end' : 'center'}
          justify="space-between"
          w={isStrip ? 'auto' : '100%'}
          gap={1}
        >
          <Text
            fontFamily="condensed"
            fontSize="11px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="whiteAlpha.700"
          >
            {formatDate(next.match_date)}
          </Text>
          {!isFinished && (
            <Text
              fontFamily="heading"
              fontSize="lg"
              color="brand.brown"
              letterSpacing="0.04em"
            >
              {formatTime(next.match_date)}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default MatchBox
