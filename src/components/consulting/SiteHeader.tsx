'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { BRAND } from '@/lib/consulting-content'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const mobileOpen = openPath === pathname

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPath(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="focus-ring group flex min-w-0 items-center gap-3 rounded-lg py-1.5"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] transition-colors group-hover:border-[var(--accent-primary)]"
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 3.5L9.5 20.5L16.5 3.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--text-primary)]"
              />
              <path
                d="M15.5 3.5L22.5 20.5L29.5 3.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent-primary)]"
              />
            </svg>
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[0.9375rem]">
              {BRAND.name}
            </span>
            <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] xl:block">
              AI · Business · Technology Consultant
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`focus-ring rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="focus-ring hidden h-10 items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] sm:inline-flex"
          >
            Discuss Challenge
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setOpenPath(prev => (prev === pathname ? null : pathname))}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 pb-6 pt-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpenPath(null)}
                  className={`focus-ring flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors ${
                    active
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={15} aria-hidden="true" className="opacity-60" />
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
            <Link
              href="/contact"
              onClick={() => setOpenPath(null)}
              className="focus-ring inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
            >
              Discuss Your Business Challenge
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
              <a
                href={`mailto:${BRAND.email}`}
                className="focus-ring rounded underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--text-primary)]"
              >
                {BRAND.email}
              </a>
              <span>{BRAND.location}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

