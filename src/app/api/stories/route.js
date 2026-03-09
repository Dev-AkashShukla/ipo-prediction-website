// src/app/api/stories/route.js
// Reads directly from content/articles/*.md — no Azure API needed
// Returns same shape as before so StoriesSection works without changes

import fs     from 'fs';
import path   from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

function makeSlug(title, filename) {
  // Use frontmatter slug if available, else derive from filename
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
  }
  return filename.replace(/\.md$/, '');
}

function inferSentiment(fm) {
  // Derive from frontmatter sentiment field or bull/bear case
  const s = (fm.sentiment || '').toUpperCase();
  if (['BULLISH', 'POSITIVE'].includes(s)) return 'POSITIVE';
  if (['BEARISH', 'NEGATIVE'].includes(s)) return 'NEGATIVE';
  if (s === 'MIXED')                        return 'MIXED';
  if (fm.bull_case_summary && !fm.bear_case_summary) return 'POSITIVE';
  if (fm.bear_case_summary && !fm.bull_case_summary) return 'NEGATIVE';
  return 'NEUTRAL';
}

function inferImportance(fm) {
  // Use frontmatter importance if set, else map from category
  if (fm.importance) return fm.importance.toUpperCase();
  const catMap = {
    geopolitics: 'CRITICAL',
    economy:     'HIGH',
    markets:     'HIGH',
    ipo:         'HIGH',
    commodities: 'MEDIUM',
    tech:        'MEDIUM',
    policy:      'HIGH',
    'mutual-funds': 'MEDIUM',
    crypto:      'MEDIUM',
    investing:   'MEDIUM',
    tax:         'MEDIUM',
    corporate:   'MEDIUM',
  };
  return catMap[(fm.category || '').toLowerCase()] || 'MEDIUM';
}

function fmtTime(dateStr) {
  if (!dateStr) return 'Today';
  try {
    return new Date(dateStr).toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch {
    return 'Today';
  }
}

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'content', 'articles');

    // If no articles dir yet, return empty
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ items: [], date: new Date().toISOString().split('T')[0] });
    }

    const files = fs
      .readdirSync(dir)
      .filter(f => f.endsWith('.md') && f !== '.gitkeep');

    if (files.length === 0) {
      return NextResponse.json({ items: [], date: new Date().toISOString().split('T')[0] });
    }

    const items = files
      .map(filename => {
        try {
          const raw        = fs.readFileSync(path.join(dir, filename), 'utf8');
          const { data: fm } = matter(raw);

          const slug = fm.slug || makeSlug(fm.title, filename);

          return {
            slug,

            // Core content
            headline:        fm.title         || 'Untitled',
            quick_summary:   fm.excerpt        || '',
            detailed_summary: fm.excerpt       || '',
            what_it_means:   fm.bull_case_summary || fm.thesis_statement || '',
            context:         fm.bear_case_summary || '',
            key_points:      fm.key_facts      || [],

            // Meta
            importance:      inferImportance(fm),
            sentiment:       inferSentiment(fm),
            category:        fm.category       || 'Markets',
            tags:            fm.tags           || [],
            published_time:  fmtTime(fm.date),
            date:            fm.date           || '',

            // Source — articles are by Finnotia
            source: {
              name: 'Finnotia Research',
              url:  `https://finnotia.com/blog/${slug}`,
            },

            // Image for story viewer
            image_url_og: fm.image_url || '',
          };
        } catch {
          // Skip malformed files silently
          return null;
        }
      })
      .filter(Boolean)                                      // remove nulls
      .filter(item => item.headline !== 'Untitled' || item.quick_summary) // skip empty
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

    return NextResponse.json(
      {
        items,
        date:  new Date().toISOString().split('T')[0],
        total: items.length,
        source: 'articles',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );

  } catch (err) {
    console.error('[/api/stories]', err.message);
    // Never return 500 — return empty array so UI doesn't break
    return NextResponse.json(
      { items: [], date: new Date().toISOString().split('T')[0], error: err.message },
      { status: 200 }
    );
  }
}