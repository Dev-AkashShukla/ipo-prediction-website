'use client';
// src/app/blog/BlogClient.jsx
// Client component — handles filters, search, animations

import { useState, useEffect, useRef } from 'react';

const CAT_STYLES = {
  commodities:   { bg: '#fef3c7', text: '#92400e' },
  markets:       { bg: '#d1fae5', text: '#065f46' },
  economy:       { bg: '#dbeafe', text: '#1e40af' },
  tech:          { bg: '#ede9fe', text: '#5b21b6' },
  crypto:        { bg: '#fce7f3', text: '#9d174d' },
  ipo:           { bg: '#fef3c7', text: '#92400e' },
  'mutual-funds':{ bg: '#dbeafe', text: '#1e40af' },
  geopolitics:   { bg: '#fee2e2', text: '#991b1b' },
  tax:           { bg: '#e0e7ff', text: '#3730a3' },
};

const SENT_COLORS = {
  BULLISH: { bg: '#d1fae5', text: '#065f46' },
  BEARISH: { bg: '#fee2e2', text: '#991b1b' },
  NEUTRAL: { bg: '#f3f4f6', text: '#374151' },
  MIXED:   { bg: '#fef3c7', text: '#92400e' },
};

export default function BlogClient({ articles }) {
  const [filter, setFilter]     = useState('ALL');
  const [search, setSearch]     = useState('');
  const [visible, setVisible]   = useState(new Set());
  const observerRef             = useRef(null);

  // Derive unique categories from real articles
  const categories = ['ALL', ...new Set(articles.map((a) => a.category).filter(Boolean))];

  const filtered = articles.filter((a) => {
    const matchCat  = filter === 'ALL' || a.category === filter;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((p) => new Set([...p, e.target.dataset.slug]));
      }),
      { threshold: 0.08, rootMargin: '60px' }
    );
    document.querySelectorAll('[data-slug]').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [filter, search]);

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const catStyle = (cat) => CAT_STYLES[cat?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans pt-16">

      {/* ── HERO ── */}
      <div className="bg-[#0c1e35] px-5 pt-12 pb-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#f8f7f4] rounded-t-3xl" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 mb-4">
            <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">📚 Finnotia Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-2">
            Market Intelligence<br />
            with <em className="text-[#c8421e] not-italic font-serif italic">Clarity</em>
          </h1>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            AI-powered finance analysis for Indian investors — commodities, markets, IPOs, and macro trends.
          </p>
          <div className="mt-4 text-white/30 text-xs">
            {articles.length} article{articles.length !== 1 ? 's' : ''} published
          </div>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="max-w-5xl mx-auto px-5 -mt-4 relative z-10">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Search articles by topic or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-gray-200 focus:border-[#c8421e] rounded-xl text-sm text-gray-800 outline-none transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div className="max-w-5xl mx-auto px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((c) => {
            const count = c === 'ALL' ? articles.length : articles.filter((a) => a.category === c).length;
            const isActive = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all capitalize
                  ${isActive ? 'bg-[#0c1e35] text-white border-[#0c1e35]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
              >
                {c} <span className="opacity-50 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="max-w-5xl mx-auto px-5 mt-4">
        <p className="text-xs text-gray-400">
          Showing <span className="font-bold text-gray-700">{filtered.length}</span> of {articles.length} articles
        </p>
      </div>

      {/* ── ARTICLES GRID ── */}
      <div className="max-w-5xl mx-auto px-5 mt-4 pb-24">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">📝</span>
            <p className="text-gray-500 font-semibold">No articles published yet</p>
            <p className="text-gray-400 text-sm mt-1">Publish your first article from the CMS app</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-400 text-sm">No articles found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post, i) => {
              const cs = catStyle(post.category);
              const sc = SENT_COLORS[post.sentiment] || null;
              return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  data-slug={post.slug}
                  className={`bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col no-underline
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                    ${visible.has(post.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  {/* Image */}
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full aspect-video object-cover border-b border-gray-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-[#0c1e35] to-[#1a3355] flex items-center justify-center border-b border-gray-100">
                      <span className="text-white/20 text-4xl">📊</span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1">
                    {/* Category + Read time */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md capitalize"
                        style={{ backgroundColor: cs.bg, color: cs.text }}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {sc && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: sc.bg, color: sc.text }}>
                            {post.sentiment}
                          </span>
                        )}
                        <span className="text-[11px] text-gray-400">⏱ {post.readTime}m</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[17px] text-gray-900 leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-[11px] text-gray-400">{fmtDate(post.date)}</span>
                      <span className="text-[12px] font-semibold text-[#c8421e]">Read →</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}