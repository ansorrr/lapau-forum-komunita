import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Storefront } from '@phosphor-icons/react'
import { useState } from 'react'

interface UMKMVerificationDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (umkmName: string, umkmDescription: string) => void
}

export function UMKMVerificationDialog({ open, onClose, onSubmit }: UMKMVerificationDialogProps) {
  const [umkmName, setUmkmName] = useState('')
  const [umkmDescription, setUmkmDescription] = useState('')

  const handleSubmit = () => {
    if (umkmName.trim() && umkmDescription.trim()) {
      onSubmit(umkmName.trim(), umkmDescription.trim())
      setUmkmName('')
      setUmkmDescription('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Storefront weight="fill" className="w-6 h-6 text-success" />
            Verifikasi UMKM
          </DialogTitle>
          <DialogDescription>
            Daftarkan usaha kamu untuk mendapat badge verifikasi dan akses thread khusus UMKM
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="umkm-name">Nama Usaha</Label>
            <Input
              id="umkm-name"
              placeholder="contoh: Rendang Uni Yanti"
              value={umkmName}
              onChange={(e) => setUmkmName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="umkm-desc">Deskripsi Singkat</Label>
            <Textarea
              id="umkm-desc"
              placeholder="Jelaskan usaha kamu secara singkat..."
              value={umkmDescription}
              onChange={(e) => setUmkmDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            <p className="text-muted-foreground">
              💡 Dengan verifikasi UMKM, kamu bisa:
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>• Posting di kategori UMKM & Bisnis</li>
              <li>• Mendapat badge hijau di profil</li>
              <li>• Thread kamu bisa disponsori di beranda</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!umkmName.trim() || !umkmDescription.trim()}
            >
              <Storefront className="w-4 h-4 mr-2" weight="fill" />
              Ajukan Verifikasi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
