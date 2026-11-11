import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/consulting/ThemeProvider'
import { InkProviderWrap } from '@/components/looseleaf/InkProviderWrap'
import { BRAND } from '@/lib/consulting-content'
import './globals.css'

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#a8c8bb' },
    { media: '(prefers-color-scheme: dark)', color: '#171b22' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.seoTitle,
    template: '%s | Vishnuraj Vishwakarma',
  },
  description: BRAND.seoDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: BRAND.seoTitle,
    description: BRAND.seoDescription,
    url: '/',
    siteName: BRAND.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.seoTitle,
    description: BRAND.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BRAND.siteUrl}/#person`,
      name: BRAND.name,
      url: BRAND.siteUrl,
      image: `${BRAND.siteUrl}/images/vishnu-portrait.png`,
      email: `mailto:${BRAND.email}`,
      jobTitle: BRAND.role,
      description: BRAND.seoDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressCountry: 'IN',
      },
      sameAs: [BRAND.linkedinUrl, BRAND.githubUrl],
      knowsAbout: [
        'AI Adoption & Integration',
        'Business Process Optimization',
        'IT & Digital Transformation',
        'Business Intelligence & Analytics',
        'Technology & Business Strategy',
        'Product & Systems Development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BRAND.siteUrl}/#website`,
      url: BRAND.siteUrl,
      name: BRAND.seoTitle,
      description: BRAND.seoDescription,
      publisher: { '@id': `${BRAND.siteUrl}/#person` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={ibmPlexMono.variable}
    >
      <body className="ll-desk min-h-screen font-sans text-[var(--ll-ink)] antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <InkProviderWrap>
            {children}
          </InkProviderWrap>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
