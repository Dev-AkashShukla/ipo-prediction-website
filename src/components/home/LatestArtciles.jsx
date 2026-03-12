// src/components/home/LatestArticles.jsx
// Homepage pe latest blog articles dikhata hai
// SERVER COMPONENT — 'use client' nahi hai, isliye @/lib/articleUtils se import karo

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';

// ✅ Shared lib se import — client component se NAHI
// (client component ke named exports server component mein undefined ho jaate hain)
import { CAT_STYLES, cloudinaryOptimize, fmtDate } from '../../lib/articleUtils';

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

        {/* Layout: featured (large) + side cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* ── Featured article ── */}
          <Link
            href={`/blog/${featured.slug}`}
            className="lg:col-span-2 group relative rounded-xl overflow-hidden bg-[#0c1e35] min-h-[200px] sm:min-h-[230px] flex flex-col justify-end no-underline"
          >
            {featured.image_url ? (
              <img
                src={cloudinaryOptimize(featured.image_url, 'w_800,h_450,c_fill,f_auto,q_auto')}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                loading="eager"
                fetchPriority="high"
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
              <p className="text-white/50 text-[12px] line-clamp-2 mb-2.5 hidden sm:block">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[10px]">{fmtDate(featured.date)}</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#c8421e]">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* ── Smaller side cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {rest.slice(0, 4).map((post) => {
              const cs = CAT_STYLES[post.category?.toLowerCase()] || { bg: '#f3f4f6', text: '#374151' };
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-3 flex gap-2.5 no-underline hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#0c1e35] flex items-center justify-center">
                    {post.image_url ? (
                      <img
                        src={cloudinaryOptimize(post.image_url, 'w_120,h_120,c_fill,f_auto,q_auto')}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
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
                      {post.readTime}m · {fmtDate(post.date)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile — view all */}
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