export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            About <span className="gradient-text">IPO Tracker</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              IPO Tracker is India's leading AI-powered stock market analysis platform, helping investors make smarter decisions with real-time data and intelligent predictions.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We believe that every investor deserves access to professional-grade market analysis tools. Our mission is to democratize stock market investing by providing cutting-edge AI technology that was previously available only to institutional investors.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>AI-powered IPO predictions with 95% accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Real-time stock market data and analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Smart alerts for IPO launches and price movements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Comprehensive portfolio tracking and management</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Team</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Founded by a team of experienced financial analysts, data scientists, and software engineers, IPO Tracker combines decades of market expertise with cutting-edge technology to deliver the best investment platform in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
