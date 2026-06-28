export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-pool-500 text-white shadow-card">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16c1.6 0 1.6 1.2 3.2 1.2S6.8 16 8.4 16s1.6 1.2 3.2 1.2S13.2 16 14.8 16s1.6 1.2 3.2 1.2S19.6 16 22 16" />
          <path d="M2 20c1.6 0 1.6 1.2 3.2 1.2S6.8 20 8.4 20s1.6 1.2 3.2 1.2S13.2 20 14.8 20s1.6 1.2 3.2 1.2S19.6 20 22 20" />
          <path d="M9 12V4.5A1.5 1.5 0 0 1 10.5 3h0A1.5 1.5 0 0 1 12 4.5" />
          <path d="M15 12V4.5A1.5 1.5 0 0 1 16.5 3h0A1.5 1.5 0 0 1 18 4.5" />
          <path d="M9 8h6" />
        </svg>
      </div>
      <span className="text-xl font-900 font-extrabold tracking-tight text-pool-800">Pool Time</span>
    </div>
  )
}
