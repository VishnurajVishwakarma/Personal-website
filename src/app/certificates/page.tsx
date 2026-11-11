import type { Metadata } from 'next'
import { CertificatesClient } from './CertificatesClient'

export const metadata: Metadata = {
  title: 'Verified Credentials & Recognitions',
  description:
    'Certificates, academic achievements, and competition recognitions backed by verifiable source links.',
  alternates: { canonical: '/certificates' },
}

export default function CertificatesPage() {
  return <CertificatesClient />
}
