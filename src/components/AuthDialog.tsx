import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { toast } from 'sonner'

interface AuthDialogProps {
  open: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onLogin: (username: string, password: string) => boolean
  onRegister: (username: string) => boolean
  onSwitchMode: () => void
}

export function AuthDialog({ open, mode, onClose, onLogin, onRegister, onSwitchMode }: AuthDialogProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast.error('Username indak buliah kosong')
      return
    }

    if (mode === 'login') {
      const success = onLogin(username, password)
      if (success) {
        toast.success('Salamaik datang ka Lapau!')
        setUsername('')
        setPassword('')
      } else {
        toast.error('Username atau password salah')
      }
    } else {
      const success = onRegister(username)
      if (success) {
        toast.success('Akun lah jadi! Salamaik datang!')
        setUsername('')
        setPassword('')
      } else {
        toast.error('Username alun ado, cari nan lain')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>
            {mode === 'login' ? 'Masuk Lapau' : 'Daftar Duduak'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Masuak dulu untuak ikuik diskusi'
              : 'Buek akun baru untuak mulai basosial'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="masukan username"
              autoComplete="username"
            />
          </div>

          {mode === 'login' && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="masukan password"
                autoComplete="current-password"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {mode === 'login' ? 'Masuk' : 'Daftar'}
            </Button>

            <Button type="button" variant="ghost" onClick={onSwitchMode} className="w-full">
              {mode === 'login' ? 'Balun ado akun? Daftar di siko' : 'Lah ado akun? Masuk di siko'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
