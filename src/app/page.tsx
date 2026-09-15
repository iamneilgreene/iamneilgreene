import Hero from '@/components/home/Hero'
import FourMChapter from '@/components/home/FourMChapter'
import TheGap from '@/components/home/TheGap'
import ProofOfRange from '@/components/home/ProofOfRange'
import IdeasSection from '@/components/home/IdeasSection'
import WorkWithNeil from '@/components/home/WorkWithNeil'
import CommunitySection from '@/components/home/CommunitySection'
import Closing from '@/components/home/Closing'

/**
 * Homepage, per the revised wireframe ("4A. Revised Homepage Architecture
 * & Visual Weight", Drive, 2026-08-29) — approved by Neil as the structure.
 *
 * Three acts, fewer chapters: the Core Question opens the Four M chapter
 * rather than standing alone; Books is a compact module attached to Ideas;
 * Community is a teaser into the men's pathway, not a second identity.
 * Section numbers and act names are deliberately not shown on the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FourMChapter />
      <TheGap />
      <ProofOfRange />
      <IdeasSection />
      <WorkWithNeil />
      <CommunitySection />
      <Closing />
    </>
  )
}
