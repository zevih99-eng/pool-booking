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
      <div className="card text-center">
        <p className="font-semibold text-ink">No requests yet</p>
        <p className="mt-1 text-[14px] text-ink48">Send your first request above and it'll show up here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="px-1 text-[21px] font-semibold text-ink">Your requests</h2>
      {bookings.map((b) => (
        <div key={b.id} className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-ink">{formatRange(b.start_at, b.end_at)}</div>
              <div className="mt-1.5 text-[15px] text-ink80">{b.swimmers}</div>
              {b.heat_requested && (
                <div className="mt-1 text-[14px] text-ink48">Heat requested</div>
              )}
              {b.note && <div className="mt-1 text-[14px] text-ink48">{b.note}</div>}
            </div>
            <StatusBadge status={b.status} />
          </div>

          {b.status === 'approved' && (
            <div className="mt-5 border-t border-divider-soft pt-4">
              <p className="mb-2.5 text-[14px] font-semibold text-ink">You're confirmed — add it to your calendar:</p>
              <CalendarButtons booking={b} />
            </div>
          )}

          {b.status === 'pending' && (
            <div className="mt-5 border-t border-divider-soft pt-4">
              <button onClick={() => cancel(b.id)} className="text-[14px] font-medium text-accent hover:underline">
                Cancel this request
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
