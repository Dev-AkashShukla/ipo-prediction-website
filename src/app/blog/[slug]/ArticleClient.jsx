'use client';
// src/app/blog/[slug]/ArticleClient.jsx
// FIX #6C APPLIED:
//   - relatedPosts prop added to function signature (default [])
//   - Related Articles section added after Author Box

import { useState, useEffect } from 'react';
import {
  Share2, Twitter, MessageCircle, Link2, Check,
  List, X, Clock, Calendar, TrendingUp, TrendingDown,
  Minus, Activity, BarChart2, User,
} from 'lucide-react';

const CAT_STYLES = {
  commodities:    { bg: '#fef3c7', text: '#92400e' },
  markets:        { bg: '#d1fae5', text: '#065f46' },
  economy:        { bg: '#dbeafe', text: '#1e40af' },
  tech:           { bg: '#ede9fe', text: '#5b21b6' },
  crypto:         { bg: '#fce7f3', text: '#9d174d' },
  ipo:            { bg: '#fef3c7', text: '#92400e' },
  'mutual-funds': { bg: '#dbeafe', text: '#1e40af' },
  geopolitics:    { bg: '#fee2e2', text: '#991b1b' },
  tax:            { bg: '#e0e7ff', text: '#3730a3' },
  investing:      { bg: '#d1fae5', text: '#065f46' },
  policy:         { bg: '#e0e7ff', text: '#3730a3' },
  corporate:      { bg: '#f3f4f6', text: '#374151' },
};

const SENT_CONFIG = {
  BULLISH: { bg: '#dcfce7', text: '#15803d', border: '#86efac', icon: TrendingUp,   label: 'Bullish' },
  BEARISH: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5', icon: TrendingDown, label: 'Bearish' },
  NEUTRAL: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: Minus,        label: 'Neutral' },
  MIXED:   { bg: '#fefce8', text: '#a16207', border: '#fde047', icon: Activity,     label: 'Mixed'   },
};

function authorToSlug(name) {
  return (name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// FIX #6C CHANGE 1: Added relatedPosts = [] to function signature
export default function ArticleClient({ frontmatter: fm, htmlContent, relatedPosts = [] }) {
  const [progress, setProgress] = useState(0);
  const [showToc, setShowToc]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [headings, setHeadings] = useState([]);
  const [activeH, setActiveH]   = useState(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(htmlContent, 'text/html');
    const h2s    = Array.from(doc.querySelectorAll('h2'));
    setHeadings(h2s.map((h) => ({ text: h.textContent, id: slugify(h.textContent) })));
  }, [htmlContent]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      const els = document.querySelectorAll('h2');
      let current = null;
      els.forEach((el) => { if (el.getBoundingClientRect().top < 120) current = el.textContent; });
      setActiveH(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slugify  = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const fmtDate  = (d) =>
    d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const catStyle = CAT_STYLES[fm.category?.toLowerCase()] || { bg: '#f1f5f9', text: '#475569' };
  const sentConf = SENT_CONFIG[fm.sentiment?.toUpperCase()] || null;
  const SentIcon = sentConf?.icon || null;

  const authorName = fm.author || 'Finnotia Research';
  const authorSlug = authorToSlug(authorName);
  const authorHref = `/author/${authorSlug}`;

  const handleCopy = () => {
    const copy = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = window.location.href;
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
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true); setTimeout(() => setCopied(false), 2000);
      }).catch(copy);
    } else copy();
  };

  const handleShare = (platform) => {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(fm.title || '');
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${title}%20${url}`);
    if (platform === 'twitter')  window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`);
  };

  const scrollToHeading = (text) => {
    setShowToc(false);
    const target = Array.from(document.querySelectorAll('h2')).find((el) => el.textContent === text);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const readTime = parseInt(String(fm.readTime || '').replace(/\D/g, ''), 10) || null;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Progress bar ── */}
      <div
        className="fixed left-0 h-[2px] z-40 transition-all duration-75"
        style={{ top: '48px', width: `${progress}%`, background: 'linear-gradient(90deg, #5d5fdd, #160938)' }}
      />

      {/* ── Hero image ── */}
      <div className="relative w-full bg-gray-950 overflow-hidden" style={{ height: 'min(52vw, 420px)' }}>
        {fm.image_url ? (
          <>
            <img
              src={fm.image_url}
              alt={fm.title}
              className="w-full h-full object-cover opacity-90"
              style={{ objectPosition: 'center 30%' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.85) 100%)' }}
            />
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
              >
                {fm.category}
              </span>
            </div>
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0c1e35 0%, #1a3355 100%)' }}
          >
            <BarChart2 className="w-14 h-14 text-white/10" strokeWidth={1} />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="max-w-2xl mx-auto">
            {sentConf && (
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: sentConf.bg, color: sentConf.text }}
                >
                  {SentIcon && <SentIcon size={10} strokeWidth={2.5} />}
                  {sentConf.label}
                </span>
              </div>
            )}
            <h1
              className="text-white font-bold leading-tight"
              style={{
                fontSize: 'clamp(18px, 4.5vw, 32px)',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              {fm.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-5">

        {/* Excerpt */}
        {fm.excerpt && (
          <p
            className="mt-5 text-[15px] leading-relaxed text-gray-500 border-l-4 pl-4"
            style={{ borderColor: '#c8421e', fontFamily: "'Georgia', serif", fontStyle: 'italic' }}
          >
            {fm.excerpt}
          </p>
        )}

        {/* Key facts */}
        {fm.key_facts?.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {fm.key_facts.map((fact, i) => (
              <div key={i} className="rounded-xl px-2.5 py-2.5 text-center" style={{ backgroundColor: '#0c1e35' }}>
                <p className="text-white/75 text-[10px] sm:text-[11px] leading-snug font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {fact}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Meta row ── */}
        <div
          className="mt-4 flex items-center gap-2.5 py-3 border-t border-b border-gray-100"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <a href={authorHref} className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: '#fef3f0' }}>
              <User size={14} color="#c8421e" strokeWidth={2} />
            </div>
          </a>
          <div className="flex-1 min-w-0">
            <a href={authorHref} className="text-[12px] font-semibold text-gray-800 hover:text-[#c8421e] transition-colors">
              {authorName}
            </a>
            <div className="text-[10px] text-gray-400">Finnotia Research</div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 flex-shrink-0">
            {fm.date && (
              <span className="flex items-center gap-0.5">
                <Calendar size={11} strokeWidth={2} />
                {fmtDate(fm.date)}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-0.5">
                <Clock size={11} strokeWidth={2} />
                {readTime} min
              </span>
            )}
          </div>
        </div>

        {/* Bull / Bear */}
        {(fm.bull_case_summary || fm.bear_case_summary) && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {fm.bull_case_summary && (
              <div className="rounded-xl p-3.5 border" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp size={13} color="#16a34a" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Bull Case</span>
                </div>
                <p className="text-[12px] text-green-900 leading-relaxed">{fm.bull_case_summary}</p>
              </div>
            )}
            {fm.bear_case_summary && (
              <div className="rounded-xl p-3.5 border" style={{ backgroundColor: '#fff1f2', borderColor: '#fecdd3' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingDown size={13} color="#dc2626" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-700">Bear Case</span>
                </div>
                <p className="text-[12px] text-red-900 leading-relaxed">{fm.bear_case_summary}</p>
              </div>
            )}
          </div>
        )}

        {/* Thesis */}
        {fm.thesis_statement && (
          <div
            className="mt-4 rounded-xl px-4 py-3.5"
            style={{ background: 'linear-gradient(135deg, #0c1e35, #1a3355)', fontFamily: 'system-ui, sans-serif' }}
          >
            <div className="text-[9px] font-bold tracking-widest uppercase text-white/40 mb-1.5">Thesis</div>
            <p className="text-white/90 text-[13px] leading-relaxed italic">"{fm.thesis_statement}"</p>
          </div>
        )}

        {/* ── Article HTML ── */}
        <div className="mt-6 pb-3">
          <div
            className="article-body"
            style={{ textAlign: 'justify' }}
            dangerouslySetInnerHTML={{
              __html: htmlContent
                .replace(/<hr\s*\/?>\s*<p>\s*<em>This article is for educational[\s\S]*?<\/em>\s*<\/p>/i, '')
                .replace(/<p>\s*<em>This article is for educational[\s\S]*?<\/em>\s*<\/p>/i, ''),
            }}
          />
        </div>

        {/* ── Share ── */}
        <div
          className="py-4 border-t border-gray-100 flex items-center gap-2 flex-wrap"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
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

        {/* ── Tags ── */}
        {fm.tags?.length > 0 && (
          <div className="pb-5 flex gap-1.5 flex-wrap" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {fm.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Author Box ── */}
        <div
          className="mb-6 rounded-xl border border-gray-100 p-4"
          style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#fafafa' }}
        >
          <div className="flex items-start gap-3">
            <a href={authorHref} className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fef3f0' }}>
                <User size={17} color="#c8421e" strokeWidth={1.5} />
              </div>
            </a>
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">Written by</div>
              <a href={authorHref} className="text-[13px] font-bold text-gray-900 hover:text-[#c8421e] transition-colors">
                {authorName}
              </a>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                Founder of Finnotia. Full-stack developer and market researcher covering IPOs, stocks, and global macroeconomics.
              </p>
              <a href={authorHref} className="inline-block mt-1.5 text-[11px] font-semibold text-[#c8421e] hover:underline">
                View all articles →
              </a>
            </div>
          </div>
        </div>

        {/* ── Related Articles ── FIX #6C CHANGE 2 ── */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <h3 className="text-[14px] font-bold text-gray-900 mb-3">More in {fm.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {relatedPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline"
                >
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-[#0c1e35] flex items-center justify-center">
                      <span className="text-white/10 text-2xl">📊</span>
                    </div>
                  )}
                  <div className="p-2.5">
                    <h4 className="text-[12px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#c8421e] transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-400">
                      <span>{post.readTime}m read</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── TOC floating button ── */}
      {headings.length > 0 && (
        <>
          <button
            onClick={() => setShowToc(!showToc)}
            className="fixed bottom-5 right-4 w-11 h-11 rounded-full text-white shadow-xl z-50 flex items-center justify-center transition-transform active:scale-95"
            style={{ background: '#0c1e35' }}
          >
            {showToc ? <X size={16} strokeWidth={2.5} /> : <List size={16} strokeWidth={2.5} />}
          </button>

          {showToc && (
            <div
              className="fixed right-4 w-[min(270px,calc(100vw-2rem))] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ bottom: '68px', fontFamily: 'system-ui, sans-serif' }}
            >
              <div className="px-3.5 py-2.5 border-b border-gray-100 flex items-center gap-2">
                <List size={13} color="#c8421e" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Table of Contents
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1.5">
                {headings.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToHeading(h.text)}
                    className="block w-full text-left px-3.5 py-2 text-[12px] transition-colors hover:bg-gray-50"
                    style={{
                      color:      activeH === h.text ? '#c8421e' : '#6b7280',
                      fontWeight: activeH === h.text ? 600 : 400,
                    }}
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