import { downloadICS, googleCalendarUrl } from '../lib/calendar'

export default function CalendarButtons({ booking }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={googleCalendarUrl(booking)}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost px-3 py-2 text-sm"
      >
        📅 Google Calendar
      </a>
      <button onClick={() => downloadICS(booking)} className="btn-ghost px-3 py-2 text-sm">
        🍎 Apple / Outlook
      </button>
    </div>
  )
}
