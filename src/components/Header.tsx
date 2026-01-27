import { Plus, SignOut, ShieldCheck, House, ChatCircle, Crown, Storefront } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { USER_LEVELS } from '@/lib/constants'
import { UserAvatar } from './UserAvatar'
import type { User as UserType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface HeaderProps {
  currentUser: UserType | null
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
  onNavigateHome: () => void
  onNavigateAdmin: () => void
  onCreateThread: () => void
  onViewProfile: () => void
  onOpenPremium: () => void
  onOpenUMKM: () => void
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
  onOpenPremium,
  onOpenUMKM,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="header-gradient text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                ☕ LAPAU
              </div>
              <div className="hidden sm:block text-xs opacity-90">
                Forum Komunitas Minangkabau
              </div>
            </button>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <>
                  <div className="hidden md:flex items-center gap-2 mr-2 px-3 py-1.5 bg-white/10 rounded-md">
                    <UserAvatar user={currentUser} size="sm" />
                    <div className="flex flex-col">
                      <span 
                        className={cn(
                          "text-sm font-medium leading-tight",
                          currentUser.isPremium && "text-yellow-300"
                        )}
                      >
                        {currentUser.username}
                      </span>
                      <span className="text-xs opacity-75 leading-tight">
                        {USER_LEVELS[currentUser.level].name}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={onCreateThread}
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"
                  >
                    <Plus size={18} weight="bold" />
                    <span className="hidden sm:inline">Buek Thread</span>
                  </Button>

                  {currentUser.role === 'admin' && (
                    <Button
                      onClick={onNavigateAdmin}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <ShieldCheck size={20} weight="fill" />
                    </Button>
                  )}

                  <Button
                    onClick={onViewProfile}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 md:hidden"
                  >
                    <UserAvatar user={currentUser} size="sm" />
                  </Button>

                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:bg-white/20 hover:text-white"
                  >
                    <SignOut size={18} />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={onLogin} 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    Masuk Lapau
                  </Button>
                  <Button 
                    onClick={onRegister}
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Daftar Duduak
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-10">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <House size={16} weight="fill" />
              <span>Berando</span>
            </button>
            <button
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ChatCircle size={16} weight="fill" />
              <span>Thread Terbaru</span>
            </button>
            {currentUser && !currentUser.isPremium && (
              <button
                onClick={onOpenPremium}
                className="flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors ml-auto"
              >
                <Crown size={16} weight="fill" />
                <span>Upgrade Premium</span>
              </button>
            )}
            {currentUser && !currentUser.isUMKMVerified && (
              <button
                onClick={onOpenUMKM}
                className="flex items-center gap-2 text-sm font-medium text-success hover:opacity-80 transition-opacity"
              >
                <Storefront size={16} weight="fill" />
                <span>Verifikasi UMKM</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
