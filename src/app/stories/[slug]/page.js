// src/app/stories/[slug]/page.js
import { notFound } from 'next/navigation';
import StoryPageClient from './StoryPageClient';
import { getStory } from '../../../lib/stories';

export async function generateMetadata({ params }) {
  const story = getStory(params.slug);
  if (!story) return { title: 'Story Not Found' };

  const ogImage = story.image_url_og
    ? [{ url: story.image_url_og, width: 1200, height: 630 }]
    : [{ url: 'https://finnotia.com/og-image.png', width: 1200, height: 630 }];

  return {
    title: `${story.headline} | FINNOTIA`,
    description: story.quick_summary || story.headline,
    keywords: [
      ...(story.tags || []),
      story.category,
      'market news',
      'financial news India',
      'FINNOTIA',
    ].filter(Boolean),
    alternates: { canonical: `https://finnotia.com/stories/${params.slug}` },
    openGraph: {
      title: story.headline,
      description: story.quick_summary || story.headline,
      url: `https://finnotia.com/stories/${params.slug}`,
      siteName: 'FINNOTIA',
      type: 'article',
      publishedTime: story.date || undefined,
      authors: ['https://finnotia.com'],
      tags: story.tags || [],
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: story.headline,
      description: story.quick_summary || story.headline,
      images: ogImage,
      site: '@finnotia',
    },
  };
}

export const revalidate = 60;

export default function StoryPage({ params }) {
  const story = getStory(params.slug);
  if (!story) notFound();

  // ── NewsArticle JSON-LD ──────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.headline,
    description: story.quick_summary || story.headline,
    url: `https://finnotia.com/stories/${story.slug}`,
    datePublished: story.date || undefined,
    dateModified: story.date || undefined,
    image: story.image_url_og
      ? [story.image_url_og]
      : ['https://finnotia.com/og-image.png'],
    author: {
      '@type': 'Organization',
      name: 'FINNOTIA',
      url: 'https://finnotia.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FINNOTIA',
      url: 'https://finnotia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://finnotia.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://finnotia.com/stories/${story.slug}`,
    },
    keywords: (story.tags || []).join(', '),
    articleSection: story.category || 'Markets',
    inLanguage: 'en-IN',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryPageClient story={story} />
    </>
  );
}