// src/app/stories/[slug]/route.js
// AMP Story v2 — Hero stat, rich cards, smart content extraction
// Image TOP → Hero number → Cards fill viewport → Tags

const AZURE_API = 'https://finnotia-ai-service.azurewebsites.net/api/local/news/micro/latest';

const IMGS = {
  stock:    ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'],
  energy:   ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80'],
  banking:  ['https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'],
  tech:     ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'],
  auto:     ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80'],
  pharma:   ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80'],
  infra:    ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80'],
  finance:  ['https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'],
  policy:   ['https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'],
  shipping: ['https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80'],
  default:  ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80'],
};
const KW = {
  stock:    ['nifty','sensex','bse','nse','stock','equity','share','ipo','rupee'],
  energy:   ['energy','oil','gas','petroleum','crude','opec','iran','strait','fuel','coal','power'],
  banking:  ['bank','rbi','hdfc','icici','sbi','loan','deposit','interest','credit'],
  tech:     ['tech','technology','software','digital','cyber','cloud','google','microsoft'],
  auto:     ['auto','car','vehicle','motor','ev','electric','tata motors','maruti'],
  pharma:   ['pharma','drug','medicine','healthcare','hospital','vaccine','cipla'],
  infra:    ['infra','infrastructure','construction','road','highway','steel','railway','hal'],
  finance:  ['financial','investment','mutual fund','gold','silver','commodity'],
  policy:   ['policy','government','ministry','budget','tax','gst','reform','sebi'],
  shipping: ['shipping','port','cargo','logistics','freight','container','lng','tanker'],
};

function getCat(hl, tags) {
  const t = (hl + ' ' + (tags || []).join(' ')).toLowerCase();
  let best = 'default', bs = 0;
  for (const [c, kws] of Object.entries(KW)) {
    let s = 0;
    for (const k of kws) if (t.includes(k)) s += k.length > 5 ? 2 : 1;
    if (s > bs) { bs = s; best = c; }
  }
  return best;
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return Math.abs(h); }
function getImg(hl, tags) { const pool = IMGS[getCat(hl, tags)] || IMGS.default; return pool[hash(hl) % pool.length]; }

function makeSlug(headline, updateId) {
  return `${updateId}-${(headline || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60)}`;
}

function esc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Smart hero stat extraction ──
// Finds the most impactful number/stat from key_points or headline
function extractHeroStat(story) {
  const allText = [
    story.headline || '',
    ...(story.key_points || []),
    story.quick_summary || '',
  ].join(' ');

  // Match patterns: $13.2bn, ₹91.49, 8.6%, Rs 1,66,199, 550,000 bpd, 25 days, etc.
  const patterns = [
    /(?:USD?\s*|₹|Rs\.?\s*)[\d,]+(?:\.\d+)?(?:\s*(?:bn|billion|mn|million|cr|crore|lakh|trillion|bpd|\/day|\/oz|\/L|per\s+\w+))?/gi,
    /\$[\d,]+(?:\.\d+)?(?:\s*(?:bn|billion|mn|million|cr|crore|trillion|bpd|\/day|\/oz))?/gi,
    /[\d,]+(?:\.\d+)?%/g,
    /[\d,]+(?:\.\d+)?\s*(?:MMT|bpd|crore|days|months|lakh|man-hours)/gi,
  ];

  let bestMatch = null;
  let bestLen = 0;
  for (const p of patterns) {
    const matches = allText.match(p);
    if (matches) {
      for (const m of matches) {
        if (m.length > bestLen) {
          bestMatch = m.trim();
          bestLen = m.length;
        }
      }
    }
  }
  return bestMatch;
}

// ── Pick the best summary text (prefer longer) ──
function getBestSummary(story) {
  const detailed = story.detailed_summary || '';
  const quick = story.quick_summary || '';
  // Use detailed if it's meaningfully longer, else quick
  if (detailed.length > quick.length + 20) return detailed;
  return quick || detailed;
}

const SENT = {
  POSITIVE: { accent: '#22c55e', dim: 'rgba(34,197,94,0.10)', brd: 'rgba(34,197,94,0.25)', icon: '📈', label: 'Positive', badge: '#15803d', glow: 'rgba(34,197,94,0.06)' },
  NEGATIVE: { accent: '#ef4444', dim: 'rgba(239,68,68,0.10)', brd: 'rgba(239,68,68,0.25)', icon: '📉', label: 'Negative', badge: '#b91c1c', glow: 'rgba(239,68,68,0.06)' },
  NEUTRAL:  { accent: '#eab308', dim: 'rgba(234,179,8,0.10)',  brd: 'rgba(234,179,8,0.25)',  icon: '➡️', label: 'Neutral',  badge: '#a16207', glow: 'rgba(234,179,8,0.06)' },
};

export async function GET(request, { params }) {
  const { slug: reqSlug } = params;
  try {
    const res = await fetch(AZURE_API, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const raw = await res.json();
    const updates = raw?.data?.updates || raw?.updates || [];

    let story = null;
    for (const u of updates) {
      for (const item of (u.news_items || [])) {
        if (makeSlug(item.headline, u.update_id) === reqSlug) {
          story = { ...item, update_id: u.update_id, generated_at: u.generated_at };
          break;
        }
      }
      if (story) break;
    }
    if (!story) return new Response('Not found', { status: 404 });

    const S        = SENT[story.sentiment] || SENT.NEUTRAL;
    const imgUrl   = getImg(story.headline, story.tags);
    const canon    = `https://finnotia.com/stories/${reqSlug}`;
    const kps      = (story.key_points || []).slice(0, 4);
    const tags     = (story.tags || []).slice(0, 4);
    const heroStat = extractHeroStat(story);
    const summary  = getBestSummary(story);
    const impact   = story.what_it_means || '';
    const context  = story.context || '';

    // Merge context into impact if both are short (saves space, fills cards)
    const mergedImpact = (impact && context && impact.length < 100 && context.length < 80)
      ? `${impact} ${context}`
      : impact;
    const showContext = !(impact && context && impact.length < 100 && context.length < 80) && context;

    const html = `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <title>${esc(story.headline)} | Finnotia</title>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="${canon}">
  <meta name="description" content="${esc((story.quick_summary || '').slice(0, 155))}">
  <meta property="og:title" content="${esc(story.headline)}">
  <meta property="og:image" content="${imgUrl}">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    *{box-sizing:border-box;margin:0;padding:0}
    amp-story{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  </style>
</head>
<body>
<amp-story standalone
  title="${esc(story.headline)}"
  publisher="Finnotia"
  publisher-logo-src="https://finnotia.com/finnotia-logo.png"
  poster-portrait-src="${imgUrl}">

<amp-story-page id="s">

  <!-- Dark base -->
  <amp-story-grid-layer template="fill">
    <div style="width:100%;height:100%;background:#080d19"></div>
  </amp-story-grid-layer>

  <!-- Subtle accent glow at top of content area -->
  <amp-story-grid-layer template="fill">
    <div style="position:absolute;top:25%;left:0;right:0;height:15%;
      background:radial-gradient(ellipse at center,${S.glow} 0%,transparent 70%)"></div>
  </amp-story-grid-layer>

  <!-- Main layout -->
  <amp-story-grid-layer template="fill">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;
      display:flex;flex-direction:column">

      <!-- ═══════════ IMAGE TOP 26% ═══════════ -->
      <div style="position:relative;width:100%;height:26%;flex-shrink:0;overflow:hidden">
        <amp-img src="${imgUrl}" width="720" height="405"
          layout="fill" object-fit="cover"></amp-img>

        <!-- Smooth dissolve -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:75%;
          background:linear-gradient(to bottom,
            transparent 0%,rgba(8,13,25,0.2) 25%,
            rgba(8,13,25,0.6) 55%,#080d19 100%)"></div>
        <div style="position:absolute;top:0;left:0;right:0;height:40%;
          background:linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)"></div>

        <!-- FINNOTIA -->
        <div style="position:absolute;top:8px;left:10px;
          background:${S.badge};color:#fff;font-size:7px;font-weight:800;
          letter-spacing:1px;padding:3px 6px;border-radius:3px">FINNOTIA</div>

        <!-- Sentiment -->
        <div style="position:absolute;top:8px;right:10px;
          background:rgba(0,0,0,0.55);border:1px solid ${S.brd};
          color:${S.accent};font-size:8px;font-weight:600;
          padding:3px 8px;border-radius:4px">
          ${S.icon} ${S.label}</div>

        <!-- Headline on image -->
        <div style="position:absolute;bottom:4px;left:12px;right:12px">
          <h1 style="font-size:14px;font-weight:800;line-height:1.25;color:#fff;
            text-shadow:0 2px 6px rgba(0,0,0,0.9)">${esc(story.headline)}</h1>
        </div>
      </div>

      <!-- ═══════════ CONTENT 74% ═══════════ -->
      <div style="flex:1;padding:6px 12px 8px;
        display:flex;flex-direction:column;gap:6px;overflow:hidden">

        <!-- Meta + Hero Stat row -->
        <div animate-in="fade-in" style="display:flex;align-items:center;gap:6px;
          flex-wrap:wrap">
          <span style="font-size:9px;color:rgba(255,255,255,0.35)">
            ⏱ ${esc(story.published_time || 'Just now')}</span>
          <span style="font-size:8px;font-weight:700;color:#fff;
            padding:2px 7px;border-radius:3px;background:${S.badge}">
            ${story.importance}</span>
          ${heroStat ? `
          <span style="margin-left:auto;font-size:14px;font-weight:900;
            color:${S.accent};letter-spacing:-0.5px;
            text-shadow:0 0 12px ${S.dim}">${esc(heroStat)}</span>
          ` : ''}
        </div>

        <!-- KEY TAKEAWAYS — bullet style -->
        ${kps.length > 0 ? `
        <div animate-in="fade-in" animate-in-delay="0.08s"
          style="background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.07);
            border-left:3px solid ${S.accent};
            border-radius:8px;padding:9px 11px">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.8px;
            color:${S.accent};margin-bottom:6px">🎯 KEY TAKEAWAYS</div>
          ${kps.map(pt => `
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
            <div style="width:4px;height:4px;border-radius:50%;
              background:${S.accent};flex-shrink:0;
              box-shadow:0 0 4px ${S.accent}"></div>
            <span style="font-size:11px;color:rgba(255,255,255,0.85);
              line-height:1.3">${esc(pt)}</span>
          </div>`).join('')}
        </div>
        ` : ''}

        <!-- WHAT HAPPENED — uses best summary -->
        ${summary ? `
        <div animate-in="fade-in" animate-in-delay="0.16s"
          style="background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.07);
            border-left:3px solid rgba(255,255,255,0.12);
            border-radius:8px;padding:9px 11px;flex:1;min-height:0">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.8px;
            color:rgba(255,255,255,0.4);margin-bottom:5px">📰 WHAT HAPPENED</div>
          <p style="font-size:12px;line-height:1.6;color:rgba(255,255,255,0.8);
            font-weight:300">${esc(summary)}</p>
        </div>
        ` : ''}

        <!-- BUSINESS IMPACT — accent highlighted -->
        ${mergedImpact ? `
        <div animate-in="fade-in" animate-in-delay="0.24s"
          style="background:${S.dim};
            border:1px solid ${S.brd};
            border-left:3px solid ${S.accent};
            border-radius:8px;padding:9px 11px">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.8px;
            color:${S.accent};margin-bottom:5px">💡 BUSINESS IMPACT</div>
          <p style="font-size:12px;line-height:1.55;color:rgba(255,255,255,0.85)">
            ${esc(mergedImpact)}</p>
          <p style="font-size:7px;color:rgba(255,255,255,0.2);margin-top:4px;
            font-style:italic">*Business event analysis, not a stock prediction.</p>
        </div>
        ` : ''}

        <!-- CONTEXT — only if not merged above -->
        ${showContext ? `
        <div animate-in="fade-in" animate-in-delay="0.32s"
          style="background:rgba(255,255,255,0.02);
            border:1px solid rgba(255,255,255,0.05);
            border-left:3px solid rgba(255,255,255,0.08);
            border-radius:8px;padding:8px 11px">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.8px;
            color:rgba(255,255,255,0.3);margin-bottom:3px">🔍 CONTEXT</div>
          <p style="font-size:11px;line-height:1.5;color:rgba(255,255,255,0.55)">
            ${esc(context)}</p>
        </div>
        ` : ''}

        <!-- Tags — pushed to bottom -->
        ${tags.length > 0 ? `
        <div animate-in="fade-in" animate-in-delay="0.38s"
          style="margin-top:auto;display:flex;gap:4px;flex-wrap:wrap;
            padding-top:4px;border-top:1px solid rgba(255,255,255,0.04)">
          ${tags.map(t => `<span style="padding:2px 7px;border-radius:4px;
            background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
            color:rgba(255,255,255,0.3);font-size:8px">#${esc(t)}</span>`).join('')}
        </div>
        ` : ''}

      </div>
    </div>
  </amp-story-grid-layer>

</amp-story-page>

<amp-story-bookend src="https://finnotia.com/bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      },
    });

  } catch (err) {
    console.error('[Story]', err.message);
    return new Response('Error: ' + err.message, { status: 500 });
  }
}