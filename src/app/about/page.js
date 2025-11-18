import { Metadata } from 'next';
import { pageMetadata, seoConfig } from '../../lib/seo-metadata';

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
  // Data extracted for cleaner rendering
  const offerings = [
    "AI-powered IPO predictions with 95% accuracy on listing gains",
    "Real-time stock market analysis and technical indicators",
    "Breaking financial news and IPO announcements",
    "Comprehensive mutual fund analysis and recommendations",
    "Smart alerts for IPO openings, GMP updates, and market movements"
  ];

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'FINNOTIA',
      description: 'AI-powered IPO prediction and stock market analysis platform for Indian investors',
      foundingDate: '2024',
      url: seoConfig.siteUrl,
      logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Adjusted padding for compact mobile view */}
      <div className="min-h-screen bg-white pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            
            {/* Compact Header */}
            <header className="text-center sm:text-left mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900">
                About <span className="bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] bg-clip-text text-transparent">FINNOTIA</span>
              </h1>
            </header>
            
            {/* Content Wrapper - Removing prose-lg for tighter fit */}
            <article className="space-y-8 text-gray-700">
              
              {/* Intro */}
              <p className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed">
                FINNOTIA is India's leading AI-powered IPO prediction platform, helping millions make smarter decisions with real-time data and intelligent insights.
              </p>

              {/* Sections with Grid Layout for Compactness */}
              <div className="grid gap-8 sm:gap-10">
                
                {/* Mission */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                    We democratize financial intelligence by providing professional-grade AI technology for IPO predictions, previously available only to institutional investors.
                  </p>
                </section>

                {/* Offerings - Optimized List */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">What We Offer</h2>
                  <ul className="space-y-2.5">
                    {offerings.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base">
                        <span className="text-[#4A90E2] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Team & Why Choose Combined visually in style */}
                <div className="grid sm:grid-cols-2 gap-8">
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Team</h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                      Founded by expert analysts and data scientists, combining decades of market expertise with cutting-edge AI to deliver India's best financial platform.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Why Us?</h2>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                      With 95% accuracy in IPO predictions and real-time data, every feature is designed for your profit. Download FINNOTIA today.
                    </p>
                  </section>
                </div>

              </div>

              {/* Compact Disclaimer */}
              <section className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Disclaimer</h3>
                <p className="text-xs text-gray-500 leading-relaxed text-justify">
                  FINNOTIA provides AI-generated analysis for informational purposes only. We are NOT SEBI registered. This is NOT investment advice. Investments carry market risks; please consult a financial advisor.
                </p>
              </section>

            </article>
          </div>
        </div>
      </div>
    </>
  );
}