import type { Metadata } from 'next'
import ContactHeroSection from '@/components/contact/ContactHeroSection'
import ContactPurposeSection from '@/components/contact/ContactPurposeSection'
import InquiryPathsSection from '@/components/contact/InquiryPathsSection'
import InquiryGuidanceSection from '@/components/contact/InquiryGuidanceSection'
import FinalContactCTASection from '@/components/contact/FinalContactCTASection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'For speaking, partnerships, media, or general inquiries, reach out clearly. Coaching inquiries start on the Apply page.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactPurposeSection />
      <InquiryPathsSection />
      <InquiryGuidanceSection />
      <FinalContactCTASection />
    </>
  )
}
