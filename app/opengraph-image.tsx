import { ImageResponse } from 'next/og';

// Social share card (also used for Twitter/X via the metadata in layout.tsx).
export const alt = 'Veleads. Stop prospecting. Start taking sales calls.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(circle at 85% 0%, #2a2a8f 0%, #101233 55%)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 52 52">
            <rect width="52" height="52" rx="14" fill="#5B5BF6" />
            <path d="M14 16 L26 37 L38 16" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="40" cy="12" r="5" fill="#5EEAD4" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>veleads</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            <span>Stop prospecting.</span>
            <span style={{ color: '#5EEAD4' }}>Start taking sales calls.</span>
          </div>
          <div style={{ fontSize: 32, color: '#C9CBEA' }}>
            The 90-Day Pipeline Sprint for B2B AI &amp; SaaS founders.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
