// src/app/blog/[slug]/story/route.js
// ── System 1: Article → 7-slide AMP Web Story ────────────────────
// PUT this file at: src/app/blog/[slug]/story/route.js
// Access at: finnotia.com/blog/your-article-slug/story
//
// Slides:
//   1. Cover       — image + headline
//   2. Hook        — excerpt / thesis
//   3. Key Facts   — key_facts array (3-col grid)
//   4. Bull Case   — bull_case_summary (green)
//   5. Bear Case   — bear_case_summary (red)
//   6. Deep Dive   — article body h2 headings as timeline
//   7. CTA         — read full article + share
//
// If a field is missing, slide is gracefully skipped or substituted.

import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark }    from 'remark';
import remarkHtml    from 'remark-html';

// ── helpers ──────────────────────────────────────────────────────
function esc(s) {
  return (s || '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

// Extract all h2 text nodes from rendered HTML
function extractH2s(html) {
  return [...(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi))]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)
    .slice(0, 4);
}

// Category → accent colour
const CAT_COLOR = {
  markets:      '#2563EB',
  economy:      '#0EA5E9',
  commodities:  '#F59E0B',
  ipo:          '#22C55E',
  'mutual-funds':'#A78BFA',
  geopolitics:  '#EF4444',
  tax:          '#6366F1',
  tech:         '#06B6D4',
  crypto:       '#F97316',
  corporate:    '#64748B',
  investing:    '#10B981',
  policy:       '#8B5CF6',
};

async function getArticle(slug) {
  const dir   = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const file  = files.find(f => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    return data.slug === slug || f.replace(/\.md$/, '') === slug;
  });
  if (!file) return null;

  const raw              = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data: fm, content } = matter(raw);
  const processed        = await remark().use(remarkHtml, { sanitize: false }).process(content);
  const htmlContent      = processed.toString();
  return { fm, htmlContent };
}

// ── Slide builders ────────────────────────────────────────────────

function slide1_cover(fm, accent) {
  const img = fm.image_url || 'https://finnotia.com/og-image.png';
  return `
<amp-story-page id="s1" auto-advance-after="8s">
  <amp-story-grid-layer template="fill">
    <amp-img src="${esc(img)}" width="720" height="1280"
      layout="fill" object-fit="cover"></amp-img>
  </amp-story-grid-layer>

  <!-- Dark overlay gradient -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:linear-gradient(to bottom,
        rgba(0,0,0,0.15) 0%,
        rgba(0,0,0,0.2)  35%,
        rgba(0,0,0,0.75) 65%,
        rgba(0,0,0,0.92) 100%)">
    </div>
  </amp-story-grid-layer>

  <!-- Content -->
  <amp-story-grid-layer template="vertical" anchor="bottom-left">
    <div style="padding:32px 24px 56px;width:100%">
      <!-- Category pill -->
      <div style="display:inline-block;padding:4px 12px;border-radius:20px;
        background:${accent};color:#fff;font-size:11px;font-weight:700;
        letter-spacing:1px;text-transform:uppercase;margin-bottom:16px">
        ${esc(fm.category || 'Finance')}
      </div>

      <!-- Headline -->
      <h1 style="color:#fff;font-size:28px;font-weight:800;line-height:1.2;
        margin:0 0 16px;text-shadow:0 2px 8px rgba(0,0,0,0.5)">
        ${esc(fm.title)}
      </h1>

      <!-- Meta row -->
      <div style="display:flex;align-items:center;gap:16px;
        color:rgba(255,255,255,0.6);font-size:12px">
        <span>🕐 ${esc(String(fm.readTime || 5))} min read</span>
        <span style="color:${accent};font-weight:700">FINNOTIA</span>
      </div>
    </div>
  </amp-story-grid-layer>

  <!-- Top logo bar -->
  <amp-story-grid-layer template="fill">
    <div style="padding:20px 20px 0;display:flex;align-items:center;
      justify-content:space-between;position:absolute;top:0;left:0;right:0">
      <div style="background:rgba(0,0,0,0.5);border-radius:6px;
        padding:4px 10px;color:#fff;font-size:11px;font-weight:800">
        FINNOTIA
      </div>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

function slide2_hook(fm, accent) {
  const text = fm.thesis_statement || fm.excerpt || '';
  if (!text) return null;
  return `
<amp-story-page id="s2" auto-advance-after="9s">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;background:#0B0F19"></div>
  </amp-story-grid-layer>
  <!-- Glow -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:radial-gradient(ellipse at 50% 40%,
        ${accent}18 0%, transparent 65%)"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      align-items:center;height:100%;padding:40px 28px;text-align:center">

      <div style="font-size:12px;font-weight:700;letter-spacing:2px;
        text-transform:uppercase;color:${accent};margin-bottom:24px">
        The Big Picture
      </div>

      <!-- Quote mark -->
      <div style="font-size:72px;line-height:0.6;color:${accent};
        opacity:0.3;margin-bottom:24px;font-family:Georgia,serif">"</div>

      <p style="color:#fff;font-size:22px;font-weight:600;line-height:1.5;
        max-width:340px;text-align:center;font-style:italic">
        ${esc(text)}
      </p>

      <div style="margin-top:32px;width:40px;height:3px;
        background:${accent};border-radius:2px"></div>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

function slide3_keyfacts(fm, accent) {
  const facts = fm.key_facts || [];
  if (facts.length === 0) return null;
  const display = facts.slice(0, 3);
  return `
<amp-story-page id="s3" auto-advance-after="10s">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;background:#0B0F19"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      height:100%;padding:32px 24px">

      <div style="font-size:11px;font-weight:700;letter-spacing:2px;
        text-transform:uppercase;color:${accent};margin-bottom:8px">
        Key Numbers
      </div>
      <h2 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 28px;
        line-height:1.2">
        What the<br/>Data Says
      </h2>

      <div style="display:flex;flex-direction:column;gap:12px">
        ${display.map((fact, i) => `
        <div style="background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-left:4px solid ${accent};
          border-radius:12px;padding:16px 18px;
          display:flex;align-items:flex-start;gap:12px">
          <div style="width:28px;height:28px;border-radius:8px;
            background:${accent};display:flex;align-items:center;
            justify-content:center;flex-shrink:0;
            font-size:13px;font-weight:800;color:#fff">
            ${i + 1}
          </div>
          <p style="color:rgba(255,255,255,0.9);font-size:15px;
            line-height:1.45;margin:0;flex:1">
            ${esc(fact)}
          </p>
        </div>`).join('')}
      </div>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

function slide4_bullcase(fm) {
  if (!fm.bull_case_summary) return null;
  return `
<amp-story-page id="s4" auto-advance-after="9s">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:linear-gradient(160deg,#052e16 0%,#0B0F19 60%)"></div>
  </amp-story-grid-layer>
  <!-- Green glow -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:radial-gradient(ellipse at 30% 30%,
        rgba(34,197,94,0.15) 0%, transparent 60%)"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      height:100%;padding:32px 24px">

      <!-- Badge -->
      <div style="display:inline-flex;align-items:center;gap:8px;
        padding:6px 14px;border-radius:20px;
        background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);
        width:fit-content;margin-bottom:24px">
        <span style="font-size:16px">📈</span>
        <span style="color:#22c55e;font-size:12px;font-weight:700;
          letter-spacing:1px;text-transform:uppercase">Bull Case</span>
      </div>

      <h2 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 20px">
        Why It Could<br/>Go Higher
      </h2>

      <div style="background:rgba(34,197,94,0.08);
        border:1px solid rgba(34,197,94,0.2);
        border-radius:16px;padding:20px">
        <p style="color:rgba(255,255,255,0.88);font-size:16px;
          line-height:1.65;margin:0">
          ${esc(fm.bull_case_summary)}
        </p>
      </div>

      <p style="color:rgba(34,197,94,0.4);font-size:10px;margin-top:16px">
        * Analytical perspective, not investment advice.
      </p>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

function slide5_bearcase(fm) {
  if (!fm.bear_case_summary) return null;
  return `
<amp-story-page id="s5" auto-advance-after="9s">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:linear-gradient(160deg,#1c0505 0%,#0B0F19 60%)"></div>
  </amp-story-grid-layer>
  <!-- Red glow -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:radial-gradient(ellipse at 70% 30%,
        rgba(239,68,68,0.12) 0%, transparent 60%)"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      height:100%;padding:32px 24px">

      <!-- Badge -->
      <div style="display:inline-flex;align-items:center;gap:8px;
        padding:6px 14px;border-radius:20px;
        background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);
        width:fit-content;margin-bottom:24px">
        <span style="font-size:16px">📉</span>
        <span style="color:#ef4444;font-size:12px;font-weight:700;
          letter-spacing:1px;text-transform:uppercase">Bear Case</span>
      </div>

      <h2 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 20px">
        The Risks<br/>to Watch
      </h2>

      <div style="background:rgba(239,68,68,0.08);
        border:1px solid rgba(239,68,68,0.2);
        border-radius:16px;padding:20px">
        <p style="color:rgba(255,255,255,0.88);font-size:16px;
          line-height:1.65;margin:0">
          ${esc(fm.bear_case_summary)}
        </p>
      </div>

      <p style="color:rgba(239,68,68,0.4);font-size:10px;margin-top:16px">
        * Analytical perspective, not investment advice.
      </p>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

function slide6_deepdive(h2s, accent) {
  if (h2s.length === 0) return null;
  return `
<amp-story-page id="s6" auto-advance-after="10s">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;background:#0B0F19"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      height:100%;padding:32px 24px">

      <div style="font-size:11px;font-weight:700;letter-spacing:2px;
        text-transform:uppercase;color:${accent};margin-bottom:8px">
        Inside the Article
      </div>
      <h2 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 28px">
        What We Cover
      </h2>

      <!-- Timeline list -->
      <div style="position:relative;padding-left:20px">
        <!-- Vertical line -->
        <div style="position:absolute;left:6px;top:6px;bottom:6px;
          width:2px;background:linear-gradient(to bottom,
            ${accent},${accent}40)"></div>

        ${h2s.map((h, i) => `
        <div style="position:relative;margin-bottom:${i < h2s.length - 1 ? '20px' : '0'}">
          <!-- Dot -->
          <div style="position:absolute;left:-17px;top:3px;
            width:10px;height:10px;border-radius:50%;
            background:${i === 0 ? accent : 'rgba(255,255,255,0.15)'};
            border:2px solid ${accent}"></div>

          <p style="color:${i === 0 ? '#fff' : 'rgba(255,255,255,0.6)'};
            font-size:${i === 0 ? '17px' : '15px'};
            font-weight:${i === 0 ? 700 : 400};
            line-height:1.35;margin:0">
            ${esc(h)}
          </p>
        </div>`).join('')}
      </div>

      <div style="margin-top:28px;font-size:13px;color:${accent};
        font-weight:600">
        Read the full analysis →
      </div>
    </div>
  </amp-story-grid-layer>
</amp-story-page>`;
}

// ── UPDATED: slide7 — clean CTA, no share box ─────────────────────
function slide7_cta(fm, slug, accent) {
  const url = `https://finnotia.com/blog/${slug}`;
  return `
<amp-story-page id="s7">
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;background:#0B0F19"></div>
  </amp-story-grid-layer>
  <!-- Accent glow -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;
      background:radial-gradient(ellipse at 50% 45%,
        ${accent}22 0%, transparent 65%)"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="fill">
    <div style="display:flex;flex-direction:column;justify-content:center;
      align-items:center;height:100%;padding:40px 28px;text-align:center">

      <!-- Logo pill -->
      <div style="padding:6px 16px;border-radius:20px;
        background:${accent};color:#fff;font-size:12px;font-weight:800;
        letter-spacing:2px;margin-bottom:28px">
        FINNOTIA
      </div>

      <h2 style="color:#fff;font-size:30px;font-weight:800;
        line-height:1.2;margin:0 0 16px">
        Want the Full<br/>Picture?
      </h2>

      <p style="color:rgba(255,255,255,0.45);font-size:15px;
        line-height:1.65;max-width:280px;margin:0 0 40px">
        Complete analysis with data, charts &amp; expert breakdown.
      </p>

      <!-- Decorative divider -->
      <div style="width:48px;height:3px;border-radius:2px;
        background:${accent};opacity:0.4;margin-bottom:40px"></div>

      <p style="color:rgba(255,255,255,0.2);font-size:11px;
        letter-spacing:0.5px">
        Tap the button below to read
      </p>
    </div>
  </amp-story-grid-layer>

  <!-- AMP CTA overlay — native tappable button -->
  <amp-story-cta-layer>
    <a href="${esc(url)}"
      style="background:${accent};color:#fff;font-size:15px;font-weight:700;
        padding:14px 36px;border-radius:50px;display:inline-block;
        text-decoration:none;letter-spacing:0.3px">
      Read Full Article →
    </a>
  </amp-story-cta-layer>
</amp-story-page>`;
}

// ── Route handler ─────────────────────────────────────────────────
export async function GET(request, { params }) {
  const slug = params.slug;

  try {
    const article = await getArticle(slug);
    if (!article) {
      return new Response('Story not found', { status: 404 });
    }

    const { fm, htmlContent } = article;
    const accent = CAT_COLOR[fm.category?.toLowerCase()] || '#2563EB';
    const h2s    = extractH2s(htmlContent);
    const cover  = fm.image_url || 'https://finnotia.com/og-image.png';

    // Build slides — skip null ones
    const slides = [
      slide1_cover(fm, accent),
      slide2_hook(fm, accent),
      slide3_keyfacts(fm, accent),
      slide4_bullcase(fm),
      slide5_bearcase(fm),
      slide6_deepdive(h2s, accent),
      slide7_cta(fm, slug, accent),
    ].filter(Boolean);

    const storyUrl  = `https://finnotia.com/blog/${slug}/story`;
    const articleUrl = `https://finnotia.com/blog/${slug}`;

    const html = `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <script async custom-element="amp-video"
    src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
  <title>${esc(fm.title)} | Finnotia</title>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="${storyUrl}">
  <meta name="description" content="${esc((fm.excerpt || '').slice(0, 155))}">

  <!-- OG for WhatsApp/Twitter preview -->
  <meta property="og:title"       content="${esc(fm.title)}">
  <meta property="og:description" content="${esc((fm.excerpt || '').slice(0, 155))}">
  <meta property="og:image"       content="${esc(cover)}">
  <meta property="og:type"        content="article">
  <meta property="og:url"         content="${storyUrl}">

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;animation:none}</style></noscript>

  <style amp-custom>
    *  { box-sizing:border-box; margin:0; padding:0; }
    amp-story { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
    amp-story-page { background:#0B0F19; }
  </style>
</head>
<body>
<amp-story standalone
  title="${esc(fm.title)}"
  publisher="Finnotia Research"
  publisher-logo-src="https://finnotia.com/finnotia-logo.png"
  poster-portrait-src="${esc(cover)}"
  poster-landscape-src="${esc(cover)}"
  poster-square-src="${esc(cover)}">

  ${slides.join('\n')}

  <!-- Bookend -->
  <amp-story-bookend layout="nodisplay">
    <script type="application/json">
    {
      "bookendVersion": "v1.0",
      "shareProviders": [
        "whatsapp",
        "twitter",
        { "provider": "link" }
      ],
      "components": [
        {
          "type": "heading",
          "text": "Read the Full Analysis"
        },
        {
          "type": "small",
          "title": "${esc(fm.title)}",
          "url": "${articleUrl}",
          "image": "${esc(cover)}"
        },
        {
          "type": "heading",
          "text": "More Research"
        },
        {
          "type": "small",
          "title": "Browse all articles",
          "url": "https://finnotia.com/blog",
          "image": "https://finnotia.com/finnotia-logo.png"
        }
      ]
    }
    </script>
  </amp-story-bookend>

</amp-story>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
      },
    });

  } catch (err) {
    console.error('[AMP Story]', err);
    return new Response('Error generating story: ' + err.message, { status: 500 });
  }
}