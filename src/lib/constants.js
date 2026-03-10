// src/lib/constants.js
// ── FINNOTIA Design Tokens ──────────────────────────────────────
// Primary: #0B0F19 | Accent: #2563EB | Background: #F8FAFC
// FIX #3A APPLIED: APP_DESCRIPTION updated (removed "AI-Powered")

export const APP_NAME = 'FINNOTIA';
// FIX #3A: was 'AI-Powered IPO Tracker & Market Data Platform'
export const APP_DESCRIPTION = 'IPO Tracker & Market Data Platform for Indian Investors';

// ── Download Links ──────────────────────────────────────────────
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.ipo.ipopredictor';
export const APP_STORE_URL = '/download';

// ── Design Tokens ───────────────────────────────────────────────
export const THEME_COLORS = {
  primary:    '#0B0F19',   // dark navy   — hero, dark sections
  accent:     '#2563EB',   // blue        — CTAs, links, tags
  accentHover:'#1D4ED8',   // darker blue — hover states
  accentLight:'#DBEAFE',   // light blue  — badge backgrounds
  bg:         '#F8FAFC',   // off-white   — page background
  surface:    '#FFFFFF',   // white       — cards
  border:     '#E2E8F0',   // slate-200   — dividers
  muted:      '#64748B',   // slate-500   — secondary text
  heading:    '#0F172A',   // slate-900   — headings
  text:       '#334155',   // slate-700   — body text
};

// Tailwind gradient strings
export const GRADIENTS = {
  // Main CTA — solid accent, no purple
  primary: 'from-[#2563EB] to-[#1D4ED8]',
  // Dark hero background gradient
  hero:    'from-[#0BB0F19] via-[#0F172A] to-[#0B1829]',
  // Soft blue for lighter sections
  soft:    'from-[#EFF6FF] to-[#F8FAFC]',
  // Full CTA section
  cta:     'from-[#0B0F19] via-[#0F1F3D] to-[#0B0F19]',
};

// ── Contact ──────────────────────────────────────────────────────
export const CONTACT_INFO = {
  supportEmail: 'support@finnotia.com',
  contactEmail: 'contact@finnotia.com',
};

export const SOCIAL_LINKS = {
  twitter:   'https://twitter.com/finnotia',
  instagram: 'https://instagram.com/finnotia',
};

export const SITE_URL = 'https://finnotia.com';
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

// ── SEBI Disclaimer ──────────────────────────────────────────────
export const DISCLAIMER_TEXT = {
  short:  `${APP_NAME} is for educational purposes only. NOT SEBI registered.`,
  medium: `${APP_NAME} is an educational tool and NOT a SEBI registered investment advisor. Data is for informational purposes only.`,
  full:   `${APP_NAME} is an educational tool and NOT a SEBI registered investment advisor. Data provided is for informational purposes only. Investments in securities market are subject to market risks. Read all related documents carefully before investing. Past performance is not indicative of future results.`,
};

export const SAFE_TERMS = {
  tracking:    'Tracking',
  data:        'Data',
  information: 'Information',
  updates:     'Updates',
  curated:     'Curated',
};

export const FEATURES_LIST = [
  'IPO Tracking & GMP Data',
  'Stock Market Updates',
  'Real-Time Market News',
  'Mutual Fund Information',
  'GMP Tracking',
  'Timely Notifications',
];

export const API_ENDPOINTS = {
  news:         '/api/news',
  stocks:       '/api/stocks',
  mutual_funds: '/api/mutual-funds',
  ipo:          '/api/ipo',
  gmp:          '/api/gmp',
};