import { supabase } from '../lib/supabase'
import Logo from './Logo'

export default function Header({ user, isOwner }) {
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email

  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[52px] max-w-3xl items-center justify-between px-5 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          {isOwner && (
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.04em] text-ink48 sm:inline">
              Owner
            </span>
          )}
          <button onClick={() => supabase.auth.signOut()} className="btn-dark">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
