import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'A local DMV network built on repeated real-world contact: shared activity, learning, useful introductions, and actual friendship.',
}

/**
 * The one part of the site where men-specific language is correct. The
 * umbrella brand is open to everyone; the brotherhood is deliberately not.
 *
 * The community has no permanent name yet — one should only be chosen after
 * the first gatherings establish their own culture — so nothing here brands
 * something that does not exist.
 */
export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community / DMV"
        title="Capable men build capable men."
        lead="A local network in the DMV built on repeated real-world contact: shared activity, learning, useful introductions, business, and actual friendship."
      />

      <Section index="01" ground="ink-sunken" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              What it is
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                ['Repeated contact', 'The same men, often enough that trust becomes real. Brotherhood without repeated contact is branding, not brotherhood.'],
                ['Shared activity', 'Training, building, and learning together, not a room of people taking turns talking about themselves.'],
                ['Useful introductions', 'A network is only capability when it is reciprocal. People you can call, who can call you.'],
                ['Standards', 'What capable men should expect from themselves and from the men around them.'],
              ].map(([t, b]) => (
                <li key={t} className="border-l border-hairline-bright pl-5">
                  <p className="font-display text-lg text-bone-50">{t}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-muted">{b}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              What it is not
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'A networking mixer.',
                'A mastermind sales funnel.',
                'A therapy circle.',
                'An ideological men&apos;s group.',
              ].map((l) => (
                <li key={l} className="border-l border-hairline pl-5 text-[1.0625rem] leading-relaxed text-text-muted">
                  {l}
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-hairline bg-ink-900 p-6">
              <p className="label label-bronze">On the name</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
                This community does not have a permanent name yet, on purpose.
                One gets chosen after the first gatherings establish their own
                culture and the members supply their own language for it, not
                before.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section index="02" ground="ink" topRule width="narrow">
        <div className="border border-hairline bg-ink-850 p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-bone-50 md:text-3xl">
            Join the DMV interest list
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
            Founding gatherings are being planned now. The list is how you hear
            about the first ones.
          </p>
          <Button href="/contact?reason=community" variant="bronze" size="lg" className="mt-7">
            Request an invitation
          </Button>
          <p className="mt-6 border-t border-hairline pt-5 text-[0.75rem] leading-relaxed text-slate-600">
            This experience is intentionally for men. The wider Capability
            philosophy, the Four M framework, the Capability Profile, speaking,
            and advisory work are open to everyone.
          </p>
        </div>
      </Section>
    </>
  )
}
