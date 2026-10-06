import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured, PLAYER_SLUG } from '../lib/firebase'
import { tournaments as fallbackTournaments } from '../data/galleryTournaments'

/**
 * Galería por torneo. Mismo patrón que useMatches:
 *  - Siempre arranca con src/data/galleryTournaments.js (render instantáneo)
 *  - Con Firebase → lee players/{PLAYER_SLUG}/galleries/{tournamentId}
 *    y, si hay datos, reemplaza a los estáticos
 *
 * Shape esperado de cada doc en Firestore (para cuando migres):
 *  {
 *    name: 'Liga Profesional',
 *    lines: ['Liga', 'Profesional'],      // opcional
 *    year: '2026',
 *    order: 1,
 *    coverId: 'abc123',                   // opcional, por defecto la primera foto
 *    photos: [{ id, src, caption, alt }]  // src = downloadURL de Storage
 *  }
 *
 * Mientras esa colección no exista, el hook cae siempre en el fallback,
 * así que se puede usar ya mismo sin tocar nada de Firebase.
 */
function normalize(list) {
  return [...list]
    .filter((t) => Array.isArray(t.photos) && t.photos.length > 0)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((t) => ({
      ...t,
      lines: t.lines?.length ? t.lines : t.name.split(' '),
      cover: t.photos.find((p) => p.id === t.coverId) ?? t.photos[0],
      photos: t.photos.map((p) => ({ ...p, alt: p.alt || `Guido Mainero, ${t.name}` })),
    }))
}

export function useTournamentGallery() {
  // Se muestran las fotos estáticas al instante; si Firestore trae datos,
  // se reemplazan. Así la sección nunca queda vacía mientras carga.
  const [tournaments, setTournaments] = useState(() => normalize(fallbackTournaments))
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let cancelled = false

    const fetchGalleries = async () => {
      try {
        const snap = await getDocs(collection(db, 'players', PLAYER_SLUG, 'galleries'))
        if (cancelled) return
        const loaded = normalize(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        if (loaded.length) setTournaments(loaded)
      } catch (e) {
        if (cancelled) return
        setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGalleries()
    return () => {
      cancelled = true
    }
  }, [])

  return { tournaments, loading, error }
}

export default useTournamentGallery
