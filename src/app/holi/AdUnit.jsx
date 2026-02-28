// src/app/holi/AdUnit.jsx
'use client';
import { useEffect, useRef } from 'react';

export const ADSENSE_PUB_ID = 'ca-pub-2959591975768653';
const ADSENSE_SLOT = '2791524991'; // Holi Banne — Responsive Display Ad

export default function AdUnit({ className = '', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current?.querySelector('.adsbygoogle');
    if (!el || el.getAttribute('data-adsbygoogle-status')) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div
      ref={ref}
      className={`ad-container ${className}`}
      style={{ minWidth: '300px', width: '100%', overflow: 'hidden', ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}