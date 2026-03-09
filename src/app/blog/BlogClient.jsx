'use client';
// src/app/blog/BlogClient.jsx

import { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Clock, ArrowRight, BarChart2, FileText, ChevronLeft, ChevronRight, ChevronDown, X, SlidersHorizontal } from 'lucide-react';

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

const SENT_COLORS = {
  BULLISH: { bg: '#d1fae5', text: '#065f46' },
  BEARISH: { bg: '#fee2e2', text: '#991b1b' },
  NEUTRAL: { bg: '#f3f4f6', text: '#374151' },
  MIXED:   { bg: '#fef3c7', text: '#92400e' },
};

const ITEMS_PER_PAGE = 9;

// ── Inline Pagination ────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <p className="text-xs text-gray-400">Page {currentPage} of {totalPages}</p>
      <div className="flex items-center gap-1.5">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold
                     bg-white border border-[#E2E8F0] text-gray-700 shadow-sm
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {getPages().map((page, i) =>
          page === '...' ? (
            <span key={`dot-${i}`} className="px-1 text-gray-400 text-sm select-none">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className="w-8 h-8 rounded-lg font-bold text-sm transition-all duration-150"
              style={
                page === currentPage
                  ? { background: 'linear-gradient(135deg,#2563EB,#1E3A8A)', color: '#fff', boxShadow: '0 2px 8px rgba(37,99,235,0.35)', transform: 'scale(1.08)', border: 'none' }
                  : { background: '#fff', color: '#374151', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
              }
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          style={{
            background: currentPage < totalPages ? 'linear-gradient(135deg,#2563EB,#1E3A8A)' : 'transparent',
            border: currentPage < totalPages ? 'none' : '1px solid #E2E8F0',
            color: currentPage < totalPages ? '#fff' : '#94A3B8',
            boxShadow: currentPage < totalPages ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
          }}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}

export default function BlogClient({ articles }) {
  const [filter, setFilter]       = useState('ALL');
  const [search, setSearch]       = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore]   = useState(false);
  const [visible, setVisible]     = useState(new Set());
  const observerRef               = useRef(null);
  const gridRef                   = useRef(null);

  const categories = ['ALL', ...new Set(articles.map((a) => a.category).filter(Boolean))];

  const filtered = articles.filter((a) => {
    const matchCat    = filter === 'ALL' || a.category === filter;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  // ── Pagination logic ─────────────────────────────────────────
  const totalPages   = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pagedItems   = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ── Intersection observer for fade-in ───────────────────────
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
  }, [filter, search, currentPage]);

  const fmtDate  = (d) =>
    d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const catStyle = (cat) => CAT_STYLES[cat?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans">

      {/* ── HERO ── */}
      <div className="bg-[#0c1e35] px-3 pt-5 pb-14 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(35%, -35%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#f8f7f4] rounded-t-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-4">
            <BookOpen className="w-3 h-3 text-white/50" strokeWidth={2} />
            <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">Finnotia Research</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight mb-2">
            Financial Analysis,<br />
            <em className="text-[#c8421e] not-italic font-serif italic">Without the Noise.</em>
          </h1>

          <p className="text-white/35 text-xs sm:text-sm max-w-md leading-relaxed">
            Data-driven coverage across markets, macroeconomics, commodities, and corporate finance.
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-white/25 text-xs">
            <BarChart2 className="w-3 h-3" strokeWidth={2} />
            <span>{articles.length} article{articles.length !== 1 ? 's' : ''} published</span>
          </div>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-5 -mt-3.5 relative z-10">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search by topic, keyword, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 focus:border-[#c8421e] rounded-xl text-xs text-gray-800 outline-none transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ── FILTERS ── */}
      {(() => {
        // Priority order for top visible chips
        const PRIORITY = ['ALL', 'markets', 'ipo', 'economy', 'mutual-funds', 'investing'];
        const TOP_N    = 5;

        // Sort: priority first, then by article count
        const sorted = [...categories].sort((a, b) => {
          const ai = PRIORITY.indexOf(a.toLowerCase());
          const bi = PRIORITY.indexOf(b.toLowerCase());
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          const ac = articles.filter(x => x.category === a).length;
          const bc = articles.filter(x => x.category === b).length;
          return bc - ac;
        });

        const topCats  = sorted.slice(0, TOP_N);
        const moreCats = sorted.slice(TOP_N);
        const activeInMore = moreCats.includes(filter);

        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-5 mt-3">
            <div className="flex items-center gap-1.5">

              {/* Top chips */}
              <div className="flex gap-1.5 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {topCats.map((c) => {
                  const count    = c === 'ALL' ? articles.length : articles.filter(a => a.category === c).length;
                  const isActive = filter === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all capitalize
                        ${isActive
                          ? 'bg-[#0c1e35] text-white border-[#0c1e35]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                        }`}
                    >
                      {c === 'ALL' ? 'All' : c}
                      <span className="opacity-40 text-[9px]">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* More button — only if there are extra categories */}
              {moreCats.length > 0 && (
                <button
                  onClick={() => setShowMore(true)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all
                    ${activeInMore
                      ? 'bg-[#0c1e35] text-white border-[#0c1e35]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                    }`}
                >
                  <SlidersHorizontal className="w-3 h-3" strokeWidth={2} />
                  More
                  {activeInMore && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
                  <ChevronDown className="w-3 h-3 opacity-50" strokeWidth={2} />
                </button>
              )}
            </div>

            {/* ── Bottom sheet overlay ── */}
            {showMore && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
                  onClick={() => setShowMore(false)}
                />
                {/* Sheet */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl px-4 pt-4 pb-8 max-h-[70vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-900">All Categories</span>
                    <button
                      onClick={() => setShowMore(false)}
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {moreCats.map((c) => {
                      const count    = articles.filter(a => a.category === c).length;
                      const isActive = filter === c;
                      return (
                        <button
                          key={c}
                          onClick={() => { setFilter(c); setShowMore(false); }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-[12px] font-semibold capitalize transition-all
                            ${isActive
                              ? 'bg-[#0c1e35] text-white border-[#0c1e35]'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                            }`}
                        >
                          <span>{c}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })()}

      {/* ── RESULT COUNT ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-5 mt-2">
        <p className="text-[11px] text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-600">
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
          </span>{' '}
          of {filtered.length} articles
        </p>
      </div>

      {/* ── GRID ── */}
      <div ref={gridRef} id="blog-grid" className="max-w-4xl mx-auto px-4 sm:px-5 mt-3 pb-16 scroll-mt-4">

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 font-semibold text-sm">No articles published yet</p>
            <p className="text-gray-400 text-xs">Publish your first article from the CMS</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Search className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-400 text-sm">No results found. Try a different search or filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pagedItems.map((post, i) => {
                const cs = catStyle(post.category);
                const sc = SENT_COLORS[post.sentiment] || null;
                return (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    data-slug={post.slug}
                    className={`bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col no-underline
                      transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                      ${visible.has(post.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${(i % 3) * 60}ms` }}
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
                        <BarChart2 className="w-8 h-8 text-white/10" strokeWidth={1} />
                      </div>
                    )}

                    <div className="p-3 flex flex-col flex-1">
                      {/* Category + meta */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded capitalize"
                          style={{ backgroundColor: cs.bg, color: cs.text }}
                        >
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {sc && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: sc.bg, color: sc.text }}
                            >
                              {post.sentiment}
                            </span>
                          )}
                          <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                            <Clock className="w-2.5 h-2.5" strokeWidth={2} />
                            {post.readTime}m
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[14px] text-gray-900 leading-snug mb-1.5 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags?.length > 0 && (
                        <div className="flex gap-1 flex-wrap mt-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
                        <span className="text-[10px] text-gray-400">{fmtDate(post.date)}</span>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#c8421e]">
                          Read <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* ── Pagination ── */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        )}
      </div>
    </div>
  );
}