/**
 * Mobile utility functions for better UX
 */

type ScreenOrientationLock =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Check if device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

/**
 * Check if device is Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

/**
 * Check if app is in standalone mode (PWA)
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

/**
 * Trigger haptic feedback (vibration)
 */
export function hapticFeedback(
  pattern: number | number[] = 10
): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

/**
 * Lock screen orientation
 */
export async function lockOrientation(
  orientation: ScreenOrientationLock
): Promise<void> {
  if ('orientation' in screen) {
    const orientationApi = screen.orientation as ScreenOrientation & {
      lock?: (orientation: ScreenOrientationLock) => Promise<void>
    }

    if (typeof orientationApi.lock === 'function') {
      try {
        await orientationApi.lock(orientation)
      } catch (error) {
        console.log('Screen orientation lock failed:', error)
      }
    }
  }
}

/**
 * Unlock screen orientation
 */
export function unlockOrientation(): void {
  if ('orientation' in screen && 'unlock' in screen.orientation) {
    screen.orientation.unlock()
  }
}

/**
 * Request full screen
 */
export async function requestFullScreen(
  element: HTMLElement = document.documentElement
): Promise<void> {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen()
    } else if ((element as any).webkitRequestFullscreen) {
      await (element as any).webkitRequestFullscreen()
    }
  } catch (error) {
    console.log('Fullscreen request failed:', error)
  }
}

/**
 * Exit full screen
 */
export async function exitFullScreen(): Promise<void> {
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      await (document as any).webkitExitFullscreen()
    }
  } catch (error) {
    console.log('Exit fullscreen failed:', error)
  }
}

/**
 * Check if touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  )
}

/**
 * Get safe area insets
 */
export function getSafeAreaInsets() {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }

  const style = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
  }
}

/**
 * Prevent iOS bounce/rubber-band scrolling
 */
export function preventIOSBounce(element: HTMLElement): () => void {
  let startY = 0

  const handleTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].pageY
  }

  const handleTouchMove = (e: TouchEvent) => {
    const y = e.touches[0].pageY
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight
    const offsetHeight = element.offsetHeight
    const isAtTop = y > startY && scrollTop === 0
    const isAtBottom = y < startY && scrollTop + offsetHeight >= scrollHeight

    if (isAtTop || isAtBottom) {
      e.preventDefault()
    }
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchmove', handleTouchMove, { passive: false })

  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
  }
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: ShareData): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false
  }

  try {
    await navigator.share(data)
    return true
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.log('Share failed:', error)
    }
    return false
  }
}

/**
 * Add to home screen prompt
 */
export function requestInstallPrompt(): void {
  if (typeof window === 'undefined') return

  const event = (window as any).deferredPrompt
  if (event) {
    event.prompt()
    event.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      }
      (window as any).deferredPrompt = null
    })
  }
}

/**
 * Check network status
 */
export function getNetworkStatus(): {
  online: boolean
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
} {
  if (typeof navigator === 'undefined') {
    return { online: true }
  }

  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection

  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  }
}

/**
 * Optimize image loading based on network
 */
export function getOptimalImageQuality(): 'high' | 'medium' | 'low' {
  const { effectiveType, saveData } = getNetworkStatus()

  if (saveData) return 'low'

  switch (effectiveType) {
    case '4g':
      return 'high'
    case '3g':
      return 'medium'
    case '2g':
    case 'slow-2g':
      return 'low'
    default:
      return 'high'
  }
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) {
    return false
  }

  try {
    return await navigator.storage.persist()
  } catch (error) {
    console.log('Persistent storage request failed:', error)
    return false
  }
}

/**
 * Get storage estimate
 */
export async function getStorageEstimate(): Promise<{
  usage: number
  quota: number
  usagePercent: number
} | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return null
  }

  try {
    const estimate = await navigator.storage.estimate()
    const usage = estimate.usage || 0
    const quota = estimate.quota || 0
    const usagePercent = quota > 0 ? (usage / quota) * 100 : 0

    return { usage, quota, usagePercent }
  } catch (error) {
    console.log('Storage estimate failed:', error)
    return null
  }
}
