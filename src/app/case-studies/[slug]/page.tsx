import { permanentRedirect } from 'next/navigation'

export default async function LegacyCaseStudyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  permanentRedirect(`/work/${slug}`)
}
