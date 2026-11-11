import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/consulting-content'

export const alt = BRAND.seoTitle
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B0E13',
          color: '#F4F1EA',
          padding: '72px 84px',
          border: '1px solid rgba(244, 241, 234, 0.12)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '20px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#2DD4BF',
            }}
          >
            <span>VV</span>
            <span style={{ color: '#64748B' }}>/</span>
            <span>{BRAND.location}</span>
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#D2B475',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            AI · Business · IT & Technology
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '960px',
            }}
          >
            Turning Technology into Business Advantage.
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#B4BCC8',
              lineHeight: 1.4,
              maxWidth: '880px',
            }}
          >
            Helping businesses adopt AI, optimize operations, and build intelligent technology systems for sustainable, long-term growth.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(244, 241, 234, 0.14)',
            paddingTop: '28px',
            fontSize: '22px',
            color: '#F4F1EA',
          }}
        >
          <span>{BRAND.name}</span>
          <span style={{ color: '#8B95A5' }}>vishnurajvishwakarma.in</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

