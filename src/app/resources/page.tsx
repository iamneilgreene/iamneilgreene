import type { Metadata } from 'next'
import ResourcesHeroSection from '@/components/resources/ResourcesHeroSection'
import WhyResourcesSection from '@/components/resources/WhyResourcesSection'
import FeaturedBlueprintSection from '@/components/resources/FeaturedBlueprintSection'
import FutureResourcesSection from '@/components/resources/FutureResourcesSection'
import ResourcePathwaySection from '@/components/resources/ResourcePathwaySection'
import FinalResourcesCTASection from '@/components/resources/FinalResourcesCTASection'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practical tools and frameworks for men who need a stronger starting point. Start with the Forged Father Blueprint.',
}

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHeroSection />
      <WhyResourcesSection />
      <FeaturedBlueprintSection />
      <FutureResourcesSection />
      <ResourcePathwaySection />
      <FinalResourcesCTASection />
    </>
  )
}
