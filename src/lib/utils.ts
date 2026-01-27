import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export function generateAvatarColor(id: string): string {
  const colors = [
    'oklch(0.55 0.15 280)',
    'oklch(0.60 0.18 320)',
    'oklch(0.58 0.16 200)',
    'oklch(0.62 0.14 160)',
    'oklch(0.56 0.17 40)',
    'oklch(0.60 0.15 100)',
    'oklch(0.58 0.16 260)',
    'oklch(0.61 0.15 340)',
  ]
  
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}
