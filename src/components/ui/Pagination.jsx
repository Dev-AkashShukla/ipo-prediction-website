// src/components/ui/Pagination.jsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable Pagination component
 *
 * Props:
 *   currentPage  {number}   — active page (1-indexed)
 *   totalPages   {number}   — total number of pages
 *   onPageChange {function} — called with new page number
 *   showInfo     {boolean}  — show "Page X of Y" label (default true)
 *   size         {string}   — 'sm' | 'md' (default 'md')
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  size = 'md',
}) {
  if (!totalPages || totalPages <= 1) return null;

  const sm = size === 'sm';

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnBase = `flex items-center justify-center font-bold transition-all duration-150
    ${sm ? 'text-xs px-3 py-1.5 rounded-lg' : 'text-sm px-4 py-2 rounded-xl'}`;

  return (
    <div className="flex flex-col items-center gap-2">
      {showInfo && (
        <p className="text-xs text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
      )}

      <div className="flex items-center gap-1.5">

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${btnBase} gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{
            background: currentPage > 1 ? '#fff' : 'transparent',
            border: '1px solid #E2E8F0',
            color: '#374151',
            boxShadow: currentPage > 1 ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}
          aria-label="Previous page"
        >
          <ChevronLeft className={sm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        {getPages().map((page, i) =>
          page === '...' ? (
            <span key={`dot-${i}`} className="px-1 text-gray-400 text-sm select-none">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${sm ? 'w-8 h-8 rounded-lg' : 'w-9 h-9 rounded-xl'} font-bold text-sm
                          transition-all duration-150`}
              style={
                page === currentPage
                  ? {
                      background: 'linear-gradient(135deg,#2563EB,#1E3A8A)',
                      color: '#fff',
                      boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
                      transform: 'scale(1.08)',
                      border: 'none',
                    }
                  : {
                      background: '#fff',
                      color: '#374151',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }
              }
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{
            background: currentPage < totalPages
              ? 'linear-gradient(135deg,#2563EB,#1E3A8A)'
              : 'transparent',
            border: currentPage < totalPages ? 'none' : '1px solid #E2E8F0',
            color: currentPage < totalPages ? '#fff' : '#94A3B8',
            boxShadow: currentPage < totalPages ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
          }}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className={sm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        </button>

      </div>
    </div>
  );
}