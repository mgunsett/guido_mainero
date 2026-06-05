import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Cliente Supabase. Si no hay variables de entorno VITE_, queda como `null`
 * y la app funciona con los datos de fallback (matchData.js).
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseEnabled = Boolean(supabase)

export default supabase
