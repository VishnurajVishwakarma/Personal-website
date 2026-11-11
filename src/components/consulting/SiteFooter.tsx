import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { BRAND, PROJECTS_CONTENT } from '@/lib/consulting-content'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1fr_1fr]">
          <div>
            <p className="text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              {BRAND.name}
            </p>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)]">
              {BRAND.role}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              {BRAND.footerTagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <MapPin size={14} aria-hidden="true" />
              {BRAND.location}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
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
                    className="focus-ring rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Initiatives
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PROJECTS_CONTENT.initiatives.map(item => (
                <li key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="focus-ring rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Direct Channels
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="focus-ring inline-flex items-center gap-2 rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
                  className="focus-ring inline-flex items-center gap-1.5 rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
                  className="focus-ring inline-flex items-center gap-1.5 rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  GitHub
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <Link
                  href="/now"
                  className="focus-ring inline-flex items-center gap-1.5 rounded text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Current Focus (/now)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Business First · Technology Second · Long-Term Value Always
          </p>
        </div>
      </div>
    </footer>
  )
}

