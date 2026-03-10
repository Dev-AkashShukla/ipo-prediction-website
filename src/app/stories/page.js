// src/app/stories/page.js
// Server Component — reads directly from content/articles/*.md
// NO API call, NO fetch — same pattern as blog/page.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import StoriesClient from './StoriesClient';

export const metadata = {
  title: 'Market Stories — Latest Finance News | FINNOTIA',
  description:
    'Bite-sized market stories on stocks, IPOs, commodities and economy. Latest financial news from India and global markets.',
  alternates: { canonical: 'https://finnotia.com/stories' },
  openGraph: {
    title: 'Market Stories | FINNOTIA',
    description: 'Latest financial news — stocks, IPOs, commodities, economy.',
    url: 'https://finnotia.com/stories',
    siteName: 'FINNOTIA',
    type: 'website',
    images: [{ url: 'https://finnotia.com/og-image.png', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

function inferSentiment(fm) {
  const s = (fm.sentiment || '').toUpperCase();
  if (['BULLISH', 'POSITIVE'].includes(s)) return 'POSITIVE';
  if (['BEARISH', 'NEGATIVE'].includes(s)) return 'NEGATIVE';
  if (s === 'MIXED') return 'MIXED';
  if (fm.bull_case_summary && !fm.bear_case_summary) return 'POSITIVE';
  if (fm.bear_case_summary && !fm.bull_case_summary) return 'NEGATIVE';
  return 'NEUTRAL';
}

function inferImportance(fm) {
  if (fm.importance) return fm.importance.toUpperCase();
  const catMap = {
    geopolitics:    'CRITICAL',
    economy:        'HIGH',
    markets:        'HIGH',
    ipo:            'HIGH',
    commodities:    'MEDIUM',
    tech:           'MEDIUM',
    policy:         'HIGH',
    'mutual-funds': 'MEDIUM',
    crypto:         'MEDIUM',
    investing:      'MEDIUM',
    tax:            'MEDIUM',
    corporate:      'MEDIUM',
  };
  return catMap[(fm.category || '').toLowerCase()] || 'MEDIUM';
}

function fmtTime(dateStr) {
  if (!dateStr) return 'Today';
  try {
    return new Date(dateStr).toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return 'Today'; }
}

function getStories() {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep')
    .map(filename => {
      try {
        const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
        const { data: fm } = matter(raw);
        if (!fm.title) return null;

        const slug = fm.slug || filename.replace(/\.md$/, '');

        return {
          slug,
          headline:         fm.title,
          quick_summary:    fm.excerpt           || '',
          detailed_summary: fm.excerpt           || '',
          what_it_means:    fm.bull_case_summary || fm.thesis_statement || '',
          context:          fm.bear_case_summary || '',
          key_points:       fm.key_facts         || [],
          importance:       inferImportance(fm),
          sentiment:        inferSentiment(fm),
          category:         fm.category          || 'Markets',
          tags:             fm.tags              || [],
          published_time:   fmtTime(fm.date),
          date:             fm.date              || '',
          source: {
            name: 'Finnotia Research',
            url:  `https://finnotia.com/blog/${slug}`,
          },
          image_url_og: fm.image_url || '',
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const revalidate = 60;

export default function StoriesPage() {
  const stories = getStories();
  const date    = new Date().toISOString().split('T')[0];
  return <StoriesClient stories={stories} date={date} />;
}