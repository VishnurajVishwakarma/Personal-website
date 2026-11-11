import type { MetadataRoute } from 'next'
import { BRAND, PROJECTS_CONTENT } from '@/lib/consulting-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl
  const coreRoutes = [
    '',
    '/services',
    '/work',
    '/about',
    '/insights',
    '/contact',
    '/now',
    '/finance',
    '/research',
    '/certificates',
  ]

  const workRoutes = PROJECTS_CONTENT.initiatives.map(
    item => `/work/${item.slug}`
  )

  return [...coreRoutes, ...workRoutes].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/work/') ? 0.8 : 0.85,
  }))
}
