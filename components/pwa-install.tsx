'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallButton(false)
    }
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="rounded-lg border bg-card p-4 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold">نصب اپلیکیشن</h3>
            <p className="text-sm text-muted-foreground">
              برای دسترسی سریع‌تر، وبلاگ علمی را روی دستگاه خود نصب کنید.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleInstallClick} size="sm" className="flex-1">
            نصب
          </Button>
          <Button
            onClick={() => setShowInstallButton(false)}
            size="sm"
            variant="outline"
          >
            بستن
          </Button>
        </div>
      </div>
    </div>
  )
}
