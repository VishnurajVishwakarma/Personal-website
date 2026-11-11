'use client'

import * as React from 'react'
import { InkProvider } from '@/lib/ink/react'

const PAPER_TEXTURES = ['fibre', 'relief', 'slip', 'cloud', 'linen'] as const

export function InkProviderWrap({ children }: { children: React.ReactNode }) {
  return (
    <InkProvider tier="hi" defs textures={PAPER_TEXTURES}>
      {children}
    </InkProvider>
  )
}

