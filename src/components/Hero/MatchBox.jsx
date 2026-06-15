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

const STATUS_ORDER = { live: 0, upcoming: 1, finished: 2 }

function MatchCard({ match, isStrip }) {
  const isFinished = match.status === 'finished'

  return (
    <Box
      bg="rgba(8,12,18,0.7)"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="whiteAlpha.150"
      px={{ base: 2, md: 6 }}
      py={{ base: 2, md: 5 }}
      w="100%"
      h={{base:'130px', md:'200px'}}
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
      <Flex justify="space-between" align="center" mb={4}>
        <Text
          fontFamily="condensed"
          fontSize={{base:"8px", md:'10px'}}
          letterSpacing="0.28em"
          textTransform="uppercase"
          color="whiteAlpha.600"
          noOfLines={1}
        >
          {match.competition}
        </Text>
        <Flex align="center" gap={1.5}>
          {match.status === 'live' && (
            <Box w="6px" h="6px" borderRadius="full" bg="red.400" />
          )}
          <Text
            fontFamily="condensed"
            fontSize={{base:"8px", md:'10px'}}
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={match.status === 'live' ? 'red.300' : 'brand.brown'}
          >
            {STATUS_LABEL[match.status] || ''}
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        direction={isStrip ? 'row' : 'column'}
        gap={isStrip ? 1 : 2}
      >
        <Flex 
        direction={'column'}
        flex={isStrip ? '1' : 'none'} 
        w={isStrip ? 'auto' : '100%'}
        gap={isFinished ? '0px' : '7px'}
        >
          <Flex align="center" justify="space-between" gap={{base: 2, md: 4}}>
            <Text 
            fontFamily="condensed" 
            fontSize={isStrip ? 'xs' : "md"} 
            fontWeight={600} 
            noOfLines={1}>
              {match.home_team}
            </Text>
            {isFinished && (
              <Text fontFamily="heading" fontSize={isStrip ? 'md' : "2xl"} color="white">
                {match.home_score}
              </Text>
            )}
          </Flex>
          <Flex align="center" justify="space-between" gap={4} mt={1}>
            <Text fontFamily="condensed" fontSize={isStrip ? 'xs' : "md"}  fontWeight={600} noOfLines={1}>
              {match.away_team}
            </Text>
            {isFinished && (
              <Text fontFamily="heading" fontSize={isStrip ? 'md' : "2xl"} color="white">
                {match.away_score}
              </Text>
            )}
          </Flex>
        </Flex>

        {!isStrip && <Divider borderColor="whiteAlpha.100" />}

        <Flex
          direction={isStrip ? 'column' : 'row'}
          align={isStrip ? 'flex-end' : 'center'}
          justify="space-between"
          w={isStrip ? 'auto' : '100%'}
          gap={1}
        >
          {!isFinished && (
          <Text
            fontFamily="condensed"
            fontSize={isStrip ? 'xs' : "md"} 
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="whiteAlpha.700"
          >
            {formatDate(match.match_date)}
          </Text>
          )}
          {!isFinished && (
            <Text
              fontFamily="heading"
              fontSize={isStrip ? 'xs' : "lg"}
              color="brand.brown"
              letterSpacing="0.04em"
            >
              {formatTime(match.match_date)}
            </Text>
          )}
        </Flex>
      </Flex>

      {match.venue && (
        <Text
          position={'absolute'}
          left={isStrip ? 2 : 6}
          bottom={isStrip ? 2 : 4}
          fontFamily="condensed"
          fontSize={{ base: '8px', md: '11px' }}
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="whiteAlpha.500"
          noOfLines={1}
          textAlign={ 'left'}
        >
          {match.venue}
        </Text>
      )}
    </Box>
  )
}

export function MatchBox({ variant = 'float' }) {
  const { matches } = useMatches()

  const sorted = [...matches].sort(
    (a, b) => (STATUS_ORDER[a.status] ?? 3) - (STATUS_ORDER[b.status] ?? 3)
  )

  if (!sorted.length) return null

  const isStrip = variant === 'strip'

  return (
    <Flex
      direction={isStrip ? 'row' : "column"}
      gap={isStrip ? 0 : 1}
      w={isStrip ? '100%' : { base: 'auto', lg: '290px' }}
      // h={isStrip ? '100%' : { base: 'auto', lg: '20px' }}
    >
      {sorted.map((match) => (
        <MatchCard key={match.id} match={match} isStrip={isStrip} />
      ))}
    </Flex>
  )
}

export default MatchBox
