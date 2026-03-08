'use client';
// src/app/blog/[slug]/ArticleClient.jsx
// Client component — scroll progress, TOC, share buttons

import { useState, useEffect } from 'react';

const CAT_STYLES = {
  commodities:    { backgroundColor: '#fef3c7', color: '#92400e' },
  markets:        { backgroundColor: '#d1fae5', color: '#065f46' },
  economy:        { backgroundColor: '#dbeafe', color: '#1e40af' },
  tech:           { backgroundColor: '#ede9fe', color: '#5b21b6' },
  crypto:         { backgroundColor: '#fce7f3', color: '#9d174d' },
  ipo:            { backgroundColor: '#fef3c7', color: '#92400e' },
  'mutual-funds': { backgroundColor: '#dbeafe', color: '#1e40af' },
  geopolitics:    { backgroundColor: '#fee2e2', color: '#991b1b' },
  tax:            { backgroundColor: '#e0e7ff', color: '#3730a3' },
};

const SENT_COLORS = {
  BULLISH: { backgroundColor: '#d1fae5', color: '#065f46' },
  BEARISH: { backgroundColor: '#fee2e2', color: '#991b1b' },
  NEUTRAL: { backgroundColor: '#f3f4f6', color: '#374151' },
  MIXED:   { backgroundColor: '#fef3c7', color: '#92400e' },
};

export default function ArticleClient({ frontmatter: fm, htmlContent }) {
  const [progress, setProgress] = useState(0);
  const [showToc, setShowToc]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Extract headings from rendered HTML
    const parser = new DOMParser();
    const doc    = parser.parseFromString(htmlContent, 'text/html');
    const h2s    = Array.from(doc.querySelectorAll('h2'));
    setHeadings(h2s.map((h) => h.textContent));
  }, [htmlContent]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const catStyle  = CAT_STYLES[fm.category?.toLowerCase()] || {};
  const sentStyle = SENT_COLORS[fm.sentiment] || null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (platform) => {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(fm.title);
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${title}%20${url}`);
    if (platform === 'twitter')  window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 h-[3px] bg-[#c8421e] z-50 transition-all duration-100"
        style={{ width: `${progress}%` }} />

      {/* Hero Image */}
      {fm.image_url ? (
        <div className="relative w-full overflow-hidden" style={{ height: '380px' }}>
          <img src={fm.image_url} alt={fm.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="w-full bg-gradient-to-br from-[#0c1e35] to-[#1a3355] flex items-center justify-center" style={{ height: '280px' }}>
          <span className="text-white/10 text-8xl">📊</span>
        </div>
      )}

      {/* Article Header */}
      <div className="max-w-2xl mx-auto px-5 mt-8">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {fm.category && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md capitalize"
              style={catStyle}>
              {fm.category}
            </span>
          )}
          {fm.sentiment && sentStyle && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md"
              style={sentStyle}>
              {fm.sentiment}
            </span>
          )}
          {fm.region && fm.region !== 'GLOBAL' && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md bg-gray-100 text-gray-500">
              {fm.region}
            </span>
          )}
        </div>

        <h1 className="font-serif text-[clamp(24px,5vw,36px)] text-gray-900 leading-snug mb-3">
          {fm.title}
        </h1>

        {fm.excerpt && (
          <p className="text-base text-gray-500 leading-relaxed mb-6">{fm.excerpt}</p>
        )}

        {/* Key Facts */}
        {fm.key_facts?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            {fm.key_facts.map((fact, i) => (
              <div key={i} className="bg-[#0c1e35] rounded-xl px-3 py-2.5 text-center">
                <p className="text-white/70 text-[11px] leading-snug">{fact}</p>
              </div>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap py-4 border-t border-b border-gray-200 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#fef3f0] flex items-center justify-center text-sm font-bold text-[#c8421e]">
              F
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-800">{fm.author || 'Finnotia Editorial'}</div>
              <div className="text-[11px] text-gray-400">Market analysis powered by AI</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3 text-[12px] text-gray-400">
            {fm.date && <span>📅 {fmtDate(fm.date)}</span>}
            {fm.readTime && <span>⏱ {fm.readTime} min read</span>}
          </div>
        </div>
      </div>

      {/* Article Body — rendered markdown */}
      <div className="max-w-2xl mx-auto px-5 mb-8">
        <div
          className="prose prose-gray max-w-none
            prose-headings:font-serif prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-9 prose-h2:mb-4 prose-h2:pt-6 prose-h2:border-t prose-h2:border-gray-200
            prose-p:text-[15.5px] prose-p:leading-[1.8] prose-p:text-gray-600
            prose-li:text-[15px] prose-li:text-gray-600
            prose-strong:text-gray-800
            prose-a:text-[#c8421e] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-[#c8421e] prose-blockquote:bg-[#fef3f0] prose-blockquote:py-1 prose-blockquote:rounded-r-lg
            prose-hr:border-gray-200
            prose-code:text-[#c8421e] prose-code:bg-[#fef3f0] prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {/* Share Buttons */}
      <div className="max-w-2xl mx-auto px-5 py-5 flex items-center gap-3">
        <span className="text-xs text-gray-400 font-semibold">Share:</span>
        <button onClick={() => handleShare('whatsapp')}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm hover:border-[#c8421e] transition-colors" title="WhatsApp">
          📱
        </button>
        <button onClick={() => handleShare('twitter')}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm hover:border-[#c8421e] transition-colors" title="Twitter/X">
          🐦
        </button>
        <button onClick={handleCopy}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm hover:border-[#c8421e] transition-colors" title="Copy Link">
          {copied ? '✅' : '🔗'}
        </button>
      </div>

      {/* Tags */}
      {fm.tags?.length > 0 && (
        <div className="max-w-2xl mx-auto px-5 pb-6 flex gap-2 flex-wrap">
          {fm.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="max-w-2xl mx-auto px-5 pb-16">
        <p className="text-[11px] text-gray-400 leading-relaxed bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5">
          📋 <strong>Disclaimer:</strong> This article is for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or endorsement of any securities. Always consult a qualified financial advisor before making investment decisions.
        </p>
      </div>

      {/* TOC FAB */}
      {headings.length > 0 && (
        <>
          <button
            onClick={() => setShowToc(!showToc)}
            className="fixed bottom-20 right-4 w-11 h-11 rounded-full bg-[#0c1e35] text-white border-none text-lg cursor-pointer shadow-lg z-50 flex items-center justify-center"
          >
            ☰
          </button>
          {showToc && (
            <div className="fixed bottom-36 right-4 w-64 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-50 max-h-72 overflow-y-auto">
              <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                Table of Contents
              </div>
              {headings.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowToc(false);
                    // Find h2 by text content
                    const els = document.querySelectorAll('h2');
                    const target = Array.from(els).find((el) => el.textContent === h);
                    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="block w-full text-left text-[13px] text-gray-500 py-1.5 border-b border-gray-100 last:border-0 hover:text-[#c8421e] transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}