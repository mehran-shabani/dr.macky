'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileShareProps {
  title: string
  text: string
  url: string
}

export function MobileShare({ title, text, url }: MobileShareProps) {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (error) {
        console.log('Clipboard write failed:', error)
      }
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="share-button touch-feedback"
      aria-label="اشتراک‌گذاری"
    >
      {shared ? (
        <>
          <Check className="ml-2 h-4 w-4" />
          اشتراک گذاشته شد
        </>
      ) : (
        <>
          <Share2 className="ml-2 h-4 w-4" />
          اشتراک‌گذاری
        </>
      )}
    </Button>
  )
}
