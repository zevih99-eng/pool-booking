const STYLES = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  declined: 'bg-rose-100 text-rose-700',
  cancelled: 'bg-slate-200 text-slate-600',
}

const LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
  cancelled: 'Cancelled',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${STYLES[status] || STYLES.pending}`}>
      {LABELS[status] || status}
    </span>
  )
}
