import type { Metadata } from 'next'
import PrivateCoachingHeroSection from '@/components/coaching/private/PrivateCoachingHeroSection'
import WhyPrivateSection from '@/components/coaching/private/WhyPrivateSection'
import OfferDefinitionSection from '@/components/coaching/private/OfferDefinitionSection'
import IncludesSection from '@/components/coaching/private/IncludesSection'
import FitSection from '@/components/coaching/private/FitSection'
import NotFitSection from '@/components/coaching/private/NotFitSection'
import TransformationSection from '@/components/coaching/private/TransformationSection'
import ApplicationProcessSection from '@/components/coaching/private/ApplicationProcessSection'
import FinalPrivateCTASection from '@/components/coaching/private/FinalPrivateCTASection'

export const metadata: Metadata = {
  title: 'Private Coaching',
  description:
    'Forged By War Private is a 1-on-1 coaching engagement for men who want direct access, personalized correction, and a standard strong enough to rebuild discipline, strength, clarity, and leadership with precision.',
}

export default function PrivateCoachingPage() {
  return (
    <>
      <PrivateCoachingHeroSection />
      <WhyPrivateSection />
      <OfferDefinitionSection />
      <IncludesSection />
      <FitSection />
      <NotFitSection />
      <TransformationSection />
      <ApplicationProcessSection />
      <FinalPrivateCTASection />
    </>
  )
}
