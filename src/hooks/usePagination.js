// src/hooks/usePagination.js
// Generic pagination hook — use with any array

import { useState, useMemo } from 'react';

/**
 * @param {Array}  items        — full array to paginate
 * @param {number} itemsPerPage — items per page (default 12)
 * @returns {{ currentItems, currentPage, totalPages, goTo, next, prev, hasNext, hasPrev }}
 */
export function usePagination(items = [], itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Reset to page 1 when items change (e.g. filter change)
  // We rely on caller resetting via goTo(1) when filter changes

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goTo = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
    // Scroll to top of story grid smoothly
    if (typeof window !== 'undefined') {
      const el = document.getElementById('stories-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goTo,
    next:    () => goTo(currentPage + 1),
    prev:    () => goTo(currentPage - 1),
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}