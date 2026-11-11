import { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="ll-desk relative flex min-h-screen flex-col overflow-x-clip text-[var(--ll-ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-[var(--ll-ink)] focus:bg-[var(--ll-paper)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[var(--ll-ink)] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="relative z-[1] min-w-0 flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
