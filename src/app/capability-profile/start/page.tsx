import type { Metadata } from 'next'
import Assessment from '@/components/profile/Assessment'

export const metadata: Metadata = {
  title: 'Your Capability Profile',
  description:
    'Answer 24 capability questions and four responsibility demand questions to see your Four M Capability Profile.',
  robots: { index: false, follow: true },
}

export default function AssessmentPage() {
  return <Assessment />
}
