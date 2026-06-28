import { createClient } from '@supabase/supabase-js'

// These are public, safe-to-ship values. Your data is protected by Row Level
// Security inside the database, not by hiding this key.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://ubysezrnszrabiwmnlsr.supabase.co'
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_E2cLCKe4-oONeqDI09afBg_-OpnYWcV'

// The one email that owns the pool and can see/approve every request.
export const OWNER_EMAIL = 'zevih99@gmail.com'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
