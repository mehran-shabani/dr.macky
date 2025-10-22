'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const threshold = 80

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0 && !isRefreshing) {
        touchStartY = e.touches[0].clientY
        startY.current = touchStartY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || isRefreshing) return

      const touchY = e.touches[0].clientY
      const distance = touchY - startY.current

      if (distance > 0 && container.scrollTop === 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, threshold * 1.5))
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling || isRefreshing) return

      setIsPulling(false)

      if (pullDistance >= threshold) {
        setIsRefreshing(true)
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
        
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
          setPullDistance(0)
        }
      } else {
        setPullDistance(0)
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, isRefreshing, pullDistance, onRefresh])

  const indicatorHeight = Math.min(pullDistance, threshold)
  const opacity = indicatorHeight / threshold

  return (
    <div ref={containerRef} className="relative h-full overflow-auto">
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-center transition-all"
        style={{
          height: `${indicatorHeight}px`,
          opacity,
        }}
      >
        {isRefreshing ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <div className="text-sm text-muted-foreground">
            {pullDistance >= threshold ? 'رها کنید تا بروزرسانی شود' : 'برای بروزرسانی بکشید'}
          </div>
        )}
      </div>
      <div style={{ transform: `translateY(${isPulling ? pullDistance : 0}px)` }}>
        {children}
      </div>
    </div>
  )
}
