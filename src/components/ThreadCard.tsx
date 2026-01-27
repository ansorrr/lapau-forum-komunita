import { ChatCircle, Warning } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { CATEGORIES, REACTIONS, KAMUS_LAPAU } from '@/lib/constants'
import type { Thread, User } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface ThreadCardProps {
  thread: Thread
  currentUser: User | null
  onViewThread: (threadId: string) => void
  onReaction: (threadId: string, reaction: string) => void
  onReport: (threadId: string) => void
}

export function ThreadCard({ thread, currentUser, onViewThread, onReaction, onReport }: ThreadCardProps) {
  const category = CATEGORIES.find(c => c.id === thread.category)
  const totalReactions = Object.values(thread.reactions).flat().length

  const userReaction = currentUser 
    ? Object.entries(thread.reactions).find(([_, users]) => users.includes(currentUser.id))?.[0]
    : null

  const canReact = currentUser && (thread.authorId !== currentUser.id || thread.isAnonymous)

  return (
    <Card 
      className="p-6 cursor-pointer thread-card-hover"
      onClick={() => onViewThread(thread.id)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {category && (
                <Badge variant="secondary" className="shrink-0">
                  {category.emoji} {category.name}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground truncate">
                {thread.authorUsername}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm text-muted-foreground hover:text-foreground cursor-help">
                      {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {new Date(thread.createdAt).toLocaleString('id-ID')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {thread.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {thread.content}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ChatCircle size={18} weight="fill" />
              <span>{thread.commentCount}</span>
            </div>

            <div className="flex items-center gap-1">
              {Object.entries(REACTIONS).slice(0, 3).map(([key, reaction]) => {
                const count = thread.reactions[key as keyof typeof thread.reactions]?.length || 0
                if (count === 0) return null
                
                return (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (canReact) {
                              onReaction(thread.id, key)
                            }
                          }}
                          className={`text-sm px-2 py-1 rounded-md transition-all ${
                            userReaction === key
                              ? 'bg-accent/20 reaction-bounce'
                              : 'hover:bg-secondary'
                          }`}
                          disabled={!canReact}
                        >
                          {reaction.emoji} {count}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {KAMUS_LAPAU[reaction.name] || reaction.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
              
              {totalReactions > 0 && (
                <span className="text-sm text-muted-foreground ml-1">
                  {totalReactions} reaksi
                </span>
              )}
            </div>
          </div>

          {currentUser && thread.authorId !== currentUser.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onReport(thread.id)
              }}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <Warning size={18} />
              <span className="ml-1 hidden sm:inline">Ingatkan Adat</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
