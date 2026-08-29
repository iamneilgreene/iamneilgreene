'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides the site footer on /preview routes, where each design iteration
 * renders its own chrome end to end.
 */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/preview')) return null
  return <>{children}</>
}
