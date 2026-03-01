// src/app/holi/page.js
import { seoConfig } from '../../lib/seo-metadata';
import HoliClient from './HoliClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Happy Holi 2026 🎨 | Send Free Colorful Wishes | FINNOTIA',
  description:
    'Send beautiful personalized Holi wishes to your friends & family! Splash colors, share on WhatsApp & celebrate the festival of colors. Free Holi greeting card maker by FINNOTIA.',
  keywords: [
    'Happy Holi 2026',
    'Holi wishes online',
    'Send Holi greeting free',
    'Holi wish maker',
    'Holi greeting card',
    'WhatsApp Holi wish',
    'personalized Holi wish',
    'festival of colors',
    'Holi celebration online',
    'FINNOTIA Holi',
    'free Holi greeting',
    'Holi wishes with name',
  ],
  openGraph: {
    title: 'Happy Holi 2026 🎨 | Send Free Colorful Wishes',
    description:
      'Send personalized Holi wishes with stunning color splash effects! Share on WhatsApp, Telegram & more.',
    url: `${seoConfig.siteUrl}/holi`,
    siteName: seoConfig.siteName,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-holi.png',
        width: 1200,
        height: 630,
        alt: 'Happy Holi 2026 - FINNOTIA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Holi 2026 🎨 | Send Free Colorful Wishes',
    description:
      'Send personalized Holi wishes with color splash effects! Free greeting card maker.',
    images: ['/og-holi.png'],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/holi-2026`,
  },
};

export default function HoliPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <HoliClient />
    </Suspense>
  );
}