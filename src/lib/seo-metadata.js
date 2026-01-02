// src/lib/seo-metadata.js - SEBI Compliant Version

export const seoConfig = {
  siteName: 'FINNOTIA',
  siteUrl: 'https://finnotia.com',
  defaultTitle: 'FINNOTIA - AI-Powered IPO Analysis & Market Research Tool India 2024',
  defaultDescription: 'AI-powered IPO analysis platform for Indian investors. Get detailed IPO insights, GMP tracking, stock market research, mutual fund analysis. Free educational tool for NSE/BSE market data.',
  defaultKeywords: [
    // Primary keywords (high search volume)
    'IPO analysis app India',
    'IPO research tool 2024',
    'IPO GMP today',
    'upcoming IPO India',
    'IPO listing insights',
    'mainboard IPO',
    'SME IPO list',
    
    // Long-tail keywords (better conversion)
    'IPO listing price analysis',
    'IPO investment research India',
    'IPO grey market premium tracking',
    'NSE BSE IPO calendar 2024',
    'AI stock market analysis India',
    'IPO subscription status live',
    'IPO allotment status check',
    
    // Location-based
    'IPO analysis India',
    'Indian stock market research app',
    'NSE IPO insights',
    'BSE IPO analysis',
    
    // Brand keywords
    'FINNOTIA app',
    'FINNOTIA IPO analysis',
    'finnotia.com',
  ],
  twitterHandle: '@finnotia',
  organization: {
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    foundingDate: '2024',
    description: 'AI-powered IPO analysis and stock market research platform helping Indian retail investors understand market data through structured insights and analysis',
    contactPoint: {
      telephone: '+91-98765-43210',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
    },
  },
};

export const pageMetadata = {
  home: {
    title: 'IPO Analysis App India 2024 | AI Market Research - FINNOTIA',
    description: 'Comprehensive IPO analysis platform. Get IPO insights, GMP tracking, stock research, market news. Educational tool for NSE/BSE market data - NOT investment advice.',
    keywords: [
      'IPO analysis app',
      'IPO research tool India',
      'IPO GMP tracking',
      'upcoming IPO 2024',
      'mainboard IPO list',
      'SME IPO analysis',
      'NSE BSE IPO',
      'IPO listing insights',
      'grey market premium',
      'IPO subscription status',
      'stock market research app India',
      'AI IPO analysis',
    ],
    schema: 'WebApplication',
  },
  features: {
    title: 'FINNOTIA Features - AI IPO Analysis, GMP Tracking, Stock Research',
    description: 'Discover FINNOTIA features: AI-powered IPO analysis, real-time GMP updates, NSE/BSE IPO calendar, stock research, mutual funds, market alerts. Free educational tool!',
    keywords: [
      'IPO analysis features',
      'GMP tracking app',
      'IPO subscription tracker',
      'stock research tools India',
      'IPO allotment status',
      'market alerts',
      'mutual fund analysis',
      'technical stock research',
    ],
  },
  about: {
    title: 'About FINNOTIA - AI-Powered IPO Analysis & Research Platform',
    description: 'Learn about FINNOTIA - AI-powered IPO analysis and market research platform. Provides detailed market insights and data analysis. NOT SEBI registered. For educational use only.',
    keywords: [
      'FINNOTIA about',
      'IPO analysis platform',
      'AI stock research India',
      'IPO market insights',
    ],
  },
  contact: {
    title: 'Contact FINNOTIA - IPO Analysis & Market Research Support',
    description: '📧 Contact FINNOTIA support for IPO analysis features, market research, or queries. Email: support@finnotia.com | Quick response within 24 hours.',
    keywords: [
      'FINNOTIA contact',
      'IPO analysis support',
      'stock research help',
      'customer support India',
    ],
  },
};

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    description: 'AI-powered IPO analysis and stock market research platform for Indian investors',
    foundingDate: '2024',
    areaServed: 'IN',
    knowsAbout: [
      'IPO Analysis',
      'Stock Market Research',
      'Grey Market Premium',
      'Mutual Funds',
      'NSE IPO',
      'BSE IPO'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    sameAs: [
      'https://facebook.com/finnotia',
      'https://twitter.com/finnotia',
      'https://linkedin.com/company/finnotia',
      'https://instagram.com/finnotia',
    ],
  },
  
  mobileApp: {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'FINNOTIA - IPO Analysis & Market Research',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'AI-powered IPO analysis platform with GMP tracking, stock research, and market insights for Indian investors. Free educational tool - NOT investment advice.',
    screenshot: 'https://finnotia.com/app-screenshot.png',
    softwareVersion: '1.0.0',
    datePublished: '2024-01-01',
  },

  faqPage: [
    {
      '@type': 'Question',
      name: 'What is FINNOTIA and what insights does it provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA is an AI-powered platform providing IPO analysis with data-driven insights, real-time GMP tracking, stock research, and market news for Indian investors. It covers NSE and BSE IPOs including mainboard and SME listings. This is educational content, NOT investment advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA SEBI registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA is NOT SEBI registered. We provide educational content and AI-generated analysis for informational purposes only. This is NOT investment advice. Always consult SEBI-registered advisors before making any investment decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA app free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FINNOTIA is 100% free to download and use. No registration required for basic features like IPO analysis, GMP tracking, and market news.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to check IPO GMP on FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Download FINNOTIA app from Google Play Store. Open the app and navigate to the IPO section. You will see real-time Grey Market Premium (GMP) for all upcoming and current IPOs on NSE and BSE.',
      },
    },
    {
      '@type': 'Question',
      name: 'What markets and IPOs does FINNOTIA cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA covers all NSE and BSE IPOs including mainboard IPOs, SME IPOs, stock market data, mutual fund analysis, and real-time financial news for the Indian market.',
      },
    },
  ],
};