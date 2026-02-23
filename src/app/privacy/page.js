'use client';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, AlertCircle, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-3 py-4 md:py-6 max-w-4xl">
        
        {/* Page Header */}
        <div className="text-center mb-4 mt-12 md:mb-6">
          <div className="inline-block p-2 bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] rounded-lg mb-2 shadow-md">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Privacy <span className="bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Learn how we collect, use, and protect your data
          </p>
          <p className="text-xs text-gray-500 mt-1">Last Updated: February 23, 2026</p>
        </div>

        {/* Commitment Box */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-[#4A90E2] rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-md">
          <div className="flex items-start gap-2 md:gap-3">
            <Lock className="w-5 h-5 md:w-6 md:h-6 text-[#2E5AAD] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#2E5AAD] mb-1.5">
                Our Commitment to Your Privacy
              </h2>
              <p className="text-gray-700 text-xs md:text-sm">
                FINNOTIA protects your personal information and privacy. This policy explains how we collect, use, and safeguard your data, including information collected through third-party advertising services.
              </p>
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
                <h2 className="text-base md:text-lg font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                
                <div className="bg-blue-50 rounded p-2 md:p-3 border-l-2 border-[#4A90E2]">
                  <h3 className="font-bold text-[#2E5AAD] mb-1 flex items-center gap-1.5 text-xs md:text-sm">
                    <Database className="w-3.5 h-3.5" />
                    Personal Information:
                  </h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    <li><strong>Account:</strong> Name, email, phone (optional)</li>
                    <li><strong>Profile:</strong> Investment preferences, interests</li>
                    <li><strong>Communication:</strong> Support messages</li>
                    <li><strong>Content:</strong> Comments, feedback</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded p-2 md:p-3 border-l-2 border-gray-400">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs md:text-sm">
                    <Eye className="w-3.5 h-3.5" />
                    Auto-Collected:
                  </h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    <li><strong>Device:</strong> Type, OS, browser, IP address</li>
                    <li><strong>Usage:</strong> Pages viewed, time spent, clicks</li>
                    <li><strong>Location:</strong> Approximate (IP-based)</li>
                    <li><strong>Cookies:</strong> Session, analytics, preferences</li>
                    <li><strong>App Analytics:</strong> Crash reports, metrics</li>
                  </ul>
                </div>

                {/* ✅ NEW: Advertising Data Collection */}
                <div className="bg-amber-50 rounded p-2 md:p-3 border-l-2 border-amber-400">
                  <h3 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5 text-xs md:text-sm">
                    📢 Advertising Data:
                  </h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    <li><strong>Advertising ID:</strong> Google Advertising ID (GAID) for ad personalization</li>
                    <li><strong>Ad Interaction:</strong> Ad views, clicks, and engagement data</li>
                    <li><strong>Device Info for Ads:</strong> Device model, OS version, screen size for ad serving</li>
                    <li><strong>Ad Preferences:</strong> Your ad personalization settings</li>
                  </ul>
                  <p className="text-xs text-amber-800 mt-1">
                    This data is collected by Google AdMob to serve relevant advertisements. You can opt out of personalized ads in your device settings.
                  </p>
                </div>

                <div className="bg-red-50 rounded p-2 md:p-3 border-l-2 border-red-400">
                  <h3 className="font-bold text-red-900 mb-1 text-xs md:text-sm">⚠️ What We DON'T Collect:</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-red-800 text-xs">
                    <li><strong>No Financial Data:</strong> Bank accounts, cards, UPI</li>
                    <li><strong>No Trading Credentials:</strong> Demat, passwords</li>
                    <li><strong>No Government IDs:</strong> Aadhaar, PAN, passport</li>
                    <li><strong>No Investment Portfolio:</strong> Your holdings</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">How We Use Your Info</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="text-xs">We use collected information for:</p>
                
                <div className="space-y-1.5">
                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">🎯 Core Services:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Create and manage your account</li>
                      <li>Provide IPO analysis & market updates</li>
                      <li>Send notifications about IPO updates</li>
                      <li>Process requests and respond to inquiries</li>
                    </ul>
                  </div>

                  {/* ✅ NEW: Advertising Purpose */}
                  <div className="bg-white border border-amber-200 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">📢 Advertising:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Display advertisements through Google AdMob</li>
                      <li>Serve personalized or non-personalized ads based on your preferences</li>
                      <li>Show rewarded video ads for premium feature access</li>
                      <li>Measure ad performance and effectiveness</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">📊 AI & ML:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Improve AI analysis models</li>
                      <li>Personalize content & recommendations</li>
                      <li>Analyze usage patterns</li>
                      <li>Train ML systems (anonymized data)</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">🔔 Communications:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Transactional emails (verification, reset)</li>
                      <li>Push notifications for IPO updates</li>
                      <li>Marketing emails (with consent)</li>
                      <li>Support responses</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">🛡️ Security:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Detect fraud & abuse</li>
                      <li>Protect against security threats</li>
                      <li>Comply with legal obligations</li>
                      <li>Enforce Terms & Conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Data Storage & Security</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <div className="bg-blue-50 border-l-2 border-[#4A90E2] p-2 rounded-r">
                  <h3 className="font-bold text-[#2E5AAD] mb-1 text-xs">🔒 Where We Store:</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    <li><strong>Cloud:</strong> Firebase (India), MongoDB (India/Singapore)</li>
                    <li><strong>Residency:</strong> Indian data stored in India</li>
                    <li><strong>Backups:</strong> Regular encrypted backups</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-2 border-gray-400 p-2 rounded-r">
                  <h3 className="font-bold text-gray-900 mb-1 text-xs">🛡️ Security Measures:</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    <li><strong>Encryption:</strong> SSL/TLS, AES-256</li>
                    <li><strong>Access Controls:</strong> RBAC, limited employee access</li>
                    <li><strong>Authentication:</strong> Secure hashing, optional 2FA</li>
                    <li><strong>Monitoring:</strong> 24/7 security, intrusion detection</li>
                    <li><strong>Compliance:</strong> IT Act 2000, Security Practices Rules 2011</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                  <p className="text-xs text-yellow-800">
                    <strong>⚠️ Note:</strong> No internet transmission is 100% secure. We continuously work to protect your information.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 - ✅ FIXED: Added AdMob, removed contradictory statement */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Third-Party Services</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="text-xs">We work with the following third-party service providers:</p>

                <div className="space-y-1.5">

                  {/* ✅ NEW: Google AdMob Section - CRITICAL for approval */}
                  <div className="bg-amber-50 border border-amber-200 rounded p-2">
                    <h4 className="font-bold text-amber-900 mb-1 text-xs">📢 Advertising — Google AdMob:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>We use <strong>Google AdMob</strong> to display advertisements in the app</li>
                      <li>AdMob may collect and use your <strong>Google Advertising ID (GAID)</strong>, device information, and ad interaction data to serve relevant ads</li>
                      <li>AdMob may show <strong>personalized ads</strong> based on your interests, or <strong>non-personalized ads</strong> based on your settings</li>
                      <li>We display <strong>interstitial ads</strong> at natural content transitions and <strong>rewarded video ads</strong> for optional premium features</li>
                      <li>You can opt out of personalized advertising by adjusting your device&apos;s ad settings:
                        <ul className="list-disc pl-4 mt-0.5">
                          <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
                        </ul>
                      </li>
                    </ul>
                    <div className="mt-1.5 pt-1.5 border-t border-amber-200">
                      <p className="text-xs text-amber-800">
                        For more information on how Google uses your data, please review:{' '}
                        <a 
                          href="https://policies.google.com/privacy" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 underline font-semibold"
                        >
                          Google Privacy Policy
                        </a>
                        {' '}and{' '}
                        <a 
                          href="https://policies.google.com/technologies/ads" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 underline font-semibold"
                        >
                          How Google Uses Information from Apps
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">🤖 AI & Analytics:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li><strong>Google Gemini:</strong> IPO analysis</li>
                      <li><strong>Perplexity AI:</strong> News summarization</li>
                      <li><strong>Google Analytics:</strong> User behavior</li>
                      <li><strong>Firebase:</strong> App performance & crash reporting</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-1">
                      Note: Only anonymized data shared with AI services
                    </p>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">☁️ Infrastructure:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li><strong>Firebase:</strong> Auth, database, storage, notifications</li>
                      <li><strong>MongoDB Atlas:</strong> Database hosting</li>
                      <li><strong>Azure/AWS/Vercel:</strong> Web hosting, CDN</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-blue-100 rounded p-2">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs">📧 Communications:</h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs">
                      <li>Email service providers</li>
                      <li>SMS gateway for OTP</li>
                    </ul>
                  </div>
                </div>

                {/* ✅ FIXED: Removed "Share with advertisers" from DON'T list since we DO use AdMob */}
                <div className="bg-red-50 border-l-2 border-red-400 p-2 rounded-r">
                  <h3 className="font-bold text-red-900 mb-1 text-xs">❌ We DON'T:</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-red-800 text-xs">
                    <li>Sell your personal information to data brokers</li>
                    <li>Share your personal data for purposes unrelated to app functionality</li>
                    <li>Use data for unrelated purposes</li>
                    <li>Share financial or investment data with advertisers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Your Privacy Rights</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs md:text-sm">
                <p className="font-semibold text-gray-900 text-xs">You have the following rights:</p>
                
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">📖 Right to Access</h4>
                    <p className="text-xs">Request copy of your data</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">✏️ Right to Correction</h4>
                    <p className="text-xs">Update inaccurate info</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">🗑️ Right to Deletion</h4>
                    <p className="text-xs">Request account deletion</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">📤 Data Portability</h4>
                    <p className="text-xs">Export your data</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">🚫 Right to Opt-Out</h4>
                    <p className="text-xs">Unsubscribe from emails & personalized ads</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                    <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">⚖️ Right to Object</h4>
                    <p className="text-xs">Object to data processing</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-[#4A90E2] rounded p-2">
                  <h4 className="font-bold text-[#2E5AAD] mb-1 text-xs">How to Exercise Rights:</h4>
                  <p className="text-xs mb-1">Contact us at: <strong>support@finnotia.com</strong></p>
                  <p className="text-xs text-gray-600 mt-1">
                    We&apos;ll respond within 30 days
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Data Retention</h2>
              </div>
              <div className="pl-8 space-y-2 text-gray-700 text-xs">
                <p className="text-xs">We retain your information as needed:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li><strong>Active Account:</strong> Until deletion request</li>
                  <li><strong>Activity Logs:</strong> 90 days</li>
                  <li><strong>Backups:</strong> Up to 180 days</li>
                  <li><strong>Inactive Accounts:</strong> Auto-delete after 2 years</li>
                  <li><strong>Ad Interaction Data:</strong> Retained by Google per their retention policies</li>
                  <li><strong>Legal Requirements:</strong> Retained as per law</li>
                </ul>

                <div className="bg-gray-50 rounded p-2">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs">Upon Account Deletion:</h4>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs text-gray-700">
                    <li>Personal info deleted within 30 days</li>
                    <li>Anonymized data may be retained</li>
                    <li>Some data retained for legal compliance</li>
                    <li>Third-party services (e.g., Google) may retain data per their own policies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Cookies & Tracking</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <p className="text-xs">We use cookies and similar technologies to improve your experience:</p>
                
                <div className="space-y-1">
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <h4 className="font-bold text-gray-900 text-xs mb-0.5">🔑 Essential (Required)</h4>
                    <p className="text-xs text-gray-600">Authentication, security, core functionality</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded p-2">
                    <h4 className="font-bold text-gray-900 text-xs mb-0.5">📊 Analytics (Optional)</h4>
                    <p className="text-xs text-gray-600">Understand user interactions via Google Analytics</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded p-2">
                    <h4 className="font-bold text-gray-900 text-xs mb-0.5">📢 Advertising (Optional)</h4>
                    <p className="text-xs text-gray-600">Google AdMob uses advertising identifiers to serve and measure ads. You can opt out via device ad settings.</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded p-2">
                    <h4 className="font-bold text-gray-900 text-xs mb-0.5">⚙️ Preference (Optional)</h4>
                    <p className="text-xs text-gray-600">Remember settings, personalize experience</p>
                  </div>
                </div>

                <p className="text-xs mt-1">
                  Control cookies via browser settings. Disabling may affect functionality.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Children&apos;s Privacy</h2>
              </div>
              <div className="pl-8 space-y-1.5 text-gray-700 text-xs">
                <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 rounded-r">
                  <p className="font-bold text-yellow-900 mb-1 text-xs">🔞 Age Restriction:</p>
                  <p className="text-yellow-800 text-xs">
                    FINNOTIA is for users <strong>18+ years</strong>. We don&apos;t knowingly collect data from minors. Parents, contact us if your child provided info. Advertisements displayed through Google AdMob are not directed at children.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">International Transfers</h2>
              </div>
              <div className="pl-8 space-y-1 text-gray-700 text-xs">
                <p className="text-xs">
                  We prioritize storing data in India. Some third-party services (including Google AdMob) may process data outside India. We ensure:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Compliance with Indian data protection laws</li>
                  <li>Adequate safeguards in place</li>
                  <li>Anonymized data transferred when possible</li>
                  <li>Encryption for all data in transit</li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Policy Changes</h2>
              </div>
              <div className="pl-8 space-y-1 text-gray-700 text-xs">
                <p className="text-xs">
                  We may update this policy. Changes notified via:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>Email notification</li>
                  <li>In-app notification/banner</li>
                  <li>Updated &quot;Last Modified&quot; date</li>
                </ul>
                <p className="text-xs mt-1">
                  Continued use = acceptance of updated policy
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#4A90E2] text-white rounded text-xs flex items-center justify-center font-bold">
                  11
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Compliance</h2>
              </div>
              <div className="pl-8 space-y-1 text-gray-700 text-xs">
                <p className="text-xs">This policy complies with:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li><strong>IT Act, 2000</strong> and amendments</li>
                  <li><strong>IT (Security Practices) Rules, 2011</strong></li>
                  <li><strong>SEBI Guidelines</strong> (where applicable)</li>
                  <li><strong>DPDP Act, 2023</strong> (when enforced)</li>
                  <li><strong>Google Play Developer Program Policies</strong></li>
                  <li><strong>Google AdMob & AdSense Program Policies</strong></li>
                </ul>
              </div>
            </section>

          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] p-3 md:p-4 text-white">
            <div className="flex items-start gap-2 md:gap-3">
              <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm md:text-base font-bold mb-2">Privacy Questions?</h3>
                <p className="mb-2 opacity-90 text-xs">
                  Questions about this Privacy Policy or data handling? Contact us:
                </p>
                <div className="space-y-1 text-xs">
                  <p>
                    <strong>Support:</strong>{' '}
                    <a href="mailto:support@finnotia.com" className="underline">support@finnotia.com</a>
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-white/30">
                  <p className="text-xs opacity-80">
                    <strong>Address:</strong> FINNOTIA, Mumbai, Maharashtra, India
                  </p>
                </div>
                <p className="text-xs opacity-80 mt-2">
                  <strong>Effective:</strong> February 23, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}