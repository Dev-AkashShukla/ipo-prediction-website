// src/app/api/revalidate-sitemap/route.js
// Vercel deploy hone ke baad Google ko ping karta hai ki sitemap update hua
// 
// USE: Vercel Dashboard → Settings → Deploy Hooks → ya
//      package.json mein postbuild script add karo

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Google ko ping karo — "bhai sitemap update hua, crawl kar"
    const googlePing = await fetch(
      'https://www.google.com/ping?sitemap=https://finnotia.com/sitemap.xml'
    );

    // Bing ko bhi ping karo (free mein extra indexing)
    const bingPing = await fetch(
      'https://www.bing.com/ping?sitemap=https://finnotia.com/sitemap.xml'
    );

    return NextResponse.json({
      success: true,
      google: googlePing.status,
      bing: bingPing.status,
      message: 'Sitemap ping sent to Google & Bing',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}