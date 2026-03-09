'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS, CTA_PRIMARY, SITE_NAME, SITE_TAGLINE } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2e2e2e] bg-[#0d0d0d]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-wide text-[#f4f1ec]">
            {SITE_NAME}
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#b8975a]">
            {SITE_TAGLINE}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[#9a9590] transition-colors hover:text-[#f4f1ec]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button href={CTA_PRIMARY.href} variant="primary" size="sm">
            {CTA_PRIMARY.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-[#e8e4de] transition-all duration-200 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-[#e8e4de] transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-[#e8e4de] transition-all duration-200 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#2e2e2e] bg-[#141414] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[#9a9590] transition-colors hover:text-[#f4f1ec]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-[#2e2e2e] pt-4">
              <Button href={CTA_PRIMARY.href} variant="primary" size="sm" className="w-full">
                {CTA_PRIMARY.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
