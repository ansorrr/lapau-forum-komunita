import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { USER_LEVELS } from '@/lib/constants'
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
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft size={20} />
        Kembali
      </Button>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.username}
              </h1>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary text-primary-foreground">
                  {levelInfo.name}
                </Badge>
                {user.role === 'admin' && (
                  <Badge className="bg-success text-success-foreground">
                    Pangulu
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.totalPosts}
              </div>
              <div className="text-sm text-muted-foreground">Thread</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {user.totalReactions}
              </div>
              <div className="text-sm text-muted-foreground">Reaksi</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {threads.length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Bergabung {formatDistanceToNow(user.createdAt, { addSuffix: true })}
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Thread {isOwnProfile ? 'Saya' : `dari ${user.username}`}
        </h2>
        
        {threads.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>Belum ada thread yang diposting</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => (
              <Card 
                key={thread.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onViewThread(thread.id)}
              >
                <h3 className="font-semibold mb-1">{thread.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>{thread.commentCount} komentar</span>
                  <span>•</span>
                  <span>
                    {Object.values(thread.reactions).flat().length} reaksi
                  </span>
                  <span>•</span>
                  <span>{formatDistanceToNow(thread.createdAt, { addSuffix: true })}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
