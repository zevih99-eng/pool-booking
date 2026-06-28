import { useCallback, useEffect, useState } from 'react'
import { supabase, OWNER_EMAIL } from './lib/supabase'
import SignIn from './components/SignIn'
import Header from './components/Header'
import BookingForm from './components/BookingForm'
import MyRequests from './components/MyRequests'
import OwnerDashboard from './components/OwnerDashboard'

export default function App() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [bookings, setBookings] = useState([])
  const [busy, setBusy] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const user = session?.user
  const isOwner = user?.email === OWNER_EMAIL

  const loadData = useCallback(async () => {
    if (!user) return
    setLoadingData(true)
    const { data: rows } = await supabase
      .from('bookings')
      .select('*')
      .order('start_at', { ascending: true })
    setBookings(rows || [])

    const { data: busyRows } = await supabase.rpc('busy_slots')
    setBusy(busyRows || [])
    setLoadingData(false)
  }, [user])

  useEffect(() => {
    if (user) loadData()
  }, [user, loadData])

  if (!authReady) {
    return (
      <div className="grid min-h-screen place-items-center text-pool-500">
        <div className="animate-wave text-5xl">🏊</div>
      </div>
    )
  }

  if (!session) return <SignIn />

  return (
    <div className="min-h-screen pb-16">
      <Header user={user} isOwner={isOwner} />
      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
        {loadingData ? (
          <div className="card text-center text-pool-600">Loading…</div>
        ) : isOwner ? (
          <OwnerDashboard bookings={bookings} onChange={loadData} />
        ) : (
          <>
            <BookingForm user={user} busy={busy} onCreated={loadData} />
            <MyRequests bookings={bookings} onChange={loadData} />
          </>
        )}
      </main>
    </div>
  )
}
