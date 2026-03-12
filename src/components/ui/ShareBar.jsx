// ─────────────────────────────────────────────────────────────────────────────
// FILE 4: components/ui/ShareBar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable share buttons — WhatsApp, Twitter, Copy link
// Used in ArticleClient and StoryPageClient
//
// Usage:
//   <ShareBar url={window.location.href} title={fm.title} />
 
'use client';
 
import { useState } from 'react';
import { Share2, MessageCircle, Twitter, Link2, Check } from 'lucide-react';
 
export function ShareBar({ url, title, className = '' }) {
  const [copied, setCopied] = useState(false);
 
  const handleCopy = () => {
    const text = url || window.location.href;
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
        .catch(fallback);
    } else fallback();
  };
 
  const handleShare = (platform) => {
    const u = encodeURIComponent(url || window.location.href);
    const t = encodeURIComponent(title || '');
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${t}%20${u}`);
    if (platform === 'twitter')  window.open(`https://twitter.com/intent/tweet?text=${t}&url=${u}`);
  };
 
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
        <Share2 size={13} strokeWidth={2} /> Share
      </span>
      <button
        onClick={() => handleShare('whatsapp')}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-green-400 hover:text-green-600 transition-all"
      >
        <MessageCircle size={12} strokeWidth={2} /> WhatsApp
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all"
      >
        <Twitter size={12} strokeWidth={2} /> X / Twitter
      </button>
      <button
        onClick={handleCopy}
        className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-gray-400 transition-all"
      >
        {copied
          ? <><Check size={12} strokeWidth={2} color="#16a34a" /> Copied!</>
          : <><Link2 size={12} strokeWidth={2} /> Copy link</>
        }
      </button>
    </div>
  );
}
 