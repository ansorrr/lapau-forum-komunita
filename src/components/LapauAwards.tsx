import { Trophy, ChatCircle, Fire, Lightbulb } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { UserAvatar } from './UserAvatar'
import type { User, Thread, Comment } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LapauAwardsProps {
  threads: Thread[]
  users: User[]
  comments: Comment[]
  onViewThread?: (threadId: string) => void
  onViewProfile?: (userId: string) => void
}

export function LapauAwards({ threads, users, comments, onViewThread, onViewProfile }: LapauAwardsProps) {
  const approvedThreads = threads.filter(t => t.status === 'approved')
  
  const mostActiveThread = approvedThreads.reduce((max, thread) => {
    return thread.commentCount > (max?.commentCount || 0) ? thread : max
  }, approvedThreads[0])

  const userReactionCounts = users.map(user => {
    const rendangCount = approvedThreads
      .filter(t => t.authorId === user.id)
      .reduce((sum, thread) => sum + (thread.reactions['rendang']?.length || 0), 0)
    return { user, rendangCount }
  }).sort((a, b) => b.rendangCount - a.rendangCount)

  const topRendangUser = userReactionCounts[0]

  const petuahComments = comments.filter(c => c.isPetuah)
  const commentAuthors = petuahComments.reduce((acc, comment) => {
    acc[comment.authorId] = (acc[comment.authorId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const wisestUserId = Object.entries(commentAuthors).sort((a, b) => b[1] - a[1])[0]?.[0]
  const wisestUser = users.find(u => u.id === wisestUserId)
  const wisestCount = wisestUserId ? commentAuthors[wisestUserId] : 0

  const mostControversialThread = approvedThreads.reduce((max, thread) => {
    const asinCount = thread.reactions['asin']?.length || 0
    const sambaCount = thread.reactions['samba-lado']?.length || 0
    const controversial = asinCount + sambaCount
    const maxControversial = (max?.reactions['asin']?.length || 0) + (max?.reactions['samba-lado']?.length || 0)
    return controversial > maxControversial ? thread : max
  }, approvedThreads[0])

  const awards = [
    {
      icon: <ChatCircle size={24} weight="fill" className="text-blue-500" />,
      title: 'Thread Paling Rami',
      description: 'Thread dengan diskusi paling aktif',
      winner: mostActiveThread ? {
        name: mostActiveThread.title,
        detail: `${mostActiveThread.commentCount} komentar`,
        onClick: () => onViewThread?.(mostActiveThread.id)
      } : null
    },
    {
      icon: <Fire size={24} weight="fill" className="text-orange-500" />,
      title: 'Urang Paling Banyak Rendang',
      description: 'User yang paling banyak dapat apresiasi',
      winner: topRendangUser ? {
        name: topRendangUser.user.username,
        detail: `${topRendangUser.rendangCount} rendang`,
        avatar: topRendangUser.user,
        onClick: () => onViewProfile?.(topRendangUser.user.id)
      } : null
    },
    {
      icon: <Lightbulb size={24} weight="fill" className="text-yellow-500" />,
      title: 'Komentar Paling Bijak',
      description: 'Petuah Lapau terbanyak',
      winner: wisestUser ? {
        name: wisestUser.username,
        detail: `${wisestCount} petuah`,
        avatar: wisestUser,
        onClick: () => onViewProfile?.(wisestUser.id)
      } : null
    },
    {
      icon: <Trophy size={24} weight="fill" className="text-red-500" />,
      title: 'Kieeh Terpedas Tapi Santun',
      description: 'Thread paling kontroversial',
      winner: mostControversialThread ? {
        name: mostControversialThread.title,
        detail: `${(mostControversialThread.reactions['asin']?.length || 0) + (mostControversialThread.reactions['samba-lado']?.length || 0)} reaksi pedas`,
        onClick: () => onViewThread?.(mostControversialThread.id)
      } : null
    }
  ]

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <div className="flex items-center gap-3 mb-5">
        <Trophy size={32} weight="fill" className="text-amber-600" />
        <div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            🏆 Lapau Awards
          </h2>
          <p className="text-sm text-muted-foreground">Penghargaan Bulanan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((award, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-amber-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {award.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {award.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {award.description}
                </p>
                
                {award.winner ? (
                  <button
                    onClick={award.winner.onClick}
                    className="flex items-center gap-2 w-full text-left hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors"
                  >
                    {award.winner.avatar && (
                      <UserAvatar user={award.winner.avatar} size="sm" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "font-medium text-sm truncate",
                        award.winner.avatar?.isPremium && "text-yellow-600"
                      )}>
                        {award.winner.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {award.winner.detail}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="text-sm text-muted-foreground italic">
                    Belum ada pemenang bulan ini
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200">
        <p className="text-xs text-center text-muted-foreground">
          Diperbarui setiap bulan • Berdasarkan aktivitas dan partisipasi komunitas
        </p>
      </div>
    </Card>
  )
}
