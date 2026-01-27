import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getInitials } from '@/lib/utils'
import type { User } from '@/lib/types'
import { PremiumBadge } from './PremiumBadge'

interface UserAvatarProps {
  user: User | { username: string; avatar?: string; avatarColor?: string; isPremium?: boolean; isUMKMVerified?: boolean }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showBadge?: boolean
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const badgeSizeMap = {
  sm: 'sm' as const,
  md: 'sm' as const,
  lg: 'md' as const,
  xl: 'lg' as const,
}

export function UserAvatar({ user, size = 'md', className = '', showBadge = true }: UserAvatarProps) {
  const initials = getInitials(user.username)
  
  return (
    <div className="relative inline-block">
      <Avatar className={`${sizeClasses[size]} ${className}`}>
        {user.avatar && <AvatarImage src={user.avatar} alt={user.username} />}
        <AvatarFallback 
          style={{ 
            backgroundColor: user.avatarColor || 'oklch(0.55 0.15 280)',
            color: 'white'
          }}
          className="font-semibold"
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {showBadge && user.isPremium && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5">
          <PremiumBadge type="premium" size={badgeSizeMap[size]} />
        </div>
      )}
      {showBadge && user.isUMKMVerified && !user.isPremium && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5">
          <PremiumBadge type="umkm" size={badgeSizeMap[size]} />
        </div>
      )}
    </div>
  )
}
