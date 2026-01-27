import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Advertisement } from '@/lib/types'
import { ArrowSquareOut } from '@phosphor-icons/react'

interface AdBannerProps {
  ad: Advertisement
  onImpression?: (adId: string) => void
  onClick?: (adId: string) => void
}

export function AdBanner({ ad, onImpression, onClick }: AdBannerProps) {
  const handleClick = () => {
    if (onClick) onClick(ad.id)
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        ad.targetUrl && "cursor-pointer hover:shadow-md"
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-muted/90 backdrop-blur-sm rounded text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
          Lapau Ads
        </div>
        
        {ad.imageUrl ? (
          <div className="aspect-[3/1] relative">
            <img 
              src={ad.imageUrl} 
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{ad.content}</p>
              </div>
              {ad.targetUrl && (
                <ArrowSquareOut className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

interface SidebarAdProps {
  ad: Advertisement
  onClick?: (adId: string) => void
}

export function SidebarAd({ ad, onClick }: SidebarAdProps) {
  const handleClick = () => {
    if (onClick) onClick(ad.id)
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        ad.targetUrl && "cursor-pointer hover:shadow-md"
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
          Ads
        </div>
        
        {ad.imageUrl ? (
          <img 
            src={ad.imageUrl} 
            alt={ad.title}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 aspect-square flex flex-col justify-center">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{ad.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-3">{ad.content}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
