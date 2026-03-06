// src/app/sitemap-stories.xml/route.js
// Google News Sitemap — stories ke liye

const AZURE_API = 'https://finnotia-ai-service.azurewebsites.net/api/local/news/micro/latest';

function generateSlug(headline, updateId) {
  const s = headline
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `${updateId}-${s}`;
}

export async function GET() {
  try {
    const res = await fetch(AZURE_API, { next: { revalidate: 1800 } });
    const raw = await res.json();
    const updates = raw?.data?.updates || [];
    const date = raw?.data?.date || new Date().toISOString().split('T')[0];

    const items = [];
    updates.forEach(update => {
      (update.news_items || []).forEach(item => {
        const slug = generateSlug(item.headline, update.update_id);
        items.push({
          slug,
          headline: item.headline,
          tags: (item.tags || []).join(', '),
          generatedAt: update.generated_at || new Date().toISOString(),
          source: item.source?.name || 'FINNOTIA',
        });
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items.map(item => `  <url>
    <loc>https://finnotia.com/stories/${item.slug}</loc>
    <lastmod>${new Date(item.generatedAt).toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
    <news:news>
      <news:publication>
        <news:name>FINNOTIA</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(item.generatedAt).toISOString()}</news:publication_date>
      <news:title>${item.headline.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>${item.tags}</news:keywords>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  } catch (err) {
    return new Response('<?xml version="1.0"?><urlset></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}