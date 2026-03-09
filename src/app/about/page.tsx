import type { Metadata } from 'next'
import AboutHeroSection from '@/components/about/AboutHeroSection'
import FounderStorySection from '@/components/about/FounderStorySection'
import MissionSection from '@/components/about/MissionSection'
import BeliefsSection from '@/components/about/BeliefsSection'
import AudienceFitSection from '@/components/about/AudienceFitSection'
import StructureSection from '@/components/about/StructureSection'
import FinalTrustCTASection from '@/components/about/FinalTrustCTASection'

export const metadata: Metadata = {
  title: 'About Neil Greene',
  description:
    'Neil Greene built Forged By War for men who are tired of drift, finished with self-betrayal, and ready to rebuild discipline, strength, clarity, and leadership under a standard that holds when pressure rises.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <FounderStorySection />
      <MissionSection />
      <BeliefsSection />
      <AudienceFitSection />
      <StructureSection />
      <FinalTrustCTASection />
    </>
  )
}
