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
import { UserAvatar } from './UserAvatar'
import type { Thread, Comment, User as UserType } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { CommentItem } from './CommentItem'
import { toast } from 'sonner'

interface ThreadDetailProps {
  thread: Thread
  comments: Comment[]
  currentUser: UserType | null
  users: UserType[]
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
  users,
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
  const author = users.find(u => u.id === thread.authorId)

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
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-secondary">
        <ArrowLeft size={18} />
        Kembali ke Forum
      </Button>

      <Card>
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <Badge className="bg-primary/10 text-primary border-0">
                {category.emoji} {category.name}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="shrink-0 hidden sm:block">
              {thread.isAnonymous ? (
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-bold">
                  ?
                </div>
              ) : author ? (
                <UserAvatar user={author} size="lg" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  U
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => !thread.isAnonymous && onViewProfile(thread.authorId)}
                  className={`font-semibold ${!thread.isAnonymous ? 'text-primary hover:underline' : 'text-foreground'}`}
                  disabled={thread.isAnonymous}
                >
                  {thread.authorUsername}
                </button>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                {thread.title}
              </h1>

              <div className="prose prose-sm max-w-none text-foreground">
                <p className="whitespace-pre-wrap leading-relaxed">{thread.content}</p>
              </div>

              {thread.media && thread.media.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {thread.media.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden bg-muted">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt="" 
                          className="w-full h-auto max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(item.url, '_blank')}
                        />
                      ) : (
                        <video 
                          src={item.url} 
                          controls
                          className="w-full h-auto max-h-96"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                          className={isActive ? 'bg-primary hover:bg-primary/90 reaction-bounce' : ''}
                        >
                          <span className="text-base">{reaction.emoji}</span>
                          {count > 0 && <span className="ml-1">{count}</span>}
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
                <Warning size={16} weight="bold" />
                <span className="ml-2">Ingatkan Adat</span>
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <h2 className="text-sm font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <ChatCircle size={18} weight="fill" />
            {comments.length} KOMENTAR
          </h2>
        </div>

        {currentUser && (
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="space-y-3">
              {replyingTo && (
                <div className="text-sm text-muted-foreground">
                  Membalas komentar...{' '}
                  <button onClick={() => setReplyingTo(null)} className="text-primary hover:underline font-medium">
                    Batal
                  </button>
                </div>
              )}
              
              <Textarea
                placeholder="Tulisan komentar di siko..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
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
                    Posting sebagai Anonim
                  </Label>
                </div>
                
                <Button onClick={handleSubmitComment} className="bg-primary hover:bg-primary/90">
                  Kirim Komentar
                </Button>
              </div>
            </div>
          </div>
        )}

        {comments.length === 0 ? (
          <div className="text-center py-12 px-4 text-muted-foreground">
            <ChatCircle size={48} weight="thin" className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Balun ado komentar</p>
            <p className="text-sm mt-1">Jadilah yang pertamo berkomentar!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {rootComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={comments.filter(c => c.parentId === comment.id)}
                currentUser={currentUser}
                users={users}
                onReply={(commentId) => setReplyingTo(commentId)}
                onDelete={onDeleteComment}
                onMarkPetuah={onMarkPetuah}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
