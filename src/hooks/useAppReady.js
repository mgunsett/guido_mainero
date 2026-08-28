import { useEffect, useState } from 'react'

// Tiempo mínimo en pantalla: evita el parpadeo del loader en cargas cacheadas.
const MIN_DURATION = 1200
// Red de seguridad: si un asset nunca resuelve, la web entra igual.
const SAFETY_TIMEOUT = 6000
// Suavizado del lerp por frame (~200ms de constante de tiempo).
const EASE = 0.09

/** Resuelve siempre (también en error) para que un asset caído no trabe la carga. */
const settleImage = (src) =>
  new Promise((resolve) => {
    if (!src) {
      resolve()
      return
    }
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = src
    if (img.complete) resolve()
  })

/** Fuerza la descarga de las familias críticas y espera al font loading API. */
const settleFonts = () => {
  if (typeof document === 'undefined' || !document.fonts) return Promise.resolve()
  const families = ['1em "Bebas Neue"', '600 1em "Barlow Condensed"', '400 1em "Barlow"']
  return Promise.all(families.map((f) => document.fonts.load(f).catch(() => {})))
    .then(() => document.fonts.ready)
    .then(
      () => {},
      () => {}
    )
}

/**
 * Mide la carga real de las fuentes + los assets críticos del primer viewport
 * (Navbar y Hero) y devuelve un progreso 0-100 animado.
 *
 * El progreso está limitado a la vez por lo que realmente cargó y por el
 * tiempo mínimo, así que nunca se queda clavado en un número ni salta al 100.
 *
 * @param {string[]} assets URLs de imágenes a esperar.
 * @returns {{ progress: number, complete: boolean }}
 */
export function useAppReady(assets = []) {
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const assetsKey = assets.join('|')

  useEffect(() => {
    const list = assetsKey ? assetsKey.split('|') : []
    const tasks = [settleFonts(), ...list.map(settleImage)]
    const total = tasks.length

    const start = performance.now()
    let alive = true
    let done = 0
    let target = 0
    let current = 0
    let unlocked = false
    let painted = -1

    tasks.forEach((task) => {
      task.then(() => {
        done += 1
        target = done / total
      })
    })

    const unlock = () => {
      if (alive) unlocked = true
    }

    let minTimer
    Promise.all(tasks).then(() => {
      if (!alive) return
      minTimer = setTimeout(unlock, Math.max(0, MIN_DURATION - (performance.now() - start)))
    })

    const safety = setTimeout(() => {
      target = 1
      unlock()
    }, SAFETY_TIMEOUT)

    let raf
    const tick = () => {
      const timeGate = Math.min(1, (performance.now() - start) / MIN_DURATION)
      // Techo doble: ni más rápido que la carga real, ni que el mínimo en pantalla.
      const ceiling = unlocked ? 1 : Math.min(target, timeGate) * 0.96

      current += (ceiling - current) * EASE
      if (unlocked && ceiling - current < 0.005) current = 1

      const next = Math.round(current * 100)
      if (next !== painted) {
        painted = next
        setProgress(next)
      }

      if (current >= 1) {
        setComplete(true)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      clearTimeout(minTimer)
    }
  }, [assetsKey])

  return { progress, complete }
}
