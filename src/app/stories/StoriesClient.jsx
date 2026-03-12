'use client';
// src/app/stories/StoriesClient.jsx

import { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/ui/Pagination';
import PageHero from '../../components/shared/PageHero';
import { FilterChip } from '../../components/ui/FilterChip';
import { ResultCount } from '../../components/ui/ResultCount';

const ITEMS_PER_PAGE = 10;

// ── Stories-specific configs (NOT in sentimentConfig — these use different keys) ──
const IMPORTANCE_CONFIG = {
  CRITICAL: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   label: 'Critical' },
  HIGH:     { color: '#2563EB', bg: 'rgba(37,99,235,0.12)',   label: 'High'     },
  MEDIUM:   { color: '#22C55E', bg: 'rgba(34,197,94,0.12)',   label: 'Medium'   },
  LOW:      { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)',  label: 'Low'      },
};

const SENTIMENT_CONFIG = {
  POSITIVE: { icon: TrendingUp,   color: '#22C55E', label: 'Bullish' },
  NEGATIVE: { icon: TrendingDown, color: '#EF4444', label: 'Bearish' },
  NEUTRAL:  { icon: Minus,        color: '#94A3B8', label: 'Neutral' },
  MIXED:    { icon: Activity,     color: '#F59E0B', label: 'Mixed'   },
};

// ── Story Card ────────────────────────────────────────────────────
function StoryCard({ story }) {
  const imp       = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const sent      = SENTIMENT_CONFIG[story.sentiment]   || SENTIMENT_CONFIG.NEUTRAL;
  const SentIcon  = sent.icon;
  const slideCount = [
    true,
    story.quick_summary || story.detailed_summary,
    story.key_points?.length > 0,
    story.what_it_means,
    story.context,
    true,
    true,
  ].filter(Boolean).length;

  return (
    <a href={`/stories/${story.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline flex flex-col"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Image */}
      {story.image_url_og && (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img src={story.image_url_og} alt={story.headline}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ background: imp.color }}>{imp.label}</span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
              style={{ background: sent.color + '25', color: sent.color }}>
              <SentIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
              {sent.label}
            </span>
          </div>
        </div>
      )}

      <div className="p-3.5 flex flex-col flex-1">
        {/* Badges (when no image) */}
        {!story.image_url_og && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ background: imp.color }}>{imp.label}</span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
              style={{ background: sent.color + '20', color: sent.color }}>
              <SentIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
              {sent.label}
            </span>
          </div>
        )}

        <h3 className="text-gray-900 text-sm sm:text-[15px] font-bold leading-snug mb-2.5 line-clamp-3 group-hover:text-[#2563EB] transition-colors duration-200"
          style={{ fontFamily: 'Georgia, serif' }}>{story.headline}</h3>

        {story.quick_summary && (
          <p className="hidden sm:block text-[12px] leading-relaxed line-clamp-2 mb-2.5 text-gray-500">
            {story.quick_summary}
          </p>
        )}

        {story.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {story.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 mt-auto pt-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-[3px]">
                {[...Array(slideCount)].map((_, i) => (
                  <div key={i} className="rounded-full"
                    style={{ width: i === 0 ? '12px' : '4px', height: '4px',
                      background: i === 0 ? imp.color : '#E2E8F0' }} />
                ))}
              </div>
              <span className="text-[10px] truncate text-gray-400">{story.source?.name || 'Finnotia'}</span>
            </div>
            <span className="text-[11px] font-bold flex-shrink-0 flex items-center gap-0.5 group-hover:gap-1.5 transition-all duration-200"
              style={{ color: imp.color }}>
              Read <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function StoriesClient({ stories = [], date = '' }) {
  const [filter, setFilter] = useState('ALL');

  const FILTERS  = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'];
  const filtered = filter === 'ALL' ? stories : stories.filter(s => s.importance === filter);

  const pagination = usePagination(filtered, ITEMS_PER_PAGE);

  useEffect(() => { pagination.goTo(1); }, [filter]); // eslint-disable-line

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    : 'Today';

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── HERO — reusable PageHero, Stories uses children for live-dot badge ── */}
      <PageHero
        title="Today's Market News"
        titleStyle="plain"
        accentColor="#2563EB"
        bgBottom="#F8FAFC"
        subtitle={`${fmtDate(date)} · Tap any story to read`}
      >
        {/* Grid texture overlay — Stories-specific */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />

        {/* Live dot badge — Stories-specific, rendered BEFORE title via children order */}
        <div className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full mb-4 mt-2"
          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inset-0 rounded-full opacity-60" style={{ background: '#2563EB' }} />
            <span className="relative rounded-full h-2 w-2" style={{ background: '#2563EB' }} />
          </span>
          <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#93C5FD' }}>
            TRENDING · Market Stories
          </span>
        </div>
      </PageHero>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ background: '#F8FAFC' }}>

        {/* ── FILTERS — reusable FilterChip with importance colors ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 mb-4">
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {FILTERS.map(f => {
              const imp = IMPORTANCE_CONFIG[f];
              return (
                <FilterChip
                  key={f}
                  label={f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                  count={f === 'ALL' ? stories.length : stories.filter(s => s.importance === f).length}
                  isActive={filter === f}
                  onClick={() => setFilter(f)}
                  activeColor={imp?.color}
                  size="md"
                />
              );
            })}
          </div>

          {/* Importance summary dots */}
          {stories.length > 0 && (
            <div className="flex gap-4 flex-shrink-0">
              {['CRITICAL', 'HIGH', 'MEDIUM'].map(k => {
                const c = stories.filter(s => s.importance === k).length;
                if (!c) return null;
                return (
                  <div key={k} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: IMPORTANCE_CONFIG[k].color }} />
                    <span className="font-bold" style={{ color: IMPORTANCE_CONFIG[k].color }}>{c}</span>
                    <span className="text-[#94A3B8]">{IMPORTANCE_CONFIG[k].label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RESULT COUNT — reusable ResultCount ── */}
        {filtered.length > 0 && (
          <div className="mb-4">
            <ResultCount
              currentPage={pagination.currentPage}
              perPage={ITEMS_PER_PAGE}
              total={filtered.length}
              noun="stories"
            />
            {pagination.totalPages > 1 && (
              <span className="text-[11px] text-gray-400"> · Page {pagination.currentPage} of {pagination.totalPages}</span>
            )}
          </div>
        )}

        {/* ── GRID ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-[#94A3B8] text-sm">No stories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {pagination.currentItems.map((story, i) => (
              <StoryCard key={story.slug || i} story={story} />
            ))}
          </div>
        )}

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="mt-8 pb-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.goTo}
            />
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-xs text-gray-400 pb-8 mt-2">
            Updated regularly · Market insights for informational purposes
          </p>
        )}
      </div>
    </div>
  );
}