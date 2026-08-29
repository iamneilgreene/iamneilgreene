'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Progress of an element through the viewport, 0 → 1.
 *
 * 0 when the element's top reaches the bottom of the viewport, 1 once its
 * bottom has passed the top. Driven from a rAF-throttled scroll listener so
 * several of these can run without fighting for the main thread.
 *
 * Returns 1 under prefers-reduced-motion, which puts every scroll-driven
 * section straight into its resolved end state.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    let frame = 0

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const travelled = vh - rect.top
      setProgress(Math.min(1, Math.max(0, travelled / total)))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    // Deferred rather than called inline: measuring synchronously in the
    // effect body would cascade a second render before the first paint.
    frame = window.requestAnimationFrame(measure)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  return { ref, progress: reduced ? 1 : progress }
}

/** Remaps a 0–1 progress value onto a sub-range, clamped. */
export function segment(progress: number, start: number, end: number) {
  if (end <= start) return 0
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}
