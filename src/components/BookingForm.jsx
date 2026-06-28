import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { WAIVER_TEXT } from '../lib/format'

function todayStr() {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

function combine(dateStr, timeStr) {
  // Build a Date in the visitor's own timezone, return ISO (UTC) string.
  return new Date(`${dateStr}T${timeStr}`).toISOString()
}

function overlaps(startIso, endIso, busy) {
  const s = new Date(startIso).getTime()
  const e = new Date(endIso).getTime()
  return busy.some((b) => {
    const bs = new Date(b.start_at).getTime()
    const be = new Date(b.end_at).getTime()
    return s < be && e > bs
  })
}

export default function BookingForm({ user, busy, onCreated }) {
  const [date, setDate] = useState(todayStr())
  const [start, setStart] = useState('14:00')
  const [end, setEnd] = useState('16:00')
  const [swimmers, setSwimmers] = useState('')
  const [partySize, setPartySize] = useState('')
  const [heat, setHeat] = useState(false)
  const [note, setNote] = useState('')
  const [waiver, setWaiver] = useState(false)
  const [busyOpen, setBusyOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (!swimmers.trim()) return setError('Please add who is coming.')
    if (!date || !start || !end) return setError('Please choose a date, start and end time.')

    const startIso = combine(date, start)
    const endIso = combine(date, end)

    if (new Date(endIso) <= new Date(startIso))
      return setError('The end time has to be after the start time.')
    if (new Date(startIso) < new Date(Date.now() - 60000))
      return setError('Please pick a time in the future.')
    if (!waiver) return setError('Please agree to the waiver to send your request.')

    if (overlaps(startIso, endIso, busy)) {
      return setError(
        'That time overlaps a slot that is already approved. Please pick another time.'
      )
    }

    setSaving(true)
    const name =
      user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email
    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      requester_name: name,
      requester_email: user.email,
      start_at: startIso,
      end_at: endIso,
      swimmers: swimmers.trim(),
      party_size: partySize ? Number(partySize) : null,
      heat_requested: heat,
      note: note.trim() || null,
      waiver_agreed: true,
      waiver_agreed_at: new Date().toISOString(),
      status: 'pending',
    })
    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }
    setSwimmers('')
    setPartySize('')
    setNote('')
    setHeat(false)
    setWaiver(false)
    onCreated?.()
  }

  const busyForDate = busy
    .filter((b) => new Date(b.start_at).toISOString().slice(0, 10) === date)
    .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))

  return (
    <form onSubmit={submit} className="card space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-pool-900">Request a swim 🏖️</h2>
        <p className="mt-1 text-sm text-pool-700">
          Pick your time and tell us who's coming.
        </p>
      </div>

      <div>
        <label className="field-label" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="field-input"
          value={date}
          min={todayStr()}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label" htmlFor="start">From</label>
          <input id="start" type="time" className="field-input" value={start}
            onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="end">Until</label>
          <input id="end" type="time" className="field-input" value={end}
            onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>

      {busyForDate.length > 0 && (
        <div className="rounded-xl bg-pool-100/70 px-4 py-3 text-sm text-pool-800">
          <button type="button" onClick={() => setBusyOpen((v) => !v)}
            className="flex w-full items-center justify-between font-bold">
            <span>Already booked on this day</span>
            <span>{busyOpen ? '–' : '+'}</span>
          </button>
          {busyOpen && (
            <ul className="mt-2 space-y-1">
              {busyForDate.map((b, i) => (
                <li key={i} className="font-semibold text-pool-700">
                  {new Date(b.start_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  {' – '}
                  {new Date(b.end_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label className="field-label" htmlFor="swimmers">Who's coming?</label>
        <textarea
          id="swimmers"
          className="field-input min-h-[72px]"
          placeholder="Names of everyone swimming — e.g. Me, Sarah, and the two kids"
          value={swimmers}
          onChange={(e) => setSwimmers(e.target.value)}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="party">How many people in total? <span className="font-normal text-pool-500">(optional)</span></label>
        <input id="party" type="number" min="1" max="50" className="field-input w-32"
          placeholder="e.g. 4" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
      </div>

      <button type="button" onClick={() => setHeat((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left ring-1 transition ${
          heat ? 'bg-pool-500 text-white ring-pool-500' : 'bg-pool-50 text-pool-800 ring-pool-200'
        }`}>
        <span className="font-bold">☀️ Please turn the heat on</span>
        <span className={`grid h-7 w-12 items-center rounded-full px-1 ${heat ? 'bg-white/30' : 'bg-pool-200'}`}>
          <span className={`h-5 w-5 rounded-full bg-white transition ${heat ? 'translate-x-5' : ''}`} />
        </span>
      </button>

      <div>
        <label className="field-label" htmlFor="note">Anything else? <span className="font-normal text-pool-500">(optional)</span></label>
        <textarea id="note" className="field-input min-h-[64px]"
          placeholder="A short note — e.g. birthday swim, bringing a float…"
          value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="rounded-2xl bg-pool-50 p-4 ring-1 ring-pool-200">
        <p className="text-xs leading-relaxed text-pool-700">{WAIVER_TEXT}</p>
        <label className="mt-3 flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-pool-300 text-pool-500 focus:ring-pool-400" />
          <span className="text-sm font-bold text-pool-900">
            I've read and agree to the waiver above.
          </span>
        </label>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
      )}

      <button type="submit" disabled={saving} className="btn-primary w-full">
        {saving ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
