'use client'

import { ReactNode, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const emptySubscribe = () => () => {}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const prefersReducedMotion = useReducedMotion()
  const reduced = mounted && Boolean(prefersReducedMotion)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-48px' }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.36, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  lead,
  description,
  className = '',
}: {
  number?: string
  eyebrow: string
  title: string
  lead?: string
  description?: string
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
        {number ? `${number} / ` : ''}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,3.6vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--text-primary)]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-lg font-medium leading-relaxed text-[var(--text-primary)]">
          {lead}
        </p>
      )}
      {description && (
        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)] sm:text-[1.0625rem]">
          {description}
        </p>
      )}
    </div>
  )
}

