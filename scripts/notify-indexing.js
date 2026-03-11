// scripts/notify-indexing.js
const fs   = require('fs');
const path = require('path');

// ✅ .env manually read karo — dotenv ki zaroorat nahi
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split('\n').forEach(line => {
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) process.env[key] = val;
    }
  });
}

const SITE_URL = 'https://finnotia.com';

function getRecentSlugs(max = 10) {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep')
    .map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      const dateMatch = content.match(/^date:\s*["']?(.+?)["']?\s*$/m);
      const slugMatch = content.match(/^slug:\s*["']?(.+?)["']?\s*$/m);
      return {
        slug: slugMatch ? slugMatch[1].trim() : f.replace('.md', ''),
        date: dateMatch ? new Date(dateMatch[1]) : new Date(0),
      };
    })
    .sort((a, b) => b.date - a.date)
    .slice(0, max)
    .map(a => `${SITE_URL}/blog/${a.slug}`);
}

async function notifyIndexNow() {
  const KEY = process.env.INDEXNOW_KEY;

  if (!KEY) {
    console.log('ℹ️  INDEXNOW_KEY not set — skipping. Add to .env to enable.');
    return;
  }

  const urls = getRecentSlugs(10);
  if (!urls.length) { console.log('ℹ️  No articles found'); return; }

  console.log(`\n📡 IndexNow: pinging ${urls.length} URLs...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'finnotia.com',
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList: urls,
      }),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow: submitted ${urls.length} URLs`);
      urls.forEach(u => console.log(`   → ${u}`));
    } else {
      console.log(`⚠️  IndexNow: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.log(`❌ IndexNow error: ${err.message}`);
  }
}

notifyIndexNow();