import { Crown, Storefront } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface PremiumBadgeProps {
  type: 'premium' | 'umkm'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumBadge({ type, size = 'md', className }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  if (type === 'premium') {
    return (
      <div className={cn('inline-flex items-center justify-center', className)}>
        <Crown 
          weight="fill" 
          className={cn(sizeClasses[size], 'text-yellow-500')}
        />
      </div>
    )
  }

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <Storefront 
        weight="fill" 
        className={cn(sizeClasses[size], 'text-success')}
      />
    </div>
  )
}
