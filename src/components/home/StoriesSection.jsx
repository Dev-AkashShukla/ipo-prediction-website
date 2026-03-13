// src/components/home/StoriesSection.jsx
// Server Component — same pattern as original, zero API call, instant load

import Link from 'next/link';
import { getStories } from '../../lib/stories';
import StoriesScrollStrip from './StoriesScrollStrip';

export default async  function StoriesSection() {
  const stories = getStories().slice(0, 8);
  if (stories.length === 0) return null;

  return (
    <section className="py-7 sm:py-10 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
              style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full opacity-60" style={{ background: '#2563EB' }} />
                <span className="relative rounded-full h-1.5 w-1.5" style={{ background: '#2563EB' }} />
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#2563EB' }}>
                Market Updates
              </span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}>
              Market{' '}
              <span style={{ color: '#2563EB' }}>Stories</span>
            </h2>
          </div>
          <Link href="/stories"
            className="text-[12px] font-bold flex items-center gap-0.5 no-underline"
            style={{ color: '#2563EB' }}>
            View All →
          </Link>
        </div>

        {/* Client strip — handles scroll + arrows */}
        <StoriesScrollStrip stories={stories} />

        <p className="text-center text-[11px] text-gray-400 mt-2 sm:hidden">
          Swipe to explore · Tap to read
        </p>
        <p className="text-center text-[11px] text-gray-400 mt-3 hidden sm:block">
          Updated regularly · Market insights for informational purposes
        </p>

      </div>
    </section>
  );
}