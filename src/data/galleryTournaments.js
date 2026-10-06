// ─────────────────────────────────────────────────────────────────
// Galería segmentada por torneo (datos estáticos / fallback).
//
// CÓMO CARGAR FOTOS
// Cada torneo tiene su carpeta dentro de src/assets/gallery-torneos/,
// con el mismo nombre que su `name` (ej: "Copa Libertadores").
// Para sumar una foto alcanza con copiarla ahí: se detecta sola, no hace
// falta tocar este archivo.
//
//   NN-texto-descriptivo.webp
//   └┬┘ └──────┬──────────┘
//    │         └─ se convierte en el epígrafe: "Texto descriptivo"
//    └─ ordena la galería (01, 02, 03…). La 01 es la portada por defecto.
//
// Los epígrafes salen del nombre del archivo. Como los nombres de archivo
// van sin tildes, los que las necesitan se corrigen en `captions` (abajo).
//
// Las fotos son copias optimizadas (máx. 1800 px) de los originales
// (ya fuera del repo; recuperables desde el historial de git).
// `coverPos` mueve el encuadre de la portada (las fotos son verticales y el
// panel es apaisado, asi que recorta): bajar el % del eje Y muestra mas arriba.
// `year` es lo que se muestra en el panel (acepta texto: '2025-2026').
// ─────────────────────────────────────────────────────────────────

// Vite resuelve esto en build: { '../assets/gallery-torneos/<Torneo>/<archivo>': url }
const files = import.meta.glob('../assets/gallery-torneos/*/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})

// Epígrafes con tildes o redacción propia, por nombre de archivo (sin extensión).
// Lo que no esté acá se arma solo a partir del nombre del archivo.
const captions = {
  '02-conduccion-a-toda-velocidad': 'Conducción a toda velocidad',
  '03-rumbo-al-circulo-central': 'Rumbo al círculo central',
  '07-preparando-el-corner': 'Preparando el córner',
  '08-la-pelota-en-el-banderin': 'La pelota en el banderín',
  '01-ejecucion-a-balon-parado': 'Ejecución a balón parado',
  '02-formacion-inicial': 'Formación inicial',
}

// '05-festejo-con-la-tribuna' → 'Festejo con la tribuna'
const captionFromName = (name) => {
  const text = name.replace(/^\d+[-_\s]*/, '').replace(/[-_]+/g, ' ').trim()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Guido Mainero'
}

// Agrupa los archivos por carpeta y los ordena por el prefijo numérico.
const photosByFolder = {}
for (const [path, src] of Object.entries(files)) {
  const [, folder, file] = path.match(/gallery-torneos\/([^/]+)\/([^/]+)$/) ?? []
  if (!folder) continue
  const id = file.replace(/\.[^.]+$/, '')
  ;(photosByFolder[folder] ??= []).push({
    id,
    src,
    caption: captions[id] ?? captionFromName(id),
  })
}
for (const list of Object.values(photosByFolder)) {
  list.sort((a, b) => a.id.localeCompare(b.id, 'es', { numeric: true }))
}

// `folder` sólo hace falta si la carpeta no se llama igual que `name`.
const photosOf = (t) => {
  const list = photosByFolder[t.folder ?? t.name] ?? []
  if (!list.length && import.meta.env.DEV) {
    console.warn(`[galleryTournaments] Sin fotos en src/assets/gallery-torneos/${t.folder ?? t.name}/`)
  }
  return list.map((p) => ({ ...p, alt: `Guido Mainero, ${p.caption.toLowerCase()}` }))
}

export const DEFAULT_TOURNAMENT_ID = 'liga-profesional'

const defs = [
  {
    id: 'liga-profesional',
    name: 'Liga Profesional',
    lines: ['Liga', 'Profesional'], // corte de línea para los títulos grandes
    year: '2025-2026', // ⚠️ PROVISORIO: confirmar año
    order: 1,
    coverPos: '50% 25%', // encuadre de la portada (eje Y: menor = se ve mas arriba)
  },
  {
    id: 'copa-libertadores',
    name: 'Copa Libertadores',
    lines: ['Copa', 'Libertadores'],
    year: '2026', // ⚠️ PROVISORIO: confirmar año
    order: 2,
    coverPos: '50% 20%',
  },
  {
    id: 'copa-argentina',
    name: 'Copa Argentina',
    lines: ['Copa', 'Argentina'],
    year: '2026', // ⚠️ PROVISORIO: confirmar año
    order: 3,
    coverPos: '50% 25%',
  },
]

// La portada es la primera foto de la carpeta; para fijar otra, agregá
// `coverId: '<nombre-del-archivo-sin-extension>'` en el torneo.
export const tournaments = defs.map((t) => ({ ...t, photos: photosOf(t) }))

export default tournaments
