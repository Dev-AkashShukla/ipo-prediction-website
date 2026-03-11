// src/lib/articleUtils.js
// Pure utility functions — no React, no 'use client'
// Safe to import from BOTH server components and client components

export const CAT_STYLES = {
  commodities:    { bg: '#fef3c7', text: '#92400e' },
  markets:        { bg: '#d1fae5', text: '#065f46' },
  economy:        { bg: '#dbeafe', text: '#1e40af' },
  tech:           { bg: '#ede9fe', text: '#5b21b6' },
  crypto:         { bg: '#fce7f3', text: '#9d174d' },
  ipo:            { bg: '#fef3c7', text: '#92400e' },
  'mutual-funds': { bg: '#dbeafe', text: '#1e40af' },
  geopolitics:    { bg: '#fee2e2', text: '#991b1b' },
  tax:            { bg: '#e0e7ff', text: '#3730a3' },
  investing:      { bg: '#d1fae5', text: '#065f46' },
  policy:         { bg: '#e0e7ff', text: '#3730a3' },
  corporate:      { bg: '#f3f4f6', text: '#374151' },
};

export const SENT_COLORS = {
  BULLISH: { bg: '#d1fae5', text: '#065f46' },
  BEARISH: { bg: '#fee2e2', text: '#991b1b' },
  NEUTRAL: { bg: '#f3f4f6', text: '#374151' },
  MIXED:   { bg: '#fef3c7', text: '#92400e' },
};

export function cloudinaryOptimize(url, transforms = 'w_400,h_267,c_fill,f_auto,q_auto') {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  if (url.includes(`/upload/${transforms}/`)) return url;
  return url.replace('/upload/', `/upload/${transforms}/`);
}

export function fmtDate(d) {
  return d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
}