'use client';
// src/components/home/StoriesSection.jsx
// Homepage pe Web Stories ka preview section

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const IMPORTANCE_DOT = {
  CRITICAL: '#dc2626',
  HIGH: '#4A90E2',
  MEDIUM: '#22c55e',
  LOW: '#9ca3af',
};

const SENTIMENT_ICON = {
  POSITIVE: '📈',
  NEGATIVE: '📉',
  NEUTRAL: '➡️',
};

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stories')
      .then(r => r.json())
      .then(data => setStories((data.items || []).slice(0, 5)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-5 sm:mb-6"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-xs font-semibold mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Market Updates
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Market{' '}
              <span className="bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A] bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <Link
            href="/stories"
            className="text-sm font-semibold text-[#2E5AAD] hover:text-[#4A90E2] transition-colors flex items-center gap-1"
          >
            View All
            <span className="text-base">→</span>
          </Link>
        </motion.div>

        {/* Stories horizontal scroll on mobile, grid on desktop */}
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {[1,2,3].map(i => (
              <div key={i} style={{ minWidth: '260px' }} className="sm:min-w-0 bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-3 sm:hidden" style={{ scrollbarWidth: 'none' }}>
              {stories.map((story, i) => (
                <MobileStoryCard key={story.slug || i} story={story} index={i} />
              ))}
              {/* See all card */}
              <Link
                href="/stories"
                style={{ minWidth: '160px' }}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] rounded-xl p-4 text-white text-center"
              >
                <span className="text-2xl mb-2">📊</span>
                <span className="text-xs font-bold">View All Stories</span>
                <span className="text-xs opacity-75 mt-1">{stories.length}+ today</span>
              </Link>
            </div>

            {/* Desktop: grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story, i) => (
                <DesktopStoryCard key={story.slug || i} story={story} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-5 sm:mt-6"
        >
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            📰 View All Market Stories
          </Link>
          <p className="text-xs text-gray-400 mt-2">Updated every 30 minutes · Educational purposes only</p>
        </motion.div>
      </div>
    </section>
  );
}

// Mobile horizontal card
function MobileStoryCard({ story, index }) {
  const dot = IMPORTANCE_DOT[story.importance] || '#4A90E2';
  const icon = SENTIMENT_ICON[story.sentiment] || '➡️';

  return (
    <motion.a
      href={`/stories/${story.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{ minWidth: '260px', maxWidth: '260px' }}
      className="flex-shrink-0 block bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all active:scale-95"
    >
      {/* Top */}
      <div className="flex items-center gap-2 mb-3">
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
        <span className="text-xs font-600 text-gray-500 truncate">{story.importance}</span>
        <span className="ml-auto text-sm">{icon}</span>
      </div>

      {/* Headline */}
      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-3"
        style={{ fontFamily: 'Georgia, serif', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >{story.headline}</h3>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-400">{story.source?.name}</span>
        <span className="text-xs font-semibold text-[#4A90E2]">Read →</span>
      </div>
    </motion.a>
  );
}

// Desktop grid card
function DesktopStoryCard({ story, index }) {
  const imp = {
    CRITICAL: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    HIGH:     { color: '#2E5AAD', bg: '#eff6ff', border: '#bfdbfe' },
    MEDIUM:   { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    LOW:      { color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
  }[story.importance] || { color: '#2E5AAD', bg: '#eff6ff', border: '#bfdbfe' };

  const icon = SENTIMENT_ICON[story.sentiment] || '➡️';

  return (
    <motion.a
      href={`/stories/${story.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group block bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-lg transition-all duration-200"
      style={{ borderLeft: `3px solid ${imp.color}` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{
          padding: '2px 8px', background: imp.bg, border: `1px solid ${imp.border}`,
          color: imp.color, fontSize: '10px', fontWeight: '700', borderRadius: '20px',
        }}>{story.importance}</span>
        <span className="text-sm">{icon}</span>
        <span className="ml-auto text-xs text-gray-400">{story.published_time}</span>
      </div>

      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#2E5AAD] transition-colors"
        style={{ fontFamily: 'Georgia, serif' }}
      >{story.headline}</h3>

      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2"
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >{story.quick_summary}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-400">{story.source?.name}</span>
        <span className="text-xs font-semibold text-[#4A90E2] group-hover:translate-x-1 transition-transform inline-block">
          Read Story →
        </span>
      </div>
    </motion.a>
  );
}