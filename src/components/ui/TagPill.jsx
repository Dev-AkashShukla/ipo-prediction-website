 
// ─────────────────────────────────────────────────────────────────────────────
// FILE 3: components/ui/TagPill.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable tag/topic pill — used in ArticleCard, StoryCard, ArticleClient, etc.
//
// Usage:
//   <TagPill tag="nifty" />
//   <TagPill tag="IPO" href="/blog?tag=ipo" />  // optional link
//   <TagPill tag="CRITICAL" color="#EF4444" />  // colored variant
 
import Link from 'next/link';
 
export function TagPill({ tag, href, color }) {
  const cls = `text-[10px] px-2.5 py-0.5 rounded-full font-medium
    bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B]
    hover:border-gray-400 hover:text-gray-700 transition-colors`;
 
  const inner = (
    <span className={cls} style={color ? { borderColor: color + '40', color, backgroundColor: color + '12' } : {}}>
      #{tag}
    </span>
  );
 
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
 

 