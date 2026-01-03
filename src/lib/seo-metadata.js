// src/lib/seo-metadata.js - SEBI Compliant Version

export const seoConfig = {
  siteName: 'FINNOTIA',
  siteUrl: 'https://finnotia.com',
  // ✅ FIXED: Removed "Analysis" and "Research"
  defaultTitle: 'FINNOTIA - AI-Powered IPO Tracker & Market Data Platform India 2025',
  defaultDescription: 'AI-powered IPO tracking platform for Indian investors. Get IPO updates, GMP tracking, stock market data, mutual fund information. Free educational tool for NSE/BSE.',
  defaultKeywords: [
    // Primary keywords (high search volume) - ✅ SAFE
    'IPO tracker app India',
    'IPO GMP today',
    'upcoming IPO India',
    'IPO listing dates',
    'mainboard IPO',
    'SME IPO list',
    'IPO subscription status',
    
    // Long-tail keywords - ✅ SAFE
    'IPO grey market premium tracking',
    'NSE BSE IPO calendar 2025',
    'IPO subscription status live',
    'IPO allotment status check',
    'upcoming IPO list India',
    'IPO GMP live updates',
    
    // Location-based - ✅ SAFE
    'IPO tracker India',
    'Indian stock market app',
    'NSE IPO updates',
    'BSE IPO tracker',
    
    // Brand keywords
    'FINNOTIA app',
    'FINNOTIA IPO tracker',
    'finnotia.com',
  ],
  twitterHandle: '@finnotia',
  organization: {
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    foundingDate: '2024',
    // ✅ FIXED: Safe description
    description: 'AI-powered IPO tracking and stock market information platform helping Indian users access market data for educational purposes',
    contactPoint: {
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
    },
  },
};

export const pageMetadata = {
  home: {
    // ✅ FIXED: Removed "Analysis" and "Research"
    title: 'IPO Tracker App India 2025 | AI-Powered Market Data - FINNOTIA',
    description: 'Track IPOs with AI-curated data. Get GMP updates, subscription status, listing dates, market news. Free educational tool for NSE/BSE - NOT investment advice.',
    keywords: [
      'IPO tracker app',
      'IPO GMP tracking',
      'upcoming IPO 2025',
      'mainboard IPO list',
      'SME IPO list',
      'NSE BSE IPO',
      'IPO listing dates',
      'grey market premium',
      'IPO subscription status',
      'stock market app India',
      'AI IPO tracker',
    ],
    schema: 'WebApplication',
  },
  features: {
    // ✅ FIXED
    title: 'FINNOTIA Features - AI IPO Tracker, GMP Updates, Stock Data',
    description: 'Discover FINNOTIA features: AI-powered IPO tracking, real-time GMP updates, NSE/BSE IPO calendar, stock data, mutual funds info, market alerts. Free educational tool!',
    keywords: [
      'IPO tracking features',
      'GMP tracking app',
      'IPO subscription tracker',
      'stock market app India',
      'IPO allotment status',
      'market alerts',
      'mutual fund data',
      'IPO calendar India',
    ],
  },
  about: {
    // ✅ FIXED
    title: 'About FINNOTIA - AI-Powered IPO Tracker & Market Data Platform',
    description: 'Learn about FINNOTIA - AI-powered IPO tracking and market data platform. Access curated market information. NOT SEBI registered. For educational use only.',
    keywords: [
      'FINNOTIA about',
      'IPO tracking platform',
      'AI stock market app India',
      'IPO market data',
    ],
  },
  contact: {
    // ✅ FIXED
    title: 'Contact FINNOTIA - IPO Tracker & Market Data Support',
    description: '📧 Contact FINNOTIA support for IPO tracking features, market data, or queries. Email: support@finnotia.com | Quick response within 24 hours.',
    keywords: [
      'FINNOTIA contact',
      'IPO tracker support',
      'stock app help',
      'customer support India',
    ],
  },
  download: {
    title: 'Download FINNOTIA App - Free IPO Tracker for Android',
    description: 'Download FINNOTIA free IPO tracker app for Android. Get real-time GMP updates, IPO subscription status, market news. Educational tool - NOT investment advice.',
    keywords: [
      'FINNOTIA download',
      'IPO tracker app download',
      'free IPO app India',
      'Android IPO app',
    ],
  },
  privacy: {
    title: 'Privacy Policy - FINNOTIA IPO Tracker App',
    description: 'Read FINNOTIA privacy policy. Learn how we protect your data and privacy while using our IPO tracking and market data platform.',
    keywords: [
      'FINNOTIA privacy policy',
      'IPO app privacy',
      'data protection',
    ],
  },
  terms: {
    title: 'Terms of Service - FINNOTIA IPO Tracker App',
    description: 'Read FINNOTIA terms of service. Understand the terms and conditions for using our educational IPO tracking platform.',
    keywords: [
      'FINNOTIA terms',
      'terms of service',
      'user agreement',
    ],
  },
  disclaimer: {
    title: 'Disclaimer - FINNOTIA (NOT SEBI Registered)',
    description: 'Important disclaimer: FINNOTIA is NOT SEBI registered. We provide educational content only, NOT investment advice. Read before using.',
    keywords: [
      'FINNOTIA disclaimer',
      'SEBI disclaimer',
      'not investment advice',
    ],
  },
};

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    // ✅ FIXED: Changed from FinancialService to SoftwareApplication
    '@type': 'Organization',
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    // ✅ FIXED: Safe description
    description: 'AI-powered IPO tracking and stock market information platform for educational purposes',
    foundingDate: '2024',
    areaServed: 'IN',
    // ✅ FIXED: Safe terms
    knowsAbout: [
      'IPO Tracking',
      'Stock Market Data',
      'Grey Market Premium',
      'Mutual Funds Information',
      'NSE IPO',
      'BSE IPO'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    sameAs: [
      'https://twitter.com/finnotia',
      'https://instagram.com/finnotia',
    ],
  },
  
  mobileApp: {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    // ✅ FIXED
    name: 'FINNOTIA - IPO Tracker & Market Data',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    // ✅ FIXED: Safe description
    description: 'AI-powered IPO tracking platform with GMP updates, subscription status, and market data for Indian users. Free educational tool - NOT investment advice.',
    screenshot: 'https://finnotia.com/app-screenshot.png',
    softwareVersion: '1.0.0',
    datePublished: '2024-01-01',
    // Note: Remove aggregateRating until you have real reviews
  },

  // ✅ FIXED: Safe FAQ content
  faqPage: [
    {
      '@type': 'Question',
      name: 'What is FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA is an AI-powered IPO tracking platform that provides real-time GMP updates, subscription status, and market data for NSE and BSE IPOs. It covers mainboard and SME listings. This is an educational tool, NOT investment advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA SEBI registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA is NOT SEBI registered. We provide educational content and AI-curated data for informational purposes only. This is NOT investment advice. Always consult SEBI-registered advisors before making any investment decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA app free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FINNOTIA is 100% free to download and use. No registration required for basic features like IPO tracking, GMP updates, and market news.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to check IPO GMP on FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Download FINNOTIA app from Google Play Store. Open the app and navigate to the IPO section. You will see real-time Grey Market Premium (GMP) updates for all upcoming and current IPOs on NSE and BSE.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IPO data does FINNOTIA provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA provides IPO GMP updates, subscription status, listing dates, lot size, price band, and other publicly available IPO data for NSE and BSE including mainboard and SME IPOs. All data is for educational purposes only.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FINNOTIA provide investment advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA does NOT provide investment advice or recommendations. We are an educational platform that provides market data and information. All investment decisions should be made after consulting SEBI-registered advisors.',
      },
    },
  ],
};

// ✅ Helper function to generate page-specific metadata
export function generateMetadata(page) {
  const meta = pageMetadata[page];
  if (!meta) return null;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(', '),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${seoConfig.siteUrl}/${page === 'home' ? '' : page}`,
      siteName: seoConfig.siteName,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      site: seoConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${page === 'home' ? '' : page}`,
    },
  };
}