// src/app/layout.js - SEBI Compliant Version
import { Inter } from 'next/font/google';
import Script from 'next/script'; // ✅ IMPORT ADDED
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { seoConfig, structuredData } from '../lib/seo-metadata';

// Font optimization with display swap
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  
  description: seoConfig.defaultDescription,
  
  keywords: seoConfig.defaultKeywords,
  
  authors: [{ name: 'FINNOTIA Team' }],
  
  creator: 'FINNOTIA',
  
  publisher: 'FINNOTIA',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        // ✅ FIXED: Changed "Predictions" to "Tracker"
        alt: 'FINNOTIA - AI-Powered IPO Tracker & Market Data',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: ['/og-image.png'],
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
  
  manifest: '/manifest.json',
  
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  verification: {
    google: 'your-google-verification-code', // ⚠️ Search Console verify karne ke baad uska code yahan daal dena
  },
  
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  
  category: 'finance',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      structuredData.organization,
      structuredData.mobileApp,
      {
        '@type': 'WebSite',
        '@id': `${seoConfig.siteUrl}/#website`,
        url: seoConfig.siteUrl,
        name: seoConfig.siteName,
        description: seoConfig.defaultDescription,
        publisher: {
          '@id': `${seoConfig.siteUrl}/#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: 'en-IN',
      },
    ],
  };

  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://play.google.com" />
      </head>
      <body className={inter.className}>
        
        {/* ✅ Google Analytics Code Added Here */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DCP4LJJF64"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DCP4LJJF64');
          `}
        </Script>
        {/* ✅ End of Google Analytics Code */}

        <Header />
        <main className="min-h-fitcontent">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}