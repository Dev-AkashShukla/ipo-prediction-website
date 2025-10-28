// Application constants

export const APP_NAME = 'IPO Tracker';
export const APP_DESCRIPTION = 'AI-Powered Stock Market Analysis Platform';

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
};

export const CONTACT_INFO = {
  email: 'support@ipotracker.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra, India',
};

export const FEATURES = [
  'AI-Powered Predictions',
  'Real-Time Analysis',
  'Smart Alerts',
  'Portfolio Tracking',
  'Market News',
  'Expert Insights',
];

export const PRICING_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic IPO tracking', 'Market news', 'Email alerts'],
  },
  pro: {
    name: 'Pro',
    price: 999,
    features: ['AI predictions', 'Real-time data', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 2999,
    features: ['API access', 'Custom integrations', '24/7 support'],
  },
};

export const API_ENDPOINTS = {
  ipos: '/api/ipos',
  stocks: '/api/stocks',
  news: '/api/news',
  predictions: '/api/predictions',
};
