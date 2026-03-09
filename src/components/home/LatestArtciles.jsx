// src/components/home/LatestArticles.jsx
// Homepage pe latest blog articles dikhata hai — AdSense ke liye content-heavy homepage

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowRight, BarChart2, Clock } from 'lucide-react';

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

function getLatestArticles(limit = 6) {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep')
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug:      data.slug      || filename.replace(/\.md$/, ''),
        title:     data.title     || 'Untitled',
        excerpt:   data.excerpt   || '',
        category:  data.category  || 'markets',
        readTime:  parseInt(data.readTime) || 5,
        date:      data.date      || '',
        image_url: data.image_url || '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

function fmtDate(d) {
  return d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
}

export default function LatestArticles() {
  const articles = getLatestArticles(6);
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const featCat = CAT_STYLES[featured.category?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };

  return (
    <section className="py-7 sm:py-10 bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#0c1e35] text-white/80 rounded-full text-[9px] font-bold tracking-widest uppercase mb-1.5">
              Latest Research
            </span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-gray-900 leading-tight">
              Market Intelligence
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-[12px] font-semibold text-[#c8421e] hover:underline"
          >
            All articles <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Layout: featured (large) + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* ── Featured article ── */}
          <Link
            href={`/blog/${featured.slug}`}
            className="lg:col-span-2 group relative rounded-xl overflow-hidden bg-[#0c1e35] min-h-[200px] sm:min-h-[230px] flex flex-col justify-end no-underline"
          >
            {featured.image_url ? (
              <img
                src={featured.image_url}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart2 className="w-14 h-14 text-white/5" strokeWidth={1} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e35] via-[#0c1e3599] to-transparent" />

            <div className="relative z-10 p-4 sm:p-5">
              <span
                className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded capitalize mb-2 inline-block"
                style={{ backgroundColor: featCat.bg, color: featCat.text }}
              >
                {featured.category}
              </span>
              <h3 className="text-white font-serif text-base sm:text-lg leading-snug mb-1.5 group-hover:text-[#f8a07a] transition-colors line-clamp-2">
                {featured.title}
              </h3>
              <p className="text-white/50 text-[12px] line-clamp-2 mb-2.5 hidden sm:block">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[10px]">{fmtDate(featured.date)}</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#c8421e]">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* ── Smaller cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {rest.slice(0, 4).map((post) => {
              const cs = CAT_STYLES[post.category?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-3 flex gap-2.5 no-underline hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#0c1e35] flex items-center justify-center">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <BarChart2 className="w-5 h-5 text-white/10" strokeWidth={1} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[8px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded capitalize inline-block mb-1"
                      style={{ backgroundColor: cs.bg, color: cs.text }}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-[12px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#c8421e] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400">
                      <Clock className="w-2.5 h-2.5" strokeWidth={2} />
                      {post.readTime}m · {fmtDate(post.date)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile view all */}
        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#c8421e]"
          >
            View all research <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}