// FILE: lib/founder-data.js

import { seoConfig } from './seo-metadata';

// ── SEO Metadata ──────────────────────────────────────────────
export const founderMetadata = {
  title: 'Akash Shukla - Founder of Finnotia | Software Developer & Content Creator',
  description:
    'Akash Shukla is the Founder of Finnotia, a Full Stack Developer, and a YouTube creator with 1M+ subscribers. Building AI-powered financial tools for India.',
  keywords: [
    'Akash Shukla',
    'Akash Shukla Finnotia',
    'Akash Shukla YouTube',
    'Akash Shukla developer',
    'Akash Shukla software engineer',
    'Akash Shukla Kolkata',
    'Finnotia founder',
  ],
  openGraph: {
    title: 'Akash Shukla - Founder of Finnotia',
    description:
      'Akash Shukla is the Founder of Finnotia, Full Stack Developer, and YouTube creator with 1M+ subscribers.',
    url: `${seoConfig.siteUrl}/founder`,
    type: 'profile',
    images: [
      {
        url: `${seoConfig.siteUrl}/akash-shukla.jpg`,
        width: 800,
        height: 800,
        alt: 'Akash Shukla - Founder of Finnotia',
      },
    ],
    profile: { firstName: 'Akash', lastName: 'Shukla', username: 'i_amakashs' },
  },
  twitter: {
    card: 'summary',
    title: 'Akash Shukla - Founder of Finnotia',
    description: 'Founder of Finnotia | Full Stack Developer | YouTube Creator with 1M+ Subscribers',
    images: [`${seoConfig.siteUrl}/akash-shukla.jpg`],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/founder`,
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
  name: 'Akash Shukla',
  givenName: 'Akash',
  familyName: 'Shukla',
  description:
    'Founder of Finnotia, Full Stack Developer, and YouTube content creator with over 1 million subscribers based in Kolkata, India.',
  url: `${seoConfig.siteUrl}/founder`,
  image: `${seoConfig.siteUrl}/akash-shukla.jpg`,
  jobTitle: 'Founder & Software Developer',
  worksFor: { '@type': 'Organization', name: 'Finnotia', url: seoConfig.siteUrl },
  sameAs: [
    'https://www.youtube.com/@i_amakashs',
    'https://www.youtube.com/channel/UCBGPCsbo4DHW8AplgzlWJmw',
    'https://www.linkedin.com/in/akash-shukla-dev/',
    'https://www.instagram.com/i_amakashs/',
    'https://www.wikidata.org/wiki/Q138456571',
  ],
  knowsAbout: [
    'Full Stack Development', 'Next.js', 'React', 'Python', 'FastAPI',
    'Azure', 'MongoDB', 'Firebase', 'AI Development',
    'Indian Stock Market', 'IPO Tracking', 'Financial Technology', 'Content Creation',
  ],
  nationality: { '@type': 'Country', name: 'India' },
  address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'India' },
  award: ['YouTube Silver Play Button (100K Subscribers)', 'YouTube Gold Play Button (1M Subscribers)'],
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Finnotia',
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
  founder: {
    '@type': 'Person',
    '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
    name: 'Akash Shukla',
  },
  foundingDate: '2025',
  description:
    'AI-powered Indian market information platform for IPOs, stocks, mutual funds, and financial news.',
};

// ── Highlights (What I Do) ────────────────────────────────────
export const highlights = [
  {
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    title: 'Founder of Finnotia',
    description: 'AI-powered IPO tracking & financial information platform for India',
  },
  {
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
    title: 'Full Stack Developer',
    description: 'Expertise in Next.js, Python, FastAPI, Azure & MongoDB',
  },
  {
    iconBg: 'bg-[#FF0000]',
    title: '1M+ YouTube Subscribers',
    description: 'Creating tech & entertainment content',
  },
  {
    iconBg: 'bg-gradient-to-b from-[#FF9933] via-white to-[#138808]',
    title: 'Building for India',
    description: 'Creating tools to simplify Indian financial markets',
  },
];

// ── Journey / Timeline ────────────────────────────────────────
export const journey = [
  {
    year: '2026',
    title: 'On a Mission',
    description:
      'Focused on making Finnotia the go-to platform for Indian retail investors. Building in public, shipping fast, and helping people make better financial decisions.',
  },
  {
    year: '2025',
    title: 'Founded Finnotia',
    description:
      'Launched AI-powered IPO tracking platform to help Indians understand markets better.',
  },
  {
    year: '2024',
    title: 'Associate Software Engineer',
    description:
      'Worked at Indiminds Technology LLP building enterprise applications with React, FastAPI & Azure.',
  },
  {
    year: '2023',
    title: 'Started Professional Development',
    description:
      'Began full-stack development journey with React, Next.js, Python, and cloud technologies.',
  },
  {
    year: '2022',
    title: '1 Million YouTube Subscribers',
    description: 'YouTube channel crossed 1 million subscribers milestone.',
  },
];

// ── Social Links ──────────────────────────────────────────────
export const socialLinks = [
  {
    label: '1M+ Subscribers',
    href: 'https://www.youtube.com/@i_amakashs',
    className: 'bg-red-500 hover:bg-red-600',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akash-shukla-dev/',
    className: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/i_amakashs/',
    className: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90',
  },
];