import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'For Organizations',
  description:
    'AI, cybersecurity, digital risk, strategy, and advisory for organizations that need judgment as well as technology.',
}

export default function OrganizationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work With Neil / Organizations"
        title="Most organizations buy tools. Fewer build judgment."
        lead="AI and security failures are rarely purely technical. They are capability failures: the responsibility a team carries has outgrown the judgment, systems, and readiness available to answer it."
      />

      <Section index="01" ground="ink-sunken" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          Capabilities
        </h2>
        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {[
            ['AI adoption and judgment', 'Where AI creates leverage, where it creates exposure, and how to tell the difference before it is in production.'],
            ['Cybersecurity and digital risk', 'Risk, resilience, systems, and failure points, including the ones that are organisational rather than technical.'],
            ['Strategy and advisory', 'Decision quality under uncertainty, single points of dependence, and building optionality into how the business operates.'],
            ['Workshops and executive education', 'The Four M framework applied to a leadership team, with a measured baseline and a retest.'],
          ].map(([title, body]) => (
            <li key={title} className="bg-ink-950 p-7 md:p-9">
              <h3 className="font-display text-xl font-normal text-bone-50">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" ground="ink" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              Engagement models
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                ['Advisory retainer', 'Ongoing counsel to a leadership team on technology, risk, and capability decisions.'],
                ['Assessment and roadmap', 'A defined engagement producing a measured picture and a prioritised plan.'],
                ['Workshop or executive session', 'A single session or short series, applied to your actual environment.'],
                ['Keynote', 'See the speaking page.'],
              ].map(([m, d]) => (
                <li key={m} className="border-l border-hairline-bright pl-5">
                  <p className="font-display text-lg text-bone-50">{m}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              Why Neil
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-text-body">
              A practitioner background in cybersecurity and AI, an operator&apos;s
              view of business, and a published body of work on digital risk and
              human performance.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-text-muted">
              Author of <span className="text-bone-50">Exposed</span>, on digital
              risk, technology, security, and leadership, and{' '}
              <span className="text-bone-50">Ignite</span>, on performance,
              discipline, and resilience.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-text-muted">
              Specific client work and engagement references are shared directly
              rather than published, for confidentiality reasons.
            </p>
          </div>
        </div>
      </Section>

      <section className="border-t border-hairline bg-ink-950 py-24 text-center md:py-32">
        <Container width="narrow">
          <h2 className="font-display text-3xl font-bold text-bone-50 md:text-4xl">
            Tell me what your organization is carrying.
          </h2>
          <Button href="/contact?reason=organization" variant="primary" size="lg" className="mt-9">
            Start an inquiry
          </Button>
        </Container>
      </section>
    </>
  )
}
