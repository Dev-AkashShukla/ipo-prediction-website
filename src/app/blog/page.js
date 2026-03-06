'use client';
// src/app/blog/page.js — Finnotia Blog
// Proper Tailwind CSS implementation

import { useState, useEffect, useRef } from 'react';

const BLOG_POSTS = [
  {
    slug: 'what-is-ipo-gmp-and-how-to-use-it',
    title: 'IPO GMP Explained: What Grey Market Premium Really Tells You',
    excerpt: 'Grey Market Premium is the most misunderstood metric in IPO investing. Learn what GMP actually means, why it fluctuates, and whether you should trust it before applying.',
    category: 'IPO',
    readTime: 8,
    date: '2026-03-04',
    featured: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['IPO', 'GMP', 'Beginner'],
  },
  {
    slug: 'how-to-read-balance-sheet-beginners',
    title: 'How to Read a Balance Sheet — A Visual Guide for Beginners',
    excerpt: 'Assets, liabilities, equity — sounds intimidating? This visual guide breaks down balance sheets using real Indian company examples you can understand in 10 minutes.',
    category: 'Education',
    readTime: 12,
    date: '2026-03-02',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    tags: ['Fundamentals', 'Beginner', 'Analysis'],
  },
  {
    slug: 'mutual-fund-vs-direct-stock-which-better',
    title: 'Mutual Funds vs Direct Stocks: Which One is Right For You?',
    excerpt: 'Should you pick stocks yourself or let fund managers do it? We compare returns, risk, time commitment, and tax implications with real data from 2020-2026.',
    category: 'Investing',
    readTime: 10,
    date: '2026-02-28',
    featured: true,
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80',
    tags: ['Mutual Funds', 'Stocks', 'Comparison'],
  },
  {
    slug: 'top-mistakes-new-investors-make-india',
    title: '7 Costly Mistakes Every New Indian Investor Makes (And How to Avoid Them)',
    excerpt: 'From chasing penny stocks to ignoring tax implications — these 7 mistakes cost beginners lakhs every year. Real stories, real losses, real lessons.',
    category: 'Investing',
    readTime: 9,
    date: '2026-02-25',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80',
    tags: ['Mistakes', 'Beginner', 'Psychology'],
  },
  {
    slug: 'how-to-check-ipo-allotment-status',
    title: 'How to Check IPO Allotment Status: Complete Step-by-Step Guide (2026)',
    excerpt: "Applied for an IPO and waiting anxiously? Here's exactly how to check your allotment status on BSE, NSE, and registrar websites — with screenshots.",
    category: 'IPO',
    readTime: 6,
    date: '2026-02-22',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['IPO', 'How-to', 'Guide'],
  },
  {
    slug: 'what-is-pe-ratio-how-to-use',
    title: "P/E Ratio Decoded: Why This One Number Can Save You From Bad Investments",
    excerpt: "The Price-to-Earnings ratio is the first thing smart investors check. Learn how to calculate it, what's a 'good' P/E, and when a low P/E is actually a trap.",
    category: 'Education',
    readTime: 8,
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    tags: ['Valuation', 'Fundamentals', 'Ratios'],
  },
  {
    slug: 'sip-vs-lumpsum-which-strategy-wins',
    title: "SIP vs Lumpsum: 10-Year Data Shows Which Strategy Actually Wins",
    excerpt: "Everyone says SIP is better. But is it? We analyzed 10 years of Nifty 50 data to show when SIP beats lumpsum — and when it doesn't.",
    category: 'Mutual Funds',
    readTime: 11,
    date: '2026-02-18',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['SIP', 'Mutual Funds', 'Data Analysis'],
  },
  {
    slug: 'nifty-50-vs-sensex-difference-explained',
    title: "Nifty 50 vs Sensex: What's the Difference and Which Should You Track?",
    excerpt: "Both represent 'the market' — but they're not the same. Understanding the difference helps you pick better index funds and ETFs.",
    category: 'Education',
    readTime: 7,
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80',
    tags: ['Index', 'Nifty', 'Sensex', 'Beginner'],
  },
  {
    slug: 'how-to-analyze-ipo-before-investing',
    title: 'How to Analyze an IPO Before Investing: The 10-Point Checklist',
    excerpt: "Don't just look at GMP. Use this 10-point framework to evaluate any IPO — from financials to promoter background to industry positioning.",
    category: 'IPO',
    readTime: 14,
    date: '2026-02-12',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    tags: ['IPO', 'Analysis', 'Checklist'],
  },
  {
    slug: 'what-is-demat-account-how-to-open',
    title: 'What is a Demat Account? How to Open One in 15 Minutes (2026 Guide)',
    excerpt: 'Your first step into stock market investing. Compare Zerodha, Groww, Angel One — fees, features, and which one is best for beginners.',
    category: 'Getting Started',
    readTime: 8,
    date: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80',
    tags: ['Demat', 'Beginner', 'Broker'],
  },
  {
    slug: 'stock-market-technical-analysis-beginners',
    title: 'Technical Analysis for Beginners: Read Charts Like a Pro in 30 Minutes',
    excerpt: 'Support, resistance, moving averages, RSI — learn the 5 most useful technical indicators with real Nifty chart examples. No jargon, just clarity.',
    category: 'Education',
    readTime: 15,
    date: '2026-02-08',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&q=80',
    tags: ['Technical Analysis', 'Charts', 'Indicators'],
  },
  {
    slug: 'best-index-funds-india-2026',
    title: 'Best Index Funds in India 2026: Comparison of Returns, Expense Ratio & Tracking Error',
    excerpt: 'Nifty 50, Nifty Next 50, S&P 500 — which index fund should you pick? Data-driven comparison of top AMCs with 5-year return charts.',
    category: 'Mutual Funds',
    readTime: 13,
    date: '2026-02-05',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
    tags: ['Index Funds', 'Mutual Funds', 'Comparison'],
  },
  {
    slug: 'income-tax-on-stock-market-profits-india',
    title: 'Stock Market Taxes in India: STCG, LTCG, and How to Save Tax on Your Profits',
    excerpt: "Made profits in the stock market? Here's exactly how much tax you owe — and legal ways to reduce it. Updated for FY 2026-27 rules.",
    category: 'Tax',
    readTime: 10,
    date: '2026-02-02',
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80',
    tags: ['Tax', 'STCG', 'LTCG', 'Saving'],
  },
  {
    slug: 'how-stock-market-works-india-simple',
    title: "How the Stock Market Actually Works — Explained Like You're 15",
    excerpt: 'NSE, BSE, SEBI, brokers, market makers — the entire stock market ecosystem explained in simple language with real-world analogies anyone can understand.',
    category: 'Getting Started',
    readTime: 9,
    date: '2026-01-30',
    image: 'https://images.unsplash.com/photo-1468254095679-bbcba94a7066?w=800&q=80',
    tags: ['Beginner', 'How It Works', 'Basics'],
  },
  {
    slug: 'difference-between-large-mid-small-cap',
    title: 'Large Cap vs Mid Cap vs Small Cap: Which Stocks Should You Buy?',
    excerpt: 'Market cap categories explained with risk-return data. Why mid-caps outperform in bull markets but destroy wealth in corrections.',
    category: 'Education',
    readTime: 8,
    date: '2026-01-28',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&q=80',
    tags: ['Market Cap', 'Stocks', 'Risk'],
  },
  {
    slug: 'what-is-intraday-trading-should-you-do-it',
    title: 'Intraday Trading in India: Why 90% of Traders Lose Money (SEBI Data)',
    excerpt: "SEBI's own study shows 9 out of 10 intraday traders lose money. We break down the data, the psychology, and whether you should even try it.",
    category: 'Trading',
    readTime: 11,
    date: '2026-01-25',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['Intraday', 'Trading', 'SEBI', 'Risk'],
  },
  {
    slug: 'gold-vs-stocks-vs-real-estate-india',
    title: 'Gold vs Stocks vs Real Estate: 20-Year Return Comparison for Indian Investors',
    excerpt: 'Where should you put your money? We compared 20 years of returns across gold, Nifty 50, and residential real estate in major Indian cities.',
    category: 'Investing',
    readTime: 12,
    date: '2026-01-22',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
    tags: ['Gold', 'Real Estate', 'Comparison'],
  },
  {
    slug: 'what-is-dividend-investing-india',
    title: 'Dividend Investing in India: Build a ₹10,000/Month Passive Income Portfolio',
    excerpt: 'Can dividends replace your salary? We model a realistic portfolio of Indian dividend stocks and show exactly how much capital you need.',
    category: 'Investing',
    readTime: 13,
    date: '2026-01-20',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
    tags: ['Dividends', 'Passive Income', 'Portfolio'],
  },
  {
    slug: 'how-to-pick-stocks-fundamental-analysis',
    title: 'How to Pick Winning Stocks: A Fundamental Analysis Framework',
    excerpt: 'Revenue growth, debt ratio, ROE, promoter holding — the 8 metrics that matter most when evaluating Indian stocks. With a free screening template.',
    category: 'Education',
    readTime: 16,
    date: '2026-01-18',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80',
    tags: ['Stock Picking', 'Fundamentals', 'Framework'],
  },
  {
    slug: 'emergency-fund-before-investing-why',
    title: 'Why You Need an Emergency Fund Before You Invest a Single Rupee',
    excerpt: 'The most boring financial advice is also the most important. How much to save, where to park it, and why skipping this step ruins investors.',
    category: 'Getting Started',
    readTime: 7,
    date: '2026-01-15',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    tags: ['Emergency Fund', 'Saving', 'Beginner'],
  },
];

const CATEGORIES = [
  { key: 'ALL', label: 'All Posts', color: 'bg-sky-500' },
  { key: 'IPO', label: 'IPO', color: 'bg-amber-500' },
  { key: 'Education', label: 'Education', color: 'bg-violet-500' },
  { key: 'Investing', label: 'Investing', color: 'bg-emerald-500' },
  { key: 'Mutual Funds', label: 'Mutual Funds', color: 'bg-blue-500' },
  { key: 'Getting Started', label: 'Getting Started', color: 'bg-pink-500' },
  { key: 'Trading', label: 'Trading', color: 'bg-red-500' },
  { key: 'Tax', label: 'Tax', color: 'bg-indigo-500' },
];

// Tailwind-safe category badge styles (inline for dynamic colors)
const CAT_STYLES = {
  IPO:             { bg: '#fef3c7', text: '#92400e' },
  Education:       { bg: '#ede9fe', text: '#5b21b6' },
  Investing:       { bg: '#d1fae5', text: '#065f46' },
  'Mutual Funds':  { bg: '#dbeafe', text: '#1e40af' },
  'Getting Started': { bg: '#fce7f3', text: '#9d174d' },
  Trading:         { bg: '#fee2e2', text: '#991b1b' },
  Tax:             { bg: '#e0e7ff', text: '#3730a3' },
};

const CAT_DOT = {
  IPO: '#f59e0b', Education: '#8b5cf6', Investing: '#10b981',
  'Mutual Funds': '#3b82f6', 'Getting Started': '#ec4899',
  Trading: '#ef4444', Tax: '#6366f1',
};

export default function BlogPage() {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const observerRef = useRef(null);

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = filter === 'ALL' || p.category === filter;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = BLOG_POSTS.filter((p) => p.featured);

  // Re-observe whenever filtered list changes
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.slug]));
          }
        });
      },
      { threshold: 0.08, rootMargin: '60px' }
    );
    document.querySelectorAll('[data-slug]').forEach((el) => {
      observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [filter, searchQuery]);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans pt-16">

      {/* ══════════════ HERO ══════════════ */}
      <div className="bg-[#0c1e35] px-5 pt-12 pb-14 relative overflow-hidden">
        {/* Glow blob */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#f8f7f4] rounded-t-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 mb-4">
            <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">📚 Finnotia Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-2">
            Learn to Invest<br />
            with <em className="text-[#c8421e] not-italic font-serif italic">Clarity</em>
          </h1>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            Guides, analysis, and insights for Indian investors — from IPO basics to advanced portfolio strategies.
          </p>
        </div>
      </div>

      {/* ══════════════ SEARCH ══════════════ */}
      <div className="max-w-5xl mx-auto px-5 -mt-4 relative z-10">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Search articles by topic, tag, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-gray-200 focus:border-[#c8421e] rounded-xl text-sm text-gray-800 outline-none transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ══════════════ CATEGORY FILTERS ══════════════ */}
      <div className="max-w-5xl mx-auto px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((c) => {
            const count = c.key === 'ALL'
              ? BLOG_POSTS.length
              : BLOG_POSTS.filter((p) => p.category === c.key).length;
            if (count === 0 && c.key !== 'ALL') return null;
            const isActive = filter === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all
                  ${isActive
                    ? 'bg-[#0c1e35] text-white border-[#0c1e35]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
              >
                {c.key !== 'ALL' && (
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: CAT_DOT[c.key] }}
                  />
                )}
                {c.label}
                <span className="opacity-50 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════ FEATURED ARTICLES ══════════════ */}
      {filter === 'ALL' && !searchQuery && (
        <div className="max-w-5xl mx-auto px-5 mt-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Featured Articles</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {/* Grid: col 1 = big left card, col 2-3 = 2 stacked right cards */}
          <div className="hidden md:grid gap-3" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '420px' }}>
            {/* BIG LEFT CARD — spans both rows */}
            {featured.slice(0, 1).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="relative rounded-2xl overflow-hidden cursor-pointer block group"
                style={{ gridRow: '1 / 3' }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 flex flex-col justify-end p-5">
                  <span className="text-[9px] font-bold tracking-wide uppercase px-2.5 py-1 rounded w-fit mb-2" style={CAT_STYLES[post.category] || {}}>
                    {post.category}
                  </span>
                  <h3 className="font-serif text-white leading-snug mb-2 text-[22px]">{post.title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-[11px]">
                    <span>{fmtDate(post.date)}</span><span>·</span><span>{post.readTime} min read</span>
                  </div>
                </div>
              </a>
            ))}
            {/* TWO RIGHT CARDS — each takes one row */}
            {featured.slice(1).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="relative rounded-2xl overflow-hidden cursor-pointer block group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 flex flex-col justify-end p-5">
                  <span className="text-[9px] font-bold tracking-wide uppercase px-2.5 py-1 rounded w-fit mb-2" style={CAT_STYLES[post.category] || {}}>
                    {post.category}
                  </span>
                  <h3 className="font-serif text-white leading-snug mb-2 text-[17px]">{post.title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-[11px]">
                    <span>{fmtDate(post.date)}</span><span>·</span><span>{post.readTime} min read</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile fallback */}
          <div className="flex flex-col gap-3 md:hidden">
            {featured.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="relative rounded-2xl overflow-hidden block group" style={{ aspectRatio: '16/9' }}>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-bold tracking-wide uppercase px-2.5 py-1 rounded w-fit mb-2" style={CAT_STYLES[post.category] || {}}>{post.category}</span>
                  <h3 className="font-serif text-white text-[18px] leading-snug mb-1">{post.title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-[11px]"><span>{fmtDate(post.date)}</span><span>·</span><span>{post.readTime} min read</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════ STATS BAR ══════════════ */}
      <div className="max-w-5xl mx-auto px-5 mt-6">
        <p className="text-xs text-gray-400">
          Showing <span className="font-bold text-gray-700">{filtered.length}</span> of {BLOG_POSTS.length} articles
        </p>
      </div>

      {/* ══════════════ ALL ARTICLES GRID ══════════════ */}
      <div className="max-w-5xl mx-auto px-5 mt-4 pb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
            {filter === 'ALL' ? 'All Articles' : filter}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {filtered.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-400 text-sm">No articles found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post, i) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-slug={post.slug}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col no-underline
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                  ${visibleCards.has(post.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                `}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-video object-cover border-b border-gray-100"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-1">
                  {/* Category + Read time */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md"
                      style={CAT_STYLES[post.category] || {}}
                    >
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      ⏱ {post.readTime} min
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[17px] text-gray-900 leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">{fmtDate(post.date)}</span>
                    <span className="text-[12px] font-semibold text-[#c8421e] flex items-center gap-1">
                      Read →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════ NEWSLETTER ══════════════ */}
      <div className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-[#0c1e35] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-25"
            style={{ background: 'radial-gradient(circle, #c8421e, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="relative z-10">
            <h3 className="font-serif text-2xl text-white mb-1">Never Miss an Insight</h3>
            <p className="text-white/40 text-sm mb-5">
              Get weekly market analysis and investing tips delivered to your inbox.
            </p>
            {subscribed ? (
              <p className="text-emerald-400 font-semibold text-sm">✅ You're subscribed! Welcome aboard.</p>
            ) : (
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white text-sm outline-none focus:border-[#c8421e] placeholder:text-white/30 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                />
                <button
                  onClick={handleSubscribe}
                  className="px-5 py-2.5 bg-[#c8421e] hover:bg-[#b03818] text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}