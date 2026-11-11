import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-4xl flex-col items-start px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
          404 · Page Not Found
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
          This page could not be located.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
          The route you requested may have moved during the consulting site restructuring. Use the links below to navigate directly.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent-primary-hover)]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Return Home
          </Link>
          <Link
            href="/services"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          >
            Services
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href="/work"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          >
            Work & Initiatives
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          >
            Contact
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}

