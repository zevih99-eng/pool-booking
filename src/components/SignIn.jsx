import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { RESORT_NAME, RESORT_ADDRESS } from '../lib/brand'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function sendLink(e) {
    e.preventDefault()
    const clean = email.trim().toLowerCase()
    if (!clean || !clean.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { emailRedirectTo: window.location.origin },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSent(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px] text-center">
          <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.04em] text-accent">
            Members only
          </p>
          <h1 className="t-hero">{RESORT_NAME}</h1>
          <p className="t-lead mx-auto mt-5 max-w-[400px]">
            Request a time for a swim. Pick your hours, tell us who's coming,
            and we'll confirm your spot.
          </p>

          {sent ? (
            <div className="card mt-10 text-left">
              <h2 className="text-[21px] font-semibold">Check your email</h2>
              <p className="mt-2 text-ink80">
                We sent a sign-in link to <span className="font-semibold text-ink">{email.trim().toLowerCase()}</span>.
                Open it on this device to continue.
              </p>
              <button
                onClick={() => { setSent(false); setError('') }}
                className="link mt-4 text-[14px]"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={sendLink} className="mx-auto mt-10 flex w-full max-w-[360px] flex-col gap-3 text-left">
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-label="Your email"
                className="field-input rounded-pill px-5 text-center"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-center text-[14px] font-medium text-red-600">{error}</p>
              )}
              <button type="submit" disabled={loading} className="btn-primary mt-1">
                {loading ? 'Sending…' : 'Email me a sign-in link'}
              </button>
              <p className="t-caption mt-2 text-center">
                No password needed. We only use your email to manage your pool requests.
              </p>
            </form>
          )}
        </div>
      </div>

      <footer className="border-t border-hairline px-6 py-6 text-center">
        <p className="t-caption">{RESORT_ADDRESS}</p>
      </footer>
    </div>
  )
}
