
// ─────────────────────────────────────────────────────────────────────────────
// FILE 5: components/ui/ResultCount.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "Showing X–Y of Z articles" line
//
// Usage:
//   <ResultCount currentPage={currentPage} perPage={ITEMS_PER_PAGE} total={filtered.length} noun="articles" />
//   <ResultCount currentPage={1} perPage={10} total={25} noun="stories" />
 
export function ResultCount({ currentPage, perPage, total, noun = 'results' }) {
  if (total === 0) return null;
  const from = Math.min((currentPage - 1) * perPage + 1, total);
  const to   = Math.min(currentPage * perPage, total);
 
  return (
    <p className="text-[11px] text-gray-400">
      Showing{' '}
      <span className="font-semibold text-gray-600">{from}–{to}</span>
      {' '}of {total} {noun}
    </p>
  );
}
 