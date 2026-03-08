// src/app/blog/page.js
// Server Component — reads real .md files from content/articles/

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogClient from './BlogClient';

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
        slug:     data.slug     || filename.replace(/\.md$/, ''),
        title:    data.title    || 'Untitled',
        excerpt:  data.excerpt  || '',
        category: data.category || 'Markets',
        readTime: parseInt(data.readTime) || 5,
        date:     data.date     || '',
        image_url: data.image_url || '',
        tags:     data.tags     || [],
        sentiment: data.sentiment || '',
        region:   data.region   || '',
        style:    data.style    || '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const revalidate = 60; // ISR: rebuild every 60s

export default function BlogPage() {
  const articles = getArticles();
  return <BlogClient articles={articles} />;
}