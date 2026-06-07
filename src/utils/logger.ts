/**
 * Debug logger helper
 * Centralizes conditional debug logging across the app.
 */
export function debugLog(enabled: boolean, ...args: unknown[]): void {
  if (!enabled) return;
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    console.log(...args);
  }
}
