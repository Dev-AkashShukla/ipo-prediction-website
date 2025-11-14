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
  // Structured data for About page
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                About <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FINNOTIA</span>
              </h1>
            </header>
            
            <article className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                FINNOTIA is India's leading AI-powered IPO prediction and stock market analysis platform, helping millions of investors make smarter investment decisions with real-time data and intelligent insights.
              </p>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We believe that every investor deserves access to professional-grade IPO analysis and stock market predictions. Our mission is to democratize financial intelligence by providing cutting-edge AI technology for IPO predictions that was previously available only to institutional investors.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>AI-powered IPO predictions with 95% accuracy on listing gains</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Real-time stock market analysis and technical indicators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Breaking financial news and IPO announcements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Comprehensive mutual fund analysis and recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Smart alerts for IPO openings, GMP updates, and market movements</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Team</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Founded by a team of experienced financial analysts, data scientists, and software engineers, FINNOTIA combines decades of market expertise with cutting-edge AI technology to deliver the best financial intelligence platform in India.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Choose FINNOTIA?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We're committed to providing accurate IPO predictions and timely market insights. With 95% accuracy in IPO predictions and real-time market data, every feature is designed to help you make profitable investment decisions. Download FINNOTIA today and start making smarter IPO and stock investments.
                </p>
              </section>

              <section className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Important Disclaimer</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  FINNOTIA provides AI-generated market analysis and predictions for informational purposes only. We are NOT registered with SEBI or any regulatory authority. This is NOT investment advice. All investments carry market risks, and you are solely responsible for your investment decisions. Always conduct your own research and consult qualified financial advisors before making investment decisions.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}