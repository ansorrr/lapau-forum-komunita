import { useState } from 'react'
import { Image, VideoCamera, X } from '@phosphor-icons/react'
import { Button } from './ui/button'
import type { Media } from '@/lib/types'

interface MediaUploadProps {
  media: Media[]
  onMediaChange: (media: Media[]) => void
  maxItems?: number
}

export function MediaUpload({ media, onMediaChange, maxItems = 5 }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || media.length >= maxItems) return

    setUploading(true)

    Array.from(files).forEach((file) => {
      if (media.length >= maxItems) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        const type = file.type.startsWith('video/') ? 'video' : 'image'
        
        const newMedia: Media = {
          id: `media-${Date.now()}-${Math.random()}`,
          type,
          url,
          thumbnail: type === 'video' ? url : undefined,
        }

        onMediaChange([...media, newMedia])
        setUploading(false)
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ''
  }

  const handleRemoveMedia = (id: string) => {
    onMediaChange(media.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-3">
      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((item) => (
            <div key={item.id} className="relative group aspect-video bg-muted rounded-md overflow-hidden">
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <video 
                  src={item.url} 
                  className="w-full h-full object-cover"
                  controls
                />
              )}
              <button
                onClick={() => handleRemoveMedia(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {media.length < maxItems && (
        <div className="flex gap-2">
          <label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={uploading}
              asChild
            >
              <span className="flex items-center gap-2">
                <Image size={18} weight="fill" />
                Tambah Gambar
              </span>
            </Button>
          </label>

          <label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={uploading}
              asChild
            >
              <span className="flex items-center gap-2">
                <VideoCamera size={18} weight="fill" />
                Tambah Video
              </span>
            </Button>
          </label>
        </div>
      )}

      {media.length >= maxItems && (
        <p className="text-sm text-muted-foreground">
          Maksimal {maxItems} media per thread
        </p>
      )}
    </div>
  )
}
