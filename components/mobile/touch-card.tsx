'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface TouchCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function TouchCard({ children, className, onClick, href }: TouchCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = () => {
    setIsPressed(true)
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(5)
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
  }

  const Component = href ? 'a' : 'div'

  return (
    <Component
      href={href}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      className={cn(
        'hover-card touch-feedback transition-all duration-200',
        isPressed && 'scale-[0.98]',
        className
      )}
    >
      {children}
    </Component>
  )
}
