import { pageMetadata, seoConfig } from '../../lib/seo-metadata';
import { APP_NAME, GRADIENTS } from '../../lib/constants';

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
    'AI-based IPO analysis using GMP, subscription data & market conditions',
    'IPO listing price range predictions with post-listing accuracy tracking',
    'Stock insights based on news triggers, sentiment & risk analysis',
    'AI-curated mutual fund analysis across equity, debt & hybrid categories',
    'Verified market news with impact analysis and smart alerts',
  ];

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: APP_NAME,
      description:
        'AI-powered Indian market analysis platform for IPOs, stocks, mutual funds, and verified financial news.',
      foundingDate: '2024',
      url: seoConfig.siteUrl,
      logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
      areaServed: 'IN',
      founder: {
        '@type': 'Person',
        name: 'Akash Shukla',
        jobTitle: 'Founder',
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

              {/* Intro */}
              <p className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed">
                {APP_NAME} is an AI-powered Indian market intelligence platform
                designed to help users analyze IPOs, stocks, mutual funds, and
                financial news using real-time data and structured AI insights.
              </p>

              <div className="space-y-10">

                {/* Mission */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                    Our mission is to simplify complex market data using AI and
                    present clear, unbiased, and structured insights so retail
                    investors can understand market behavior without hype,
                    rumors, or misleading tips.
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
                        className="flex items-start gap-2.5 text-sm sm:text-base"
                      >
                        <span className="text-[#4A90E2] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Why Finnotia – FULL WIDTH */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Why {APP_NAME}?
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                    Every insight on {APP_NAME} is generated using verified data
                    sources, defined market logic, and continuous performance
                    tracking — helping users understand and analyze markets with
                    clarity and confidence.
                  </p>
                </section>

                {/* Team + Founder */}
                <div className="grid sm:grid-cols-2 gap-8">

                  {/* Team */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Our Team
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                      {APP_NAME} is built by a technology-driven team focused on
                      applying AI, automation, and data systems to solve
                      real-world problems in the Indian financial markets with
                      clarity and transparency.
                    </p>
                  </section>

                  {/* Founder */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Founder
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                      <strong>Akash Shukla</strong> is the founder of FINNOTIA and
                      a software developer focused on building practical,
                      data-driven financial tools for Indian investors.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 mt-3">
                      With experience in full-stack development and AI-powered
                      systems, Akash built FINNOTIA to simplify complex market
                      data and present it in a clear, structured, and unbiased
                      way.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 mt-3">
                      The goal behind FINNOTIA is to help users understand IPOs,
                      stocks, mutual funds, and market news using real-time data
                      and intelligent analysis — without hype or misleading
                      tips.
                    </p>
                  </section>

                </div>
              </div>

              {/* Disclaimer */}
              <section className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Disclaimer
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed text-justify">
                  {APP_NAME} provides AI-generated market analysis for
                  informational and educational purposes only. We are NOT SEBI
                  registered. This is NOT investment advice. Market investments
                  are subject to risk. Please consult a SEBI-registered advisor
                  before making investment decisions.
                </p>
              </section>

            </article>
          </div>
        </div>
      </div>
    </>
  );
}
