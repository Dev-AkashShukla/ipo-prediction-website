// src/app/holi/AdUnit.jsx
'use client';
import { useEffect, useRef, useState } from 'react';

export const ADSENSE_PUB_ID = 'ca-pub-2959591975768653';
const ADSENSE_SLOT = '2791524991';

export default function AdUnit({ className = '', style = {} }) {
  const containerRef = useRef(null);
  const insRef = useRef(null);
  const didPush = useRef(false);
  const [hasAd, setHasAd] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const el = insRef.current;
    if (!el || didPush.current) return;
    if (el.getAttribute('data-adsbygoogle-status')) return;

    const width = container?.offsetWidth ?? 0;
    if (width === 0) return;

    didPush.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // Check after short delay if ad actually loaded
      setTimeout(() => {
        const status = el.getAttribute('data-adsbygoogle-status');
        if (status === 'done' || el.querySelector('iframe')) {
          setHasAd(true);
        }
      }, 2000);
    } catch (e) {}
  }, []);

  // On localhost / ad blocked — collapse to nothing, no empty space
  return (
    <div
      ref={containerRef}
      className={`${hasAd ? className : ''}`}
      style={hasAd ? { width: '100%', overflow: 'hidden', ...style } : { width: '100%' }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: hasAd ? '300px' : '0', width: '100%' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}