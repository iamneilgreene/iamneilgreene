import type { Metadata } from 'next'
import { Suspense } from 'react'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Speaking inquiries, organizational advisory, community interest, and general questions.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell me what you are carrying."
        lead="Choose a reason so the message reaches the right place. Specific messages get better answers than general ones."
      />

      <Section ground="ink-sunken" topRule width="narrow">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </Section>
    </>
  )
}
