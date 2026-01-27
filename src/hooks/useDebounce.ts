/**
 * useDebounce Hook
 * 
 * Provides debouncing functionality for expensive operations like search and storage writes
 */

import { useEffect, useState, useRef, useCallback } from 'react';

interface UseDebounceOptions {
  delay?: number;
  leading?: boolean;
}

/**
 * Hook to debounce a value and trigger a callback
 * 
 * @param value The value to debounce
 * @param callback Function to call when debounce completes
 * @param options Configuration options
 * @returns The current debounced value
 */
export function useDebounce<T>(
  value: T,
  callback?: (value: T) => void,
  options: UseDebounceOptions = {}
): T {
  const { delay = 300, leading = false } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (leading && isFirstRender.current) {
      setDebouncedValue(value);
      callback?.(value);
      isFirstRender.current = false;
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      callback?.(value);
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, leading, callback]);

  return debouncedValue;
}

/**
 * Hook for debouncing a callback function
 * 
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced callback function
 */
export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
