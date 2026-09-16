import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import EmailPreferences from '@/components/profile/EmailPreferences'
export const metadata: Metadata = { title: 'Email preferences', robots: { index: false, follow: false }, referrer: 'no-referrer' }
export default function EmailPreferencesPage() {
  return <Container className="py-20 sm:py-28"><div className="mx-auto max-w-2xl"><h1 className="font-display text-4xl text-bone-50 sm:text-5xl">Your email choices.</h1><p className="mt-5 text-lg leading-relaxed text-text-body">Confirm only the emails you requested, or stop them here.</p><EmailPreferences /><noscript><p className="mt-8 text-text-body">Enable JavaScript to use this private link, or email hello@iamneilgreene.com to manage your preferences.</p></noscript></div></Container>
}
