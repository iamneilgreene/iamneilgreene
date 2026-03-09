import type { Metadata } from 'next'
import SpeakingHeroSection from '@/components/speaking/SpeakingHeroSection'
import SpeakingCredibilitySection from '@/components/speaking/SpeakingCredibilitySection'
import FeaturedTalkSection from '@/components/speaking/FeaturedTalkSection'
import SpeakingThemesSection from '@/components/speaking/SpeakingThemesSection'
import SpeakingAudienceSection from '@/components/speaking/SpeakingAudienceSection'
import SpeakingOutcomesSection from '@/components/speaking/SpeakingOutcomesSection'
import SpeakerOneSheetSection from '@/components/speaking/SpeakerOneSheetSection'
import SpeakingBookingSection from '@/components/speaking/SpeakingBookingSection'
import FinalSpeakingCTASection from '@/components/speaking/FinalSpeakingCTASection'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Neil Greene speaks to leaders, teams, and organizations on discipline, resilience, accountability, leadership, and performance under pressure. Book Neil to speak at your next event.',
}

export default function SpeakingPage() {
  return (
    <>
      <SpeakingHeroSection />
      <SpeakingCredibilitySection />
      <FeaturedTalkSection />
      <SpeakingThemesSection />
      <SpeakingAudienceSection />
      <SpeakingOutcomesSection />
      <SpeakerOneSheetSection />
      <SpeakingBookingSection />
      <FinalSpeakingCTASection />
    </>
  )
}
