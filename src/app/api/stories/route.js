// src/app/api/stories/route.js
// Proxy route — hides Azure URL, returns flat items array

const AZURE_API = 'https://finnotia-ai-service.azurewebsites.net/api/local/news/micro/latest';

function makeSlug(headline, updateId) {
  const clean = (headline || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `${updateId}-${clean}`;
}

export async function GET() {
  try {
    const res = await fetch(AZURE_API, {
      next: { revalidate: 1800 },
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) throw new Error(`Azure API ${res.status}`);

    const raw = await res.json();

    // ── Handle both possible response shapes ──
    // Shape 1: { success, data: { updates: [] } }
    // Shape 2: { success, updates: [] }
    const updates =
      raw?.data?.updates ||
      raw?.updates ||
      [];

    const IMPORTANCE_ORDER = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

    const items = updates
      .flatMap((u) =>
        (u.news_items || []).map((item) => ({
          slug: makeSlug(item.headline, u.update_id),
          update_id: u.update_id,
          generated_at: u.generated_at,
          headline:        item.headline        || '',
          quick_summary:   item.quick_summary   || '',
          detailed_summary:item.detailed_summary|| '',
          what_it_means:   item.what_it_means   || '',
          context:         item.context         || '',
          key_points:      item.key_points      || [],
          importance:      item.importance      || 'MEDIUM',
          sentiment:       item.sentiment       || 'NEUTRAL',
          is_breaking:     item.is_breaking     || false,
          source:          item.source          || {},
          tags:            item.tags            || [],
          published_time:  item.published_time  || item.timestamp || '',
        }))
      )
      .filter((item) => item.headline) // skip empty
      .sort(
        (a, b) =>
          (IMPORTANCE_ORDER[a.importance] ?? 9) -
          (IMPORTANCE_ORDER[b.importance] ?? 9)
      );

    // Deduplicate by headline
    const seen = new Set();
    const unique = items.filter((item) => {
      if (seen.has(item.headline)) return false;
      seen.add(item.headline);
      return true;
    });

    return Response.json(
      {
        success: true,
        date: updates[0]?.generated_at || new Date().toISOString(),
        total: unique.length,
        items: unique,
      },
      {
        headers: { 'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600' },
      }
    );
  } catch (err) {
    console.error('[Stories API]', err.message);
    return Response.json(
      { success: false, error: err.message, items: [] },
      { status: 500 }
    );
  }
}