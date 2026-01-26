// FILE: app/about/page.js (UPDATED)
// Changes: Made "Akash Shukla" a clickable link to /founder page
// Text alignment set to justify for better readability

import { pageMetadata, seoConfig } from '../../lib/seo-metadata';
import { APP_NAME, GRADIENTS } from '../../lib/constants';
import Link from 'next/link';

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,

  openGraph: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    url: `${seoConfig.siteUrl}/about`,
    images: ['/og-image.png'],
  },

  twitter: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
  },

  alternates: {
    canonical: `${seoConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  const offerings = [
    'AI-curated IPO data using GMP, subscription status & market conditions',
    'IPO listing updates with post-listing performance tracking',
    'Stock updates based on news, sentiment & market factors',
    'AI-curated mutual fund information across equity, debt & hybrid categories',
    'Verified market news with curated alerts and notifications',
  ];

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: APP_NAME,
      description:
        'AI-powered Indian market information platform for IPOs, stocks, mutual funds, and verified financial news.',
      foundingDate: '2024',
      url: seoConfig.siteUrl,
      logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
      areaServed: 'IN',
      founder: {
        '@type': 'Person',
        '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
        name: 'Akash Shukla',
        url: `${seoConfig.siteUrl}/founder`,
        jobTitle: 'Founder',
        sameAs: [
          'https://www.youtube.com/@atrangimemer',
          'https://www.linkedin.com/in/akash-shukla-finnotia/',
        ],
      },
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="min-h-screen bg-white pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <header className="text-center sm:text-left mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900">
                About{' '}
                <span
                  className={`bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent`}
                >
                  {APP_NAME}
                </span>
              </h1>
            </header>

            {/* Content */}
            <article className="space-y-8 text-gray-700">

              <p className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed text-justify">
                {APP_NAME} is an AI-powered Indian market information platform
                designed to help users track IPOs, stocks, mutual funds, and
                financial news using real-time data and AI-curated information.
              </p>

              <div className="space-y-10">

                {/* Mission */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 text-justify">
                    Our mission is to simplify complex market data using AI and
                    present clear, unbiased, and structured information so users
                    can understand market behavior without hype, rumors, or
                    misleading tips.
                  </p>
                </section>

                {/* What We Offer */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    What We Offer
                  </h2>
                  <ul className="space-y-2.5">
                    {offerings.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-justify"
                      >
                        <span className="text-[#4A90E2] font-bold mt-0.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Why Finnotia */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Why {APP_NAME}?
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 text-justify">
                    All information on {APP_NAME} is generated using verified data
                    sources, defined market logic, and continuous performance
                    tracking — helping users understand markets with clarity and
                    confidence.
                  </p>
                </section>

                {/* Team + Founder */}
                <div className="grid sm:grid-cols-2 gap-8">

                  {/* Team */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Our Team
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 text-justify">
                      {APP_NAME} is built by a technology-driven team focused on
                      applying AI, automation, and data systems to solve
                      real-world problems in the Indian financial markets with
                      clarity and transparency.
                    </p>
                  </section>

                  {/* Founder - NOW WITH CLICKABLE LINK */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Founder
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 text-justify">
                      {/* ✅ CLICKABLE LINK TO FOUNDER PAGE */}
                      <Link
                        href="/founder"
                        className={`font-bold bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent hover:underline`}
                      >
                        Akash Shukla
                      </Link>{' '}
                      is the founder of {APP_NAME} and a software developer focused
                      on building practical, data-driven financial tools for Indian
                      users.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 mt-3 text-justify">
                      With experience in full-stack development and AI-powered
                      systems, Akash built {APP_NAME} to simplify complex market
                      data and present it in a clear, structured, and unbiased
                      way.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 mt-3 text-justify">
                      The goal behind {APP_NAME} is to help users understand IPOs,
                      stocks, mutual funds, and market news using real-time data
                      and AI-curated information — without hype or misleading
                      tips.
                    </p>

                    {/* ✅ LEARN MORE LINK */}
                    <Link
                      href="/founder"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Learn more about Akash
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </section>

                </div>
              </div>

              {/* Disclaimer */}
              <section className="mt-10 p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-sm font-bold text-red-900 mb-2">
                  ⚠️ IMPORTANT DISCLAIMER
                </h3>
                <p className="text-xs text-red-800 leading-relaxed font-medium text-justify">
                  <strong>{APP_NAME} provides AI-curated market information for
                  informational and educational purposes only. We are NOT SEBI
                  registered. This is NOT investment advice. Market investments
                  are subject to risk. Please consult a SEBI-registered advisor
                  before making any investment decisions.</strong>
                </p>
              </section>

            </article>
          </div>
        </div>
      </div>
    </>
  );
}