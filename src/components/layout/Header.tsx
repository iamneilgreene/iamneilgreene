'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import NGMark from '@/components/brand/NGMark'
import Button from '@/components/ui/Button'
import { NAV_LINKS, CTA_PRIMARY_SHORT, SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    // Deferred rather than called inline, so a page restored mid-scroll gets
    // the right header state without cascading a render before first paint.
    const frame = window.requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Close the mobile menu on navigation. Adjusted during render rather than
  // in an effect: this is React's documented pattern for resetting state when
  // a prop changes, and it avoids a wasted render with the menu still open.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
    setOpenGroup(null)
  }

  // Lock scroll and allow Escape to dismiss while the full-screen menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const previousFocus = document.activeElement as HTMLElement | null
    const links = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    links()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
      if (e.key === 'Tab') {
        const controls = [toggleRef.current, ...links()].filter((el): el is HTMLElement => el !== null)
        const index = controls.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && index <= 0) {
          e.preventDefault()
          controls.at(-1)?.focus()
        } else if (!e.shiftKey && (index === controls.length - 1 || index === -1)) {
          e.preventDefault()
          controls[0]?.focus()
        }
      }
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      previousFocus?.focus()
    }
  }, [menuOpen])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled || menuOpen
            ? 'bg-ink-900 border-b border-hairline'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
            {/* Mark + wordmark. The monogram carries small spaces; the name is
                still the identity. */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label={`${SITE_NAME}, home`}
            >
              <NGMark size={30} className="shrink-0 text-bone-50" title="" />
              <span className="font-display text-[1.0625rem] font-medium tracking-[-0.01em] text-text-primary">
                Neil Greene
              </span>
              <span
                className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-slate-600 transition-colors group-hover:text-bronze-400 xl:inline"
                aria-hidden="true"
              >
                Capability
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const children = 'children' in link ? link.children : undefined
                return (
                  <div
                    key={link.href}
                    className="relative flex items-center"
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setOpenGroup(null)
                        event.currentTarget.querySelector('button')?.focus()
                      }
                    }}
                    onMouseEnter={() => children && setOpenGroup(link.href)}
                    onMouseLeave={() => children && setOpenGroup(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'inline-flex items-center gap-1.5 min-h-11 px-2 py-2 text-[0.8125rem] transition-colors',
                        isActive(link.href)
                          ? 'text-text-primary'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                    {children && (
                      <button
                        type="button"
                        aria-label={`Show ${link.label} options`}
                        aria-expanded={openGroup === link.href}
                        aria-controls="work-submenu"
                        onClick={() => setOpenGroup(openGroup === link.href ? null : link.href)}
                        className="inline-flex h-11 w-6 items-center justify-center text-text-muted hover:text-text-primary"
                      >
                        <svg
                          width="9"
                          height="6"
                          viewBox="0 0 9 6"
                          fill="none"
                          aria-hidden="true"
                          className={cn(
                            'transition-transform duration-200',
                            openGroup === link.href && 'rotate-180'
                          )}
                        >
                          <path
                            d="M1 1.5 4.5 5 8 1.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </button>
                    )}

                    {children && openGroup === link.href && (
                      <div id="work-submenu" className="absolute left-0 top-full min-w-[15rem] border border-hairline bg-ink-850 py-1.5 shadow-2xl shadow-black/50">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-[0.8125rem] text-text-muted transition-colors hover:bg-ink-800 hover:text-text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Persistent conversion action — the site's single front door. */}
              <Button
                href={CTA_PRIMARY_SHORT.href}
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {CTA_PRIMARY_SHORT.label}
              </Button>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-text-primary lg:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-5 bg-current transition-all duration-300',
                      menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-5 bg-current transition-all duration-300',
                      menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Full-screen mobile menu — same hierarchy, no novelty interactions. */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-ink-900 pt-16 lg:hidden"
        >
          <Container>
            <nav className="flex flex-col py-8" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => {
                const children = 'children' in link ? link.children : undefined
                return (
                  <div key={link.href} className="border-b border-hairline py-1">
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-[0.625rem] text-slate-600"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Link
                        href={link.href}
                        className="flex-1 py-3.5 font-display text-2xl text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </div>
                    {children && (
                      <div className="ml-9 flex flex-col gap-1 pb-4">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-1.5 text-sm text-text-muted"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <Button
                href={CTA_PRIMARY_SHORT.href}
                variant="primary"
                size="lg"
                className="mt-10 w-full"
              >
                {CTA_PRIMARY_SHORT.label}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </>
  )
}
