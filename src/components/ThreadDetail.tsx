import { useState } from 'react'
import { ArrowLeft, ChatCircle, Warning } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { CATEGORIES, REACTIONS, KAMUS_LAPAU } from '@/lib/constants'
import type { Thread, Comment, User } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { CommentItem } from './CommentItem'
import { toast } from 'sonner'

interface ThreadDetailProps {
  thread: Thread
  comments: Comment[]
  currentUser: User | null
  onBack: () => void
  onReaction: (threadId: string, reaction: string) => void
  onAddComment: (threadId: string, content: string, parentId?: string, isAnonymous?: boolean) => void
  onReport: (threadId?: string) => void
  onDeleteComment: (commentId: string) => void
  onMarkPetuah: (commentId: string) => void
  onViewProfile: (userId: string) => void
}

export function ThreadDetail({
  thread,
  comments,
  currentUser,
  onBack,
  onReaction,
  onAddComment,
  onReport,
  onDeleteComment,
  onMarkPetuah,
  onViewProfile,
}: ThreadDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const category = CATEGORIES.find(c => c.id === thread.category)
  const totalReactions = Object.values(thread.reactions).flat().length

  const userReaction = currentUser 
    ? Object.entries(thread.reactions).find(([_, users]) => users.includes(currentUser.id))?.[0]
    : null

  const canReact = currentUser && (thread.authorId !== currentUser.id || thread.isAnonymous)

  const rootComments = comments.filter(c => !c.parentId)

  const handleSubmitComment = () => {
    if (!currentUser) {
      toast.error('Masuk dulu untuak berkomentar')
      return
    }

    if (!newComment.trim()) {
      toast.error('Komentar indak buliah kosong')
      return
    }

    onAddComment(thread.id, newComment, replyingTo || undefined, isAnonymous)
    setNewComment('')
    setIsAnonymous(false)
    setReplyingTo(null)
    toast.success('Komentar lah ditambahkan')
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft size={20} />
        Kembali
      </Button>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <Badge variant="secondary">
                {category.emoji} {category.name}
              </Badge>
            )}
            <button
              onClick={() => !thread.isAnonymous && onViewProfile(thread.authorId)}
              className={`text-sm text-muted-foreground ${!thread.isAnonymous && 'hover:text-foreground hover:underline'}`}
              disabled={thread.isAnonymous}
            >
              {thread.authorUsername}
            </button>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
            </span>
          </div>

          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            {thread.title}
          </h1>

          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{thread.content}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {Object.entries(REACTIONS).map(([key, reaction]) => {
                const count = thread.reactions[key as keyof typeof thread.reactions]?.length || 0
                const isActive = userReaction === key
                
                return (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => canReact && onReaction(thread.id, key)}
                          disabled={!canReact}
                          className={isActive ? 'bg-accent hover:bg-accent/90 reaction-bounce' : ''}
                        >
                          {reaction.emoji} {count > 0 && count}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <div className="font-semibold">{reaction.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {KAMUS_LAPAU[reaction.name] || reaction.description}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>

            {currentUser && thread.authorId !== currentUser.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReport(thread.id)}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Warning size={18} weight="bold" />
                <span className="ml-2">Ingatkan Adat</span>
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <ChatCircle size={24} weight="fill" />
          {comments.length} Komentar
        </h2>

        {currentUser && (
          <Card className="p-4 mb-4">
            <div className="space-y-3">
              {replyingTo && (
                <div className="text-sm text-muted-foreground">
                  Membalas komentar...{' '}
                  <button onClick={() => setReplyingTo(null)} className="text-accent hover:underline">
                    Batal
                  </button>
                </div>
              )}
              
              <Textarea
                placeholder="Tulisan komentar di siko..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="comment-anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  />
                  <Label 
                    htmlFor="comment-anonymous"
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    Anonim
                  </Label>
                </div>
                
                <Button onClick={handleSubmitComment} className="bg-primary hover:bg-primary/90">
                  Kirim Komentar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Balun ado komentar</p>
            <p className="text-sm mt-1">Jadilah yang pertamo berkomentar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rootComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={comments.filter(c => c.parentId === comment.id)}
                currentUser={currentUser}
                onReply={(commentId) => setReplyingTo(commentId)}
                onDelete={onDeleteComment}
                onMarkPetuah={onMarkPetuah}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
