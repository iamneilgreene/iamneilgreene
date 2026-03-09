import type { Metadata } from 'next'
import ApplyHeroSection from '@/components/apply/ApplyHeroSection'
import WhyApplySection from '@/components/apply/WhyApplySection'
import PathSelectorSection from '@/components/apply/PathSelectorSection'
import FitGuidanceSection from '@/components/apply/FitGuidanceSection'
import PostApplyProcessSection from '@/components/apply/PostApplyProcessSection'
import FinalApplyCTASection from '@/components/apply/FinalApplyCTASection'

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Choose the right level of support and start the work honestly. Apply for Private Coaching, the Group Coaching Cohort, or join the Brotherhood.',
}

export default function ApplyPage() {
  return (
    <>
      <ApplyHeroSection />
      <WhyApplySection />
      <PathSelectorSection />
      <FitGuidanceSection />
      <PostApplyProcessSection />
      <FinalApplyCTASection />
    </>
  )
}
