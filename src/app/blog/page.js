// src/app/blog/page.js
// Server Component — reads real .md files from content/articles/

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogClient from './BlogClient';
import { seoConfig, structuredData } from '../../lib/seo-metadata';

// ── SEO Metadata (was missing — Google couldn't understand this page) ─────────
export const metadata = {
  title: 'Finance Blog - Market Analysis, IPO & Economy | FINNOTIA Research',
  description:
    'Data-driven financial analysis covering global markets, IPOs, macroeconomics, commodities, and corporate finance. Written for readers who think in numbers.',
  keywords: [
    'Finance blog India',
    'Stock market analysis',
    'IPO analysis blog',
    'Market research articles',
    'Economy news analysis',
    'Investment education',
    'Financial analysis articles',
    'Commodity market blog',
    'Mutual fund analysis',
    'Finnotia research',
    'Market insights blog',
    'Corporate finance news',
  ].join(', '),
  alternates: {
    canonical: 'https://www.finnotia.com/blog',
  },
  openGraph: {
    title: 'Finance Blog - Market Analysis, IPO & Economy | FINNOTIA Research',
    description:
      'Data-driven financial analysis covering global markets, IPOs, macroeconomics, commodities, and corporate finance.',
    url: 'https://www.finnotia.com/blog',
    siteName: 'FINNOTIA',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.finnotia.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FINNOTIA Research - Finance Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Blog - Market Analysis, IPO & Economy | FINNOTIA',
    description:
      'Data-driven financial analysis covering global markets, IPOs, macroeconomics, commodities, and corporate finance.',
    site: '@finnotia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function getArticles() {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep')
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug:      data.slug      || filename.replace(/\.md$/, ''),
        title:     data.title     || 'Untitled',
        excerpt:   data.excerpt   || '',
        category:  data.category  || 'Markets',
        readTime:  parseInt(data.readTime) || 5,
        date:      data.date      || '',
        image_url: data.image_url || '',
        tags:      data.tags      || [],
        sentiment: data.sentiment || '',
        region:    data.region    || '',
        style:     data.style     || '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const revalidate = 60; // ISR: rebuild every 60s

export default function BlogPage() {
  const articles = getArticles();

  // Blog listing JSON-LD schema
  const jsonLd = {
    ...structuredData.blog,
    blogPost: articles.slice(0, 10).map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `https://www.finnotia.com/blog/${a.slug}`,
      datePublished: a.date,
      image: a.image_url || 'https://www.finnotia.com/og-image.png',
      articleSection: a.category,
      keywords: (a.tags || []).join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient articles={articles} />
    </>
  );
}