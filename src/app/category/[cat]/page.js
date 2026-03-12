// src/app/category/[cat]/page.js
// Category pages — filters blog articles by category
// URLs: /category/markets, /category/economy, /category/commodities, etc.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import BlogClient from '../../blog/BlogClient';

// All supported categories
const VALID_CATEGORIES = [
  'markets', 'economy', 'commodities', 'corporate',
  'policy', 'ipo', 'mutual-funds', 'tech', 'crypto',
  'geopolitics', 'tax', 'investing',
];

const CATEGORY_META = {
  markets:       { label: 'Markets',        desc: 'Stock and equity market analysis — indices, sector moves, and market trends explained.' },
  economy:       { label: 'Economy',        desc: 'Macroeconomic coverage — GDP, inflation, interest rates, and global economic shifts.' },
  commodities:   { label: 'Commodities',    desc: 'Oil, gold, silver, and agricultural commodity market analysis and price movements.' },
  corporate:     { label: 'Corporate',      desc: 'M&A deals, earnings results, corporate strategy, and company-level financial news.' },
  policy:        { label: 'Policy',         desc: 'Central bank decisions, SEBI notifications, RBI policy updates, and regulatory changes.' },
  ipo:           { label: 'IPO',            desc: 'IPO analysis, GMP tracking, subscription data, and listing performance reviews.' },
  'mutual-funds':{ label: 'Mutual Funds',   desc: 'Fund performance, SIP insights, NAV tracking, and mutual fund category analysis.' },
  tech:          { label: 'Technology',     desc: 'Tech sector analysis, AI market impact, startup funding, and digital economy news.' },
  crypto:        { label: 'Crypto',         desc: 'Cryptocurrency market analysis, blockchain developments, and digital asset news.' },
  geopolitics:   { label: 'Geopolitics',    desc: 'Global political events and their financial market implications.' },
  tax:           { label: 'Tax & Finance',  desc: 'Tax policy changes, personal finance tips, and financial planning insights.' },
  investing:     { label: 'Investing',      desc: 'Investment strategies, portfolio approaches, and financial education content.' },
};

function getArticlesByCategory(cat) {
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
        tags:      data.tags      || [],
        sentiment: data.sentiment || '',
        region:    data.region    || '',
        style:     data.style     || '',
      };
    })
    .filter((a) => a.category?.toLowerCase() === cat)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }) {
  const cat = params.cat?.toLowerCase();
  const meta = CATEGORY_META[cat];
  if (!meta) return { title: 'Category Not Found' };

  return {
    title: `${meta.label} News & Analysis | FINNOTIA Research`,
    description: meta.desc,
    alternates: { canonical: `https://www.finnotia.com/category/${cat}` },
    openGraph: {
      title: `${meta.label} News & Analysis | FINNOTIA`,
      description: meta.desc,
      url: `https://www.finnotia.com/category/${cat}`,
      siteName: 'FINNOTIA',
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 60;

export default function CategoryPage({ params }) {
  const cat = params.cat?.toLowerCase();

  if (!VALID_CATEGORIES.includes(cat)) notFound();

  const meta = CATEGORY_META[cat];
  const articles = getArticlesByCategory(cat);

  // Re-use BlogClient — it already handles search/filter UI
  // We pass pre-filtered articles so the category tab is auto-selected
  // But BlogClient shows ALL categories of what's passed in.
  // Simplest approach: pass all articles, and let BlogClient handle it.
  // Actually for category page we want ONLY this category's articles shown.
  // Let's pass them directly — BlogClient will show 'ALL' filter for these articles.

  // JSON-LD for category page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${meta.label} - FINNOTIA Research`,
    description: meta.desc,
    url: `https://www.finnotia.com/category/${cat}`,
    publisher: {
      '@type': 'Organization',
      name: 'FINNOTIA',
      url: 'https://www.finnotia.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Category header banner */}
      <div className="bg-[#0c1e35] px-5 pt-20 pb-10 relative overflow-hidden" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#f8f7f4] rounded-t-3xl" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-3">
            <a href="/blog" className="hover:text-white/60 transition-colors">Research</a>
            {' '}/{' '}
            <span className="text-white/60 capitalize">{meta.label}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
            {meta.label} <em className="text-[#c8421e] not-italic italic">Analysis</em>
          </h1>
          <p className="text-white/40 text-sm max-w-lg">{meta.desc}</p>
          <div className="mt-3 text-white/25 text-xs">
            {articles.length} article{articles.length !== 1 ? 's' : ''} in this category
          </div>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="max-w-5xl mx-auto px-5 py-24 text-center" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <p className="text-gray-400 text-sm">No articles in this category yet. Check back soon.</p>
          <a href="/blog" className="mt-4 inline-block text-[#c8421e] text-sm font-semibold hover:underline">
            Browse all articles →
          </a>
        </div>
      ) : (
        <BlogClient articles={articles} />
      )}
    </>
  );
}