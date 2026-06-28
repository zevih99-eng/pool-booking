import { useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { formatRange } from '../lib/format'
import StatusBadge from './StatusBadge'
import CalendarButtons from './CalendarButtons'

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'all', label: 'All' },
]

export default function OwnerDashboard({ bookings, onChange }) {
  const [tab, setTab] = useState('pending')
  const [busyId, setBusyId] = useState(null)

  async function setStatus(id, status) {
    setBusyId(id)
    await supabase.from('bookings').update({ status }).eq('id', id)
    setBusyId(null)
    onChange?.()
  }

  const counts = useMemo(() => {
    return {
      pending: bookings.filter((b) => b.status === 'pending').length,
      approved: bookings.filter((b) => b.status === 'approved').length,
      all: bookings.length,
    }
  }, [bookings])

  const visible = useMemo(() => {
    const list =
      tab === 'all' ? bookings : bookings.filter((b) => b.status === tab)
    return [...list].sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
  }, [bookings, tab])

  const heatSoon = useMemo(() => {
    const now = Date.now()
    const in48 = now + 48 * 3600 * 1000
    return bookings.filter(
      (b) =>
        b.status === 'approved' &&
        b.heat_requested &&
        new Date(b.start_at).getTime() > now &&
        new Date(b.start_at).getTime() < in48
    )
  }, [bookings])

  return (
    <div className="space-y-4">
      <div className="card bg-pool-500 text-white">
        <h2 className="text-xl font-extrabold">Your pool, your call 🏊</h2>
        <p className="mt-1 text-pool-50">
          {counts.pending > 0
            ? `${counts.pending} request${counts.pending > 1 ? 's' : ''} waiting for you.`
            : 'No requests waiting right now.'}
        </p>
      </div>

      {heatSoon.length > 0 && (
        <div className="card border-l-4 border-amber-400 bg-amber-50">
          <p className="font-extrabold text-amber-800">☀️ Heat reminder</p>
          <ul className="mt-1 space-y-1 text-sm font-semibold text-amber-800">
            {heatSoon.map((b) => (
              <li key={b.id}>
                {formatRange(b.start_at, b.end_at)} — {b.requester_name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              tab === t.key ? 'bg-pool-600 text-white shadow-card' : 'bg-white/70 text-pool-700 ring-1 ring-pool-200'
            }`}
          >
            {t.label}
            <span className="ml-1.5 opacity-80">{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card text-center text-pool-700">
          <div className="mb-2 text-4xl">🌊</div>
          <p className="font-bold text-pool-900">Nothing here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((b) => (
            <div key={b.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-extrabold text-pool-900">{formatRange(b.start_at, b.end_at)}</div>
                  <div className="mt-1 text-sm font-bold text-pool-700">{b.requester_name}</div>
                  <div className="mt-1 text-sm text-pool-700">🏊 {b.swimmers}</div>
                  {b.party_size ? (
                    <div className="mt-1 text-sm text-pool-600">👥 {b.party_size} people total</div>
                  ) : null}
                  {b.heat_requested && (
                    <div className="mt-1 text-sm font-semibold text-amber-600">☀️ Wants the heat on</div>
                  )}
                  {b.note && <div className="mt-1 text-sm text-pool-600">📝 {b.note}</div>}
                  <div className="mt-1 text-xs text-pool-500">📧 {b.requester_email}</div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              {b.status === 'pending' && (
                <div className="mt-4 flex gap-2 border-t border-pool-100 pt-4">
                  <button
                    onClick={() => setStatus(b.id, 'approved')}
                    disabled={busyId === b.id}
                    className="btn flex-1 bg-emerald-500 py-2.5 text-white hover:bg-emerald-600"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setStatus(b.id, 'declined')}
                    disabled={busyId === b.id}
                    className="btn flex-1 bg-white py-2.5 text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50"
                  >
                    ✕ Decline
                  </button>
                </div>
              )}

              {b.status === 'approved' && (
                <div className="mt-4 space-y-3 border-t border-pool-100 pt-4">
                  <CalendarButtons booking={b} />
                  <button
                    onClick={() => setStatus(b.id, 'declined')}
                    className="text-sm font-bold text-rose-600 hover:underline"
                  >
                    Cancel this booking
                  </button>
                </div>
              )}

              {(b.status === 'declined' || b.status === 'cancelled') && (
                <div className="mt-4 border-t border-pool-100 pt-4">
                  <button
                    onClick={() => setStatus(b.id, 'approved')}
                    className="text-sm font-bold text-emerald-600 hover:underline"
                  >
                    Approve instead
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
