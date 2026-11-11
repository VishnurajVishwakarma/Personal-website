import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { BRAND, PROJECTS_CONTENT } from '@/lib/consulting-content'
import { Paper } from '@/components/looseleaf/Paper'
import { InkRule } from '@/components/looseleaf/InkRule'
import { InkBadge } from '@/components/looseleaf/InkBadge'

export function SiteFooter() {
  return (
    <footer className="relative z-[1] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Paper
          stock="paper"
          tape="top"
          tapeKind="masking"
          tilt={false}
          seed="site-footer-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1fr_1fr]">
            <div>
              <p className="font-sans text-lg font-bold tracking-tight text-[var(--ll-ink)]">
                {BRAND.name}
              </p>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                {BRAND.role}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--ll-ink-soft)]">
                {BRAND.footerTagline}
              </p>
              <div className="mt-4">
                <InkBadge variant="outline" size="sm" seed="footer-location-badge">
                  <MapPin size={12} aria-hidden="true" />
                  {BRAND.location}
                </InkBadge>
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  ['Home', '/'],
                  ['Services', '/services'],
                  ['Work & Initiatives', '/work'],
                  ['About', '/about'],
                  ['Insights', '/insights'],
                  ['Contact', '/contact'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
                Initiatives
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {PROJECTS_CONTENT.initiatives.map(item => (
                  <li key={item.slug}>
                    <Link
                      href={`/work/${item.slug}`}
                      className="rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                    >
                      {item.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
                Direct Channels
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center gap-2 rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-link)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                  >
                    <Mail size={15} aria-hidden="true" className="shrink-0" />
                    <span className="break-all">{BRAND.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BRAND.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-link)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                  >
                    LinkedIn
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={BRAND.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-link)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                  >
                    GitHub
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/now"
                    className="inline-flex items-center gap-1.5 rounded text-[var(--ll-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ll-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                  >
                    Current Focus (/now)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <InkRule variant="pencil" seed="footer-colophon-rule" className="my-8" />

          <div className="flex flex-col gap-2 text-xs text-[var(--ll-pencil-text)] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved. · Built with{' '}
              <a
                href="https://github.com/kevintngo/looseleaf"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dashed underline-offset-4 hover:text-[var(--ll-ink)]"
              >
                Looseleaf
              </a>{' '}
              (MIT) paper &amp; ink tokens.
            </p>
            <p className="font-mono uppercase tracking-[0.12em]">
              Business First · Technology Second · Long-Term Value Always
            </p>
          </div>
        </Paper>
      </div>
    </footer>
  )
}
