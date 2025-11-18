'use client';
import Link from 'next/link';
import { AlertTriangle, Shield, FileWarning, Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-3 py-4 mt-12 md:py-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-block p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg mb-2 shadow-md">
            <FileWarning className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Disclaimer</span> & Risk
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Important information about risks & compliance
          </p>
          <p className="text-xs text-gray-500 mt-1">Last Updated: November 18, 2025</p>
        </div>

        {/* Critical Warning Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-lg">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm md:text-base font-bold mb-2">
                ⚠️ CRITICAL INVESTMENT WARNING
              </h2>
              <div className="space-y-1.5 text-xs md:text-sm">
                <p className="font-semibold">
                  PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING FINNOTIA.
                </p>
                <p>
                  FINNOTIA is informational only. We are <strong>NOT SEBI registered</strong>. We do <strong>NOT provide investment advice</strong>. 
                  All content is for <strong>educational purposes only</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg border border-blue-100">
          <div className="p-3 md:p-5 space-y-4 md:space-y-5">
            
            {/* Section 1 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Not Financial Advice</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-red-50 border border-red-300 rounded p-2 md:p-3">
                  <p className="font-bold text-red-900 mb-1 text-xs md:text-sm">
                    THIS IS NOT INVESTMENT ADVICE
                  </p>
                  <p className="text-red-800 text-xs">
                    All information provided by FINNOTIA is for <strong>general informational and educational purposes ONLY</strong>. Nothing on this platform constitutes:
                  </p>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-red-800 text-xs">
                    <li>Investment advice or recommendations</li>
                    <li>Financial advice or consulting</li>
                    <li>Trading advice or signals</li>
                    <li>An offer to buy or sell any security</li>
                    <li>A solicitation of any kind</li>
                    <li>Personalized portfolio management</li>
                  </ul>
                </div>
                <p className="text-xs md:text-sm">
                  <strong>You should NOT rely solely on FINNOTIA when making investment decisions.</strong> Always:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Conduct your own independent research</li>
                  <li>Consult qualified financial professionals</li>
                  <li>Read official company prospectuses</li>
                  <li>Understand your risk tolerance</li>
                  <li>Consider your financial situation</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">SEBI Registration</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-yellow-50 border border-yellow-400 rounded p-2 md:p-3">
                  <h3 className="font-bold text-yellow-900 mb-1.5 flex items-center gap-1.5 text-xs md:text-sm">
                    <Shield className="w-4 h-4" />
                    Regulatory Status
                  </h3>
                  <p className="text-yellow-800 mb-1.5 text-xs">
                    <strong>FINNOTIA is NOT registered with:</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-yellow-800 text-xs">
                    <li><strong>SEBI</strong> as Investment Advisors</li>
                    <li><strong>SEBI</strong> as Research Analysts</li>
                    <li><strong>SEBI</strong> as Stock Brokers or Portfolio Managers</li>
                    <li>Any other regulatory authority</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-2 border-[#4A90E2] p-2 rounded-r">
                  <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">
                    <Info className="inline w-3.5 h-3.5 mr-0.5" />
                    What This Means:
                  </h4>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-700 text-xs">
                    <li><strong>Only SEBI-registered professionals</strong> can provide personalized investment advice</li>
                    <li>FINNOTIA provides general information, not personalized advice</li>
                    <li>Our content is not subject to SEBI oversight</li>
                    <li>We don't conduct SEBI-standard due diligence</li>
                    <li>For advice, consult SEBI-registered advisors</li>
                  </ul>
                </div>

                <div className="p-2 bg-gray-50 rounded border border-gray-300">
                  <p className="text-xs text-gray-700">
                    <strong>Find SEBI-registered advisors:</strong> <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes" target="_blank" rel="noopener noreferrer" className="text-[#4A90E2] hover:underline">SEBI Website</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">AI Predictions</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-purple-50 border border-purple-300 rounded p-2 md:p-3">
                  <p className="font-bold text-purple-900 mb-1 text-xs">
                    AI PREDICTIONS ARE NOT GUARANTEES
                  </p>
                  <p className="text-purple-800 text-xs">
                    FINNOTIA uses AI for IPO analysis. These predictions are:
                  </p>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-purple-800 text-xs">
                    <li><strong>Probabilistic</strong> – Not certainties</li>
                    <li><strong>Based on algorithms</strong> – May have biases/errors</li>
                    <li><strong>Historical data-driven</strong> – Past ≠ future</li>
                    <li><strong>Subject to limitations</strong> – AI isn't perfect</li>
                  </ul>
                </div>
                <p className="text-xs">
                  AI predictions should be <strong>one input among many</strong> in your research. Never make decisions based solely on AI predictions.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Data Accuracy</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="text-xs">
                  While we strive for accuracy, FINNOTIA:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li><strong>Does NOT guarantee</strong> accuracy of information</li>
                  <li>May contain errors, omissions, or outdated data</li>
                  <li>Aggregates data from third-party sources</li>
                  <li>Cannot verify all information in real-time</li>
                  <li>May experience technical issues or delays</li>
                </ul>
                <p className="mt-1.5 text-xs">
                  <strong>Always verify information independently</strong> before making investment decisions.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Market Risks</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-red-50 border border-red-300 rounded p-2 md:p-3">
                  <p className="font-bold text-red-900 mb-1 text-xs">
                    ⚠️ INVESTMENTS INVOLVE SUBSTANTIAL RISK
                  </p>
                  <p className="text-red-800 text-xs mb-1">
                    <strong>You may lose ALL your invested capital.</strong> Market risks include:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-red-800 text-xs">
                    <li><strong>Market Volatility</strong> – Prices fluctuate</li>
                    <li><strong>IPO Risk</strong> – New stocks are volatile</li>
                    <li><strong>Liquidity Risk</strong> – May not sell when needed</li>
                    <li><strong>Economic Risk</strong> – Macro conditions affect markets</li>
                    <li><strong>Company Risk</strong> – Business may underperform</li>
                    <li><strong>Regulatory Risk</strong> – Rules may change</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Past Performance</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs">
                <p className="font-semibold text-xs md:text-sm">
                  Past performance is NOT indicative of future results.
                </p>
                <p className="text-xs">
                  Historical IPO data, returns, or AI predictions shown on FINNOTIA <strong>do NOT guarantee future outcomes</strong>. 
                  Each investment carries unique risks regardless of historical trends.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-red-100 border border-red-400 rounded p-2 md:p-3">
                  <p className="font-bold text-red-900 mb-1 text-xs">
                    NO LIABILITY FOR LOSSES
                  </p>
                  <p className="text-red-800 text-xs">
                    FINNOTIA, its operators, and affiliates shall NOT be liable for any:
                  </p>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-red-800 text-xs">
                    <li>Financial losses or investment losses</li>
                    <li>Loss of profits or revenue</li>
                    <li>Damages from reliance on content</li>
                    <li>Errors or inaccuracies in information</li>
                    <li>Service interruptions or technical issues</li>
                    <li>Unauthorized access or data breaches</li>
                    <li>Third-party actions or content</li>
                    <li>Consequential or indirect damages</li>
                  </ul>
                </div>
                <p className="text-xs">
                  <strong>YOUR SOLE REMEDY:</strong> If dissatisfied, discontinue using the platform.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">User Responsibility</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="font-semibold text-gray-900 text-xs">By using FINNOTIA, you agree:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>You are <strong>solely responsible</strong> for investment decisions</li>
                  <li>You understand the risks in securities markets</li>
                  <li>You will conduct independent research</li>
                  <li>You will consult qualified professionals</li>
                  <li>You won't rely solely on FINNOTIA</li>
                  <li>You may lose your entire invested capital</li>
                  <li>You waive claims against FINNOTIA for losses</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Third-Party Content</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs">
                <p className="text-xs">
                  FINNOTIA may contain links to third-party websites. We do not:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Endorse third-party content, products, or services</li>
                  <li>Control or verify third-party website content</li>
                  <li>Take responsibility for third-party actions</li>
                  <li>Guarantee accuracy of external information</li>
                </ul>
                <p className="text-xs mt-1">
                  Your interactions with third parties are at your own risk.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded text-xs flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Modification</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  FINNOTIA may modify this Disclaimer anytime without notice. Changes are effective immediately. 
                  Continued use = acceptance of modified Disclaimer.
                </p>
                <p className="text-xs">
                  Review this Disclaimer regularly.
                </p>
              </div>
            </section>

          </div>

          {/* Final Warning */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 md:p-4 text-white">
            <div className="flex items-start gap-2 md:gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm md:text-base font-bold mb-2">Final Reminders</h3>
                <div className="space-y-1 text-xs">
                  <p>✋ <strong>STOP before investing:</strong> Read the prospectus?</p>
                  <p>🔍 <strong>RESEARCH independently:</strong> Don't rely only on FINNOTIA</p>
                  <p>👨‍💼 <strong>CONSULT professionals:</strong> Talk to SEBI advisors</p>
                  <p>⚖️ <strong>UNDERSTAND risks:</strong> You may lose everything</p>
                  <p>📊 <strong>DIVERSIFY:</strong> Don't put all eggs in one basket</p>
                  <p>💰 <strong>INVEST wisely:</strong> Only what you can afford to lose</p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/30">
                  <p className="text-xs font-semibold">Questions?</p>
                  <p className="text-xs">
                    Support: <a href="mailto:support@finnotia.com" className="underline">support@finnotia.com</a>
                  </p>
                  <p className="text-xs opacity-80 mt-2">
                    <strong>Effective:</strong> November 18, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}