/** @type {import('next-sitemap').IConfig} */
// next-sitemap.config.js — UPDATED with editorial-policy, sitemap page, category & author pages
// FIX #6A APPLIED: Empty/thin category pages excluded, /delete-account excluded, /holi excluded

module.exports = {
  siteUrl: 'https://finnotia.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // FIX #6A: was just ['/api/*', '/_next/*', '/holi']
  exclude: [
    '/api/*',
    '/_next/*',
    '/holi',           // seasonal page — unnecessary for AdSense review
    '/delete-account', // utility page — not for indexing
    // Empty/thin categories — add back when 5+ articles exist
    '/category/crypto',
    '/category/geopolitics',
    '/category/tax',
    '/category/tech',
    '/category/investing',
    '/category/ipo',
    '/category/mutual-funds',
    '/category/markets',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/holi', '/delete-account'],
      },
    ],
    additionalSitemaps: [
      'https://finnotia.com/sitemap-stories.xml',
    ],
  },

  transform: async (config, path) => {
    // Homepage — highest priority
    if (path === '/') {
      return { loc: path, changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() };
    }

    // Core content pages
    if (['/blog', '/stories'].includes(path)) {
      return { loc: path, changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() };
    }

    // High-trust pages — AdSense reviewers check these
    if (['/editorial-policy', '/sitemap'].includes(path)) {
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
    }

    // Important product/company pages
    if (['/download', '/about', '/features'].includes(path)) {
      return { loc: path, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
    }

    // Founder / Author pages — E-E-A-T
    if (path === '/founder' || path.startsWith('/author/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
    }

    // Category pages (only non-excluded ones reach here)
    if (path.startsWith('/category/')) {
      return { loc: path, changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() };
    }

    // Blog articles
    if (path.startsWith('/blog/')) {
      return { loc: path, changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() };
    }

    // Contact
    if (path === '/contact') {
      return { loc: path, changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() };
    }

    // Legal pages
    if (['/privacy', '/terms', '/disclaimer', '/delete-account'].includes(path)) {
      return { loc: path, changefreq: 'monthly', priority: 0.3, lastmod: new Date().toISOString() };
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};