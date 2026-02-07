import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLocalStorageOptions {
  debounceDelay?: number;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
) {
  const { debounceDelay = 500 } = options;

  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const pendingValueRef = useRef<T | null>(null);

  // Debounced write to localStorage
  const writeToStorage = useCallback(
    (value: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        pendingValueRef.current = valueToStore;

        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Debounce the localStorage write
        timeoutRef.current = setTimeout(() => {
          if (pendingValueRef.current !== null) {
            writeToStorage(pendingValueRef.current);
          }
        }, debounceDelay);
      } catch (error) {
        console.error(
          `Error in useLocalStorage setter for key "${key}":`,
          error
        );
      }
    },
    [storedValue, debounceDelay, key, writeToStorage]
  );

  // Cleanup timeout on unmount and flush pending writes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Flush any pending writes
      if (pendingValueRef.current !== null) {
        writeToStorage(pendingValueRef.current);
      }
    };
  }, [writeToStorage]);

  return [storedValue, setValue] as const;
}
