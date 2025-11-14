// SEO Metadata configuration for FINNOTIA

export const seoConfig = {
  siteName: 'FINNOTIA',
  siteUrl: 'https://finnotia.com', // Replace with your actual domain
  defaultTitle: 'FINNOTIA - AI-Powered IPO Predictions & Stock Market Analysis',
  defaultDescription: 'Get AI-powered IPO predictions with 95% accuracy, real-time stock analysis, breaking market news, and mutual fund insights. Download FINNOTIA for smarter investing in Indian stock market.',
  defaultKeywords: [
    'IPO predictions India',
    'AI IPO analysis',
    'stock market analysis',
    'GMP tracking',
    'IPO listing gains',
    'mutual fund analysis',
    'NSE BSE IPO',
    'Indian stock market app',
    'IPO subscription trends',
    'real-time market news',
    'stock market predictions',
    'IPO allotment status',
    'mainboard IPO',
    'SME IPO',
    'financial news India',
  ],
  twitterHandle: '@finnotia', // Update with your actual handle
  organization: {
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    foundingDate: '2024',
    description: 'AI-powered IPO prediction and stock market analysis platform for Indian retail investors',
    contactPoint: {
      telephone: '+91-98765-43210',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
    },
  },
};

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: 'FINNOTIA - AI IPO Predictions, Stock Analysis & Market News',
    description: 'Master IPO investing with AI predictions (95% accuracy). Get real-time stock analysis, GMP tracking, mutual fund insights & breaking market news for NSE/BSE.',
    keywords: [
      'IPO predictions',
      'AI stock analysis',
      'GMP tracking',
      'NSE IPO',
      'BSE IPO',
      'IPO listing gains',
      'stock market app',
      'mutual fund analysis',
      'financial news India',
    ],
    schema: 'WebApplication',
  },
  features: {
    title: 'FINNOTIA Features - AI IPO Analysis, Stock Tracking & Market Insights',
    description: 'Explore FINNOTIA features: 95% accurate IPO predictions, real-time stock analysis, GMP updates, mutual fund insights, smart alerts, and 24/7 market coverage.',
    keywords: [
      'IPO prediction features',
      'stock analysis tools',
      'GMP tracking',
      'market alerts',
      'mutual fund insights',
      'technical analysis',
    ],
  },
  about: {
    title: 'About FINNOTIA - India\'s Leading AI-Powered IPO Analysis Platform',
    description: 'Learn about FINNOTIA - trusted by 100K+ investors for AI-powered IPO predictions, stock analysis, and market insights. 95% accuracy in IPO listing gain predictions.',
    keywords: [
      'FINNOTIA about',
      'IPO analysis platform',
      'AI stock predictions',
      'Indian stock market',
    ],
  },
  contact: {
    title: 'Contact FINNOTIA - Get Support for IPO Predictions & Stock Analysis',
    description: 'Contact FINNOTIA support team for queries about IPO predictions, stock analysis, or app features. Email: support@finnotia.com | Phone: +91 98765 43210',
    keywords: [
      'FINNOTIA contact',
      'customer support',
      'IPO help',
      'stock analysis support',
    ],
  },
};

// Structured Data Templates
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    description: 'AI-powered IPO prediction and stock market analysis platform',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
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
    name: 'FINNOTIA',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FinanceApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1000',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: 'AI-powered IPO predictions and stock market analysis for Indian investors',
  },

  faqPage: [
    {
      '@type': 'Question',
      name: 'What is FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA is an AI-powered platform that provides IPO predictions, real-time stock analysis, market news, and mutual fund insights for Indian retail investors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate are FINNOTIA IPO predictions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA AI predictions have shown 95% accuracy in IPO listing gain predictions. However, this is NOT financial advice and all investments carry market risks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FINNOTIA is 100% free to download and use. No registration required for basic features.',
      },
    },
    {
      '@type': 'Question',
      name: 'What markets does FINNOTIA cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FINNOTIA covers all NSE and BSE IPOs including mainboard and SME IPOs, along with stock market data and mutual fund analysis.',
      },
    },
  ],
};