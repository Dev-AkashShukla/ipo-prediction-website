// ─────────────────────────────────────────────────────────────────────────────
// FILE 2: components/ui/FilterChip.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable filter pill button — Blog categories, Stories importance filters, etc.
//
// Usage:
//   <FilterChip label="Markets" count={12} isActive={filter === 'markets'} onClick={() => setFilter('markets')} />
//   <FilterChip label="CRITICAL" count={3} isActive activeColor="#EF4444" />  // custom color
//   <FilterChip label="All" count={42} isActive size="sm" />
 
'use client';
 
export function FilterChip({
  label,
  count,
  isActive = false,
  onClick,
  activeColor,           // optional: override the active background (default: #0c1e35)
  size = 'sm',           // 'sm' | 'md'
  className = '',
}) {
  const bg     = isActive ? (activeColor || '#0c1e35') : '#ffffff';
  const color  = isActive ? '#ffffff' : '#6b7280';
  const border = isActive ? (activeColor || '#0c1e35') : '#e5e7eb';
 
  const padding = size === 'md' ? 'px-4 py-1.5 text-xs' : 'px-3 py-1 text-[11px]';
 
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 rounded-full border font-semibold whitespace-nowrap flex-shrink-0
        transition-all capitalize ${padding} ${className}
      `}
      style={{ background: bg, color, borderColor: border }}
    >
      {label === 'ALL' ? 'All' : label}
      {count !== undefined && (
        <span className="opacity-40 text-[9px]">({count})</span>
      )}
    </button>
  );
}
 