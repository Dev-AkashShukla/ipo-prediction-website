// src/app/blog/[slug]/page.js
// Server Component — reads .md file by slug, renders markdown

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';

async function getArticle(slug) {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return null;

  // Find file by slug — filename may have date suffix
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const file  = files.find((f) => {
    const raw  = fs.readFileSync(path.join(dir, f), 'utf8');
    const { data } = matter(raw);
    return data.slug === slug || f.replace(/\.md$/, '') === slug;
  });

  if (!file) return null;

  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data: frontmatter, content } = matter(raw);

  // Convert markdown body to HTML
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

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };
  const { frontmatter: fm } = article;
  return {
    title:       fm.seo_title    || fm.title,
    description: fm.seo_description || fm.excerpt,
    openGraph: {
      title:       fm.seo_title || fm.title,
      description: fm.excerpt,
      images:      fm.image_url ? [fm.image_url] : [],
      type:        'article',
      publishedTime: fm.date,
    },
  };
}

export const revalidate = 60;

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();
  return <ArticleClient frontmatter={article.frontmatter} htmlContent={article.htmlContent} />;
}