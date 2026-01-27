import { ChatCircle, Trash, Crown, Warning } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import type { Comment, User } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface CommentItemProps {
  comment: Comment
  replies: Comment[]
  currentUser: User | null
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
    <Card className={`p-4 ${comment.isPetuah ? 'border-success border-2' : ''}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <button
                onClick={() => !comment.isAnonymous && onViewProfile(comment.authorId)}
                className={`text-sm font-medium ${!comment.isAnonymous && 'hover:underline'}`}
                disabled={comment.isAnonymous}
              >
                {comment.authorUsername}
              </button>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
              {comment.isPetuah && (
                <Badge variant="outline" className="border-success text-success gap-1">
                  <Crown size={14} weight="fill" />
                  Petuah Lapau
                </Badge>
              )}
            </div>
            
            <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment.id)}
                className="text-muted-foreground hover:text-foreground h-8 px-2"
              >
                <ChatCircle size={16} />
                <span className="ml-1">Balas</span>
              </Button>

              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkPetuah(comment.id)}
                  className={`h-8 px-2 ${
                    comment.isPetuah
                      ? 'text-success hover:text-success/80'
                      : 'text-muted-foreground hover:text-success'
                  }`}
                >
                  <Crown size={16} weight={comment.isPetuah ? 'fill' : 'regular'} />
                  <span className="ml-1">{comment.isPetuah ? 'Hapus Petuah' : 'Tandai Petuah'}</span>
                </Button>
              )}

              {(isOwn || isAdmin) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(comment.id)}
                  className="text-muted-foreground hover:text-destructive h-8 px-2"
                >
                  <Trash size={16} />
                  <span className="ml-1">Hapus</span>
                </Button>
              )}
            </>
          )}
        </div>

        {replies.length > 0 && (
          <div className="ml-6 space-y-3 border-l-2 border-border pl-4">
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
    </Card>
  )
}
