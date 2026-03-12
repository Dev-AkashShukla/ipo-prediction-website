/** @type {import('next-sitemap').IConfig} */
// next-sitemap.config.js

module.exports = {
  siteUrl: 'https://www.finnotia.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  exclude: [
    '/api/*',
    '/_next/*',
    '/holi',
    '/delete-account',
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
      'https://www.finnotia.com/sitemap-stories.xml',  // Web Stories
      'https://www.finnotia.com/sitemap-news.xml',     // ✅ Regular articles for Google News
    ],
  },

  transform: async (config, path) => {
    if (path === '/') {
      return { loc: path, changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() };
    }
    if (['/blog', '/stories'].includes(path)) {
      return { loc: path, changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() };
    }
    if (path.startsWith('/blog/') && path.endsWith('/story')) {
      return { loc: path, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() };
    }
    if (path.startsWith('/blog/') && !path.endsWith('/story')) {
      return { loc: path, changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() };
    }
    if (path.startsWith('/category/')) {
      return { loc: path, changefreq: 'daily', priority: 0.75, lastmod: new Date().toISOString() };
    }
    if (['/editorial-policy', '/sitemap'].includes(path)) {
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
    }
    if (['/download', '/about'].includes(path)) {
      return { loc: path, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
    }
    if (path === '/founder' || path.startsWith('/author/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
    }
    if (path === '/contact') {
      return { loc: path, changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() };
    }
    if (['/privacy', '/terms', '/disclaimer'].includes(path)) {
      return { loc: path, changefreq: 'monthly', priority: 0.3, lastmod: new Date().toISOString() };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};