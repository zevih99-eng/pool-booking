// Helpers to turn an approved booking into a calendar invite.

function toICSDate(iso) {
  // 2026-06-28T14:00:00.000Z -> 20260628T140000Z
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeICS(text = '') {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export function buildICS(booking) {
  const title = 'Pool time 🏊'
  const details = [
    `Swimmers: ${booking.swimmers || ''}`,
    booking.heat_requested ? 'Heat: requested ON' : 'Heat: not needed',
    booking.note ? `Note: ${booking.note}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pool Time//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}@pool-time`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(booking.start_at)}`,
    `DTEND:${toICSDate(booking.end_at)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(details)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function downloadICS(booking) {
  const blob = new Blob([buildICS(booking)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pool-time.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function googleCalendarUrl(booking) {
  const fmt = (iso) => toICSDate(iso)
  const text = 'Pool time 🏊'
  const details = [
    `Swimmers: ${booking.swimmers || ''}`,
    booking.heat_requested ? 'Heat: requested ON' : 'Heat: not needed',
    booking.note ? `Note: ${booking.note}` : '',
  ]
    .filter(Boolean)
    .join('\n')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text,
    dates: `${fmt(booking.start_at)}/${fmt(booking.end_at)}`,
    details,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
