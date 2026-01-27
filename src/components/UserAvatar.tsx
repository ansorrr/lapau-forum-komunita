import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getInitials } from '@/lib/utils'
import type { User } from '@/lib/types'

interface UserAvatarProps {
  user: User | { username: string; avatar?: string; avatarColor?: string }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

export function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const initials = getInitials(user.username)
  
  return (
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
  )
}
