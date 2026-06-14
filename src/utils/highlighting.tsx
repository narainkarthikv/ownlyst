/**
 * Search highlighting utilities for note content
 */

import type { ReactNode } from 'react';

/**
 * Highlights matching search terms in text
 * Returns an array of text segments with match indicators
 */
export function getHighlightedSegments(
  text: string,
  searchTerm: string
): Array<{ text: string; isMatch: boolean }> {
  if (!searchTerm.trim()) {
    return [{ text, isMatch: false }];
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      isMatch: regex.test(part),
    }));
}

/**
 * Highlights search term in a React fragment
 * Used for displaying highlighted text in components
 */
export function highlightSearchTerm(
  text: string,
  searchTerm: string,
  highlightClass: string = 'bg-yellow-200 dark:bg-yellow-900/50 font-semibold'
): ReactNode {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} className={highlightClass}>
          {part}
        </span>
      );
    }
    return part;
  });
}

/**
 * Count occurrences of search term in text
 */
export function countMatches(text: string, searchTerm: string): number {
  if (!searchTerm.trim()) return 0;
  const regex = new RegExp(
    searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'gi'
  );
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Extract context around search match
 */
export function getMatchContext(
  text: string,
  searchTerm: string,
  contextLength: number = 50
): string {
  if (!searchTerm.trim()) return text.substring(0, contextLength);

  const regex = new RegExp(
    searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'i'
  );
  const match = text.match(regex);

  if (!match || !match.index) {
    return text.substring(0, contextLength);
  }

  const startIndex = Math.max(0, match.index - contextLength);
  const endIndex = Math.min(
    text.length,
    match.index + match[0].length + contextLength
  );

  let context = text.substring(startIndex, endIndex);

  if (startIndex > 0) context = '...' + context;
  if (endIndex < text.length) context = context + '...';

  return context;
}
