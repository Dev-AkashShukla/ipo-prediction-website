// src/lib/seo-metadata.js - Replace with better SEO keywords

export const seoConfig = {
  siteName: 'FINNOTIA',
  siteUrl: 'https://finnotia.com',
  defaultTitle: 'FINNOTIA - Best IPO Prediction App India | 95% Accurate AI Stock Analysis 2024',
  defaultDescription: 'India\'s #1 IPO prediction app with 95% accuracy. Get AI-powered IPO analysis, GMP tracking, stock market news, mutual fund insights. Download free for NSE/BSE IPO predictions.',
  defaultKeywords: [
    // Primary keywords (high search volume)
    'IPO prediction app India',
    'best IPO analysis app 2024',
    'IPO GMP today',
    'upcoming IPO India',
    'IPO listing prediction',
    'mainboard IPO',
    'SME IPO list',
    
    // Long-tail keywords (better conversion)
    'how to predict IPO listing price',
    'best app for IPO investment India',
    'IPO grey market premium tracking',
    'NSE BSE IPO calendar 2024',
    'AI stock market prediction India',
    'IPO subscription status live',
    'IPO allotment status check',
    
    // Location-based
    'IPO analysis India',
    'Indian stock market app',
    'NSE IPO predictions',
    'BSE IPO analysis',
    
    // Brand keywords
    'FINNOTIA app',
    'FINNOTIA IPO predictions',
    'finnotia.com',
  ],
  twitterHandle: '@finnotia',
  organization: {
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    foundingDate: '2024',
    description: 'AI-powered IPO prediction and stock market analysis platform helping Indian retail investors make smarter investment decisions with 95% accurate predictions',
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
    title: 'Best IPO Prediction App India 2024 | AI Stock Analysis - FINNOTIA',
    description: '🎯 #1 IPO prediction app with 95% accuracy! Get free IPO GMP, listing predictions, stock analysis, market news. Download FINNOTIA - trusted by 100K+ investors.',
    keywords: [
      'IPO prediction app',
      'best IPO app India',
      'IPO GMP tracking',
      'upcoming IPO 2024',
      'mainboard IPO list',
      'SME IPO analysis',
      'NSE BSE IPO',
      'IPO listing prediction',
      'grey market premium',
      'IPO subscription status',
      'stock market app India',
      'AI IPO prediction',
    ],
    schema: 'WebApplication',
  },
  features: {
    title: 'FINNOTIA Features - AI IPO Predictions, GMP Tracking, Stock Analysis',
    description: '⚡ Discover FINNOTIA features: 95% accurate IPO predictions, real-time GMP updates, NSE/BSE IPO calendar, stock analysis, mutual funds, smart alerts. Free download!',
    keywords: [
      'IPO prediction features',
      'GMP tracking app',
      'IPO subscription tracker',
      'stock analysis tools India',
      'IPO allotment status',
      'market alerts',
      'mutual fund analysis',
      'technical stock analysis',
    ],
  },
  about: {
    title: 'About FINNOTIA - India\'s Most Accurate IPO Prediction Platform',
    description: 'Learn about FINNOTIA - trusted by 100K+ investors. 95% accurate AI-powered IPO predictions, real-time market analysis. NOT SEBI registered. For educational use only.',
    keywords: [
      'FINNOTIA about',
      'best IPO prediction platform',
      'AI stock analysis India',
      'IPO prediction accuracy',
    ],
  },
  contact: {
    title: 'Contact FINNOTIA - IPO Prediction & Stock Analysis Support',
    description: '📧 Contact FINNOTIA support for IPO predictions, app features, or queries. Email: support@finnotia.com | Quick response within 24 hours.',
    keywords: [
      'FINNOTIA contact',
      'IPO app support',
      'stock analysis help',
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
    description: 'AI-powered IPO prediction and stock market analysis platform for Indian investors',
    foundingDate: '2024',
    areaServed: 'IN',
    knowsAbout: [
      'IPO Predictions',
      'Stock Market Analysis',
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
    name: 'FINNOTIA - IPO Predictions & Stock Analysis',
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
    description: 'Get 95% accurate IPO predictions, GMP tracking, stock analysis, and market news for Indian investors. Free download.',
    screenshot: 'https://finnotia.com/app-screenshot.png',
    softwareVersion: '1.0.0',
    datePublished: '2024-01-01',
  },

  faqPage: [
    {
      '@type': 'Question',
      name: 'What is FINNOTIA and how accurate are IPO predictions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA is an AI-powered platform providing IPO predictions with 95% accuracy, real-time GMP tracking, stock analysis, and market news for Indian investors. It covers NSE and BSE IPOs including mainboard and SME listings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA SEBI registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA is NOT SEBI registered. We provide educational content and AI-generated analysis for informational purposes only. This is NOT investment advice. Always consult SEBI-registered advisors before investing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA app free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FINNOTIA is 100% free to download and use. No registration required for basic features like IPO predictions, GMP tracking, and market news.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to check IPO GMP on FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Download FINNOTIA app from Google Play Store. Open the app and navigate to the IPO section. You\'ll see real-time Grey Market Premium (GMP) for all upcoming and current IPOs on NSE and BSE.',
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