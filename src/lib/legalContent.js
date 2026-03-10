// src/lib/legalContent.js
// ── Single source of truth for all 3 legal pages ─────────────────
// Structure: { id, title, highlight, badge, icon, accentColor, lastUpdated, topBanner?, sections[], bottomBanner }

export const legalContent = {

  // ───────────────────────────────────────────────────────────────
  // DISCLAIMER
  // ───────────────────────────────────────────────────────────────
  disclaimer: {
    id:          'disclaimer',
    title:       'Disclaimer',
    highlight:   '& Risk',
    badge:       'Important Notice',
    icon:        'FileWarning',
    accentColor: 'red',       // red | blue
    lastUpdated: 'November 18, 2025',
    topBanner: {
      title: '⚠️ Critical Investment Warning',
      body:  'FINNOTIA is informational only. We are NOT SEBI registered. We do NOT provide investment advice. All content is for educational purposes only.',
    },
    sections: [
      {
        num: 1, title: 'Not Financial Advice',
        items: [
          { type: 'box', color: 'red', heading: 'THIS IS NOT INVESTMENT ADVICE', body: 'All information is for general informational and educational purposes ONLY. Nothing constitutes investment advice, financial advice, trading signals, an offer to buy/sell securities, a solicitation, or personalized portfolio management.' },
          { type: 'text', body: 'You should NOT rely solely on FINNOTIA. Always conduct independent research, consult qualified professionals, read official prospectuses, and understand your own risk tolerance.' },
        ],
      },
      {
        num: 2, title: 'SEBI Registration',
        items: [
          { type: 'box', color: 'yellow', heading: 'Regulatory Status', body: 'FINNOTIA is NOT registered with SEBI as Investment Advisors, Research Analysts, Stock Brokers, Portfolio Managers, or any other regulatory authority.' },
          { type: 'text', body: 'Only SEBI-registered professionals can provide personalized investment advice. To find registered advisors visit sebi.gov.in' },
        ],
      },
      {
        num: 3, title: 'AI Predictions',
        items: [
          { type: 'box', color: 'purple', heading: 'AI Predictions Are Not Guarantees', body: 'FINNOTIA uses AI for IPO analysis. These are probabilistic, algorithm-based, historical data-driven outputs — not certainties. AI predictions should be one input among many in your research. Never make decisions based solely on AI output.' },
        ],
      },
      {
        num: 4, title: 'Data Accuracy',
        items: [
          { type: 'text', body: 'While we strive for accuracy, FINNOTIA does NOT guarantee accuracy of information. Content may contain errors, omissions, or outdated data aggregated from third-party sources. Always verify information independently before making investment decisions.' },
        ],
      },
      {
        num: 5, title: 'Market Risks',
        items: [
          { type: 'box', color: 'red', heading: '⚠️ Investments Involve Substantial Risk', body: 'You may lose ALL your invested capital. Risks include: market volatility, IPO risk, liquidity risk, economic risk, company risk, and regulatory risk.' },
        ],
      },
      {
        num: 6, title: 'Past Performance',
        items: [
          { type: 'text', body: 'Past performance is NOT indicative of future results. Historical IPO data, returns, or AI predictions shown on FINNOTIA do NOT guarantee future outcomes. Each investment carries unique risks regardless of historical trends.' },
        ],
      },
      {
        num: 7, title: 'Limitation of Liability',
        items: [
          { type: 'box', color: 'red', heading: 'No Liability for Losses', body: 'FINNOTIA, its operators, and affiliates shall NOT be liable for any financial losses, loss of profits, damages from reliance on content, errors in information, service interruptions, unauthorized access, third-party actions, or consequential/indirect damages.' },
          { type: 'text', body: 'YOUR SOLE REMEDY: If dissatisfied with the Platform, discontinue using it.' },
        ],
      },
      {
        num: 8, title: 'User Responsibility',
        items: [
          { type: 'text', body: 'By using FINNOTIA, you agree you are solely responsible for investment decisions, you understand securities market risks, you will conduct independent research, and you will not rely solely on FINNOTIA.' },
        ],
      },
      {
        num: 9, title: 'Third-Party Content',
        items: [
          { type: 'text', body: 'FINNOTIA may link to third-party websites. We do not endorse, control, or take responsibility for third-party content, products, or services. Your interactions with third parties are at your own risk.' },
        ],
      },
      {
        num: 10, title: 'Modifications',
        items: [
          { type: 'text', body: 'FINNOTIA may modify this Disclaimer anytime without notice. Changes are effective immediately upon posting. Continued use constitutes acceptance of the modified Disclaimer.' },
        ],
      },
    ],
    bottomBanner: {
      icon:  'AlertTriangle',
      title: 'Final Reminders',
      lines: [
        '✋ STOP before investing — read the prospectus first',
        "🔍 RESEARCH independently — don't rely only on FINNOTIA",
        '👨‍💼 CONSULT professionals — talk to SEBI-registered advisors',
        '⚖️ UNDERSTAND risks — you may lose everything',
        "📊 DIVERSIFY — don't put all eggs in one basket",
        '💰 INVEST wisely — only what you can afford to lose',
      ],
      contact: 'support@finnotia.com',
      effective: 'November 18, 2025',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // PRIVACY POLICY
  // ───────────────────────────────────────────────────────────────
  privacy: {
    id:          'privacy',
    title:       'Privacy',
    highlight:   'Policy',
    badge:       'Data & Privacy',
    icon:        'Shield',
    accentColor: 'blue',
    lastUpdated: 'March 09, 2026',
    topBanner: {
      title: 'Our Commitment to Your Privacy',
      body:  'FINNOTIA protects your personal information. This policy explains how we collect, use, and safeguard your data, including through Google AdSense (website) and Google AdMob (app).',
      style: 'info',    // info = blue box, default = red
    },
    sections: [
      {
        num: 1, title: 'Information We Collect',
        items: [
          { type: 'box', color: 'blue',   heading: 'Personal Information',  body: 'Name & email (via Google Sign-In), investment preferences, support messages, and feedback.' },
          { type: 'box', color: 'gray',   heading: 'Auto-Collected',        body: 'Device type, OS, browser, IP address, pages viewed, time spent, clicks, approximate location (IP-based), cookies, and crash/analytics reports.' },
          { type: 'box', color: 'green',  heading: '🌐 Website Ads — Google AdSense', body: 'Google AdSense uses cookies (e.g., DoubleClick) to serve relevant ads on finnotia.com. Browsing data and device info are used for ad targeting. Opt out at google.com/settings/ads or aboutads.info.' },
          { type: 'box', color: 'amber',  heading: '📱 App Ads — Google AdMob',       body: 'Google AdMob collects your Google Advertising ID (GAID), device info, and ad interaction data. Opt out via Android Settings → Google → Ads → Opt out of Ads Personalization.' },
          { type: 'box', color: 'red',    heading: 'What We DON\'T Collect',           body: 'No financial data (bank, UPI, cards), no trading credentials (demat, passwords), no government IDs (Aadhaar, PAN), no investment portfolio data.' },
        ],
      },
      {
        num: 2, title: 'How We Use Your Info',
        items: [
          { type: 'box', color: 'blue',  heading: '🎯 Core Services',        body: 'Create and manage your account, provide IPO analysis & market updates, send notifications (with consent), process requests.' },
          { type: 'box', color: 'green', heading: '📢 Advertising (Website & App)', body: 'Display ads via Google AdSense on finnotia.com and Google AdMob in our Android app. Serve personalized or non-personalized ads. Measure ad performance.' },
          { type: 'box', color: 'blue',  heading: '📊 AI & ML',               body: 'Improve AI analysis models, personalize content, analyse usage patterns. Only anonymized data is shared with AI services.' },
          { type: 'box', color: 'blue',  heading: '🛡️ Security',              body: 'Detect fraud & abuse, protect against threats, comply with legal obligations, enforce Terms & Conditions.' },
        ],
      },
      {
        num: 3, title: 'Data Storage & Security',
        items: [
          { type: 'box', color: 'blue', heading: '🔒 Storage', body: 'Cloud: Firebase (India), MongoDB (India/Singapore). Indian data stored in India. Regular encrypted backups.' },
          { type: 'box', color: 'gray', heading: '🛡️ Security Measures', body: 'Encryption: SSL/TLS, AES-256. Access Controls: RBAC, limited employee access. Monitoring: 24/7 security & intrusion detection. Compliance: IT Act 2000, Security Practices Rules 2011.' },
          { type: 'box', color: 'yellow', heading: '⚠️ Note', body: 'No internet transmission is 100% secure. We continuously work to protect your information.' },
        ],
      },
      {
        num: 4, title: 'Third-Party Services',
        items: [
          { type: 'box', color: 'green', heading: '🌐 Website Ads — Google AdSense', body: 'We use Google AdSense on finnotia.com. It uses cookies and web beacons to serve interest-based ads. Opt out at google.com/settings/ads. See Google Privacy Policy & How Google Uses Ad Data for details.' },
          { type: 'box', color: 'amber', heading: '📱 App Ads — Google AdMob',       body: 'We use Google AdMob in our Android app. It may collect your GAID, device info, and ad interaction data. We display interstitial and rewarded video ads. Opt out via device ad settings.' },
          { type: 'box', color: 'blue',  heading: '🤖 AI & Analytics',               body: 'Google Gemini (IPO analysis), Perplexity AI (news summarization), Google Analytics (user behaviour), Firebase (performance & crash reporting).' },
          { type: 'box', color: 'blue',  heading: '☁️ Infrastructure',               body: 'Firebase (auth, database, storage, notifications), MongoDB Atlas (database), Azure/Vercel (web hosting & CDN).' },
          { type: 'box', color: 'red',   heading: "❌ We DON'T",                     body: 'Sell your personal data to brokers, share personal data for unrelated purposes, or share financial/investment data with advertisers.' },
        ],
      },
      {
        num: 5, title: 'Your Privacy Rights',
        items: [
          { type: 'grid', cells: [
            { icon: '📖', title: 'Right to Access',     body: 'Request a copy of your data' },
            { icon: '✏️', title: 'Right to Correction', body: 'Update inaccurate info' },
            { icon: '🗑️', title: 'Right to Deletion',   body: 'Request account deletion' },
            { icon: '📤', title: 'Data Portability',    body: 'Export your data' },
            { icon: '🚫', title: 'Right to Opt-Out',    body: 'Unsubscribe from emails & personalized ads' },
            { icon: '⚖️', title: 'Right to Object',     body: 'Object to data processing' },
          ]},
          { type: 'box', color: 'blue', heading: 'How to Exercise Rights', body: 'Contact us at support@finnotia.com — we\'ll respond within 30 days.' },
        ],
      },
      {
        num: 6, title: 'Data Retention',
        items: [
          { type: 'text', body: 'Active Account: until deletion request. Activity Logs: 90 days. Backups: up to 180 days. Inactive Accounts: auto-delete after 2 years. Ad Data (AdSense/AdMob): retained by Google per their policies. Legal Requirements: retained as per law.' },
        ],
      },
      {
        num: 7, title: 'Cookies & Tracking',
        items: [
          { type: 'box', color: 'gray',  heading: '🔑 Essential (Required)',                     body: 'Authentication, security, core functionality.' },
          { type: 'box', color: 'gray',  heading: '📊 Analytics (Optional)',                     body: 'Understand user interactions via Google Analytics.' },
          { type: 'box', color: 'green', heading: '🌐 Website Ads — Google AdSense (Optional)',  body: 'Google AdSense uses cookies (including the DoubleClick cookie) to serve ads on finnotia.com. Opt out at google.com/settings/ads.' },
          { type: 'box', color: 'amber', heading: '📱 App Ads — Google AdMob (Optional)',        body: 'AdMob uses advertising identifiers to serve and measure ads in our Android app. Opt out via device ad settings.' },
          { type: 'text', body: 'Control cookies via browser settings. Disabling advertising cookies may affect ad relevance but will not affect core functionality.' },
        ],
      },
      {
        num: 8, title: "Children's Privacy",
        items: [
          { type: 'box', color: 'yellow', heading: '🔞 Age Restriction', body: 'FINNOTIA is for users 18+ years only. We don\'t knowingly collect data from minors. Advertisements through AdSense and AdMob are not directed at children. Parents: contact us if your child provided info.' },
        ],
      },
      {
        num: 9, title: 'International Transfers',
        items: [
          { type: 'text', body: 'We prioritize storing data in India. Some third-party services (including Google AdSense and AdMob) may process data outside India. We ensure compliance with Indian data protection laws, adequate safeguards, anonymized transfers where possible, and encryption for all data in transit.' },
        ],
      },
      {
        num: 10, title: 'Policy Changes',
        items: [
          { type: 'text', body: 'We may update this policy. Changes notified via email, in-app notification/banner, and updated "Last Modified" date. Continued use constitutes acceptance of the updated policy.' },
        ],
      },
      {
        num: 11, title: 'Compliance',
        items: [
          { type: 'text', body: 'This policy complies with: IT Act 2000 & amendments, IT (Security Practices) Rules 2011, SEBI Guidelines (where applicable), DPDP Act 2023 (when enforced), Google Play Developer Program Policies, Google AdMob Program Policies, and Google AdSense Program Policies.' },
        ],
      },
    ],
    bottomBanner: {
      icon:      'Mail',
      title:     'Privacy Questions?',
      body:      'Questions about this Privacy Policy or data handling? Contact us:',
      contact:   'support@finnotia.com',
      address:   'FINNOTIA, Kolkata, WestBengal, India',
      effective: 'March 09, 2026',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // TERMS & CONDITIONS
  // ───────────────────────────────────────────────────────────────
  terms: {
    id:          'terms',
    title:       'Terms &',
    highlight:   'Conditions',
    badge:       'Legal Agreement',
    icon:        'FileText',
    accentColor: 'blue',
    lastUpdated: 'February 23, 2026',
    topBanner: {
      title: '⚠️ Critical Disclaimer',
      body:  'NOT FINANCIAL ADVICE: All information is for informational and educational purposes only. This platform does NOT provide investment, financial, or trading advice. DO YOUR OWN RESEARCH and consult qualified financial advisors before investing.',
      style: 'warning',
    },
    sections: [
      {
        num: 1, title: 'Acceptance of Terms',
        items: [
          { type: 'text', body: 'By accessing FINNOTIA ("the Platform"), you agree to these Terms and Conditions. If you disagree, you must not use our services. These terms are legally binding. Continued use constitutes acceptance of any modifications.' },
        ],
      },
      {
        num: 2, title: 'SEBI Compliance',
        items: [
          { type: 'box', color: 'yellow', heading: '⚠️ Important', body: 'FINNOTIA is NOT registered with SEBI as Investment Advisors (IA), Research Analysts (RA), Stock Brokers, Sub-Brokers, Portfolio Managers, or any SEBI-regulated entity.' },
          { type: 'text', body: 'Only SEBI-registered professionals can provide personalized investment advice. FINNOTIA provides general educational content and AI-generated analysis for informational purposes only. Verify information independently and consult SEBI-registered professionals before investing.' },
        ],
      },
      {
        num: 3, title: 'Services & AI Content',
        items: [
          { type: 'text', body: 'FINNOTIA provides: AI-Generated Analysis (probabilistic outputs, not expert opinions), Data Aggregation (public IPO, stock, and market data), Educational Content (general market & IPO information), and Notifications (IPO openings, market events, news).' },
          { type: 'box', color: 'blue', heading: 'AI Limitations', body: 'AI models can make errors. Past performance ≠ future results. Analysis is based on historical data and patterns. Market conditions change rapidly.' },
        ],
      },
      {
        num: 4, title: 'Investment Risks',
        items: [
          { type: 'box', color: 'red', heading: '⚠️ Market Risks', body: 'Investments are subject to market risks. You may lose your entire capital. No guarantee of returns.' },
          { type: 'text', body: 'You agree that: you are solely responsible for investment decisions, you must verify all information independently, you will consult SEBI-registered advisors, there are no guarantees on returns, and you may lose all invested capital.' },
        ],
      },
      {
        num: 5, title: 'Data Accuracy',
        items: [
          { type: 'text', body: 'Information is sourced from third parties. We strive for accuracy but cannot guarantee accuracy, completeness, timeliness, real-time availability, or absence of AI errors. Market data may be delayed — always verify from official exchanges (NSE, BSE). Information is provided "as is" without warranty.' },
        ],
      },
      {
        num: 6, title: 'Limitation of Liability',
        items: [
          { type: 'text', body: 'FINNOTIA AND AFFILIATES SHALL NOT BE LIABLE FOR: financial losses from Platform use, investment losses based on our content, errors or inaccuracies, service interruptions, unauthorized access or data breaches, third-party actions, or consequential/indirect/punitive damages.' },
          { type: 'box', color: 'gray', heading: 'Waiver', body: 'You waive claims against FINNOTIA for losses arising from Platform use.' },
        ],
      },
      {
        num: 7, title: 'User Account',
        items: [
          { type: 'text', body: 'When creating an account: provide accurate info, maintain account confidentiality, must be 18+ years old, don\'t share credentials, you are liable for all account activities, notify us of unauthorized access.' },
          { type: 'text', body: 'Termination: We may suspend/terminate accounts for violations or suspicious activities.' },
        ],
      },
      {
        num: 8, title: 'Prohibited Uses',
        items: [
          { type: 'text', body: 'You agree NOT to: use Platform for illegal purposes or fraud, manipulate prices or run pump-and-dump schemes, distribute false information, scrape/copy/redistribute content without permission, reverse engineer AI models, use automated systems excessively, impersonate others, or violate any laws or regulations.' },
        ],
      },
      {
        num: 9, title: 'Advertising',
        items: [
          { type: 'text', body: 'FINNOTIA is a free, ad-supported platform. The app displays advertisements served by Google AdMob as interstitial ads between content and optional rewarded video ads. Ad content is provided by third-party advertisers and does not constitute endorsement by FINNOTIA. Interacting with ads is at your own discretion and risk.' },
          { type: 'box', color: 'blue', heading: 'Rewarded Ads', body: 'You may optionally watch rewarded video ads to unlock premium features for a limited time. This is entirely voluntary — not required to use core app features.' },
        ],
      },
      {
        num: 10, title: 'Intellectual Property',
        items: [
          { type: 'text', body: 'All content, features, and functionality (text, graphics, logos, images, software, AI models) are FINNOTIA\'s exclusive property, protected by copyright and IP laws. You may not reproduce, distribute, modify, or exploit content without written permission.' },
        ],
      },
      {
        num: 11, title: 'Governing Law',
        items: [
          { type: 'text', body: 'Governing Law: These terms are governed by Indian laws. Jurisdiction: Disputes subject to exclusive jurisdiction of Kolkata, Maharashtra courts. Dispute Resolution: Parties agree to negotiate in good faith for 30 days before legal action.' },
        ],
      },
      {
        num: 12, title: 'Modifications',
        items: [
          { type: 'text', body: 'FINNOTIA may modify these terms anytime without notice. Changes are effective immediately upon posting. Continued use constitutes acceptance of new terms. Review this page periodically.' },
        ],
      },
      {
        num: 13, title: 'Indemnification',
        items: [
          { type: 'text', body: 'You agree to indemnify FINNOTIA and affiliates from claims, liabilities, damages, losses, or costs arising from: your use/misuse of the Platform, your violation of these terms, your investment decisions based on our content, or your violation of third-party rights or laws.' },
        ],
      },
      {
        num: 14, title: 'Severability',
        items: [
          { type: 'text', body: 'If any provision is found invalid, illegal, or unenforceable, the remaining provisions continue in full force and effect.' },
        ],
      },
    ],
    bottomBanner: {
      icon:      'Shield',
      title:     'Questions About Terms?',
      body:      'Questions about these Terms? Contact us:',
      contact:   'support@finnotia.com',
      effective: 'February 23, 2026',
    },
  },
};