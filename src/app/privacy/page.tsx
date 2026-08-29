import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What this site collects, why, and what it does not do with it.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What this site collects, and what it does not."
      />

      <Section ground="ink-sunken" topRule width="narrow">
        <div className="space-y-10 text-[1.0625rem] leading-relaxed text-text-body">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              The Capability Profile
            </h2>
            <p className="mt-4">
              Assessment answers are treated as private user data. In the
              current build your responses are stored only in your own browser
              and are not transmitted to a server. Clearing your browser storage
              removes them.
            </p>
            <p className="mt-4">
              Raw answers are never placed in a URL, and are never sent to
              advertising platforms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              What the profile is not
            </h2>
            <p className="mt-4">
              The Four M Capability Profile is a proprietary self-assessment and
              development tool. It is not a clinical, psychological, or
              population-normed diagnostic, and it should not be used as medical,
              legal, or financial advice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              Email
            </h2>
            <p className="mt-4">
              If you provide an email address, it is used to deliver your profile
              and related educational communication. It is not sold. You can ask
              for your data to be exported or deleted at any time.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              Contact
            </h2>
            <p className="mt-4">
              Questions about any of this can go through the contact page.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
