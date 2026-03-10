// src/app/api/revalidate-sitemap/route.js
// Deploy ke baad Bing ko ping karta hai
// Google ping deprecated hai — removed

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // ✅ Bing ping — still works
    const bingPing = await fetch(
      'https://www.bing.com/ping?sitemap=https://finnotia.com/sitemap.xml'
    );

    // ❌ Google ping REMOVED — deprecated March 2023
    // Submit via Search Console: https://search.google.com/search-console/sitemaps

    return NextResponse.json({
      success: true,
      bing:    bingPing.status,
      google:  'deprecated — use Search Console',
      message: 'Bing pinged. Submit sitemap in Google Search Console for Google.',
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}