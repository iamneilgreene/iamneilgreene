'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger in ms. Keep cumulative delay under ~400ms so nothing feels slow. */
  delay?: number
  /** 'rise' translates upward; 'fade' is opacity only, for large media. */
  variant?: 'rise' | 'fade'
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/**
 * Scroll-triggered reveal. Reveals once and disconnects — re-animating on
 * every scroll direction reads as decoration, which the blueprint rules out.
 *
 * Content is never gated on motion: under reduced motion the element is
 * visible immediately, and without JavaScript the `.js` guard in the
 * stylesheet never applies, so nothing is hidden in the first place.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = 'rise',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)
  const reduced = usePrefersReducedMotion()

  // Widened so one component can render as li/article/section without each
  // call site fighting the element-specific ref type.
  const Tag = as as unknown as React.FC<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    )

    observer.observe(el)

    // Safety net: if the observer never fires — an offscreen render, a
    // programmatic viewport resize, a headless capture — the content still
    // appears rather than staying invisible.
    const failsafe = window.setTimeout(() => setSeen(true), 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [reduced])

  const shown = seen || reduced

  return (
    <Tag
      ref={ref}
      data-shown={shown || undefined}
      style={delay && !reduced ? { animationDelay: `${delay}ms` } : undefined}
      className={cn('reveal', variant === 'fade' && 'reveal-fade', className)}
    >
      {children}
    </Tag>
  )
}
