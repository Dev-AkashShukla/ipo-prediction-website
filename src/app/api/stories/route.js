// src/app/sitemap-stories.xml/route.js
// Google News Sitemap — reads directly from content/articles/*.md
// NO Azure API dependency — same source as /api/stories/route.js

import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';

function escapeXml(str = '') {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

function readArticles() {
  const dir = path.join(process.cwd(), 'content', 'articles');

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep');

  const items = [];

  for (const filename of files) {
    try {
      const raw        = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data: fm } = matter(raw);

      // Skip if no title or date — useless in a news sitemap
      if (!fm.title || !fm.date) continue;

      // Resolve slug — frontmatter slug preferred, else filename
      const slug = fm.slug || filename.replace(/\.md$/, '');

      // Parse date — must be a valid ISO date
      const pubDate = new Date(fm.date);
      if (isNaN(pubDate.getTime())) continue;

      // Google News sitemap only indexes articles published within last 2 days
      // But we include all so Google can decide — no harm in older ones
      items.push({
        slug,
        title:     fm.title,
        pubDate:   pubDate.toISOString(),
        // Tags as comma-separated keywords — skip if empty array
        keywords:  Array.isArray(fm.tags) && fm.tags.length > 0
                     ? fm.tags.join(', ')
                     : null,
      });
    } catch {
      // Skip malformed files silently
    }
  }

  // Newest first
  return items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export async function GET() {
  try {
    const articles = readArticles();

    const urlEntries = articles.map(item => `  <url>
    <loc>https://finnotia.com/blog/${escapeXml(item.slug)}</loc>
    <lastmod>${item.pubDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <news:news>
      <news:publication>
        <news:name>FINNOTIA</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${item.pubDate}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
      ${item.keywords ? `<news:keywords>${escapeXml(item.keywords)}</news:keywords>` : ''}
    </news:news>
  </url>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        // Revalidate every 30 min — matches article publish frequency
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      },
    });

  } catch (err) {
    // Always return valid XML — never break Google's crawler
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    );
  }
}