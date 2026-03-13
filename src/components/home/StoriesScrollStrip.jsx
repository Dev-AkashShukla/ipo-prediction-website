'use client';
// src/components/home/StoriesScrollStrip.jsx
// Client Component — only handles scroll interaction + cinematic card UI

import { useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const IMPORTANCE_CONFIG = {
  CRITICAL: { color: '#EF4444', label: 'Critical' },
  HIGH:     { color: '#2563EB', label: 'High'     },
  MEDIUM:   { color: '#22C55E', label: 'Medium'   },
  LOW:      { color: '#94A3B8', label: 'Low'      },
};

const SENTIMENT_CONFIG = {
  POSITIVE: { icon: TrendingUp,   color: '#22C55E', label: 'Bullish' },
  NEGATIVE: { icon: TrendingDown, color: '#EF4444', label: 'Bearish' },
  NEUTRAL:  { icon: Minus,        color: '#94A3B8', label: 'Neutral' },
  MIXED:    { icon: Activity,     color: '#F59E0B', label: 'Mixed'   },
};

function getSlideCount(story) {
  return [
    true,
    story.quick_summary || story.detailed_summary,
    story.key_points?.length > 0,
    story.what_it_means,
    story.context,
    true,
    true,
  ].filter(Boolean).length;
}

function StoryCard({ story }) {
  const imp      = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const sent     = SENTIMENT_CONFIG[story.sentiment]   || SENTIMENT_CONFIG.NEUTRAL;
  const SentIcon = sent.icon;
  const slides   = getSlideCount(story);

  return (
    <a
      href={`/stories/${story.slug}`}
      className="relative overflow-hidden rounded-2xl no-underline group w-[190px] h-[300px] sm:w-[230px] sm:h-[360px]"
      style={{
        flexShrink: 0,
        scrollSnapAlign: 'start',
        background: 'linear-gradient(160deg,#0B0F19 0%,#0f1f3d 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* BG image */}
      {story.image_url_og && (
        <>
          <img
            src={story.image_url_og}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: 0.55 }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.35) 50%, rgba(5,8,20,0.0) 100%)' }} />
        </>
      )}

      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-[3px] px-3 pt-3 z-10">
        {[...Array(slides)].map((_, i) => (
          <div key={i} className="flex-1 rounded-full"
            style={{ height: '2px', background: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)' }} />
        ))}
      </div>

      {/* Logo */}
      <div className="absolute top-7 left-3 flex items-center gap-1.5 z-10">
        <div className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="FINNOTIA" className="w-full h-full object-contain" />
        </div>
        <span className="text-[10px] font-bold tracking-wide" style={{ color: 'rgba(255,255,255,0.65)' }}>
          FINNOTIA
        </span>
      </div>

      {/* Play icon */}
      <div className="absolute top-6 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <Play className="w-3 h-3 text-white" style={{ marginLeft: '1px' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: imp.color }}>
            {imp.label}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: sent.color + '22', color: sent.color }}>
            <SentIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
            {sent.label}
          </span>
        </div>

        <h3 className="text-white font-bold leading-snug mb-3 line-clamp-3"
          style={{ fontFamily: 'Georgia, serif', fontSize: '14px' }}>
          {story.headline}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[3px]">
              {[...Array(slides)].map((_, i) => (
                <div key={i} className="rounded-full"
                  style={{
                    width: i === 0 ? '12px' : '4px',
                    height: '3.5px',
                    background: i === 0 ? imp.color : 'rgba(255,255,255,0.25)',
                  }} />
              ))}
            </div>
            <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {story.source?.name || 'Finnotia Research'}
            </span>
          </div>
          {story.date_display && (
            <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {story.date_display}
            </span>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${imp.color}55` }} />
    </a>
  );
}

export default function StoriesScrollStrip({ stories }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });

  return (
    <div>
      {/* Desktop arrows */}
      <div className="hidden sm:flex justify-end gap-2 mb-3">
        <button onClick={() => scroll(-1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button onClick={() => scroll(1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
      >
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}

        {/* View All card */}
        <Link href="/stories"
          className="relative flex-shrink-0 overflow-hidden rounded-2xl no-underline group flex flex-col items-center justify-center gap-3 w-[100px] h-[300px] sm:w-[130px] sm:h-[360px]"
          style={{
            scrollSnapAlign: 'start',
            background: 'linear-gradient(160deg,#1e3a5f 0%,#0f1f3d 100%)',
            border: '1px solid rgba(37,99,235,0.3)',
          }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(37,99,235,0.4)' }}>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-center px-3">
            <p className="text-white font-bold text-sm">View All</p>
            <p className="text-blue-400 text-[11px] mt-0.5">{stories.length}+ stories</p>
          </div>
        </Link>
      </div>
    </div>
  );
}