import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { USER_LEVELS } from '@/lib/constants'
import { UserAvatar } from './UserAvatar'
import type { User, Thread } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface UserProfileProps {
  user: User
  threads: Thread[]
  isOwnProfile: boolean
  onBack: () => void
  onViewThread: (threadId: string) => void
}

export function UserProfile({ user, threads, isOwnProfile, onBack, onViewThread }: UserProfileProps) {
  const levelInfo = USER_LEVELS[user.level]

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-secondary">
        <ArrowLeft size={18} />
        Kembali ke Forum
      </Button>

      <Card>
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            PROFIL PENGGUNA
          </h2>
        </div>

        <div className="p-6">
          <div className="flex gap-4 items-start mb-6">
            <div className="shrink-0">
              <UserAvatar user={user} size="xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.username}
              </h1>
              
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge className="bg-primary text-primary-foreground">
                  {levelInfo.name}
                </Badge>
                {user.role === 'admin' && (
                  <Badge className="bg-success text-success-foreground">
                    Pangulu
                  </Badge>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Anggota sajak {formatDistanceToNow(user.createdAt, { addSuffix: true })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.totalPosts}
              </div>
              <div className="text-xs text-muted-foreground">Total Thread</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.totalReactions}
              </div>
              <div className="text-xs text-muted-foreground">Total Reaksi</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {threads.length}
              </div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            THREAD {isOwnProfile ? 'SAYA' : `DARI ${user.username.toUpperCase()}`}
          </h2>
        </div>
        
        {threads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p className="font-medium">Balun ado thread</p>
            <p className="text-sm mt-1">Belum membuat thread</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="px-6 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => onViewThread(thread.id)}
              >
                <h3 className="font-semibold mb-1 hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {thread.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{thread.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{thread.commentCount} komentar</span>
                  <span>•</span>
                  <span>
                    {Object.values(thread.reactions).flat().length} reaksi
                  </span>
                  <span>•</span>
                  <span>{formatDistanceToNow(thread.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
