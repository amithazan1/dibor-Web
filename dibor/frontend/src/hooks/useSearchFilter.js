import { useMemo } from "react";

/**
 * Filters a list of items based on a search term and a key.
 * @param {Array} items - The list of items to filter.
 * @param {string} searchTerm - The search term to filter by.
 * @param {string} key - The object key to search against (e.g., "displayName").
 * @returns {Array} - The filtered list.
 */
const useSearchFilter = (items, searchTerm, key) => {
  return useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm, key]);
};

export default useSearchFilter;
