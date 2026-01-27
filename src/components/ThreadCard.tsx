import { ChatCircle, Warning, Image as ImageIcon } from '@phosphor-icons/react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { CATEGORIES, REACTIONS, KAMUS_LAPAU } from '@/lib/constants'
import { UserAvatar } from './UserAvatar'
import { MediaPreview } from './MediaPreview'
import { PremiumBadge } from './PremiumBadge'
import type { Thread, User as UserType } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

interface ThreadCardProps {
  thread: Thread
  currentUser: UserType | null
  users: UserType[]
  onViewThread: (threadId: string) => void
  onReaction: (threadId: string, reaction: string) => void
  onReport: (threadId: string) => void
}

export function ThreadCard({ thread, currentUser, users, onViewThread, onReaction, onReport }: ThreadCardProps) {
  const category = CATEGORIES.find(c => c.id === thread.category)
  const totalReactions = Object.values(thread.reactions).flat().length
  const author = users.find(u => u.id === thread.authorId)

  const userReaction = currentUser 
    ? Object.entries(thread.reactions).find(([_, users]) => users.includes(currentUser.id))?.[0]
    : null

  const canReact = currentUser && (thread.authorId !== currentUser.id || thread.isAnonymous)

  const topReactions = Object.entries(thread.reactions)
    .map(([key, users]) => ({ key, count: users.length, emoji: REACTIONS[key as keyof typeof REACTIONS].emoji }))
    .filter(r => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  const hasMedia = thread.media && thread.media.length > 0

  return (
    <div 
      className="px-4 py-3 thread-row-hover cursor-pointer"
      onClick={() => onViewThread(thread.id)}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 hidden sm:flex flex-col items-center">
          {thread.isAnonymous ? (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              ?
            </div>
          ) : author ? (
            <UserAvatar user={author} size="md" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              U
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            {category && (
              <Badge 
                variant="secondary" 
                className="shrink-0 text-xs px-2 py-0.5 bg-primary/10 text-primary border-0"
              >
                {category.emoji} {category.name}
              </Badge>
            )}
            {hasMedia && (
              <Badge 
                variant="secondary" 
                className="shrink-0 text-xs px-2 py-0.5 bg-accent/10 text-accent border-0"
              >
                <ImageIcon size={12} weight="fill" className="mr-1" />
                {thread.media!.length}
              </Badge>
            )}
          </div>

          <h3 
            className="text-base font-semibold mb-1 hover:text-primary transition-colors line-clamp-2" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {thread.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1.5">
              <span 
                className={cn(
                  "font-medium",
                  author?.isPremium ? "text-yellow-600" : "text-foreground"
                )}
                style={author?.isPremium ? { 
                  textShadow: '0 0 8px rgba(234, 179, 8, 0.3)'
                } : undefined}
              >
                {thread.authorUsername}
              </span>
              {author?.isPremium && <PremiumBadge type="premium" size="sm" />}
              {author?.isUMKMVerified && !author?.isPremium && <PremiumBadge type="umkm" size="sm" />}
            </div>
            <span>•</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="hover:text-foreground cursor-help">
                    {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {new Date(thread.createdAt).toLocaleString('id-ID')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {hasMedia && (
            <MediaPreview media={thread.media!} maxDisplay={3} />
          )}
        </div>

        <div className="shrink-0 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {topReactions.map((reaction) => (
              <TooltipProvider key={reaction.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (canReact) {
                          onReaction(thread.id, reaction.key)
                        }
                      }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all ${
                        userReaction === reaction.key
                          ? 'bg-accent/20 text-accent font-medium reaction-bounce'
                          : 'hover:bg-secondary'
                      }`}
                      disabled={!canReact}
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {KAMUS_LAPAU[REACTIONS[reaction.key as keyof typeof REACTIONS].name] || REACTIONS[reaction.key as keyof typeof REACTIONS].description}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            {totalReactions === 0 && (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>

          <div className="flex items-center gap-1 min-w-[60px] justify-end">
            <ChatCircle size={16} weight="fill" className="text-muted-foreground" />
            <span className="text-sm font-medium">{thread.commentCount}</span>
          </div>

          {currentUser && thread.authorId !== currentUser.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onReport(thread.id)
              }}
              className="text-muted-foreground hover:text-destructive p-2 h-auto hidden lg:flex"
            >
              <Warning size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
