/**
 * Storage Service - Persistence layer for notes
 * 
 * Handles all localStorage operations with error handling and debouncing.
 * Abstracts storage implementation details from business logic.
 * Can be easily swapped with IndexedDB, API calls, or other storage mechanisms.
 */

import type { Note } from '../models/note.model';
import { normalizeDateFields, serializeNote } from '../models/validation';

/**
 * Configuration for storage behavior
 */
interface StorageConfig {
  debounceDelay?: number;
}

/**
 * StorageService - Handles all persistence operations
 * 
 * Responsibilities:
 * - Reading and writing to localStorage
 * - Error handling and graceful degradation
 * - Data serialization for storage compatibility
 * - Debounced writes to prevent excessive disk I/O
 */
export class StorageService {
  private readonly storageKey: string;
  private readonly debounceDelay: number;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingData: Note[] | null = null;

  constructor(key: string = 'sticky-notes', config: StorageConfig = {}) {
    this.storageKey = key;
    this.debounceDelay = config.debounceDelay ?? 500;
  }

  /**
   * Reads notes from localStorage
   * Safely handles missing or corrupted data
   * 
   * @returns Array of notes or empty array if none found
   */
  readNotes(): Note[] {
    try {
      const stored = window.localStorage.getItem(this.storageKey);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored) as any[];
      // Normalize date strings back to Date objects
      return parsed.map(note => normalizeDateFields(note));
    } catch (error) {
      console.error(`[StorageService] Error reading notes from localStorage:`, error);
      return [];
    }
  }

  /**
   * Writes notes to localStorage with debouncing
   * Prevents excessive disk I/O from rapid state changes
   * 
   * @param notes - Array of notes to persist
   */
  writeNotes(notes: Note[]): void {
    // Store pending data
    this.pendingData = notes;

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Debounce the actual write
    this.debounceTimer = setTimeout(() => {
      this.flush();
    }, this.debounceDelay);
  }

  /**
   * Immediately flushes pending data to storage
   * Used when app is closing or for critical saves
   */
  flush(): void {
    if (!this.pendingData) {
      return;
    }

    try {
      const serialized = this.pendingData.map(note => serializeNote(note));
      window.localStorage.setItem(this.storageKey, JSON.stringify(serialized));
    } catch (error) {
      console.error(`[StorageService] Error writing notes to localStorage:`, error);
    }

    this.pendingData = null;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  /**
   * Clears all stored notes
   * Used for reset/cleanup operations
   */
  clearAll(): void {
    try {
      window.localStorage.removeItem(this.storageKey);
      this.pendingData = null;
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
      }
    } catch (error) {
      console.error(`[StorageService] Error clearing storage:`, error);
    }
  }

  /**
   * Gets the current storage size in bytes
   * Useful for diagnostics
   */
  getStorageSize(): number {
    try {
      const stored = window.localStorage.getItem(this.storageKey);
      return stored ? new Blob([stored]).size : 0;
    } catch {
      return 0;
    }
  }
}

/**
 * Singleton instance of storage service
 * Shared across the application
 */
export const storageService = new StorageService();

/**
 * Convenience function to ensure pending writes are flushed
 * Call this before app unload or navigation
 */
export function flushStorageService(): void {
  storageService.flush();
}

// Ensure storage is flushed on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    flushStorageService();
  });
}
