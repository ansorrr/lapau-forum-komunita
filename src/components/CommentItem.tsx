import { ChatCircle, Trash, Crown, User } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import type { Comment, User as UserType } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface CommentItemProps {
  comment: Comment
  replies: Comment[]
  currentUser: UserType | null
  onReply: (commentId: string) => void
  onDelete: (commentId: string) => void
  onMarkPetuah: (commentId: string) => void
  onViewProfile: (userId: string) => void
}

export function CommentItem({
  comment,
  replies,
  currentUser,
  onReply,
  onDelete,
  onMarkPetuah,
  onViewProfile,
}: CommentItemProps) {
  const isOwn = currentUser?.id === comment.authorId
  const isAdmin = currentUser?.role === 'admin'

  return (
    <div className={`px-6 py-4 ${comment.isPetuah ? 'bg-success/5 border-l-4 border-success' : ''}`}>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="shrink-0 hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <User size={18} weight="fill" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <button
                onClick={() => !comment.isAnonymous && onViewProfile(comment.authorId)}
                className={`text-sm font-semibold ${
                  !comment.isAnonymous ? 'text-primary hover:underline' : 'text-foreground'
                }`}
                disabled={comment.isAnonymous}
              >
                {comment.authorUsername}
              </button>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
              {comment.isPetuah && (
                <Badge className="bg-success/10 text-success border-success gap-1 text-xs">
                  <Crown size={12} weight="fill" />
                  Petuah Lapau
                </Badge>
              )}
            </div>
            
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{comment.content}</p>

            <div className="flex items-center gap-2 mt-3">
              {currentUser && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReply(comment.id)}
                    className="text-muted-foreground hover:text-primary h-7 px-2 text-xs"
                  >
                    <ChatCircle size={14} />
                    <span className="ml-1">Balas</span>
                  </Button>

                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkPetuah(comment.id)}
                      className={`h-7 px-2 text-xs ${
                        comment.isPetuah
                          ? 'text-success hover:text-success/80'
                          : 'text-muted-foreground hover:text-success'
                      }`}
                    >
                      <Crown size={14} weight={comment.isPetuah ? 'fill' : 'regular'} />
                      <span className="ml-1">{comment.isPetuah ? 'Hapus Petuah' : 'Tandai Petuah'}</span>
                    </Button>
                  )}

                  {(isOwn || isAdmin) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(comment.id)}
                      className="text-muted-foreground hover:text-destructive h-7 px-2 text-xs"
                    >
                      <Trash size={14} />
                      <span className="ml-1">Hapus</span>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {replies.length > 0 && (
          <div className="ml-6 sm:ml-12 space-y-0 border-l-2 border-border">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                replies={[]}
                currentUser={currentUser}
                onReply={onReply}
                onDelete={onDelete}
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
