import type { Metadata } from 'next'
import BookHeroSection from '@/components/book/BookHeroSection'
import BookDefinitionSection from '@/components/book/BookDefinitionSection'
import BookContentsSection from '@/components/book/BookContentsSection'
import BookAudienceSection from '@/components/book/BookAudienceSection'
import BookWhyStartSection from '@/components/book/BookWhyStartSection'
import BookBridgeSection from '@/components/book/BookBridgeSection'
import FinalBookCTASection from '@/components/book/FinalBookCTASection'

export const metadata: Metadata = {
  title: 'Ignite: Fitness Fuel for Working Dads',
  description:
    'Ignite is a practical guide for working men who need structure, consistency, and a clearer path back to physical discipline. Amazon Best Seller by Neil Greene.',
}

export default function BookPage() {
  return (
    <>
      <BookHeroSection />
      <BookDefinitionSection />
      <BookContentsSection />
      <BookAudienceSection />
      <BookWhyStartSection />
      <BookBridgeSection />
      <FinalBookCTASection />
    </>
  )
}
