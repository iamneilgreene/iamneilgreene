'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

// The server cannot know the visitor's setting. Assuming "no preference"
// matches the CSS, which also only reduces motion once the media query
// resolves on the client.
const getServerSnapshot = () => false

/**
 * Reads the OS reduced-motion setting as an external store.
 *
 * Deliberately not `useEffect` + `setState`: that pattern renders once with
 * the wrong value and then cascades a second render to correct it. This reads
 * the correct value on the first client render and re-renders only if the
 * visitor actually changes the setting.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
