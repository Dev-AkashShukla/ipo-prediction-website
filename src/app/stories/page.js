// src/app/stories/page.js
import StoriesClient from './StoriesClient';
import { getStories } from '../../lib/stories';

export const metadata = {
  title: 'Market Stories — Latest Finance News | FINNOTIA',
  description: 'Bite-sized market stories on stocks, IPOs, commodities and economy. Latest financial news from India and global markets.',
  alternates: { canonical: 'https://www.finnotia.com/stories' },
  openGraph: {
    title: 'Market Stories | FINNOTIA',
    description: 'Latest financial news — stocks, IPOs, commodities, economy.',
    url: 'https://www.finnotia.com/stories',
    siteName: 'FINNOTIA',
    type: 'website',
    images: [{ url: 'https://www.finnotia.com/og-image.png', width: 1200, height: 630 }],
  },
  robots: {
    index: true, follow: true, 'max-image-preview': 'large',
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const revalidate = 60;

export default function StoriesPage() {
  const stories = getStories();
  const date    = new Date().toISOString().split('T')[0];
  return <StoriesClient stories={stories} date={date} />;
}