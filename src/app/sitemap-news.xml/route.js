// src/app/sitemap-news.xml/route.js
// Google News Sitemap — Regular Article URLs (/blog/slug)
// ye Google News mein articles index karata hai
// Web Stories ke liye alag sitemap-stories.xml hai

import fs from 'fs';
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

  const items = [];

  for (const filename of fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== '.gitkeep')) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data: fm } = matter(raw);

      if (!fm.title || !fm.date) continue;

      const slug    = fm.slug || filename.replace(/\.md$/, '');
      const pubDate = new Date(fm.date);
      if (isNaN(pubDate.getTime())) continue;

      // Google News sirf last 2 din ke articles index karta hai
      // Lekin sitemap mein sab rakhna theek hai — Google khud filter karega
      items.push({
        slug,
        title:    fm.title,
        pubDate:  pubDate.toISOString(),
        keywords: Array.isArray(fm.tags) && fm.tags.length > 0
                    ? fm.tags.join(', ')
                    : (fm.keywords || null),
      });
    } catch {
      // skip malformed files
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
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      },
    });

  } catch (err) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"></urlset>',
      { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    );
  }
}