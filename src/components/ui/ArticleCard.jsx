'use client';
// src/components/ui/ArticleCard.jsx
// Shared article card — used in BlogClient (grid) and ArticleClient (related posts)

import { Clock, ArrowRight, BarChart2 } from 'lucide-react';

// ── Utilities from shared lib (no 'use client' there, safe everywhere) ────────
import {
  CAT_STYLES,
  SENT_COLORS,
  cloudinaryOptimize,
  fmtDate,
} from '../../lib/articleUtils';

// Re-export so any file still importing from ArticleCard keeps working
export { CAT_STYLES, SENT_COLORS, cloudinaryOptimize, fmtDate };

// ─────────────────────────────────────────────────────────────────────────────

/**
 * ArticleCard
 * Props:
 *   post     {object}  — { slug, title, image_url, category, sentiment, readTime, excerpt, tags, date }
 *   variant  {string}  — 'grid' (default) | 'related'
 *   visible  {boolean} — fade-in state (grid only)
 *   index    {number}  — stagger delay + LCP hint (grid only)
 */
export default function ArticleCard({ post, variant = 'grid', visible = true, index = 0 }) {
  const cs = CAT_STYLES[post.category?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };
  const sc = SENT_COLORS[post.sentiment] || null;
  const href = `/blog/${post.slug}`;

  // ── Related / compact variant ────────────────────────────────────
  if (variant === 'related') {
    return (
      <a
        href={href}
        className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline"
      >
        {post.image_url ? (
          <img
            src={cloudinaryOptimize(post.image_url, 'w_400,h_225,c_fill,f_auto,q_auto')}
            alt={post.title}
            className="w-full aspect-video object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full aspect-video bg-[#0c1e35] flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-white/10" strokeWidth={1} />
          </div>
        )}
        <div className="p-2.5">
          <h4 className="text-[12px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#c8421e] transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-400">
            <Clock className="w-2.5 h-2.5" strokeWidth={2} />
            <span>{post.readTime}m read</span>
          </div>
        </div>
      </a>
    );
  }

  // ── Full grid card ───────────────────────────────────────────────
  const isFirst = index === 0;

  return (
    <a
      href={href}
      data-slug={post.slug}
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col no-underline
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${(index % 3) * 60}ms` }}
    >
      {post.image_url ? (
        <img
          src={cloudinaryOptimize(post.image_url, 'w_400,h_225,c_fill,f_auto,q_auto')}
          alt={post.title}
          className="w-full aspect-video object-cover border-b border-gray-100"
          loading={isFirst ? 'eager' : 'lazy'}
          decoding={isFirst ? 'sync' : 'async'}
          fetchPriority={isFirst ? 'high' : 'auto'}
        />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-[#0c1e35] to-[#1a3355] flex items-center justify-center border-b border-gray-100">
          <BarChart2 className="w-8 h-8 text-white/10" strokeWidth={1} />
        </div>
      )}

      <div className="p-3 flex flex-col flex-1">
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

        <h3 className="font-serif text-[14px] text-gray-900 leading-snug mb-1.5 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

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

        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
          <span className="text-[10px] text-gray-400">{fmtDate(post.date)}</span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#c8421e]">
            Read <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </a>
  );
}