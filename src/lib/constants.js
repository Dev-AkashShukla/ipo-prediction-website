// Application constants for FINNOTIA

export const APP_NAME = 'FINNOTIA';
export const APP_DESCRIPTION = 'AI-Powered IPO Predictions & Market Analysis';

// ✅ Play Store Link - Single source of truth
// export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.finnotia';
export const PLAY_STORE_URL = '/download';

//Google Recaptcha
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

// ✅ Website URL
export const SITE_URL = 'https://finnotia.com';

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/finnotia',
  twitter: 'https://twitter.com/finnotia',
  linkedin: 'https://linkedin.com/company/finnotia',
  instagram: 'https://instagram.com/finnotia',
};

export const CONTACT_INFO = {
  supportEmail: 'support@finnotia.com',
  contactEmail: 'contact@finnotia.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra, India',
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

export const FEATURES_LIST = [
  'AI-Powered IPO Predictions',
  'Stock Market Analysis',
  'Real-Time Market News',
  'Mutual Fund Insights',
  'GMP Tracking',
  'Smart Alerts',
];

export const API_ENDPOINTS = {
  news: '/api/news',
  stocks: '/api/stocks',
  mutual_funds: '/api/mutual-funds',
  analysis: '/api/analysis',
};