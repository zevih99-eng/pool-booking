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
    <form onSubmit={submit} className="card space-y-6">
      <div>
        <h2 className="t-display">Request a swim</h2>
        <p className="mt-1.5 text-ink80">Pick your time and tell us who's coming.</p>
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
        <div className="rounded-md border border-hairline bg-parchment px-4 py-3 text-[14px]">
          <button type="button" onClick={() => setBusyOpen((v) => !v)}
            className="flex w-full items-center justify-between font-semibold text-ink">
            <span>Already booked on this day</span>
            <span className="text-ink48">{busyOpen ? '–' : '+'}</span>
          </button>
          {busyOpen && (
            <ul className="mt-2 space-y-1">
              {busyForDate.map((b, i) => (
                <li key={i} className="text-ink80">
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
          className="field-input min-h-[76px]"
          placeholder="Names of everyone swimming — e.g. Me, Sarah, and the two kids"
          value={swimmers}
          onChange={(e) => setSwimmers(e.target.value)}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="party">How many people in total? <span className="font-normal text-ink48">(optional)</span></label>
        <input id="party" type="number" min="1" max="50" className="field-input w-32"
          placeholder="e.g. 4" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
      </div>

      <div className="flex items-center justify-between rounded-md border border-hairline px-4 py-3">
        <span className="font-semibold text-ink">Please turn the heat on</span>
        <button type="button" role="switch" aria-checked={heat} onClick={() => setHeat((v) => !v)}
          className={`relative h-[31px] w-[51px] shrink-0 rounded-pill transition-colors duration-200 ${heat ? 'bg-accent' : 'bg-hairline'}`}>
          <span className={`absolute top-[2px] h-[27px] w-[27px] rounded-pill bg-white shadow transition-transform duration-200 ${heat ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
        </button>
      </div>

      <div>
        <label className="field-label" htmlFor="note">Anything else? <span className="font-normal text-ink48">(optional)</span></label>
        <textarea id="note" className="field-input min-h-[64px]"
          placeholder="A short note — e.g. birthday swim, bringing a float…"
          value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="rounded-md border border-hairline bg-parchment p-4">
        <p className="text-[13px] leading-relaxed text-ink80">{WAIVER_TEXT}</p>
        <label className="mt-3 flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-xs border-hairline text-accent focus:ring-accent-focus" />
          <span className="text-[14px] font-semibold text-ink">
            I've read and agree to the waiver above.
          </span>
        </label>
      </div>

      {error && (
        <p className="rounded-sm bg-red-50 px-4 py-3 text-[14px] font-medium text-red-600">{error}</p>
      )}

      <button type="submit" disabled={saving} className="btn-primary w-full">
        {saving ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
