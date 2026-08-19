import { useState, useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import { isFirebaseConfigured, playerMatchDoc } from '../lib/firebase'
import { docToMatch, fallbackMatches, hasMatchData } from '../data/matchData'

// Un documento por slot dentro de players/{PLAYER_SLUG}/matches
const SLOTS = ['last', 'next']

/**
 * Devuelve los partidos cargados en Firestore ya normalizados para la UI.
 * Si Firebase no está configurado —o si todavía no hay nada cargado—
 * cae en el fallback local.
 */
export function useMatches() {
  const [matches, setMatches] = useState(isFirebaseConfigured ? [] : fallbackMatches)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let cancelled = false

    const fetchMatches = async () => {
      try {
        const snaps = await Promise.all(
          SLOTS.map((slot) => getDoc(playerMatchDoc(slot))),
        )
        if (cancelled) return

        const loaded = snaps
          .map((snap, i) => (snap.exists() ? { slot: SLOTS[i], data: snap.data() } : null))
          .filter((entry) => entry && hasMatchData(entry.data))
          .map(({ slot, data }) => docToMatch(data, slot))

        setMatches(loaded.length ? loaded : fallbackMatches)
      } catch (e) {
        if (cancelled) return
        setError(e)
        setMatches(fallbackMatches)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMatches()
    return () => { cancelled = true }
  }, [])

  return { matches, loading, error }
}

export default useMatches
