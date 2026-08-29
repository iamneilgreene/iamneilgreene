import Link from 'next/link'
import Container from './Container'
import NGMark from '@/components/brand/NGMark'
import {
  FOOTER_NAV,
  SOCIAL_LINKS,
  HANDLE,
  PHILOSOPHY,
  MOVEMENT,
  SITE_NAME,
} from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-ink-950">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_2fr] md:py-20">
          {/* Identity + the closing statement of the philosophy */}
          <div>
            <div className="flex items-center gap-3">
              <NGMark size={34} className="text-bone-50" title="" />
              <p className="font-display text-xl tracking-[-0.01em] text-text-primary">
                Neil Greene
              </p>
            </div>
            <p className="mt-5 max-w-xs font-display text-[1.0625rem] leading-snug text-bone-300">
              {PHILOSOPHY}
            </p>
            <p className="label label-bronze mt-3">{MOVEMENT}</p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8125rem] text-text-muted transition-colors hover:text-text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[0.6875rem] text-slate-600">{HANDLE}</p>
          </div>

          <nav
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            aria-label="Footer"
          >
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <h2 className="label">{group.heading}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.8125rem] text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline py-7 text-[0.75rem] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-text-muted">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-text-muted">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
