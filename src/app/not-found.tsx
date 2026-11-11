import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { Annotate } from '@/components/looseleaf/Annotate'

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="not-found-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
            404 · Page Not Found
          </p>
          <h1 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            <Annotate type="underline" kind="wavy" tone="marker" seed="404-mark">
              This page could not be located.
            </Annotate>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--ll-ink-soft)]">
            The route you requested may have moved during the consulting site restructuring. Use the links below to navigate directly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <InkButton href="/" variant="default" size="default" seed="404-home-btn">
              <ArrowLeft size={15} aria-hidden="true" />
              Return Home
            </InkButton>
            <InkButton href="/services" variant="outline" size="default" seed="404-services-btn">
              Services
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
            <InkButton href="/work" variant="outline" size="default" seed="404-work-btn">
              Work &amp; Initiatives
            </InkButton>
            <InkButton href="/contact" variant="outline" size="default" seed="404-contact-btn">
              Contact
            </InkButton>
          </div>
        </Paper>
      </section>
    </SiteShell>
  )
}
