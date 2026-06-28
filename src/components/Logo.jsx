import { RESORT_NAME } from '../lib/brand'

export default function Logo({ className = '', showName = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 16.5c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        <path d="M2 20c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        <path d="M8.5 13V5.2A1.7 1.7 0 0 1 10.2 3.5M15.5 13V5.2A1.7 1.7 0 0 1 17.2 3.5" />
        <path d="M8.5 8.4h7" />
      </svg>
      {showName && (
        <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{RESORT_NAME}</span>
      )}
    </div>
  )
}
