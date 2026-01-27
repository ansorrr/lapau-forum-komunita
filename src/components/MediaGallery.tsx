import { useState } from 'react'
import { VideoCamera, X } from '@phosphor-icons/react'
import { Dialog, DialogContent } from './ui/dialog'
import type { Media } from '@/lib/types'

interface MediaGalleryProps {
  media: Media[]
  compact?: boolean
}

export function MediaGallery({ media, compact = false }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)

  if (media.length === 0) return null

  return (
    <>
      <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {media.map((item) => (
          <div 
            key={item.id} 
            className="rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity relative group"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === 'image' ? (
              <img 
                src={item.url} 
                alt="" 
                className={`w-full h-auto object-contain ${compact ? 'max-h-48' : 'max-h-96'}`}
              />
            ) : (
              <div className="relative">
                {item.thumbnail ? (
                  <>
                    <img 
                      src={item.thumbnail} 
                      alt="Video thumbnail" 
                      className={`w-full h-auto object-contain ${compact ? 'max-h-48' : 'max-h-96'}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                        <VideoCamera size={32} weight="fill" className="text-primary ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`w-full flex items-center justify-center bg-muted ${compact ? 'h-48' : 'h-96'}`}>
                    <div className="text-center">
                      <VideoCamera size={48} weight="fill" className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Video</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} weight="bold" className="text-white" />
          </button>
          
          {selectedMedia && (
            <div className="flex items-center justify-center min-h-[60vh] p-8">
              {selectedMedia.type === 'image' ? (
                <img 
                  src={selectedMedia.url} 
                  alt="" 
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <video 
                  src={selectedMedia.url} 
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh]"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
