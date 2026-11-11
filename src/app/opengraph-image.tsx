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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#a8c8bb',
          padding: '44px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f8f5ee',
            color: '#2a2420',
            padding: '56px 68px',
            border: '2px solid #2a2420',
            boxShadow: '0 14px 30px rgba(42, 36, 32, 0.18)',
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
                gap: '14px',
                fontSize: '20px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#2c4f9e',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  backgroundColor: '#df6b3c',
                  color: '#1b1715',
                  padding: '6px 12px',
                  border: '2px solid #2a2420',
                }}
              >
                VV
              </span>
              <span>{BRAND.location}</span>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#a84718',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              AI · Business · IT &amp; Technology
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '60px',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                maxWidth: '960px',
                color: '#2a2420',
                borderBottom: '6px solid #df6b3c',
                paddingBottom: '12px',
              }}
            >
              Turning Technology into Business Advantage.
            </div>
            <div
              style={{
                fontSize: '26px',
                color: '#4c433c',
                lineHeight: 1.4,
                maxWidth: '900px',
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
              borderTop: '2px dashed rgba(42, 36, 32, 0.25)',
              paddingTop: '24px',
              fontSize: '22px',
              color: '#2a2420',
              fontWeight: 600,
            }}
          >
            <span>{BRAND.name}</span>
            <span style={{ color: '#2c4f9e' }}>vishnurajvishwakarma.in</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
