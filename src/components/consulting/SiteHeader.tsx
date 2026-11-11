'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import { BRAND } from '@/lib/consulting-content'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const mobileOpen = openPath === pathname

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 px-3 pt-2.5 sm:px-6 sm:pt-3.5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Paper
          stock="slip"
          shadow="slip"
          tilt={false}
          seed="site-header-slip"
          className="px-4 py-2.5 sm:px-5 sm:py-3"
        >
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--ll-ink)] bg-[var(--ll-marker)] font-mono text-xs font-bold tracking-tight text-[#1b1715] transition-transform duration-150 group-hover:-rotate-3"
              >
                VV
              </span>
              <div className="min-w-0 leading-tight">
                <span className="block truncate font-sans text-sm font-bold tracking-tight text-[var(--ll-ink)] sm:text-base">
                  {BRAND.name}
                </span>
                <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)] sm:block">
                  AI · Business · Technology · {BRAND.location}
                </span>
              </div>
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map(item => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex min-h-[38px] items-center rounded-md px-3 py-1.5 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)] ${
                      active
                        ? 'font-bold text-[var(--ll-ink)]'
                        : 'font-normal text-[var(--ll-pencil-text)] hover:text-[var(--ll-ink)]'
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-0 right-0 h-[3px] -rotate-[0.6deg] rounded-full bg-[var(--ll-marker)]"
                        />
                      )}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />

              <InkButton
                href="/contact"
                variant="default"
                size="sm"
                seed="header-discuss-cta"
                className="hidden sm:inline-flex"
              >
                Discuss Challenge
                <ArrowUpRight size={15} aria-hidden="true" />
              </InkButton>

              <InkButton
                type="button"
                variant="outline"
                size="icon"
                seed="mobile-menu-toggle"
                onClick={() => setOpenPath(prev => (prev === pathname ? null : pathname))}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden"
              >
                {mobileOpen ? (
                  <X size={18} aria-hidden="true" />
                ) : (
                  <Menu size={18} aria-hidden="true" />
                )}
              </InkButton>
            </div>
          </div>
        </Paper>

        {mobileOpen && (
          <div id="mobile-navigation-drawer" className="mt-2.5 lg:hidden">
            <Paper
              stock="paper"
              tape="top"
              tapeKind="masking"
              tilt={false}
              seed="mobile-drawer-sheet"
              className="px-4 py-4 sm:px-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                  Field Notes · Index
                </span>
                <InkBadge variant="outline" size="sm" seed="mobile-index-badge">
                  {BRAND.location}
                </InkBadge>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map(item => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenPath(null)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[44px] items-center justify-between rounded-md px-3 py-2 font-sans text-base transition-colors ${
                        active
                          ? 'bg-[var(--ll-hi)]/35 font-bold text-[var(--ll-ink)]'
                          : 'text-[var(--ll-ink-soft)] hover:bg-[var(--ll-paper-shade)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-ink)]">
                          Open
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>

              <InkRule variant="dashed" seed="mobile-drawer-rule" className="my-3.5" />

              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 font-mono text-xs text-[var(--ll-link)] hover:underline"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span className="break-all">{BRAND.email}</span>
                </a>
                <InkButton
                  href="/contact"
                  variant="default"
                  size="default"
                  seed="mobile-drawer-cta"
                  onClick={() => setOpenPath(null)}
                  className="w-full"
                >
                  Discuss Your Business Challenge
                  <ArrowUpRight size={16} aria-hidden="true" />
                </InkButton>
              </div>
            </Paper>
          </div>
        )}
      </div>
    </header>
  )
}
