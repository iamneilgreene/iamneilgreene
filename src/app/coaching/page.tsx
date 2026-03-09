import type { Metadata } from 'next'
import CoachingHeroSection from '@/components/coaching/CoachingHeroSection'
import WhyCoachingSection from '@/components/coaching/WhyCoachingSection'
import PathsSection from '@/components/coaching/PathsSection'
import FitSection from '@/components/coaching/FitSection'
import SharedFoundationSection from '@/components/coaching/SharedFoundationSection'
import FinalCoachingCTASection from '@/components/coaching/FinalCoachingCTASection'

export const metadata: Metadata = {
  title: 'Coaching',
  description:
    'Forged By War offers three coaching paths for men who are done letting drift hide behind busyness, competence, and good intentions.',
}

export default function CoachingPage() {
  return (
    <>
      <CoachingHeroSection />
      <WhyCoachingSection />
      <PathsSection />
      <FitSection />
      <SharedFoundationSection />
      <FinalCoachingCTASection />
    </>
  )
}
