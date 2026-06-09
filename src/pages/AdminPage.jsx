import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Badge,
  Spinner,
  useToast,
  IconButton,
} from '@chakra-ui/react'
import { FiTrash2, FiEdit2, FiSave, FiX, FiArrowLeft, FiLogOut } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { fallbackMatches } from '../data/matchData'
import { useAuth } from '../hooks/useAuth'
import AdminLogin from '../components/Admin/AdminLogin'

const EMPTY = {
  competition: '',
  home_team: '',
  away_team: '',
  home_score: '',
  away_score: '',
  match_date: '',
  status: 'upcoming',
  venue: '',
}

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

const STATUS_COLORS = {
  upcoming: 'yellow',
  live: 'red',
  finished: 'green',
}

export default function AdminPage() {
  const toast = useToast()
  const { session, loading: authLoading, signIn, signOut } = useAuth()
  const [matches, setMatches] = useState(fallbackMatches)
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!isSupabaseEnabled) {
      setMatches(fallbackMatches)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('match_date', { ascending: true })
    setLoading(false)
    if (error) {
      toast({ title: 'Error al cargar', status: 'error', description: error.message })
      return
    }
    setMatches(data || [])
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const resetForm = () => {
    setForm(EMPTY)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      home_score: form.home_score === '' ? null : Number(form.home_score),
      away_score: form.away_score === '' ? null : Number(form.away_score),
    }

    if (!isSupabaseEnabled) {
      // modo local: solo manipula el estado
      if (editingId) {
        setMatches((m) =>
          m.map((x) => (x.id === editingId ? { ...payload, id: editingId } : x))
        )
      } else {
        setMatches((m) => [...m, { ...payload, id: `local-${Date.now()}` }])
      }
      toast({
        title: 'Guardado (modo local)',
        description: 'Supabase no está configurado. Cambios no persisten.',
        status: 'info',
      })
      resetForm()
      return
    }

    setLoading(true)
    let res
    if (editingId) {
      res = await supabase.from('matches').update(payload).eq('id', editingId)
    } else {
      res = await supabase.from('matches').insert([payload])
    }
    setLoading(false)
    if (res.error) {
      toast({ title: 'Error', status: 'error', description: res.error.message })
      return
    }
    toast({ title: editingId ? 'Actualizado' : 'Creado', status: 'success' })
    resetForm()
    load()
  }

  const handleEdit = (m) => {
    setForm({
      competition: m.competition || '',
      home_team: m.home_team || '',
      away_team: m.away_team || '',
      home_score: m.home_score ?? '',
      away_score: m.away_score ?? '',
      match_date: m.match_date ? m.match_date.slice(0, 16) : '',
      status: m.status || 'upcoming',
      venue: m.venue || '',
    })
    setEditingId(m.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!isSupabaseEnabled) {
      setMatches((m) => m.filter((x) => x.id !== id))
      return
    }
    setLoading(true)
    const { error } = await supabase.from('matches').delete().eq('id', id)
    setLoading(false)
    if (error) {
      toast({ title: 'Error', status: 'error', description: error.message })
      return
    }
    toast({ title: 'Eliminado', status: 'success' })
    load()
  }

  // ── Guard de acceso ──────────────────────────────
  // Con Supabase activo el panel requiere sesión. En modo local se omite.
  if (isSupabaseEnabled && authLoading) {
    return (
      <Flex minH="100vh" bg="brand.dark" align="center" justify="center">
        <Spinner color="brand.brown" size="lg" thickness="2px" />
      </Flex>
    )
  }

  if (isSupabaseEnabled && !session) {
    return <AdminLogin onSignIn={signIn} />
  }

  return (
    <Box minH="100vh" bg="brand.dark" color="white" py={10} px={{ base: 4, md: 10 }}>
      <Box maxW="1000px" mx="auto">
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontFamily="heading" fontSize="4xl" letterSpacing="0.04em">
            PANEL DE PARTIDOS
          </Text>
          <Flex gap={3}>
            {isSupabaseEnabled && session && (
              <Button
                variant="piovi"
                size="sm"
                leftIcon={<FiLogOut />}
                onClick={signOut}
              >
                Cerrar sesión
              </Button>
            )}
            <Button
              as={RouterLink}
              to="/"
              variant="piovi"
              size="sm"
              leftIcon={<FiArrowLeft />}
            >
              Volver
            </Button>
          </Flex>
        </Flex>

        {!isSupabaseEnabled && (
          <Badge colorScheme="orange" mb={6} borderRadius={0} px={2} py={1}>
            Modo local — Supabase no configurado (los cambios no persisten)
          </Badge>
        )}

        {/* Formulario */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="#0A0E16"
          border="1px solid"
          borderColor="whiteAlpha.100"
          p={{ base: 5, md: 8 }}
          mb={10}
        >
          <Text
            fontFamily="condensed"
            fontSize="11px"
            letterSpacing="0.28em"
            textTransform="uppercase"
            color="brand.brown"
            mb={5}
          >
            {editingId ? 'Editar partido' : 'Nuevo partido'}
          </Text>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Input
                name="competition"
                placeholder="Competición"
                value={form.competition}
                onChange={handleChange}
                {...inputProps}
              />
            </GridItem>
            <Input
              name="home_team"
              placeholder="Equipo local"
              value={form.home_team}
              onChange={handleChange}
              {...inputProps}
            />
            <Input
              name="away_team"
              placeholder="Equipo visitante"
              value={form.away_team}
              onChange={handleChange}
              {...inputProps}
            />
            <Input
              name="home_score"
              type="number"
              placeholder="Goles local"
              value={form.home_score}
              onChange={handleChange}
              {...inputProps}
            />
            <Input
              name="away_score"
              type="number"
              placeholder="Goles visitante"
              value={form.away_score}
              onChange={handleChange}
              {...inputProps}
            />
            <Input
              name="match_date"
              type="datetime-local"
              value={form.match_date}
              onChange={handleChange}
              {...inputProps}
            />
            <Select
              name="status"
              value={form.status}
              onChange={handleChange}
              {...inputProps}
            >
              <option value="upcoming" style={{ background: '#0A0E16' }}>
                Próximo
              </option>
              <option value="live" style={{ background: '#0A0E16' }}>
                En vivo
              </option>
              <option value="finished" style={{ background: '#0A0E16' }}>
                Finalizado
              </option>
            </Select>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Input
                name="venue"
                placeholder="Estadio"
                value={form.venue}
                onChange={handleChange}
                {...inputProps}
              />
            </GridItem>
          </Grid>

          <Flex gap={3} mt={6}>
            <Button
              type="submit"
              variant="pioviSolid"
              leftIcon={<FiSave />}
              isLoading={loading}
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
            {editingId && (
              <Button variant="piovi" leftIcon={<FiX />} onClick={resetForm}>
                Cancelar
              </Button>
            )}
          </Flex>
        </Box>

        {/* Lista */}
        <Text
          fontFamily="condensed"
          fontSize="11px"
          letterSpacing="0.28em"
          textTransform="uppercase"
          color="whiteAlpha.600"
          mb={4}
        >
          Partidos ({matches.length})
        </Text>

        <Flex direction="column" gap={3}>
          {matches.map((m) => (
            <Flex
              key={m.id}
              bg="#0A0E16"
              border="1px solid"
              borderColor="whiteAlpha.100"
              p={4}
              align="center"
              justify="space-between"
              gap={4}
              wrap="wrap"
            >
              <Box flex="1" minW="200px">
                <Flex align="center" gap={3} mb={1}>
                  <Text
                    fontFamily="condensed"
                    fontSize="10px"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="whiteAlpha.600"
                  >
                    {m.competition}
                  </Text>
                  <Badge
                    colorScheme={STATUS_COLORS[m.status]}
                    borderRadius={0}
                    fontSize="9px"
                  >
                    {m.status}
                  </Badge>
                </Flex>
                <Text fontFamily="heading" fontSize="xl">
                  {m.home_team}{' '}
                  {m.status === 'finished' && (
                    <Box as="span" color="brand.brown">
                      {m.home_score} - {m.away_score}
                    </Box>
                  )}{' '}
                  {m.away_team}
                </Text>
                <Text
                  fontFamily="condensed"
                  fontSize="11px"
                  letterSpacing="0.12em"
                  color="whiteAlpha.500"
                >
                  {m.match_date
                    ? new Date(m.match_date).toLocaleString('es-AR')
                    : ''}{' '}
                  · {m.venue}
                </Text>
              </Box>
              <Flex gap={2}>
                <IconButton
                  aria-label="Editar"
                  icon={<FiEdit2 />}
                  size="sm"
                  variant="outline"
                  borderRadius={0}
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{ bg: 'brand.brown', borderColor: 'brand.brown' }}
                  onClick={() => handleEdit(m)}
                />
                <IconButton
                  aria-label="Eliminar"
                  icon={<FiTrash2 />}
                  size="sm"
                  variant="outline"
                  borderRadius={0}
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{ bg: 'red.500', borderColor: 'red.500' }}
                  onClick={() => handleDelete(m.id)}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
