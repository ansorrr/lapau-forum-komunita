import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Crown, Check } from '@phosphor-icons/react'
import type { User } from '@/lib/types'

interface PremiumDialogProps {
  open: boolean
  onClose: () => void
  currentUser: User | null
  onUpgradeToPremium: () => void
}

export function PremiumDialog({ open, onClose, currentUser, onUpgradeToPremium }: PremiumDialogProps) {
  if (!currentUser) return null

  const handleUpgrade = () => {
    onUpgradeToPremium()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown weight="fill" className="w-7 h-7 text-yellow-500" />
            Lapau Premium
          </DialogTitle>
          <DialogDescription>
            Tingkatkan pengalaman Lapau kamu dengan fitur-fitur eksklusif!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 text-primary" weight="bold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Reaksi Eksklusif Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Akses 4 reaksi khusus: 🌶️ Pical, 🥟 Martabak Kubang, ☕ Kopi Khop, 🍮 Sarikayo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 text-primary" weight="bold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Username Warna Khusus</h3>
                <p className="text-sm text-muted-foreground">
                  Username kamu tampil dengan warna emas mengkilap yang membedakan dari user biasa
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 text-primary" weight="bold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Badge Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Mahkota emas di samping nama kamu di setiap post dan komentar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 text-primary" weight="bold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dukung Komunitas</h3>
                <p className="text-sm text-muted-foreground">
                  Bantu pengembangan dan maintenance platform Lapau tetap berjalan
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg p-6 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Rp 29.000</h3>
                  <p className="text-sm text-muted-foreground">per bulan</p>
                </div>
                <Crown weight="fill" className="w-12 h-12 text-yellow-500" />
              </div>
              
              {currentUser.isPremium ? (
                <Button disabled className="w-full" size="lg">
                  <Check className="w-5 h-5 mr-2" />
                  Sudah Premium
                </Button>
              ) : (
                <Button onClick={handleUpgrade} className="w-full" size="lg">
                  <Crown className="w-5 h-5 mr-2" weight="fill" />
                  Upgrade ke Premium
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
