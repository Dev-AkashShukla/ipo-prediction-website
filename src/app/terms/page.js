'use client';
import Link from 'next/link';
import { FileText, AlertTriangle, Shield, Scale, Info } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-3 py-4 md:py-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="text-center mb-4 mt-12 md:mb-6">
          <div className="inline-block p-2 bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] rounded-lg mb-2 shadow-md">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Terms & <span className="bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Read these terms carefully before using FINNOTIA
          </p>
          <p className="text-xs text-gray-500 mt-1">Last Updated: November 18, 2025</p>
        </div>

        {/* Critical Disclaimer */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-md">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm md:text-base font-bold text-red-900 mb-1.5">
                ⚠️ CRITICAL DISCLAIMER
              </h2>
              <div className="space-y-1.5 text-red-800 text-xs font-medium">
                <p>
                  <strong className="text-red-900">NOT FINANCIAL ADVICE:</strong> All information is for <strong>informational and educational purposes only</strong>. This platform does NOT provide investment, financial, or trading advice.
                </p>
                <p>
                  <strong className="text-red-900">DO YOUR OWN RESEARCH:</strong> Conduct research and consult qualified financial advisors before investing.
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
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  By accessing FINNOTIA ("the Platform"), you agree to these Terms and Conditions. If you disagree, you must not use our services.
                </p>
                <p className="text-xs">
                  These terms are legally binding. Continued use = acceptance of modifications.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">SEBI Compliance</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 rounded-r">
                  <p className="font-bold text-yellow-900 mb-1 text-xs">⚠️ IMPORTANT:</p>
                  <p className="text-yellow-800 text-xs">
                    FINNOTIA is <strong>NOT registered</strong> with SEBI as:
                  </p>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-yellow-800 text-xs">
                    <li>Investment Advisors (IA)</li>
                    <li>Research Analysts (RA)</li>
                    <li>Stock Brokers or Sub-Brokers</li>
                    <li>Portfolio Managers</li>
                    <li>Any SEBI-regulated entity</li>
                  </ul>
                </div>
                <p className="text-xs">
                  Only SEBI-registered professionals can provide personalized investment advice. FINNOTIA provides general educational content and AI-generated analysis for informational purposes only.
                </p>
                <p className="text-xs">
                  Verify information independently and consult SEBI-registered professionals before investing.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Services & AI Content</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="font-semibold text-gray-900 text-xs">FINNOTIA provides:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>
                    <strong>AI-Generated Analysis:</strong> Predictions/insights via AI/ML models. These are algorithmic outputs, not expert opinions.
                  </li>
                  <li>
                    <strong>Data Aggregation:</strong> Public IPO, stock, and market data
                  </li>
                  <li>
                    <strong>Educational Content:</strong> General info about markets, IPOs
                  </li>
                  <li>
                    <strong>Notifications:</strong> IPO openings, market events, news
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-2 border-[#4A90E2] p-2 rounded-r">
                  <p className="font-bold text-[#2E5AAD] mb-1 text-xs">
                    <Info className="inline w-3.5 h-3.5 mr-0.5" />
                    AI Limitations:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-700 text-xs">
                    <li>AI models can make errors</li>
                    <li>Past performance ≠ future results</li>
                    <li>Based on historical data/patterns</li>
                    <li>Market conditions change rapidly</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Investment Risks</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <p className="font-bold text-red-900 mb-1 text-xs">⚠️ MARKET RISKS:</p>
                  <p className="text-red-800 text-xs">
                    Investments are subject to market risks. You may lose your entire capital. No guarantee of returns.
                  </p>
                </div>
                <p className="font-semibold text-gray-900 text-xs">You agree that:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>Sole Responsibility:</strong> You're solely responsible for investment decisions</li>
                  <li><strong>Independent Verification:</strong> You must verify all information</li>
                  <li><strong>Professional Consultation:</strong> Consult SEBI-registered advisors</li>
                  <li><strong>No Guarantees:</strong> No guarantees on returns or gains</li>
                  <li><strong>Risk of Loss:</strong> You may lose all invested capital</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Data Accuracy</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  Information is from third-party sources. We strive for accuracy but cannot guarantee:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Accuracy, completeness, or timeliness</li>
                  <li>Real-time data availability</li>
                  <li>Correctness of third-party sources</li>
                  <li>Absence of errors in AI content</li>
                </ul>
                <p className="text-xs mt-1">
                  <strong>Data Delays:</strong> Market data may be delayed. Verify from official exchanges (NSE, BSE).
                </p>
                <p className="text-xs">
                  <strong>No Warranty:</strong> Info provided "as is" without warranty.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="font-semibold text-gray-900 text-xs">
                  FINNOTIA AND AFFILIATES SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Financial losses or damages from Platform use</li>
                  <li>Investment losses based on our content</li>
                  <li>Errors, inaccuracies, or omissions</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Unauthorized access or data breaches</li>
                  <li>Third-party actions or content</li>
                  <li>Consequential, indirect, or punitive damages</li>
                </ul>
                <p className="text-xs mt-1 bg-gray-50 border-l-2 border-gray-400 p-2 rounded-r">
                  You waive claims against FINNOTIA for losses from Platform use.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">User Account</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">When creating an account:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Provide accurate, complete information</li>
                  <li>Maintain account confidentiality</li>
                  <li>Must be 18+ years old</li>
                  <li>Don't share credentials</li>
                  <li>Liable for all account activities</li>
                  <li>Notify us of unauthorized access</li>
                </ul>
                <p className="text-xs mt-1">
                  <strong>Termination:</strong> We may suspend/terminate accounts for violations or suspicious activities.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Prohibited Uses</h2>
              </div>
              <div className="pl-8 space-y-1 text-gray-700 text-xs">
                <p className="text-xs">You agree NOT to:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Use Platform for illegal purposes or fraud</li>
                  <li>Manipulate prices or pump-and-dump schemes</li>
                  <li>Distribute false information</li>
                  <li>Scrape, copy, or redistribute content</li>
                  <li>Reverse engineer or access AI models</li>
                  <li>Use automated systems excessively</li>
                  <li>Impersonate others or create fake accounts</li>
                  <li>Violate laws or regulations</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Intellectual Property</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  All content, features, and functionality (text, graphics, logos, images, software, AI models) are FINNOTIA's exclusive property, protected by copyright and IP laws.
                </p>
                <p className="text-xs">
                  You may not reproduce, distribute, modify, or exploit content without written permission.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Governing Law</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  <strong>Governing Law:</strong> These terms are governed by Indian laws.
                </p>
                <p className="text-xs">
                  <strong>Jurisdiction:</strong> Disputes subject to exclusive jurisdiction of Mumbai, Maharashtra courts.
                </p>
                <p className="text-xs">
                  <strong>Dispute Resolution:</strong> Parties agree to negotiate for 30 days before legal action.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  11
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Modifications</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  FINNOTIA may modify these terms anytime without notice. Changes effective immediately upon posting.
                </p>
                <p className="text-xs">
                  Continued use = acceptance of new terms. Review periodically.
                </p>
                <p className="font-semibold text-xs">
                  Check this page regularly for updates.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  12
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Indemnification</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">
                  You agree to indemnify FINNOTIA and affiliates from claims, liabilities, damages, losses, or costs arising from:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Your use/misuse of Platform</li>
                  <li>Your violation of these terms</li>
                  <li>Your investment decisions based on content</li>
                  <li>Your violation of third-party rights</li>
                  <li>Your violation of laws/regulations</li>
                </ul>
              </div>
            </section>

            {/* Section 13 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  13
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Severability</h2>
              </div>
              <div className="pl-8 space-y-1 text-gray-700 text-xs">
                <p className="text-xs">
                  If any provision is invalid, illegal, or unenforceable, remaining provisions continue in full force.
                </p>
              </div>
            </section>

          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] p-3 md:p-4 text-white">
            <div className="flex items-start gap-2 md:gap-3">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm md:text-base font-bold mb-2">Questions About Terms?</h3>
                <p className="mb-2 opacity-90 text-xs">
                  Questions about these Terms? Contact us:
                </p>
                <div className="space-y-1 text-xs">
                  {/* <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:legal@finnotia.com" className="underline">legal@finnotia.com</a>
                  </p> */}
                  <p>
                    <strong>Support:</strong>{' '}
                    <a href="mailto:support@finnotia.com" className="underline">support@finnotia.com</a>
                  </p>
                </div>
                <p className="text-xs opacity-80 mt-2">
                  <strong>Effective:</strong> November 18, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}