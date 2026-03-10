'use client';
// src/components/home/StoriesSection.jsx
// Fetches from /api/stories — shows 6 stories on home page

import { useState, useEffect } from 'react';
import Link from 'next/link';

const IMPORTANCE_DOT = {
  CRITICAL: '#dc2626', HIGH: '#2563EB', MEDIUM: '#22c55e', LOW: '#9ca3af',
};

const IMPORTANCE_CONFIG = {
  CRITICAL: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  HIGH:     { color: '#2563EB', bg: '#eff6ff', border: '#bfdbfe' },
  MEDIUM:   { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  LOW:      { color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
};

const SENTIMENT_ICON = { POSITIVE: '📈', NEGATIVE: '📉', NEUTRAL: '➡️', MIXED: '↔️' };

// ── Skeleton ──────────────────────────────────────────────────────
function Skeleton() {
  return (
    <>
      {/* Mobile */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 sm:hidden">
        {[1,2,3].map(i => (
          <div key={i} style={{ minWidth: '220px' }}
            className="flex-shrink-0 bg-gray-50 rounded-xl p-3.5 animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded w-1/3 mb-2.5" />
            <div className="h-3.5 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
      {/* Desktop */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-gray-50 rounded-xl p-3.5 h-40 animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded w-1/3 mb-2.5" />
            <div className="h-3.5 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stories')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : (data.stories || data.data || []);
        setStories(list.slice(0, 6));
      })
      .catch(err => console.error('[StoriesSection]', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-7 sm:py-10 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header — always visible */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-[#2563EB] rounded-full text-[10px] font-semibold mb-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              Market Updates
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
              Market{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>
          <Link href="/stories"
            className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors flex items-center gap-0.5">
            View All <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Cards — skeleton while loading, cards after */}
        {loading ? <Skeleton /> : stories.length > 0 && (
          <>
            {/* Mobile scroll */}
            <div className="flex gap-2.5 overflow-x-auto pb-2.5 sm:hidden" style={{ scrollbarWidth: 'none' }}>
              {stories.map((story, i) => (
                <MobileStoryCard key={story.slug || i} story={story} />
              ))}
              <Link href="/stories" style={{ minWidth: '130px' }}
                className="flex-shrink-0 flex flex-col items-center justify-center
                           bg-gradient-to-br from-[#2563EB] to-[#1E3A8A]
                           rounded-xl p-3.5 text-white text-center">
                <span className="text-xl mb-1.5">📊</span>
                <span className="text-[11px] font-bold">View All</span>
                <span className="text-[10px] opacity-75 mt-0.5">{stories.length}+ today</span>
              </Link>
            </div>

            {/* Desktop grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stories.map((story, i) => (
                <DesktopStoryCard key={story.slug || i} story={story} />
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        {!loading && stories.length > 0 && (
          <div className="text-center mt-4 sm:mt-5">
            <Link href="/stories"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]
                         text-white px-5 py-2 rounded-xl font-semibold text-[13px]
                         hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
              📰 View All Market Stories
            </Link>
            <p className="text-[10px] text-gray-400 mt-1.5">
              Updated regularly · Market insights for informational purposes
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

function MobileStoryCard({ story }) {
  const dot  = IMPORTANCE_DOT[story.importance] || '#2563EB';
  const icon = SENTIMENT_ICON[story.sentiment]  || '➡️';
  return (
    <a href={`/stories/${story.slug}`} style={{ minWidth: '220px', maxWidth: '220px' }}
      className="flex-shrink-0 block bg-white border border-gray-100 rounded-xl p-3.5
                 hover:border-blue-200 hover:shadow-md transition-all active:scale-95">
      <div className="flex items-center gap-1.5 mb-2.5">
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
        <span className="text-[10px] font-semibold text-gray-500 truncate">{story.importance}</span>
        <span className="ml-auto text-xs">{icon}</span>
      </div>
      <h3 className="text-[12px] font-bold text-gray-900 leading-snug mb-2 line-clamp-3"
        style={{ fontFamily: 'Georgia, serif' }}>{story.headline}</h3>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-[10px] text-gray-400">{story.source?.name || 'Finnotia'}</span>
        <span className="text-[10px] font-semibold text-[#2563EB]">Read →</span>
      </div>
    </a>
  );
}

function DesktopStoryCard({ story }) {
  const imp  = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const icon = SENTIMENT_ICON[story.sentiment]     || '➡️';
  return (
    <a href={`/stories/${story.slug}`}
      className="group block bg-white border border-gray-100 rounded-xl p-3.5
                 hover:border-blue-200 hover:shadow-lg transition-all duration-200"
      style={{ borderLeft: `3px solid ${imp.color}` }}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <span style={{ padding: '1.5px 7px', background: imp.bg, border: `1px solid ${imp.border}`,
          color: imp.color, fontSize: '9px', fontWeight: 700, borderRadius: '20px' }}>
          {story.importance}
        </span>
        <span className="text-xs">{icon}</span>
        <span className="ml-auto text-[10px] text-gray-400">{story.published_time}</span>
      </div>
      <h3 className="text-[12px] font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-[#2563EB] transition-colors"
        style={{ fontFamily: 'Georgia, serif' }}>{story.headline}</h3>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-2.5 line-clamp-2">{story.quick_summary}</p>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-[10px] text-gray-400">{story.source?.name || 'Finnotia'}</span>
        <span className="text-[10px] font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform inline-block">
          Read Story →
        </span>
      </div>
    </a>
  );
}