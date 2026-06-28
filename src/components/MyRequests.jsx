import { supabase } from '../lib/supabase'
import { formatRange } from '../lib/format'
import StatusBadge from './StatusBadge'
import CalendarButtons from './CalendarButtons'

export default function MyRequests({ bookings, onChange }) {
  async function cancel(id) {
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id)
    onChange?.()
  }

  if (!bookings.length) {
    return (
      <div className="card text-center text-pool-700">
        <div className="mb-2 text-4xl">🫧</div>
        <p className="font-bold text-pool-900">No requests yet</p>
        <p className="mt-1 text-sm">Send your first request above and it'll show up here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="px-1 text-lg font-extrabold text-pool-900">Your requests</h2>
      {bookings.map((b) => (
        <div key={b.id} className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-extrabold text-pool-900">{formatRange(b.start_at, b.end_at)}</div>
              <div className="mt-1 text-sm text-pool-700">🏊 {b.swimmers}</div>
              {b.heat_requested && (
                <div className="mt-1 text-sm font-semibold text-pool-600">☀️ Heat requested</div>
              )}
              {b.note && <div className="mt-1 text-sm text-pool-600">📝 {b.note}</div>}
            </div>
            <StatusBadge status={b.status} />
          </div>

          {b.status === 'approved' && (
            <div className="mt-4 border-t border-pool-100 pt-4">
              <p className="mb-2 text-sm font-bold text-emerald-700">You're all set — add it to your calendar:</p>
              <CalendarButtons booking={b} />
            </div>
          )}

          {b.status === 'pending' && (
            <div className="mt-4 border-t border-pool-100 pt-4">
              <button onClick={() => cancel(b.id)} className="text-sm font-bold text-rose-600 hover:underline">
                Cancel this request
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
