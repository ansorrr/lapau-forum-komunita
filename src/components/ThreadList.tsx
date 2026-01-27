import { useState } from 'react'
import { ChatCircle } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { CATEGORIES } from '@/lib/constants'
import type { Thread, User, Advertisement } from '@/lib/types'
import { ThreadCard } from './ThreadCard'
import { AdBanner, SidebarAd } from './AdBanner'

interface ThreadListProps {
  threads: Thread[]
  users: User[]
  currentUser: User | null
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onViewThread: (threadId: string) => void
  onReaction: (threadId: string, reaction: string) => void
  onReport: (threadId: string) => void
  ads?: Advertisement[]
  onAdClick?: (adId: string) => void
}

export function ThreadList({
  threads,
  users,
  currentUser,
  selectedCategory,
  onSelectCategory,
  onViewThread,
  onReaction,
  onReport,
  ads = [],
  onAdClick,
}: ThreadListProps) {
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

  const sidebarAds = ads.filter(ad => ad.status === 'active' && ad.placement === 'sidebar')
  const betweenThreadsAds = ads.filter(ad => ad.status === 'active' && ad.placement === 'between-threads')

  const getCategoryThreadCount = (categoryId: string) => {
    if (categoryId === 'all') return approvedThreads.length
    return approvedThreads.filter(t => t.category === categoryId).length
  }

  return (
    <div className="flex gap-6">
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 space-y-4">
          <Card className="p-4">
            <h3 className="font-bold text-sm mb-3 text-foreground uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
              Kategori Forum
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onSelectCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'hover:bg-secondary/80 text-foreground'
                }`}
              >
                <span>📋 Semua Thread</span>
                <Badge variant="secondary" className={selectedCategory === 'all' ? 'bg-white/20 text-white border-0' : 'border-0'}>
                  {getCategoryThreadCount('all')}
                </Badge>
              </button>
              
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  <span>{cat.emoji} {cat.name}</span>
                  <Badge variant="secondary" className={selectedCategory === cat.id ? 'bg-white/20 text-white border-0' : 'border-0'}>
                    {getCategoryThreadCount(cat.id)}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>

          {trendingThreads.length > 0 && (
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-3 text-foreground uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                🔥 Lapau Paling Rami
              </h3>
              <div className="space-y-2">
                {trendingThreads.map((thread, index) => {
                  const category = CATEGORIES.find(c => c.id === thread.category)
                  return (
                    <button
                      key={thread.id}
                      onClick={() => onViewThread(thread.id)}
                      className="w-full text-left p-2.5 rounded-md hover:bg-secondary/80 transition-colors text-xs group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-accent shrink-0 text-sm">#{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="line-clamp-2 font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                            {thread.title}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span>{category?.emoji}</span>
                            <span>•</span>
                            <ChatCircle size={12} weight="fill" />
                            <span>{thread.commentCount}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </Card>
          )}

          {sidebarAds.length > 0 && (
            <div className="space-y-4">
              {sidebarAds.map(ad => (
                <SidebarAd key={ad.id} ad={ad} onClick={onAdClick} />
              ))}
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden mb-4">
          <Card className="p-3">
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm font-medium"
            >
              <option value="all">📋 Semua Thread ({getCategoryThreadCount('all')})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name} ({getCategoryThreadCount(cat.id)})
                </option>
              ))}
            </select>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-muted/40 px-5 py-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                {selectedCategory === 'all' 
                  ? 'Semua Thread' 
                  : CATEGORIES.find(c => c.id === selectedCategory)?.name
                }
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                {displayThreads.length} thread
              </span>
            </div>
          </div>

          {displayThreads.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="text-5xl mb-4">☕</div>
              <p className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Lapau masih sepi
              </p>
              <p className="text-sm text-muted-foreground">Buek thread pertamo ko!</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {displayThreads.map((thread, index) => (
                <>
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    users={users}
                    currentUser={currentUser}
                    onViewThread={onViewThread}
                    onReaction={onReaction}
                    onReport={onReport}
                  />
                  {index === 2 && betweenThreadsAds[0] && (
                    <div className="p-4 bg-muted/20">
                      <AdBanner ad={betweenThreadsAds[0]} onClick={onAdClick} />
                    </div>
                  )}
                  {index === 5 && betweenThreadsAds[1] && (
                    <div className="p-4 bg-muted/20">
                      <AdBanner ad={betweenThreadsAds[1]} onClick={onAdClick} />
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
