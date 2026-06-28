import { downloadICS, googleCalendarUrl } from '../lib/calendar'

export default function CalendarButtons({ booking }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={googleCalendarUrl(booking)}
        target="_blank"
        rel="noreferrer"
        className="btn-quiet"
      >
        Add to Google Calendar
      </a>
      <button onClick={() => downloadICS(booking)} className="btn-quiet">
        Apple / Outlook
      </button>
    </div>
  )
}
