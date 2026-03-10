// src/app/stories/[slug]/page.js
import { notFound } from 'next/navigation';
import StoryPageClient from './StoryPageClient';
import { getStory } from '../../../lib/stories';

export async function generateMetadata({ params }) {
  const story = getStory(params.slug);
  if (!story) return { title: 'Story Not Found' };
  return {
    title: `${story.headline} | FINNOTIA`,
    description: story.quick_summary || story.headline,
    alternates: { canonical: `https://finnotia.com/stories/${params.slug}` },
    openGraph: {
      title: story.headline,
      description: story.quick_summary,
      url: `https://finnotia.com/stories/${params.slug}`,
      siteName: 'FINNOTIA',
      type: 'article',
      images: story.image_url_og
        ? [{ url: story.image_url_og, width: 1200, height: 630 }]
        : [{ url: 'https://finnotia.com/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 60;

export default function StoryPage({ params }) {
  const story = getStory(params.slug);
  if (!story) notFound();
  return <StoryPageClient story={story} />;
}