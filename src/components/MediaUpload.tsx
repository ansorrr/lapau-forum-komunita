import { useState } from 'react'
import { Image, VideoCamera, X } from '@phosphor-icons/react'
import { Button } from './ui/button'
import type { Media } from '@/lib/types'
import { generateVideoThumbnail } from '@/lib/videoUtils'
import { toast } from 'sonner'

interface MediaUploadProps {
  media: Media[]
  onMediaChange: (media: Media[]) => void
  maxItems?: number
}

export function MediaUpload({ media, onMediaChange, maxItems = 5 }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || media.length >= maxItems) return

    setUploading(true)

    try {
      const processedMedia: Media[] = []

      for (const file of Array.from(files)) {
        if (media.length + processedMedia.length >= maxItems) break

        const reader = new FileReader()
        
        await new Promise<void>((resolve, reject) => {
          reader.onload = async (event) => {
            try {
              const url = event.target?.result as string
              const type = file.type.startsWith('video/') ? 'video' : 'image'
              
              let thumbnail: string | undefined

              if (type === 'video') {
                try {
                  thumbnail = await generateVideoThumbnail(file)
                } catch (error) {
                  console.error('Failed to generate thumbnail:', error)
                  thumbnail = undefined
                }
              }

              const newMedia: Media = {
                id: `media-${Date.now()}-${Math.random()}`,
                type,
                url,
                thumbnail,
              }

              processedMedia.push(newMedia)
              resolve()
            } catch (error) {
              reject(error)
            }
          }

          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }

      onMediaChange([...media, ...processedMedia])
      
      if (processedMedia.length > 0) {
        toast.success(`${processedMedia.length} media berhasil ditambahkan`)
      }
    } catch (error) {
      console.error('Error processing media:', error)
      toast.error('Gagal memproses media')
    } finally {
      setUploading(false)
    }

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
                <div className="relative w-full h-full">
                  {item.thumbnail ? (
                    <>
                      <img 
                        src={item.thumbnail} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <VideoCamera size={24} weight="fill" className="text-primary ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <VideoCamera size={32} weight="fill" className="text-muted-foreground" />
                    </div>
                  )}
                </div>
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
                {uploading ? 'Memproses...' : 'Tambah Video'}
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
