// scripts/ping-search-engines.js
// package.json mein add karo: "postbuild": "node scripts/ping-search-engines.js"
// Ya Vercel deploy ke baad manually: node scripts/ping-search-engines.js

const SITEMAP_URL = 'https://finnotia.com/sitemap.xml';

async function ping() {
  console.log('🔍 Pinging search engines...\n');

  const engines = [
    { name: 'Google', url: `https://www.google.com/ping?sitemap=${SITEMAP_URL}` },
    { name: 'Bing',   url: `https://www.bing.com/ping?sitemap=${SITEMAP_URL}` },
  ];

  for (const engine of engines) {
    try {
      const res = await fetch(engine.url);
      console.log(`✅ ${engine.name}: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.log(`❌ ${engine.name}: ${err.message}`);
    }
  }

  console.log('\n📌 Sitemap ping complete! Google typically takes 2-7 days to crawl new URLs.');
  
  // Bonus: Hit your own revalidation endpoint
  try {
    const res = await fetch('https://finnotia.com/api/revalidate-sitemap');
    console.log(`✅ Self-ping: ${res.status}`);
  } catch {}
}

ping();