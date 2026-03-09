import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import PathSelectorSection from '@/components/home/PathSelectorSection'
import AudienceSection from '@/components/home/AudienceSection'
import PillarsSection from '@/components/home/PillarsSection'
import CoachingPreviewSection from '@/components/home/CoachingPreviewSection'
import BrotherhoodSection from '@/components/home/BrotherhoodSection'
import BookPreviewSection from '@/components/home/BookPreviewSection'
import SpeakingPreviewSection from '@/components/home/SpeakingPreviewSection'
import LeadMagnetSection from '@/components/home/LeadMagnetSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export const metadata: Metadata = {
  title: 'Neil Greene — Architect of Power & Discipline | Forged By War',
  description:
    'Forged By War helps men rebuild discipline, strength, clarity, leadership, and direction through structured coaching, accountability, and brotherhood.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PathSelectorSection />
      <AudienceSection />
      <PillarsSection />
      <CoachingPreviewSection />
      <BrotherhoodSection />
      <BookPreviewSection />
      <SpeakingPreviewSection />
      <LeadMagnetSection />
      <FinalCTASection />
    </>
  )
}
