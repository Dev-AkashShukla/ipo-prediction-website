'use client';
// src/app/blog/[slug]/page.js — Individual Article View
// Proper Tailwind CSS implementation

import { useState, useEffect } from 'react';

const SAMPLE_ARTICLE = {
  slug: 'what-is-ipo-gmp-and-how-to-use-it',
  title: 'IPO GMP Explained: What Grey Market Premium Really Tells You',
  subtitle: "Grey Market Premium is the most misunderstood metric in IPO investing. Here's what it actually means — and what it doesn't.",
  author: {
    name: 'Finnotia Editorial',
    avatar: '📝',
    bio: 'Market analysis powered by AI, reviewed by humans.',
  },
  category: 'IPO',
  date: '2026-03-04',
  readTime: 8,
  image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  tags: ['IPO', 'GMP', 'Beginner', 'Grey Market'],
  sections: [
    {
      type: 'intro',
      content: "If you've ever applied for an IPO in India, you've probably heard someone say \"GMP ₹200 hai, apply kar de.\" Grey Market Premium is discussed obsessively on trading forums, Telegram groups, and finance Twitter — but most investors fundamentally misunderstand what it represents and how reliable it actually is.",
    },
    { type: 'heading', content: 'What Exactly is Grey Market Premium?' },
    {
      type: 'text',
      content: "The Grey Market is an unofficial, over-the-counter market where IPO shares are traded before they officially list on the stock exchange. It operates outside SEBI regulation — there's no formal exchange, no clearing house, and no investor protection.",
    },
    {
      type: 'text',
      content: 'Grey Market Premium (GMP) is the amount above the IPO issue price that buyers in this unofficial market are willing to pay. For example, if an IPO is priced at ₹500 and the GMP is ₹150, it suggests the grey market expects the stock to list around ₹650 — a 30% premium.',
    },
    {
      type: 'callout',
      icon: '💡',
      title: 'Key Formula',
      content: 'Expected Listing Price = Issue Price + GMP\n\nIf Issue Price = ₹500 and GMP = ₹150\nExpected Listing = ₹650 (30% gain)',
    },
    { type: 'heading', content: 'How Does the Grey Market Actually Work?' },
    {
      type: 'text',
      content: 'Grey market transactions happen through informal dealer networks — typically via phone calls, WhatsApp groups, or face-to-face meetings. There are two types of grey market transactions:',
    },
    {
      type: 'list',
      items: [
        { title: 'IPO Application Trading (Kostak Rate)', text: 'You sell your entire IPO application to a buyer at a fixed rate, regardless of whether you get allotment. If the Kostak rate is ₹1,500, you receive ₹1,500 for letting someone else benefit from your potential allotment.' },
        { title: 'Subject-to-Allotment Trading', text: 'You agree to sell your allotted shares at a pre-decided premium. This deal only executes if you actually receive allotment. Higher risk for the buyer, but typically at a lower premium than Kostak.' },
      ],
    },
    { type: 'heading', content: 'Should You Trust GMP? The Data Says...' },
    {
      type: 'text',
      content: 'We analyzed 50 IPOs from 2024-2025 to check how accurately GMP predicted actual listing price. The results are mixed:',
    },
    {
      type: 'stats',
      items: [
        { number: '68%', label: 'GMP correctly predicted direction (up/down)' },
        { number: '±15%', label: 'Average deviation from predicted listing price' },
        { number: '23%', label: 'IPOs where GMP was completely wrong' },
      ],
    },
    {
      type: 'text',
      content: "GMP is directionally useful about two-thirds of the time — but the magnitude is often off by 15% or more. This means you shouldn't use GMP as a precise predictor, but it can serve as one signal among many.",
    },
    {
      type: 'warning',
      content: "GMP is from an unregulated market. There's no accountability, no transparency, and dealers can manipulate GMP numbers to influence retail investor behavior. Always use GMP as just ONE input in your IPO analysis — never the only one.",
    },
    { type: 'heading', content: 'How to Use GMP Wisely: 5 Rules' },
    {
      type: 'numbered',
      items: [
        'Never apply to an IPO solely because GMP is high. Analyze fundamentals first.',
        'Check GMP trends over multiple days, not just the latest number. Stable GMP is more reliable than volatile GMP.',
        "Compare GMP with subscription data — if institutional investors (QIBs) aren't subscribing heavily, a high GMP may be retail hype.",
        'Remember that GMP drops dramatically for oversubscribed IPOs with low allotment probability.',
        'If GMP is negative, take it seriously — it usually indicates genuine market concerns about the company.',
      ],
    },
    { type: 'heading', content: 'The Bottom Line' },
    { 
      type: 'text',
      content: "Grey Market Premium is a useful barometer of market sentiment — not a crystal ball. Use it as one data point alongside fundamental analysis, subscription trends, industry positioning, and your own risk tolerance. The best investors treat GMP as a conversation starter, not a conclusion.",
    },
    {
      type: 'cta',
      text: 'Track live IPO GMP and get AI-powered IPO analysis',
      button: 'Open Finnotia App',
      url: 'https://play.google.com/store/apps/details?id=com.ipo.ipopredictor',
    },
  ],
  relatedPosts: [
    { slug: 'how-to-analyze-ipo-before-investing', title: 'How to Analyze an IPO: 10-Point Checklist', category: 'IPO', readTime: 14 },
    { slug: 'how-to-check-ipo-allotment-status', title: 'How to Check IPO Allotment Status (2026)', category: 'IPO', readTime: 6 },
    { slug: 'top-mistakes-new-investors-make-india', title: '7 Costly Mistakes New Investors Make', category: 'Investing', readTime: 9 },
  ],
};

const CAT_STYLES = {
  IPO:             { backgroundColor: '#fef3c7', color: '#92400e' },
  Education:       { backgroundColor: '#ede9fe', color: '#5b21b6' },
  Investing:       { backgroundColor: '#d1fae5', color: '#065f46' },
  'Mutual Funds':  { backgroundColor: '#dbeafe', color: '#1e40af' },
  'Getting Started': { backgroundColor: '#fce7f3', color: '#9d174d' },
  Trading:         { backgroundColor: '#fee2e2', color: '#991b1b' },
  Tax:             { backgroundColor: '#e0e7ff', color: '#3730a3' },
};

export default function ArticlePage() {
  const [progress, setProgress] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const article = SAMPLE_ARTICLE;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headings = article.sections
    .map((s, i) => ({ ...s, index: i }))
    .filter(s => s.type === 'heading');

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const renderSection = (section, i) => {
    switch (section.type) {
      case 'intro':
        return (
          <p key={i} className="text-[17px] leading-[1.75] font-medium text-gray-800 mb-7 border-l-4 border-[#c8421e] pl-5">
            {section.content}
          </p>
        );

      case 'heading':
        return (
          <h2
            key={i}
            id={`s-${i}`}
            className="font-serif text-2xl text-gray-900 mt-9 mb-4 pt-6 border-t border-gray-200 leading-snug"
          >
            {section.content}
          </h2>
        );

      case 'text':
        return (
          <p key={i} className="text-[15.5px] leading-[1.8] text-gray-600 mb-5">
            {section.content}
          </p>
        );

      case 'callout':
        return (
          <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-5 flex gap-4">
            <span className="text-2xl flex-shrink-0">{section.icon}</span>
            <div>
              <strong className="block text-sm font-bold mb-1.5 text-gray-800">{section.title}</strong>
              <pre className="font-mono text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap m-0 bg-transparent">
                {section.content}
              </pre>
            </div>
          </div>
        );

      case 'warning':
        return (
          <div key={i} className="bg-[#fef3f0] border border-[#fcd5c8] rounded-xl p-4 my-5 flex gap-3 items-start">
            <span className="text-lg flex-shrink-0">⚠️</span>
            <p className="text-sm text-[#8b3015] leading-relaxed m-0">{section.content}</p>
          </div>
        );

      case 'list':
        return (
          <div key={i} className="my-5 flex flex-col gap-3">
            {section.items.map((item, j) => (
              <div key={j} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                <strong className="block text-sm font-bold text-gray-800 mb-1">{item.title}</strong>
                <p className="text-[13.5px] text-gray-500 leading-relaxed m-0">{item.text}</p>
              </div>
            ))}
          </div>
        );

      case 'numbered':
        return (
          <ol key={i} className="my-5 flex flex-col gap-3 list-none p-0">
            {section.items.map((item, j) => (
              <li key={j} className="flex gap-3 items-start text-[14.5px] leading-relaxed text-gray-600">
                <span className="w-7 h-7 rounded-full bg-[#c8421e] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {j + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );

      case 'stats':
        return (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
            {section.items.map((item, j) => (
              <div key={j} className="bg-[#0c1e35] rounded-xl p-5 text-center">
                <span className="block font-serif text-3xl text-white mb-1">{item.number}</span>
                <span className="text-[11px] text-white/50 leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        );

      case 'cta':
        return (
          <div key={i} className="bg-[#fef3f0] border border-[#f5c8b8] rounded-2xl p-6 text-center my-8">
            <p className="text-sm text-gray-600 mb-4">{section.text}</p>
            <a
              href={section.url}
              className="inline-block px-6 py-2.5 bg-[#c8421e] hover:bg-[#b03818] text-white text-sm font-semibold rounded-xl transition-colors no-underline"
            >
              {section.button} →
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Reading Progress Bar */}
      <div
       class="fixed top-16 left-0 h-[3px] bg-[#2563eb] z-50 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* ══════════════ HERO IMAGE ══════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "380px" }}>
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* ══════════════ ARTICLE HEADER ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 mt-8 relative z-10">
        {/* Category badge */}
        <span
          className="inline-block text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md mb-4"
          style={CAT_STYLES[article.category] || {}}
        >
          {article.category}
        </span>

        <h1 className="font-serif text-[clamp(26px,5vw,38px)] text-gray-900 leading-snug mb-3">
          {article.title}
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-6">{article.subtitle}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap py-4 border-t border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#fef3f0] flex items-center justify-center text-base">
              {article.author.avatar}
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-800">{article.author.name}</div>
              <div className="text-[11px] text-gray-400">{article.author.bio}</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[12px] text-gray-400">
            <span>📅 {fmtDate(article.date)}</span>
            <span>⏱ {article.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* ══════════════ ARTICLE BODY ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 mt-8">
        {article.sections.map((section, i) => renderSection(section, i))}
      </div>

      {/* ══════════════ SHARE BUTTONS ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 py-5 flex items-center gap-3">
        <span className="text-xs text-gray-400 font-semibold">Share:</span>
        {[['📱', 'WhatsApp'], ['🐦', 'Twitter'], ['🔗', 'Copy Link']].map(([icon, label]) => (
          <button
            key={label}
            title={label}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm hover:border-[#c8421e] transition-colors"
          >
            {icon}
          </button>
        ))}
      </div>

      {/* ══════════════ TAGS ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 pb-6 flex gap-2 flex-wrap">
        {article.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] text-gray-500 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ══════════════ DISCLAIMER ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 pb-5">
        <p className="text-[11px] text-gray-400 leading-relaxed bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5">
          📋 <strong>Disclaimer:</strong> This article is for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or endorsement of any securities. Always consult a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.
        </p>
      </div>

      {/* ══════════════ RELATED ARTICLES ══════════════ */}
      <div className="max-w-2xl mx-auto px-5 pb-24">
        <h3 className="font-serif text-xl text-gray-900 mb-4">Continue Reading</h3>
        <div className="flex flex-col gap-2">
          {article.relatedPosts.map(rp => (
            <a
              key={rp.slug}
              href={`/blog/${rp.slug}`}
              className="flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-xl no-underline hover:border-[#c8421e] transition-colors group"
            >
              <div>
                <div className="text-sm font-semibold text-gray-800">{rp.title}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{rp.category} · {rp.readTime} min read</div>
              </div>
              <span className="text-[#c8421e] text-base flex-shrink-0 ml-3">→</span>
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════ TOC FAB ══════════════ */}
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
            <a
              key={i}
              href={`#s-${h.index}`}
              onClick={() => setShowToc(false)}
              className="block text-[13px] text-gray-500 no-underline py-1.5 border-b border-gray-100 last:border-0 hover:text-[#c8421e] transition-colors"
            >
              {h.content}
            </a>
          ))}
        </div>
      )}

    </div>
  );
}