import type { Metadata } from 'next'
import BrotherhoodHeroSection from '@/components/community/BrotherhoodHeroSection'
import WhyBrotherhoodSection from '@/components/community/WhyBrotherhoodSection'
import BrotherhoodDefinitionSection from '@/components/community/BrotherhoodDefinitionSection'
import BrotherhoodIncludesSection from '@/components/community/BrotherhoodIncludesSection'
import BrotherhoodFitSection from '@/components/community/BrotherhoodFitSection'
import BrotherhoodNotFitSection from '@/components/community/BrotherhoodNotFitSection'
import BrotherhoodTransformationSection from '@/components/community/BrotherhoodTransformationSection'
import BrotherhoodEntrySection from '@/components/community/BrotherhoodEntrySection'
import FinalBrotherhoodCTASection from '@/components/community/FinalBrotherhoodCTASection'

export const metadata: Metadata = {
  title: 'Brotherhood',
  description:
    'Forged By War Brotherhood is a disciplined community for men who need sharper proximity, real accountability, and a room built around standards, challenge, and forward movement.',
}

export default function CommunityPage() {
  return (
    <>
      <BrotherhoodHeroSection />
      <WhyBrotherhoodSection />
      <BrotherhoodDefinitionSection />
      <BrotherhoodIncludesSection />
      <BrotherhoodFitSection />
      <BrotherhoodNotFitSection />
      <BrotherhoodTransformationSection />
      <BrotherhoodEntrySection />
      <FinalBrotherhoodCTASection />
    </>
  )
}
