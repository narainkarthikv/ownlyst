/**
 * Text formatting and display utilities
 */

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get first line of text (for title fallback)
 */
export function getFirstLine(text: string): string {
  return text.split('\n')[0].trim();
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = countWords(text);
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get text summary for preview
 */
export function getTextSummary(text: string, lines: number = 2, charsPerLine: number = 60): string {
  const lineArray = text.split('\n').slice(0, lines);
  return lineArray
    .map(line => {
      if (line.length > charsPerLine) {
        return line.substring(0, charsPerLine).trim() + '...';
      }
      return line;
    })
    .join('\n');
}

/**
 * Format time since creation
 */
export function getTimeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
  
  return Math.floor(seconds) + ' second' + (Math.floor(seconds) > 1 ? 's' : '') + ' ago';
}

/**
 * Safe text truncation by word
 */
export function truncateByWord(text: string, maxWords: number = 20): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Remove markdown characters for preview
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/[*_~`]/g, '')
    .replace(/^#+\s/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
