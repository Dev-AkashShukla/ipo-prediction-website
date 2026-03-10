// src/lib/stories.js
// ── Shared utility — single source of truth for all story data ───
// Used by:
//   • src/app/stories/page.js
//   • src/app/stories/[slug]/page.js
//   • src/app/api/stories/route.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function inferSentiment(fm) {
  const s = (fm.sentiment || '').toUpperCase();
  if (['BULLISH', 'POSITIVE'].includes(s)) return 'POSITIVE';
  if (['BEARISH', 'NEGATIVE'].includes(s)) return 'NEGATIVE';
  if (s === 'MIXED') return 'MIXED';
  if (fm.bull_case_summary && !fm.bear_case_summary) return 'POSITIVE';
  if (fm.bear_case_summary && !fm.bull_case_summary) return 'NEGATIVE';
  return 'NEUTRAL';
}

export function inferImportance(fm) {
  if (fm.importance) return fm.importance.toUpperCase();
  const catMap = {
    geopolitics: 'CRITICAL', economy: 'HIGH', markets: 'HIGH',
    ipo: 'HIGH', commodities: 'MEDIUM', tech: 'MEDIUM',
    policy: 'HIGH', 'mutual-funds': 'MEDIUM', crypto: 'MEDIUM',
    investing: 'MEDIUM', tax: 'MEDIUM', corporate: 'MEDIUM',
  };
  return catMap[(fm.category || '').toLowerCase()] || 'MEDIUM';
}

// ── fmtDate — human-readable date (no time) ──────────────────────
export function fmtDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return ''; }
}

function buildStory(fm, slug) {
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
    date:             fm.date              || '',
    date_display:     fmtDate(fm.date),
    source: {
      name: 'Finnotia Research',
      url:  `https://finnotia.com/blog/${slug}`,
    },
    image_url_og: fm.image_url || '',
  };
}

// ── Get all stories (sorted newest first) ────────────────────────
export function getStories() {
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
        return buildStory(fm, slug);
      } catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── Get single story by slug ──────────────────────────────────────
export function getStory(slug) {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== '.gitkeep');

  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data: fm } = matter(raw);
      const fileSlug = fm.slug || filename.replace(/\.md$/, '');
      if (fileSlug !== slug) continue;
      if (!fm.title) return null;
      return buildStory(fm, fileSlug);
    } catch { continue; }
  }
  return null;
}