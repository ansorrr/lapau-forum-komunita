import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { CATEGORIES } from '@/lib/constants'
import type { Thread, User } from '@/lib/types'
import { ThreadCard } from './ThreadCard'

interface ThreadListProps {
  threads: Thread[]
  currentUser: User | null
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onViewThread: (threadId: string) => void
  onReaction: (threadId: string, reaction: string) => void
  onReport: (threadId: string) => void
}

export function ThreadList({
  threads,
  currentUser,
  selectedCategory,
  onSelectCategory,
  onViewThread,
  onReaction,
  onReport,
}: ThreadListProps) {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly'>('daily')

  const approvedThreads = threads.filter(t => t.status === 'approved')
  
  const filteredThreads = selectedCategory === 'all'
    ? approvedThreads
    : approvedThreads.filter(t => t.category === selectedCategory)

  const trendingThreads = [...approvedThreads]
    .sort((a, b) => {
      const aScore = a.commentCount * 2 + Object.values(a.reactions).flat().length
      const bScore = b.commentCount * 2 + Object.values(b.reactions).flat().length
      return bScore - aScore
    })
    .slice(0, 5)

  const displayThreads = filteredThreads.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Kategori
        </h2>
        <Tabs value={selectedCategory} onValueChange={onSelectCategory}>
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Semua
            </TabsTrigger>
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.emoji} {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {selectedCategory === 'all' && trendingThreads.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              🔥 Lapau Paling Rami
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFilter('daily')}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  timeFilter === 'daily'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Harian
              </button>
              <button
                onClick={() => setTimeFilter('weekly')}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  timeFilter === 'weekly'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mingguan
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {trendingThreads.map((thread, index) => (
              <div key={thread.id} className="flex gap-3">
                <Badge 
                  variant="outline" 
                  className="h-6 w-6 flex items-center justify-center shrink-0 border-accent text-accent"
                >
                  {index + 1}
                </Badge>
                <ThreadCard
                  thread={thread}
                  currentUser={currentUser}
                  onViewThread={onViewThread}
                  onReaction={onReaction}
                  onReport={onReport}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          {selectedCategory === 'all' ? 'Thread Terbaru' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
        </h2>
        
        {displayThreads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Lapau masih sepi</p>
            <p className="text-sm mt-1">Buek thread pertamo ko!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                currentUser={currentUser}
                onViewThread={onViewThread}
                onReaction={onReaction}
                onReport={onReport}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
