// src/app/blog/[slug]/page.js
// Server Component — reads .md file by slug, renders markdown

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';
import { generateArticleSchema } from '../../../lib/seo-metadata';

async function getArticle(slug) {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const file = files.find((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const { data } = matter(raw);
    return data.slug === slug || f.replace(/\.md$/, '') === slug;
  });

  if (!file) return null;

  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data: frontmatter, content } = matter(raw);

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  const htmlContent = processed.toString();

  return { frontmatter, htmlContent };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return { slug: data.slug || f.replace(/\.md$/, '') };
    });
}

// ── generateMetadata — full SEO (was very basic before) ──────────────────────
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };

  const { frontmatter: fm } = article;
  const slug    = params.slug;
  const url     = `https://finnotia.com/blog/${slug}`;
  const title   = fm.seo_title    || fm.title;
  const desc    = fm.seo_description || fm.excerpt || '';
  const image   = fm.image_url    || 'https://finnotia.com/og-image.png';
  const tags    = fm.tags || [];

  return {
    title,
    description: desc,

    // Keywords from article tags — boosts long-tail ranking
    keywords: tags.length > 0 ? tags.join(', ') : undefined,

    // Canonical URL — critical to avoid duplicate content penalty
    alternates: {
      canonical: url,
    },

    // Open Graph (og:type = article for blog posts — was 'website' before)
    openGraph: {
      title,
      description: desc,
      url,
      siteName: 'FINNOTIA',
      type: 'article',              // ← correct type for blog posts
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      // Article-specific OG tags — LinkedIn, Facebook, WhatsApp previews
      publishedTime:  fm.date     || undefined,
      modifiedTime:   fm.updatedAt || fm.date || undefined,
      authors:        ['https://finnotia.com'],
      section:        fm.category || 'Finance',
      tags,
    },

    // Twitter / X card
    twitter: {
      card:        'summary_large_image',
      title,
      description: desc,
      images:      [image],
      site:        '@finnotia',
    },

    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:                true,
        follow:               true,
        'max-video-preview':  -1,
        'max-image-preview':  'large',
        'max-snippet':        -1,
      },
    },
  };
}

export const revalidate = 60;

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const { frontmatter: fm, htmlContent } = article;
  const slug = params.slug;

  // ── BlogPosting JSON-LD structured data ──────────────────────────────────
  // This is what gets you rich results in Google Search (article cards)
  const articleSchema = generateArticleSchema(fm, slug);

  // ── BreadcrumbList schema — helps Google understand site structure ─────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://finnotia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://finnotia.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: fm.title,
        item: `https://finnotia.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* BlogPosting structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleClient frontmatter={fm} htmlContent={htmlContent} />
    </>
  );
}