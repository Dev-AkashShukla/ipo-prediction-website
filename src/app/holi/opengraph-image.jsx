// src/app/holi/opengraph-image.jsx
// Next.js dynamic OG image — auto picked up for /holi route
// Supports personalized name via ?w= param on the /holi page

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Happy Holi 2026 - FINNOTIA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params, searchParams }) {
  // Decode names from ?w= token if present
  let receiverName = '';
  let senderName = '';

  const w = searchParams?.w;
  if (w) {
    try {
      const decoded = JSON.parse(
        decodeURIComponent(escape(atob(decodeURIComponent(w))))
      );
      receiverName = decoded.t || '';
      senderName   = decoded.f || '';
    } catch {}
  }

  const isPersonalized = !!receiverName;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFFDF0 0%, #FFF0F5 30%, #F0FFF8 60%, #FFF8F0 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Color blobs background */}
        <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #FF174466 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, #FFEA0066 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, #00E67666 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -40, right: '10%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, #2979FF66 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '40%', left: -50, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, #FF6D0066 0%, transparent 70%)', display: 'flex' }} />

        {/* Main card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '32px',
            padding: '48px 64px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
            border: '2px solid rgba(255,255,255,0.9)',
            maxWidth: '900px',
            width: '100%',
          }}
        >
          {/* Emoji */}
          <div style={{ fontSize: '64px', marginBottom: '12px', display: 'flex' }}>🎨</div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FF1744, #FF6D00, #FFEA00, #00C853)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
              marginBottom: '8px',
              display: 'flex',
            }}
          >
            Happy Holi! 🥳
          </div>

          {/* Personalized or generic message */}
          {isPersonalized ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '28px', color: '#6B7280', marginBottom: '4px', display: 'flex' }}>
                Special wish for
              </div>
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: 800,
                  color: '#FF1744',
                  display: 'flex',
                }}
              >
                {receiverName} ✨
              </div>
              <div style={{ fontSize: '24px', color: '#9CA3AF', marginTop: '4px', display: 'flex' }}>
                from {senderName} 💕
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '30px', color: '#4B5563', textAlign: 'center', display: 'flex' }}>
              Send a personalized Holi wish to your loved ones! 🌈
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: '28px',
              fontSize: '20px',
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ display: 'flex' }}>📊</span>
            <span style={{ display: 'flex' }}>FINNOTIA — Free IPO & Stock Tracker</span>
          </div>
        </div>

        {/* Festival of Colors badge */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: '40px',
            background: 'linear-gradient(135deg, #FF1744, #FF6D00, #FFEA00)',
            borderRadius: '50px',
            padding: '10px 24px',
            fontSize: '22px',
            fontWeight: 700,
            color: '#fff',
            display: 'flex',
          }}
        >
          ✨ Festival of Colors 2026
        </div>

        {/* finnotia.com watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            fontSize: '20px',
            color: '#9CA3AF',
            display: 'flex',
          }}
        >
          finnotia.com/holi
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}