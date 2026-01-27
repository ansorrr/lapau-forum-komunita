import { VideoCamera } from '@phosphor-icons/react'
import type { Media } from '@/lib/types'

interface MediaPreviewProps {
  media: Media[]
  maxDisplay?: number
  size?: 'sm' | 'md'
}

export function MediaPreview({ media, maxDisplay = 3, size = 'md' }: MediaPreviewProps) {
  if (media.length === 0) return null

  const displayMedia = media.slice(0, maxDisplay)
  const remainingCount = media.length - maxDisplay

  const containerClass = size === 'sm' 
    ? 'flex gap-1.5 mt-2' 
    : 'flex gap-2 mt-3'
  
  const itemClass = size === 'sm' 
    ? 'relative w-16 h-16 rounded overflow-hidden bg-muted shrink-0' 
    : 'relative w-28 h-28 rounded-md overflow-hidden bg-muted shrink-0 cursor-pointer hover:opacity-90 transition-opacity'

  return (
    <div className={containerClass}>
      {displayMedia.map((item) => (
        <div 
          key={item.id}
          className={itemClass}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {item.type === 'image' ? (
            <img 
              src={item.url} 
              alt="" 
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {item.thumbnail ? (
                <>
                  <img 
                    src={item.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <VideoCamera size={size === 'sm' ? 16 : 24} weight="fill" className="text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <VideoCamera size={size === 'sm' ? 20 : 28} weight="fill" className="text-muted-foreground" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={`${size === 'sm' ? 'w-16 h-16' : 'w-28 h-28'} rounded${size === 'sm' ? '' : '-md'} bg-muted flex items-center justify-center shrink-0`}>
          <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>+{remainingCount}</span>
        </div>
      )}
    </div>
  )
}
