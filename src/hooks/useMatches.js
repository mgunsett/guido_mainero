import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { fallbackMatches } from '../data/matchData'

/**
 * Devuelve los partidos desde Supabase (tabla `matches`).
 * Si Supabase no está configurado, usa el fallback local.
 */
export function useMatches() {
  const [matches, setMatches] = useState(fallbackMatches)
  const [loading, setLoading] = useState(isSupabaseEnabled)
  const [error, setError] = useState(null)

  const fetchMatches = useCallback(async () => {
    if (!isSupabaseEnabled) {
      setMatches(fallbackMatches)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true })
      if (err) throw err
      setMatches(data && data.length ? data : fallbackMatches)
    } catch (e) {
      setError(e)
      setMatches(fallbackMatches)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  return { matches, loading, error, refetch: fetchMatches }
}

export default useMatches
