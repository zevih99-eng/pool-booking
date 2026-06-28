import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { RESORT_NAME, RESORT_ADDRESS } from '../lib/brand'

export default function SignIn() {
  const [step, setStep] = useState('email') // 'email' | 'code'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const cleanEmail = email.trim().toLowerCase()

  async function sendCode(e) {
    e?.preventDefault()
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    setInfo('')
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { shouldCreateUser: true },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setStep('code')
  }

  async function verifyCode(e) {
    e.preventDefault()
    const token = code.trim()
    if (token.length < 6) {
      setError('Please enter the full code from your email.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token,
      type: 'email',
    })
    setLoading(false)
    if (error) {
      setError('That code didn’t work. Double-check it, or send a new one.')
      return
    }
    // Success: App's auth listener takes over and shows the right page.
  }

  async function resend() {
    setCode('')
    await sendCode()
    setInfo('A new code is on its way.')
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

          {step === 'email' ? (
            <form onSubmit={sendCode} className="mx-auto mt-10 flex w-full max-w-[360px] flex-col gap-3 text-left">
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
              {error && <p className="text-center text-[14px] font-medium text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary mt-1">
                {loading ? 'Sending…' : 'Email me a sign-in code'}
              </button>
              <p className="t-caption mt-2 text-center">
                No password needed. We'll email you a code to sign in.
              </p>
            </form>
          ) : (
            <form onSubmit={verifyCode} className="mx-auto mt-10 flex w-full max-w-[360px] flex-col gap-3 text-left">
              <p className="text-center text-[15px] text-ink80">
                Enter the code we emailed to{' '}
                <span className="font-semibold text-ink">{cleanEmail}</span>.
              </p>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                aria-label="Sign-in code"
                className="field-input rounded-pill px-5 text-center text-[22px] font-semibold tracking-[0.3em]"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              />
              {error && <p className="text-center text-[14px] font-medium text-red-600">{error}</p>}
              {info && <p className="text-center text-[14px] font-medium text-accent">{info}</p>}
              <button type="submit" disabled={loading} className="btn-primary mt-1">
                {loading ? 'Checking…' : 'Sign in'}
              </button>
              <div className="mt-2 flex items-center justify-center gap-4 text-[14px]">
                <button type="button" onClick={resend} className="link">Resend code</button>
                <span className="text-hairline">|</span>
                <button
                  type="button"
                  onClick={() => { setStep('email'); setCode(''); setError(''); setInfo('') }}
                  className="link"
                >
                  Use a different email
                </button>
              </div>
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
