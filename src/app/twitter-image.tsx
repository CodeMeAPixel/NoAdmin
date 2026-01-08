import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'NoAdmin - Discord Bot Permission Best Practices';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030712',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #ef4444, #f97316)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.4)',
            }}
          >
            {/* Shield with prohibition symbol */}
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V6l-8-4z"
                fill="#1f2937"
                opacity="0.9"
              />
              <circle cx="12" cy="13" r="5" stroke="#9ca3af" strokeWidth="1.5" fill="none" />
              <line x1="9" y1="10" x2="15" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              noadmin.info
            </div>
            <div
              style={{
                fontSize: '32px',
                color: '#9ca3af',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              Discord Bot Permission Best Practices
            </div>
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            {['Least Privilege', 'Security', 'Trust'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontSize: '20px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            fontSize: '18px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 6v6c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V6l-8-4z" />
          </svg>
          Stop requesting Administrator permission
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
