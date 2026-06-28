const STYLES = {
  pending: 'bg-parchment text-ink80 ring-hairline',
  approved: 'bg-[#e9f6ee] text-[#1d7a3e] ring-[#bfe6cd]',
  declined: 'bg-[#fdecec] text-[#b42318] ring-[#f4c1bd]',
  cancelled: 'bg-parchment text-ink48 ring-hairline',
}

const LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
  cancelled: 'Cancelled',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`shrink-0 rounded-pill px-3 py-1 text-[12px] font-semibold ring-1 ${STYLES[status] || STYLES.pending}`}>
      {LABELS[status] || status}
    </span>
  )
}
