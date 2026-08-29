import type { Metadata } from 'next'
import { fontVariables } from '@/lib/fonts'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, PHILOSOPHY } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FooterGate from '@/components/layout/FooterGate'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · Responsibility Demands Capability`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${PHILOSOPHY}`,
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@iamneilgreene',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning covers the `js` class the head script adds to
    // this element before React hydrates. It applies to <html>'s own
    // attributes only, not to anything rendered inside it.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Marks the document as scripted before first paint, which is what
            arms the scroll reveals. Without JS the class never lands and all
            revealed content renders visible instead of hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cobalt-500 focus:px-4 focus:py-2 focus:text-bone-50"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <FooterGate>
          <Footer />
        </FooterGate>
      </body>
    </html>
  )
}
