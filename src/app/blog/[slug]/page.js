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

const ARTICLES_DIR = () => path.join(process.cwd(), 'content', 'articles');

async function getArticle(slug) {
  const dir = ARTICLES_DIR();
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

// ── Related posts — same category, max 3, excluding current slug ─────────────
function getRelatedPosts(currentSlug, currentCategory) {
  const dir = ARTICLES_DIR();
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return {
        slug:      data.slug      || f.replace(/\.md$/, ''),
        title:     data.title     || 'Untitled',
        image_url: data.image_url || null,
        date:      data.date      || null,
        readTime:  data.readTime  || null,
        category:  data.category  || '',
      };
    })
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.category?.toLowerCase() === currentCategory?.toLowerCase(),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
}

export async function generateStaticParams() {
  const dir = ARTICLES_DIR();
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

// ── generateMetadata ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };

  const { frontmatter: fm } = article;
  const slug  = params.slug;
  const url   = `https://www.finnotia.com/blog/${slug}`;
  const title = fm.seo_title        || fm.title;
  const desc  = fm.seo_description  || fm.excerpt || '';
  const image = fm.image_url        || 'https://www.finnotia.com/og-image.png';
  const tags  = fm.tags             || [];

  return {
    title,
    description: desc,
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: 'FINNOTIA',
      type: 'article',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: fm.date      || undefined,
      modifiedTime:  fm.updatedAt || fm.date || undefined,
      authors: ['https://www.finnotia.com'],
      section: fm.category || 'Finance',
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [image],
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
}

export const revalidate = 60;

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const { frontmatter: fm, htmlContent } = article;
  const slug = params.slug;

  // Related posts — same category, max 3
  const relatedPosts = getRelatedPosts(slug, fm.category);

  // ── Structured data ───────────────────────────────────────────────────────
  const articleSchema = generateArticleSchema(fm, slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.finnotia.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog',  item: 'https://www.finnotia.com/blog' },
      { '@type': 'ListItem', position: 3, name: fm.title, item: `https://www.finnotia.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticleClient
        frontmatter={fm}
        htmlContent={htmlContent}
        relatedPosts={relatedPosts}
      />
    </>
  );
}