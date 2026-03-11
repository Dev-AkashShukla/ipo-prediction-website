'use client';
// src/app/blog/BlogClient.jsx

import { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Clock, BarChart2, FileText, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/ui/Pagination';
import { usePagination } from '../../hooks/usePagination';
import ArticleCard from '../../components/ui/ArticleCard';

const ITEMS_PER_PAGE = 9;

export default function BlogClient({ articles }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [visible, setVisible] = useState(new Set());
  const observerRef = useRef(null);
  const gridRef = useRef(null);

  const categories = ['ALL', ...new Set(articles.map((a) => a.category).filter(Boolean))];

  const filtered = articles.filter((a) => {
    const matchCat    = filter === 'ALL' || a.category === filter;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const { currentItems: pagedItems, currentPage, totalPages, goTo } = usePagination(filtered, ITEMS_PER_PAGE);

  // Reset to page 1 when filter/search changes
  useEffect(() => { goTo(1); }, [filter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (page) => {
    goTo(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Intersection observer for fade-in cards
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

  // Category filter setup
  const PRIORITY = ['ALL', 'markets', 'ipo', 'economy', 'mutual-funds', 'investing'];
  const TOP_N = 5;
  const sorted = [...categories].sort((a, b) => {
    const ai = PRIORITY.indexOf(a.toLowerCase());
    const bi = PRIORITY.indexOf(b.toLowerCase());
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return articles.filter(x => x.category === b).length - articles.filter(x => x.category === a).length;
  });
  const topCats  = sorted.slice(0, TOP_N);
  const moreCats = sorted.slice(TOP_N);
  const activeInMore = moreCats.includes(filter);

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

          {/* More button */}
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

        {/* Bottom sheet overlay */}
        {showMore && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]" onClick={() => setShowMore(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl px-4 pt-4 pb-8 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-900">All Categories</span>
                <button onClick={() => setShowMore(false)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
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
              {pagedItems.map((post, i) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  variant="grid"
                  visible={visible.has(post.slug)}
                  index={i}
                />
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                size="sm"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}