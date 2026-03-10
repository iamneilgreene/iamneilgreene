import type { Metadata } from 'next'
import ApplicationForm from '@/components/apply/ApplicationForm'

export const metadata: Metadata = {
  title: 'Application | Apply for Coaching',
  description:
    'Complete your coaching application for Forged By War. Private coaching with Neil Greene is reserved for men who are serious about rebuilding discipline, strength, and leadership.',
}

export default function ApplicationFormPage() {
  return <ApplicationForm />
}
