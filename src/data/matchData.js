/**
 * Capa de datos de partidos.
 *
 * Firestore: players/{PLAYER_SLUG}/matches/{last|next}
 * Campos del documento (tal como los escribe el panel /AdminPage):
 *   home_team, away_team      -> string
 *   home_score, away_score    -> number | null
 *   home_shield, away_shield  -> string (URL de Storage) | null
 *   match_date, match_time    -> string escrito a mano ('19-AGO', '16:00')
 *   stadium, competition      -> string
 *
 * docToMatch() normaliza ese documento al shape que consume <MatchBox />.
 */

import platense from '../assets/escudos/escudo_platense.webp'
import instituto from '../assets/escudos/escudo_instituto.webp'
import sarmiento from '../assets/escudos/escudo_sarmiento.webp'
import iquique from '../assets/escudos/escudo_iquique.webp'
import defensa from '../assets/escudos/escudo_defensa.webp'
import velez from '../assets/escudos/escudo_velez.webp'

// Escudos que ya viven en /assets. Sólo se usan como respaldo cuando el
// documento de Firestore no trae una URL subida desde el panel.
const LOCAL_SHIELDS = {
  platense,
  instituto,
  sarmiento,
  iquique,
  defensa,
  velez,
}

const normalize = (value = '') =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function resolveShield(url, teamName) {
  if (url) return url
  const name = normalize(teamName || '')
  if (!name) return null
  const key = Object.keys(LOCAL_SHIELDS).find((k) => name.includes(k))
  return key ? LOCAL_SHIELDS[key] : null
}

function toScore(value) {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isNaN(n) ? null : n
}

// ── Fecha y hora ────────────────────────────────────────────────
// Se cargan a mano desde el panel, así que se muestran exactamente como
// se escribieron. Lo único que se formatea son las cargas guardadas en
// formato máquina (ISO o Timestamp) para no mostrar el valor crudo.

const MACHINE_DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2})?/

function parseMachineDate(value) {
  if (!value) return null
  if (typeof value.toDate === 'function') return value.toDate()
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
  if (typeof value !== 'string' || !MACHINE_DATE.test(value)) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function toDateLabel(matchDate) {
  if (!matchDate) return ''
  const date = parseMachineDate(matchDate)
  if (date) return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
  return typeof matchDate === 'string' ? matchDate : ''
}

function toTimeLabel(matchTime, matchDate) {
  if (matchTime) return typeof matchTime === 'string' ? matchTime : ''
  const date = parseMachineDate(matchDate)
  return date ? date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : ''
}

/** Etiqueta combinada para la preview del panel de administración. */
export function dateTimeLabel(data = {}) {
  return [toDateLabel(data.match_date), toTimeLabel(data.match_time, data.match_date)]
    .filter(Boolean)
    .join(' · ')
}

/** El documento existe pero puede estar vacío (slot sin cargar). */
export function hasMatchData(data) {
  return Boolean(data && (data.home_team || data.away_team))
}

export function docToMatch(data = {}, slot = 'next') {
  const homeScore = toScore(data.home_score)
  const awayScore = toScore(data.away_score)
  const hasScore = homeScore !== null && awayScore !== null

  return {
    id: slot,
    slot,
    // El slot 'last' se carga siempre con resultado; si algún día se guarda
    // un status explícito en el documento, manda ese.
    status: data.status || (hasScore ? 'finished' : 'upcoming'),
    competition: data.competition || '',
    home: {
      name: data.home_team || '',
      shield: resolveShield(data.home_shield, data.home_team),
    },
    away: {
      name: data.away_team || '',
      shield: resolveShield(data.away_shield, data.away_team),
    },
    homeScore,
    awayScore,
    dateLabel: toDateLabel(data.match_date),
    timeLabel: toTimeLabel(data.match_time, data.match_date),
    venue: data.stadium || data.venue || '',
  }
}

/** Se usa si Firebase no está configurado o si no hay nada cargado. */
export const fallbackMatches = [
  docToMatch(
    {
      competition: 'Liga Profesional',
      home_team: 'C.A Platense',
      away_team: '-',
      match_date: '14-JUN',
      match_time: '20:00',
      stadium: 'Estadio Ciudad de Vicente López',
    },
    'next',
  ),
]

export default fallbackMatches
