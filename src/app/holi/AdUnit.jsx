// src/app/holi/AdUnit.jsx
'use client';
import { useEffect, useRef } from 'react';

export const ADSENSE_PUB_ID = 'ca-pub-2959591975768653';
const ADSENSE_SLOT = '2791524991';

const pushed = new Set();

export default function AdUnit({ className = '', style = {} }) {
  const insRef = useRef(null);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    // Use the DOM node itself as unique key — works across StrictMode double-mount
    if (pushed.has(el)) return;
    pushed.add(el);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}

    return () => {
      pushed.delete(el);
    };
  }, []);

  return (
    <div
      className={`ad-container ${className}`}
      style={{ minWidth: '300px', width: '100%', overflow: 'hidden', ...style }}
    >
      <ins
        ref={insRef}
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