/**
 * Shape de un partido (compatible con tabla Supabase `matches`):
 * {
 *   id: number | string,
 *   competition: string,
 *   home_team: string,
 *   away_team: string,
 *   home_score: number | null,
 *   away_score: number | null,
 *   match_date: string (ISO),
 *   status: 'upcoming' | 'live' | 'finished',
 *   venue: string,
 * }
 */

export const fallbackMatches = [
  {
    id: 'm1',
    competition: 'Liga Profesional',
    home_team: 'Club Atlético',
    away_team: 'Rival FC',
    home_score: null,
    away_score: null,
    match_date: '2026-06-14T20:00:00',
    status: 'upcoming',
    venue: 'Estadio Monumental',
  },
  {
    id: 'm2',
    competition: 'Copa Nacional',
    home_team: 'Visitante United',
    away_team: 'Club Atlético',
    home_score: 1,
    away_score: 3,
    match_date: '2026-05-28T18:30:00',
    status: 'finished',
    venue: 'Estadio Sur',
  },
]

export default fallbackMatches
