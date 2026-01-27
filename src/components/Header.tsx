import { Plus, SignOut, User, ShieldCheck } from '@phosphor-icons/react'
import { Button } from './ui/button'
import type { User as UserType } from '@/lib/types'

interface HeaderProps {
  currentUser: UserType | null
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
  onNavigateHome: () => void
  onNavigateAdmin: () => void
  onCreateThread: () => void
  onViewProfile: () => void
}

export function Header({
  currentUser,
  onLogin,
  onRegister,
  onLogout,
  onNavigateHome,
  onNavigateAdmin,
  onCreateThread,
  onViewProfile,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <button
          onClick={onNavigateHome}
          className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          ☕ Lapau
        </button>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <Button
                onClick={onCreateThread}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Plus size={20} weight="bold" />
                <span className="hidden sm:inline">Buek Thread</span>
              </Button>

              {currentUser.role === 'admin' && (
                <Button
                  onClick={onNavigateAdmin}
                  variant="outline"
                  size="icon"
                  className="border-success text-success hover:bg-success/10"
                >
                  <ShieldCheck size={20} weight="fill" />
                </Button>
              )}

              <Button
                onClick={onViewProfile}
                variant="outline"
                size="icon"
              >
                <User size={20} weight="fill" />
              </Button>

              <Button
                onClick={onLogout}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <SignOut size={20} />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onLogin} variant="ghost">
                Masuk Lapau
              </Button>
              <Button onClick={onRegister} className="bg-primary hover:bg-primary/90">
                Daftar Duduak
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
