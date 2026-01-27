import { useState } from 'react'
import { Check, X, Eye } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { CATEGORIES } from '@/lib/constants'
import type { Thread, Comment, Report, User } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

interface AdminPanelProps {
  threads: Thread[]
  comments: Comment[]
  reports: Report[]
  users: User[]
  onApprove: (threadId: string) => void
  onReject: (threadId: string, note?: string) => void
  onDeleteComment: (commentId: string) => void
  onViewThread: (threadId: string) => void
}

export function AdminPanel({
  threads,
  comments,
  reports,
  users,
  onApprove,
  onReject,
  onDeleteComment,
  onViewThread,
}: AdminPanelProps) {
  const [rejectNoteOpen, setRejectNoteOpen] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [rejectionNote, setRejectionNote] = useState('')

  const pendingThreads = threads.filter(t => t.status === 'pending')
  const pendingReports = reports.filter(r => r.status === 'pending')

  const handleReject = () => {
    if (selectedThreadId) {
      onReject(selectedThreadId, rejectionNote || undefined)
      toast.success('Thread telah ditolak')
      setRejectNoteOpen(false)
      setSelectedThreadId(null)
      setRejectionNote('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
          Panel Pangulu
        </h1>
        <p className="text-muted-foreground mt-1">
          Kelola konten dan moderasi lapau
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Thread Pending {pendingThreads.length > 0 && (
              <Badge className="ml-2 bg-accent">{pendingThreads.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reports">
            Laporan {pendingReports.length > 0 && (
              <Badge className="ml-2 bg-destructive">{pendingReports.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stats">
            Statistik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          {pendingThreads.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Tidak ada thread pending</p>
            </Card>
          ) : (
            pendingThreads.map((thread) => {
              const category = CATEGORIES.find(c => c.id === thread.category)
              
              return (
                <Card key={thread.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {category && (
                            <Badge variant="secondary">
                              {category.emoji} {category.name}
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            oleh {thread.authorUsername}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                          {thread.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                          {thread.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          onApprove(thread.id)
                          toast.success('Thread lah di-ACC!')
                        }}
                        className="bg-success hover:bg-success/90 gap-2"
                      >
                        <Check size={20} weight="bold" />
                        ACC Thread
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedThreadId(thread.id)
                          setRejectNoteOpen(true)
                        }}
                        className="border-destructive text-destructive hover:bg-destructive/10 gap-2"
                      >
                        <X size={20} weight="bold" />
                        Tolak
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => {
                          onApprove(thread.id)
                          setTimeout(() => onViewThread(thread.id), 100)
                        }}
                        className="gap-2"
                      >
                        <Eye size={20} />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-3">
          {pendingReports.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Tidak ada laporan</p>
            </Card>
          ) : (
            pendingReports.map((report) => {
              const thread = report.threadId ? threads.find(t => t.id === report.threadId) : null
              const comment = report.commentId ? comments.find(c => c.id === report.commentId) : null
              const reporter = users.find(u => u.id === report.reporterId)
              
              return (
                <Card key={report.id} className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-2">
                          Dilaporkan oleh {reporter?.username} • {formatDistanceToNow(report.createdAt, { addSuffix: true })}
                        </div>
                        
                        {thread && (
                          <div className="mb-2">
                            <Badge variant="outline">Thread</Badge>
                            <h4 className="font-semibold mt-1">{thread.title}</h4>
                          </div>
                        )}
                        
                        {comment && (
                          <div className="mb-2">
                            <Badge variant="outline">Komentar</Badge>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        )}
                        
                        {report.reason && (
                          <div className="text-sm text-muted-foreground italic">
                            Alasan: {report.reason}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {thread && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewThread(thread.id)}
                        >
                          Lihat Thread
                        </Button>
                      )}
                      
                      {comment && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            onDeleteComment(comment.id)
                            toast.success('Komentar telah dihapus')
                          }}
                        >
                          Hapus Komentar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Threads</div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {threads.filter(t => t.status === 'approved').length}
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Users</div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {users.length}
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Komentar</div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {comments.length}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={rejectNoteOpen} onOpenChange={setRejectNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Thread</DialogTitle>
            <DialogDescription>
              Berikan catatan penolakan (opsional)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              placeholder="Alasan penolakan..."
              rows={4}
            />
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setRejectNoteOpen(false)} className="flex-1">
                Batal
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                Tolak Thread
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
