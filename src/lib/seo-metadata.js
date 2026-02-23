// src/lib/seo-metadata.js
// Complete, Working, and Broader Market Scope (Stocks + IPO + MF)

export const seoConfig = {
  siteName: 'FINNOTIA',
  siteUrl: 'https://finnotia.com',
  defaultTitle: 'FINNOTIA - Stock Market, IPO & Mutual Fund Tracker',
  defaultDescription: 'Track Indian Stock Market, IPO GMP, Mutual Funds & Indices. AI-powered financial data platform for smart market insights. 100% Free, No Registration.',
  defaultKeywords: [
    // Core Market Keywords (High Volume)
    'Stock market app India',
    'Share market live updates',
    'Nifty 50 tracker',
    'Sensex live data',
    'Stock price tracker',
    
    // IPO Specific
    'IPO GMP today',
    'Upcoming IPO India',
    'IPO subscription status',
    
    // Mutual Funds & Others
    'Mutual fund tracker',
    'SIP calculator app',
    'Market news India',
    'FII DII data',
    
    // App Specific Features
    'Free stock market tool',
    'No registration finance app',
    'AI market insights',
    'FINNOTIA app',
  ],
  twitterHandle: '@finnotia',
  organization: {
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    foundingDate: '2024',
    description: 'Comprehensive financial data platform for tracking Stocks, IPOs, and Mutual Funds in India. Educational tool for market enthusiasts.',
    contactPoint: {
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
    },
  },
};

export const pageMetadata = {
  home: {
    title: 'Indian Stock Market, IPO & Mutual Fund Tracker | FINNOTIA',
    description: 'Your complete dashboard for NSE/BSE stocks, IPO GMP, Mutual Funds, and Market News. Get AI-curated data without registration. Educational Use Only.',
    keywords: [
      'Stock market dashboard',
      'Share price checker',
      'IPO GMP tracker',
      'Mutual fund nav',
      'Nifty chart',
      'Bank Nifty',
      'Stock market news live',
      'Portfolio tracker alternative',
      'FINNOTIA home',
    ],
  },
  features: {
    title: 'FINNOTIA Features - Stocks, IPOs, Analytics & More',
    description: 'Explore powerful features: Live Stock Quotes, IPO Analytics, GMP Tracking, Mutual Fund Data, and Market News aggregation. All-in-one financial tool.',
    keywords: [
      'Stock analysis features',
      'Market screener',
      'IPO alerts',
      'Real-time stock data',
      'Mutual fund performance',
      'Market indices tracker',
      'Financial news feed',
    ],
  },
  about: {
    title: 'About FINNOTIA - AI-Driven Financial Data Platform',
    description: 'We are simplifying financial data for India. Learn how FINNOTIA uses AI to track Stocks, IPOs, and Markets. Built for education and data accessibility.',
    keywords: [
      'Fintech startup India',
      'AI in finance',
      'Stock market data provider',
      'About Finnotia',
      'Financial education platform',
    ],
  },
  contact: {
    title: 'Contact Support - FINNOTIA App',
    description: 'Need help with the app? Contact FINNOTIA support for queries regarding Stock data, IPOs, or app features. Email: support@finnotia.com',
    keywords: [
      'App support',
      'Contact Finnotia',
      'Report a bug',
      'Feature request',
      'Customer care',
    ],
  },
  download: {
    title: 'Download FINNOTIA - Free Stock & IPO App for Android',
    description: 'Get the FINNOTIA app for Android. Track Stocks, IPOs, and Mutual Funds on the go. Fast, Free, and No Sign-up required.',
    keywords: [
      'Stock market app download',
      'Best free market app',
      'Android finance app',
      'Download Finnotia',
      'APK download',
    ],
  },
  privacy: {
    title: 'Privacy Policy - FINNOTIA',
    description: 'We value your privacy. Read how FINNOTIA handles your data. We do not sell user data. Secure and transparent.',
    keywords: [
      'Data privacy',
      'User data protection',
      'Privacy policy finance app',
    ],
  },
  terms: {
    title: 'Terms of Service - FINNOTIA',
    description: 'Usage guidelines for FINNOTIA platform. Understanding our educational nature and data usage terms.',
    keywords: [
      'Terms and conditions',
      'App usage rules',
      'Disclaimer',
    ],
  },
  disclaimer: {
    title: 'Disclaimer - Educational Purpose Only',
    description: 'FINNOTIA is an informational tool. We are NOT SEBI registered. Data provided is for educational purposes, not investment advice.',
    keywords: [
      'Not investment advice',
      'SEBI disclaimer',
      'Educational tool',
      'Market risk warning',
    ],
  },
};

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FINNOTIA',
    url: 'https://finnotia.com',
    logo: 'https://finnotia.com/finnotia-logo.png',
    description: 'AI-powered platform for tracking Indian Stock Market, IPOs, and Mutual Funds.',
    foundingDate: '2024',
    areaServed: 'IN',
    knowsAbout: [
      'Stock Market',
      'Initial Public Offerings (IPO)',
      'Mutual Funds',
      'Nifty 50',
      'Sensex',
      'Financial News',
      'Market Indices'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@finnotia.com',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    // ✅ COMPANY ke official social pages
    sameAs: [
      'https://twitter.com/finnotia',
      'https://www.instagram.com/finnotia/',
    ],
    // ✅ Founder connection - Google Knowledge Graph ke liye
    founder: {
      '@type': 'Person',
      name: 'Akash Shukla',
      url: 'https://finnotia.com/founder',
    },
  },
  
  mobileApp: {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'FINNOTIA - Stocks, IPO & MF',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: 'Comprehensive market tracking app. Features include Live Stock Updates, IPO GMP, Mutual Fund Data, and Market News. Free to use, no registration needed.',
    screenshot: 'https://finnotia.com/app-screenshot.png',
    softwareVersion: '1.0.0',
    datePublished: '2024-01-01',
    author: {
        '@type': 'Organization',
        name: 'FINNOTIA'
    }
  },

  faqPage: [
    {
      '@type': 'Question',
      name: 'Does FINNOTIA track Stocks and Mutual Funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, FINNOTIA provides comprehensive tracking for NSE/BSE Stocks, Mutual Funds, and Market Indices (like Nifty/Sensex) alongside IPO data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA strictly for IPOs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, while we offer extensive IPO tracking (GMP, Subscription), we are a complete financial data platform covering the broader Indian stock market and mutual funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FINNOTIA SEBI registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA is NOT SEBI registered. We provide aggregated market data and information for educational purposes only. We do not provide investment tips or advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to register to use FINNOTIA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, FINNOTIA is designed for quick access. You can track stocks, check IPO GMP, and read news without any registration or login.',
      },
    },
  ],
};

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
      images: [
        {
          url: 'https://finnotia.com/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${page === 'home' ? '' : page}`,
    },
  };
}