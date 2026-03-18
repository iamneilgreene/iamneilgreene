import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2e2e2e] bg-[#141414]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <p className="font-display text-xl font-semibold text-[#f4f1ec]">{SITE_NAME}</p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b8975a]">
                {SITE_TAGLINE}
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#9a9590] mx-auto md:mx-0">
              Helping high-performers build the life they fought for.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#b8975a]">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9a9590] transition-colors hover:text-[#f4f1ec]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#b8975a]">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9a9590] transition-colors hover:text-[#f4f1ec]"
                  >
                    {link.label}
                    <span className="ml-2 text-[#2e2e2e]">—</span>
                    <span className="ml-2 text-[#b8975a]">{link.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-[#2e2e2e] pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-[#9a9590]">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-[#6a6560]">
            Site design by{' '}
            <a
              href="https://nightfortress.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#9a9590]"
            >
              Nightfortress
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
