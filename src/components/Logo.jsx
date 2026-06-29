// Geometric "glacier" mark — stacked ice planes suggesting both an iceberg
// and an industrial structure. Inherits brand color via currentColor.
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect width="48" height="48" rx="11" fill="currentColor" />
      <path d="M24 9 38 33H10L24 9Z" fill="#fff" fillOpacity="0.95" />
      <path d="M24 9 31 21l-7 4-7-4L24 9Z" fill="#6fa8dc" fillOpacity="0.9" />
      <path d="M10 33h28l-3 5H13l-3-5Z" fill="#fff" fillOpacity="0.55" />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 no-underline">
      <span className={light ? 'text-white' : 'text-navy'}>
        <LogoMark className="h-8 w-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-bold tracking-tight ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          ICELAND
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-ice' : 'text-glacier'
          }`}
        >
          Industrial Group
        </span>
      </span>
    </a>
  )
}
