/**
 * Debug logger helper
 * Centralizes conditional debug logging across the app.
 */
export function debugLog(enabled: boolean, ...args: any[]): void {
  if (!enabled) return;
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}
