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
              If you subscribe after completing your profile, your name, email,
              and permission to receive future educational updates are saved in
              Neil&apos;s contact management system. Your assessment answers are
              not included. Subscribing does not automatically email your profile
              or schedule a reminder. You can save your profile and import a
              calendar reminder yourself. Your email is not sold. You can withdraw
              permission or request an export or deletion through the contact page.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              Contact
            </h2>
            <p className="mt-4">
              Contact inquiries save your name, email, chosen reason, and message
              in Neil&apos;s contact management system so he can respond. Sending an
              inquiry does not subscribe you to educational updates. Avoid including
              sensitive information that is not needed for your inquiry. Privacy
              questions can also go through the contact page.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
