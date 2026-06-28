export const WAIVER_TEXT = `By submitting this request I confirm that I and everyone in my group swim at our own risk. I release the pool owner from any liability for injury, loss, or damage that may occur during our visit. I agree to follow all house and safety rules, to supervise any children in my care at all times, and I understand there may be no lifeguard on duty.`

const dateFmt = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

export function formatDay(iso) {
  return dateFmt.format(new Date(iso))
}

export function formatTime(iso) {
  return timeFmt.format(new Date(iso))
}

export function formatRange(startIso, endIso) {
  const start = new Date(startIso)
  const end = new Date(endIso)
  const sameDay = start.toDateString() === end.toDateString()
  if (sameDay) {
    return `${formatDay(startIso)} · ${timeFmt.format(start)} – ${timeFmt.format(end)}`
  }
  return `${formatDay(startIso)} ${timeFmt.format(start)} → ${formatDay(endIso)} ${timeFmt.format(end)}`
}
