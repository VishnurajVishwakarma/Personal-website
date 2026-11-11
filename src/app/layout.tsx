import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/consulting/ThemeProvider'
import { BRAND } from '@/lib/consulting-content'
import './globals.css'

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0E13' },
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
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] antialiased">
        <ThemeProvider>
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
