// Application constants for FINNOTIA - SEBI COMPLIANT

export const APP_NAME = 'FINNOTIA';
// ✅ FIXED: Removed "Analysis" and "Research"
export const APP_DESCRIPTION = 'AI-Powered IPO Tracker & Market Data Platform';

// ✅ Play Store Link - Single source of truth
// export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.finnotia';
export const PLAY_STORE_URL = '/download';

// Google Recaptcha
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

// ✅ Website URL
export const SITE_URL = 'https://finnotia.com';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/finnotia',
  instagram: 'https://instagram.com/finnotia',
};

export const CONTACT_INFO = {
  supportEmail: 'support@finnotia.com',
  contactEmail: 'contact@finnotia.com',
  // Removed phone - don't add fake number
};

// ✅ Theme Colors - Use these instead of hardcoding
export const THEME_COLORS = {
  primary: '#4A90E2',
  primaryDark: '#2E5AAD',
  secondary: '#2E5CB8',
  accent: '#3B82F6',
  dark: '#1E3A8A',
};

// ✅ Gradient Classes - Reusable Tailwind classes
export const GRADIENTS = {
  primary: 'from-[#4A90E2] to-[#2E5AAD]',
  secondary: 'from-[#2E5CB8] to-[#3B82F6]',
  hero: 'from-[#4A90E2] to-[#1E3A8A]',
  cta: 'from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A]',
};

// ✅ FIXED: Safe feature names
export const FEATURES_LIST = [
  'AI-Powered IPO Tracking',
  'Stock Market Updates',
  'Real-Time Market News',
  'Mutual Fund Information',
  'GMP Tracking',
  'Timely Notifications',
];

// API endpoints (internal use - these are fine)
export const API_ENDPOINTS = {
  news: '/api/news',
  stocks: '/api/stocks',
  mutual_funds: '/api/mutual-funds',
  ipo: '/api/ipo',
  gmp: '/api/gmp',
};

// ✅ SEBI Disclaimer Text - Use this everywhere
export const DISCLAIMER_TEXT = {
  short: `${APP_NAME} is for educational purposes only. NOT SEBI registered.`,
  medium: `${APP_NAME} is an educational tool and NOT a SEBI registered investment advisor. Data is for informational purposes only.`,
  full: `${APP_NAME} is an educational tool and NOT a SEBI registered investment advisor. Data provided is for informational purposes only. Investments in securities market are subject to market risks. Read all related documents carefully before investing. Past performance is not indicative of future results.`,
};

// ✅ Safe words to use across the app
export const SAFE_TERMS = {
  // Use these instead of risky words
  tracking: 'Tracking',      // instead of "Analysis"
  data: 'Data',              // instead of "Insights"  
  information: 'Information', // instead of "Research"
  updates: 'Updates',        // instead of "Insights"
  curated: 'Curated',        // instead of "Analyzed"
};