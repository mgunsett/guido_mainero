import { Box, Flex, Text, Image, Divider } from '@chakra-ui/react'
import { useMatches } from '../../hooks/useMatches'

const STATUS_LABEL = {
  upcoming: 'Próximo',
  live: 'En vivo',
  finished: 'Final',
}

const STATUS_ORDER = { live: 0, upcoming: 1, finished: 2 }

function Shield({ src, name, size }) {
  if (!src) return <Box boxSize={size} flexShrink={0} />
  return (
    <Image
      src={src}
      alt={name}
      boxSize={size}
      objectFit="contain"
      flexShrink={0}
      loading="lazy"
    />
  )
}

function TeamRow({ team, score, showScore, showShield, shieldSize, isStrip, mt }) {
  return (
    <Flex align="center" justify="space-between" gap={{ base: 2, md: 4 }} mt={mt}>
      <Flex align="center" gap={{ base: 1.5, md: 2 }} minW={0}>
        {showShield && <Shield src={team.shield} name={team.name} size={shieldSize} />}
        <Text
          fontFamily="condensed"
          fontSize={isStrip ? 'xs' : 'lg'}
          fontWeight={600}
          noOfLines={1}
          color={'brand.brown'}
        >
          {team.name}
        </Text>
      </Flex>
      {showScore && (
        <Text fontFamily="heading" fontSize={isStrip ? 'md' : '2xl'} color="white">
          {score}
        </Text>
      )}
    </Flex>
  )
}

function MatchCard({ match, isStrip }) {
  // El marcador manda sobre el status: si hay goles cargados se muestra el
  // resultado, si no la fecha y hora del partido.
  const showScore = match.homeScore !== null && match.awayScore !== null
  const showShield = Boolean(match.home.shield || match.away.shield)
  const shieldSize = isStrip ? { base: '14px', md: '18px' } : '22px'
  // Fecha y hora se cargan a mano desde el panel y se muestran tal cual.
  const dateLabel = match.dateLabel
  const timeLabel = match.timeLabel

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
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        direction={isStrip ? 'column' : 'column'}
        gap={isStrip ? 1 : 2}
      >
        <Flex
        direction={'column'}
        flex={isStrip ? '1' : 'none'}
        w={isStrip ? 'auto' : '100%'}
        minW={0}
        gap={showScore ? '0px' : '7px'}
        >
          <TeamRow
            team={match.home}
            score={match.homeScore}
            showScore={showScore}
            showShield={showShield}
            shieldSize={shieldSize}
            isStrip={isStrip}
          />
          <TeamRow
            team={match.away}
            score={match.awayScore}
            showScore={showScore}
            showShield={showShield}
            shieldSize={shieldSize}
            isStrip={isStrip}
            mt={1}
          />
        </Flex>

        {!isStrip && <Divider borderColor="whiteAlpha.100" />}

        <Flex
          direction={isStrip ? 'column' : 'row'}
          align={isStrip ? 'flex-end' : 'center'}
          justify="space-between"
          w={isStrip ? 'auto' : '100%'}
          gap={1}
        >
          {!showScore && dateLabel && (
          <Text
            fontFamily="condensed"
            fontSize={isStrip ? 'xs' : "md"}
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="whiteAlpha.700"
          >
            {dateLabel}
          </Text>
          )}
          {!showScore && timeLabel && (
            <Text
              fontFamily="heading"
              fontSize={isStrip ? 'xs' : "lg"}
              color="brand.brown"
              letterSpacing="0.04em"
            >
              {timeLabel}
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
    >
      {sorted.map((match) => (
        <MatchCard key={match.id} match={match} isStrip={isStrip} />
      ))}
    </Flex>
  )
}

export default MatchBox
