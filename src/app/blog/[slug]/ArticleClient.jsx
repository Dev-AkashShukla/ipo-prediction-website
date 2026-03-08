'use client';
// src/app/blog/[slug]/ArticleClient.jsx

import { useState, useEffect } from 'react';
import { Share2, Twitter, MessageCircle, Link2, Check, List, X, Clock, Calendar, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

const CAT_STYLES = {
  commodities:    { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  markets:        { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  economy:        { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  tech:           { bg: '#ede9fe', text: '#5b21b6', dot: '#8b5cf6' },
  crypto:         { bg: '#fce7f3', text: '#9d174d', dot: '#ec4899' },
  ipo:            { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  'mutual-funds': { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  geopolitics:    { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
  tax:            { bg: '#e0e7ff', text: '#3730a3', dot: '#6366f1' },
};

const SENT_CONFIG = {
  BULLISH: { bg: '#dcfce7', text: '#15803d', border: '#86efac', icon: TrendingUp,  label: 'Bullish' },
  BEARISH: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5', icon: TrendingDown, label: 'Bearish' },
  NEUTRAL: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: Minus,       label: 'Neutral' },
  MIXED:   { bg: '#fefce8', text: '#a16207', border: '#fde047', icon: Activity,    label: 'Mixed' },
};

export default function ArticleClient({ frontmatter: fm, htmlContent }) {
  const [progress, setProgress]   = useState(0);
  const [showToc, setShowToc]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const [headings, setHeadings]   = useState([]);
  const [activeH, setActiveH]     = useState(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(htmlContent, 'text/html');
    const h2s    = Array.from(doc.querySelectorAll('h2'));
    setHeadings(h2s.map((h) => ({ text: h.textContent, id: h.id || slugify(h.textContent) })));
  }, [htmlContent]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Active heading tracking
      const els = document.querySelectorAll('h2');
      let current = null;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < 120) current = el.textContent;
      });
      setActiveH(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const catStyle  = CAT_STYLES[fm.category?.toLowerCase()] || { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' };
  const sentConf  = SENT_CONFIG[fm.sentiment] || null;
  const SentIcon  = sentConf?.icon || null;

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

  const scrollToHeading = (text) => {
    setShowToc(false);
    const els    = document.querySelectorAll('h2');
    const target = Array.from(els).find((el) => el.textContent === text);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Progress Bar ── sits just below fixed header (top-16 = 64px) */}
      <div
        className="fixed left-0 h-[3px] z-40 transition-all duration-75"
        style={{ top: '64px', width: `${progress}%`, background: 'linear-gradient(90deg, #c8421e, #e85d3a)' }}
      />

      {/* ── Hero Image — pushed below 64px header ── */}
      <div className="relative w-full bg-gray-950 overflow-hidden mt-20" style={{ height: 'min(56vw, 480px)' }}>
        {fm.image_url ? (
          <>
            <img
              src={fm.image_url}
              alt={fm.title}
              className="w-full h-full object-cover opacity-90"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.85) 100%)'
            }} />
            {/* Category badge on image */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span
                className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
              >
                {fm.category}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0c1e35 0%, #1a3355 100%)' }}>
            <span className="text-white/10 text-8xl">📊</span>
          </div>
        )}

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="max-w-2xl mx-auto">
            {sentConf && (
              <div className="flex items-center gap-1.5 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: sentConf.bg, color: sentConf.text }}
                >
                  {SentIcon && <SentIcon size={11} strokeWidth={2.5} />}
                  {sentConf.label}
                </span>
                {fm.region && fm.region !== 'GLOBAL' && (
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-white/10 text-white/80">
                    {fm.region}
                  </span>
                )}
              </div>
            )}
            <h1
              className="text-white font-bold leading-tight"
              style={{
                fontSize: 'clamp(22px, 5.5vw, 38px)',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              {fm.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Article Container ── */}
      <div className="max-w-2xl mx-auto px-5 sm:px-6">

        {/* ── Excerpt ── */}
        {fm.excerpt && (
          <p
            className="mt-5 text-[17px] leading-relaxed text-gray-500 border-l-4 pl-4"
            style={{ borderColor: '#c8421e', fontFamily: "'Georgia', serif", fontStyle: 'italic' }}
          >
            {fm.excerpt}
          </p>
        )}

        {/* ── Key Stats Cards ── */}
        {fm.key_facts?.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {fm.key_facts.map((fact, i) => (
              <div
                key={i}
                className="rounded-xl px-3 py-3 text-center"
                style={{ backgroundColor: '#0c1e35' }}
              >
                <p className="text-white/75 text-[11px] sm:text-[12px] leading-snug font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {fact}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Meta Row ── */}
        <div
          className="mt-5 flex items-center gap-3 py-4 border-t border-b border-gray-100"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: '#fef3f0', color: '#c8421e' }}
          >
            F
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-gray-800">{fm.author || 'Finnotia Editorial'}</div>
            <div className="text-[11px] text-gray-400">AI-powered market analysis</div>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-gray-400 flex-shrink-0">
            {fm.date && (
              <span className="flex items-center gap-1">
                <Calendar size={12} strokeWidth={2} />
                {fmtDate(fm.date)}
              </span>
            )}
            {fm.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} strokeWidth={2} />
                {fm.readTime} min
              </span>
            )}
          </div>
        </div>

        {/* ── Bull / Bear Thesis Cards ── */}
        {(fm.bull_case_summary || fm.bear_case_summary) && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {fm.bull_case_summary && (
              <div className="rounded-xl p-4 border" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={15} color="#16a34a" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-green-700">Bull Case</span>
                </div>
                <p className="text-[13px] text-green-900 leading-relaxed">{fm.bull_case_summary}</p>
              </div>
            )}
            {fm.bear_case_summary && (
              <div className="rounded-xl p-4 border" style={{ backgroundColor: '#fff1f2', borderColor: '#fecdd3' }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={15} color="#dc2626" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-red-700">Bear Case</span>
                </div>
                <p className="text-[13px] text-red-900 leading-relaxed">{fm.bear_case_summary}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Thesis Statement ── */}
        {fm.thesis_statement && (
          <div
            className="mt-6 rounded-xl px-5 py-4"
            style={{ background: 'linear-gradient(135deg, #0c1e35, #1a3355)', fontFamily: 'system-ui, sans-serif' }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">Thesis</div>
            <p className="text-white/90 text-[14px] leading-relaxed italic">"{fm.thesis_statement}"</p>
          </div>
        )}

        {/* ── Article Body ── */}
        <div className="mt-8 pb-4">
          <style>{`
            .article-body { font-family: 'Georgia', 'Times New Roman', serif; }
            .article-body h2 {
              font-size: clamp(19px, 3.5vw, 24px);
              font-weight: 700;
              color: #111827;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              padding-top: 1.5rem;
              border-top: 1px solid #e5e7eb;
              line-height: 1.35;
              font-family: 'Georgia', serif;
            }
            .article-body h3 {
              font-size: 18px;
              font-weight: 600;
              color: #1f2937;
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
            }
            .article-body p {
              font-size: 16px;
              line-height: 1.85;
              color: #374151;
              margin-bottom: 1.4rem;
            }
            .article-body strong { color: #111827; font-weight: 700; }
            .article-body a { color: #c8421e; text-decoration: none; border-bottom: 1px solid #fca5a5; }
            .article-body a:hover { border-color: #c8421e; }
            .article-body ul, .article-body ol {
              margin-bottom: 1.4rem;
              padding-left: 1.5rem;
            }
            .article-body li {
              font-size: 15.5px;
              line-height: 1.7;
              color: #4b5563;
              margin-bottom: 0.4rem;
            }
            .article-body blockquote {
              margin: 2rem 0;
              padding: 1rem 1.25rem;
              border-left: 4px solid #c8421e;
              background: #fef3f0;
              border-radius: 0 12px 12px 0;
            }
            .article-body blockquote p {
              margin: 0;
              font-style: italic;
              color: #7c2d12;
              font-size: 15px;
            }
            .article-body hr {
              border: none;
              border-top: 1px solid #e5e7eb;
              margin: 2.5rem 0;
            }
            .article-body code {
              font-size: 13px;
              color: #c8421e;
              background: #fef3f0;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
            }
          `}</style>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: htmlContent
                .replace(/<hr\s*\/?>\s*<p>\s*<em>This article is for educational[\s\S]*?<\/em>\s*<\/p>/i, '')
                .replace(/<p>\s*<em>This article is for educational[\s\S]*?<\/em>\s*<\/p>/i, '')
            }}
          />
        </div>

        {/* ── Share Row ── */}
        <div
          className="py-5 border-t border-gray-100 flex items-center gap-3"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <span className="text-[12px] font-semibold text-gray-400 flex items-center gap-1.5">
            <Share2 size={14} strokeWidth={2} /> Share
          </span>
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-[12px] font-medium text-gray-600 hover:border-green-400 hover:text-green-600 transition-all"
          >
            <MessageCircle size={14} strokeWidth={2} /> WhatsApp
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-[12px] font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <Twitter size={14} strokeWidth={2} /> Twitter
          </button>
          <button
            onClick={handleCopy}
            className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-[12px] font-medium text-gray-600 hover:border-gray-400 transition-all"
          >
            {copied ? <Check size={14} strokeWidth={2} color="#16a34a" /> : <Link2 size={14} strokeWidth={2} />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>

        {/* ── Tags ── */}
        {fm.tags?.length > 0 && (
          <div
            className="pb-8 flex gap-2 flex-wrap"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {fm.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Disclaimer ── */}
        <div className="mb-16 rounded-xl bg-gray-50 border border-gray-200 px-4 py-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <p className="text-[11.5px] text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-700">Disclaimer:</span> This article is for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or endorsement of any securities. Always consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      {/* ── TOC FAB ── */}
      {headings.length > 0 && (
        <>
          <button
            onClick={() => setShowToc(!showToc)}
            className="fixed bottom-6 right-4 w-12 h-12 rounded-full text-white shadow-xl z-50 flex items-center justify-center transition-transform active:scale-95"
            style={{ background: '#0c1e35' }}
          >
            {showToc ? <X size={18} strokeWidth={2.5} /> : <List size={18} strokeWidth={2.5} />}
          </button>

          {showToc && (
            <div
              className="fixed bottom-22 right-4 w-[min(280px,calc(100vw-2rem))] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ bottom: '74px', fontFamily: 'system-ui, sans-serif' }}
            >
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <List size={14} color="#c8421e" strokeWidth={2.5} />
                <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                  Table of Contents
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto py-2">
                {headings.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToHeading(h.text)}
                    className="block w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: activeH === h.text ? '#c8421e' : '#6b7280', fontWeight: activeH === h.text ? 600 : 400 }}
                  >
                    {h.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}