// ─────────────────────────────────────────────────────────────────────────────
// FILE 1: lib/sentimentConfig.js
// ─────────────────────────────────────────────────────────────────────────────
// Unified sentiment config — used by ArticleClient, StoriesClient, StoryPageClient
// Maps both Blog keys (BULLISH/BEARISH) and Stories keys (POSITIVE/NEGATIVE)
//
// Usage:
//   import { getSentiment } from '../../lib/sentimentConfig';
//   const sent = getSentiment(fm.sentiment); // works for any casing
//   → { bg, text, border, color, icon: TrendingUp, label: 'Bullish' }
 
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
 
export const SENTIMENT_MAP = {
  // Blog uses these
  BULLISH:  { bg: '#dcfce7', text: '#15803d', border: '#86efac', color: '#22C55E', icon: TrendingUp,   label: 'Bullish' },
  BEARISH:  { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5', color: '#EF4444', icon: TrendingDown, label: 'Bearish' },
  // Stories uses these (map to same visual)
  POSITIVE: { bg: '#dcfce7', text: '#15803d', border: '#86efac', color: '#22C55E', icon: TrendingUp,   label: 'Bullish' },
  NEGATIVE: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5', color: '#EF4444', icon: TrendingDown, label: 'Bearish' },
  // Shared
  NEUTRAL:  { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', color: '#94A3B8', icon: Minus,        label: 'Neutral' },
  MIXED:    { bg: '#fefce8', text: '#a16207', border: '#fde047', color: '#F59E0B', icon: Activity,     label: 'Mixed'   },
};
 
/**
 * Returns sentiment config for any key (case-insensitive).
 * Falls back to NEUTRAL if not found.
 */
export function getSentiment(key) {
  if (!key) return SENTIMENT_MAP.NEUTRAL;
  return SENTIMENT_MAP[key.toUpperCase()] || SENTIMENT_MAP.NEUTRAL;
}
 