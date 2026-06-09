import { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { FiLogIn, FiArrowLeft } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

const inputProps = {
  borderRadius: 0,
  bg: 'rgba(255,255,255,0.03)',
  border: '1px solid',
  borderColor: 'whiteAlpha.200',
  color: 'white',
  fontFamily: 'body',
  _hover: { borderColor: 'whiteAlpha.400' },
  _focus: { borderColor: 'brand.brown', boxShadow: 'none' },
}

export function AdminLogin({ onSignIn }) {
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSignIn(email, password)
    } catch (err) {
      toast({
        title: 'No se pudo iniciar sesión',
        description: err.message || 'Verificá tu email y contraseña.',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="brand.dark"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        w="100%"
        maxW="400px"
        bg="#0A0E16"
        border="1px solid"
        borderColor="whiteAlpha.100"
        p={{ base: 6, md: 8 }}
        position="relative"
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40px',
            height: '3px',
            bg: 'brand.brown',
          },
        }}
      >
        <Text
          fontFamily="condensed"
          fontSize="11px"
          letterSpacing="0.28em"
          textTransform="uppercase"
          color="brand.brown"
          mb={2}
        >
          Acceso restringido
        </Text>
        <Text fontFamily="heading" fontSize="3xl" letterSpacing="0.04em" mb={6}>
          PANEL DE PARTIDOS
        </Text>

        <Flex direction="column" gap={4}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            {...inputProps}
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            {...inputProps}
          />
        </Flex>

        <Button
          type="submit"
          variant="pioviSolid"
          leftIcon={<FiLogIn />}
          isLoading={loading}
          w="100%"
          mt={6}
        >
          Ingresar
        </Button>

        <Button
          as={RouterLink}
          to="/"
          variant="piovi"
          size="sm"
          leftIcon={<FiArrowLeft />}
          w="100%"
          mt={3}
        >
          Volver al sitio
        </Button>
      </Box>
    </Box>
  )
}

export default AdminLogin
