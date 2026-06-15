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
    home_team: 'C.A Platense',
    away_team: '-',
    home_score: null,
    away_score: null,
    match_date: '2026-06-14T20:00:00',
    status: 'upcoming',
    venue: 'Estadio Ciudad de Vicente López',
  },
]

export default fallbackMatches
