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

  const counts = useMemo(() => ({
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    all: bookings.length,
  }), [bookings])

  const visible = useMemo(() => {
    const list = tab === 'all' ? bookings : bookings.filter((b) => b.status === tab)
    return [...list].sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
  }, [bookings, tab])

  const heatSoon = useMemo(() => {
    const now = Date.now()
    const in48 = now + 48 * 3600 * 1000
    return bookings.filter(
      (b) => b.status === 'approved' && b.heat_requested &&
        new Date(b.start_at).getTime() > now && new Date(b.start_at).getTime() < in48
    )
  }, [bookings])

  return (
    <div className="space-y-5">
      <div>
        <h2 className="t-display">Requests</h2>
        <p className="mt-1.5 text-ink80">
          {counts.pending > 0
            ? `${counts.pending} request${counts.pending > 1 ? 's' : ''} waiting for you.`
            : 'No requests waiting right now.'}
        </p>
      </div>

      {heatSoon.length > 0 && (
        <div className="card border-l-[3px] border-l-accent">
          <p className="text-[14px] font-semibold text-ink">Heat reminder — turn the pool heat on for:</p>
          <ul className="mt-1.5 space-y-1 text-[14px] text-ink80">
            {heatSoon.map((b) => (
              <li key={b.id}>{formatRange(b.start_at, b.end_at)} — {b.requester_name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-pill px-4 py-2 text-[14px] font-medium transition ${
              tab === t.key ? 'bg-ink text-white' : 'bg-canvas text-ink80 ring-1 ring-hairline'
            }`}
          >
            {t.label}<span className="ml-1.5 opacity-60">{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card text-center text-ink48">Nothing here.</div>
      ) : (
        <div className="space-y-3">
          {visible.map((b) => (
            <div key={b.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-ink">{formatRange(b.start_at, b.end_at)}</div>
                  <div className="mt-1.5 text-[15px] font-semibold text-ink">{b.requester_name}</div>
                  <div className="mt-0.5 text-[15px] text-ink80">{b.swimmers}</div>
                  {b.party_size ? (
                    <div className="mt-1 text-[14px] text-ink48">{b.party_size} people total</div>
                  ) : null}
                  {b.heat_requested && (
                    <div className="mt-1 text-[14px] font-semibold text-accent">Wants the heat on</div>
                  )}
                  {b.note && <div className="mt-1 text-[14px] text-ink48">{b.note}</div>}
                  <div className="mt-1.5 text-[13px] text-ink48">{b.requester_email}</div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              {b.status === 'pending' && (
                <div className="mt-5 flex gap-2 border-t border-divider-soft pt-4">
                  <button
                    onClick={() => setStatus(b.id, 'approved')}
                    disabled={busyId === b.id}
                    className="btn-primary flex-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setStatus(b.id, 'declined')}
                    disabled={busyId === b.id}
                    className="btn-secondary flex-1 border-hairline text-ink80"
                  >
                    Decline
                  </button>
                </div>
              )}

              {b.status === 'approved' && (
                <div className="mt-5 space-y-3 border-t border-divider-soft pt-4">
                  <CalendarButtons booking={b} />
                  <button
                    onClick={() => setStatus(b.id, 'declined')}
                    className="text-[14px] font-medium text-accent hover:underline"
                  >
                    Cancel this booking
                  </button>
                </div>
              )}

              {(b.status === 'declined' || b.status === 'cancelled') && (
                <div className="mt-5 border-t border-divider-soft pt-4">
                  <button
                    onClick={() => setStatus(b.id, 'approved')}
                    className="text-[14px] font-medium text-accent hover:underline"
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
