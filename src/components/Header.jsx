import { supabase } from '../lib/supabase'
import Logo from './Logo'

export default function Header({ user, isOwner }) {
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email
  const avatar = user?.user_metadata?.avatar_url

  return (
    <header className="sticky top-0 z-10 border-b border-pool-100 bg-pool-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            {avatar && (
              <img src={avatar} alt="" className="h-8 w-8 rounded-full ring-2 ring-white" />
            )}
            <div className="text-right leading-tight">
              <div className="text-sm font-bold text-pool-900">{name}</div>
              {isOwner && (
                <div className="text-xs font-bold uppercase tracking-wide text-pool-500">
                  Pool owner
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="btn-ghost px-3 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
