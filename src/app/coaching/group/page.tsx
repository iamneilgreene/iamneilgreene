import type { Metadata } from 'next'
import GroupCoachingHeroSection from '@/components/coaching/group/GroupCoachingHeroSection'
import WhyGroupSection from '@/components/coaching/group/WhyGroupSection'
import GroupDefinitionSection from '@/components/coaching/group/GroupDefinitionSection'
import GroupIncludesSection from '@/components/coaching/group/GroupIncludesSection'
import GroupFitSection from '@/components/coaching/group/GroupFitSection'
import GroupNotFitSection from '@/components/coaching/group/GroupNotFitSection'
import GroupTransformationSection from '@/components/coaching/group/GroupTransformationSection'
import GroupProcessSection from '@/components/coaching/group/GroupProcessSection'
import FinalGroupCTASection from '@/components/coaching/group/FinalGroupCTASection'

export const metadata: Metadata = {
  title: 'Group Coaching',
  description:
    'Forged By War Cohort is a quarterly group coaching experience for men who want live coaching, real accountability, and the force of a room moving under one standard.',
}

export default function GroupCoachingPage() {
  return (
    <>
      <GroupCoachingHeroSection />
      <WhyGroupSection />
      <GroupDefinitionSection />
      <GroupIncludesSection />
      <GroupFitSection />
      <GroupNotFitSection />
      <GroupTransformationSection />
      <GroupProcessSection />
      <FinalGroupCTASection />
    </>
  )
}
