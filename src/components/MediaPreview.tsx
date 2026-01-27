import { VideoCamera } from '@phosphor-icons/react'
import type { Media } from '@/lib/types'

interface MediaPreviewProps {
  media: Media[]
  maxDisplay?: number
}

export function MediaPreview({ media, maxDisplay = 3 }: MediaPreviewProps) {
  if (media.length === 0) return null

  const displayMedia = media.slice(0, maxDisplay)
  const remainingCount = media.length - maxDisplay

  return (
    <div className="flex gap-1.5 mt-2">
      {displayMedia.map((item) => (
        <div 
          key={item.id}
          className="relative w-16 h-16 rounded overflow-hidden bg-muted shrink-0"
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
                    <VideoCamera size={16} weight="fill" className="text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <VideoCamera size={20} weight="fill" className="text-muted-foreground" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-medium text-muted-foreground">+{remainingCount}</span>
        </div>
      )}
    </div>
  )
}
