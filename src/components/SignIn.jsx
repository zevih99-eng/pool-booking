import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Logo from './Logo'

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
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 animate-wave text-6xl">🏊</div>
          <Logo className="mb-6" />
          <h1 className="text-3xl font-extrabold text-pool-900">Ask to use the pool</h1>
          <p className="mt-3 text-pool-700">
            Sign in to send a request for a swim. Pick your time, tell us who's coming,
            and we'll get back to you.
          </p>
        </div>

        {sent ? (
          <div className="card text-center">
            <div className="mb-3 text-5xl">📬</div>
            <h2 className="text-xl font-extrabold text-pool-900">Check your email</h2>
            <p className="mt-2 text-pool-700">
              We sent a sign-in link to <span className="font-bold">{email.trim().toLowerCase()}</span>.
              Open it on this device to continue.
            </p>
            <button
              onClick={() => { setSent(false); setError('') }}
              className="mt-5 text-sm font-bold text-pool-600 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={sendLink} className="card flex flex-col">
            <label className="field-label" htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className="field-input"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary mt-4 w-full">
              {loading ? 'Sending…' : 'Email me a sign-in link'}
            </button>
            <p className="mt-5 text-center text-xs text-pool-600">
              No password needed. We only use your email to manage your pool requests.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
