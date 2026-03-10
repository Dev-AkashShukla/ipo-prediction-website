// scripts/ping-search-engines.js
// postbuild mein run hota hai: "postbuild": "next-sitemap && node scripts/ping-search-engines.js"
//
// NOTE: Google ka sitemap ping (google.com/ping) March 2023 mein OFFICIALLY DEPRECATED ho gaya.
// Ab sirf Bing ping kaam karta hai.
// Google Search Console mein manually sitemap.xml submit karo — woh best practice hai.

const SITEMAP_URL = 'https://finnotia.com/sitemap.xml';

async function ping() {
  console.log('🔍 Pinging search engines...\n');

  // ✅ Bing ping — still works
  try {
    const res = await fetch(`https://www.bing.com/ping?sitemap=${SITEMAP_URL}`);
    console.log(`✅ Bing: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.log(`❌ Bing: ${err.message}`);
  }

  // ❌ Google ping REMOVED — deprecated since March 2023
  // Use Google Search Console to submit sitemap instead:
  // https://search.google.com/search-console → Sitemaps → Submit

  console.log('\n📌 Done! Submit sitemap manually in Google Search Console for fastest indexing.');
  console.log('   → https://search.google.com/search-console/sitemaps');
}

ping();