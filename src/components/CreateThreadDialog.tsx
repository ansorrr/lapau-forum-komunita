import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { CATEGORIES } from '@/lib/constants'
import { toast } from 'sonner'

interface CreateThreadDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (title: string, content: string, category: string, isAnonymous: boolean) => void
}

export function CreateThreadDialog({ open, onClose, onCreate }: CreateThreadDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('Judul indak buliah kosong')
      return
    }

    if (!content.trim()) {
      toast.error('Isi thread indak buliah kosong')
      return
    }

    if (!category) {
      toast.error('Piliah kategori dulu')
      return
    }

    onCreate(title, content, category, isAnonymous)
    toast.success('Thread lah dikirim, tunggu persetujuan Pangulu')
    
    setTitle('')
    setContent('')
    setCategory('')
    setIsAnonymous(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>
            Buek Thread Baru
          </DialogTitle>
          <DialogDescription>
            Thread akan ditampilkan setelah disetujui admin
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Thread</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tulisan judul nan menarik..."
              maxLength={150}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Piliah kategori" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Isi Thread</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulisan isi thread di siko..."
              rows={8}
              className="resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label 
              htmlFor="anonymous"
              className="text-sm cursor-pointer text-muted-foreground"
            >
              Posting sebagai Urang Anonim
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Kirim Thread
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
