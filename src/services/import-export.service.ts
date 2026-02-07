/**
 * Import/Export Service - Data portability for privacy and user control
 *
 * Handles importing and exporting notes in JSON and CSV formats.
 * All operations are local - no server involvement.
 */

import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../models/note.model';

interface ExportResult {
  success: boolean;
  message: string;
  fileName?: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  notes?: Note[];
  errors?: string[];
  duplicateCount?: number;
  newCount?: number;
}

/**
 * ImportExportService - Handles data portability
 *
 * Responsibilities:
 * - Exporting notes to JSON and CSV formats
 * - Importing notes from JSON and CSV files
 * - Validating imported data
 * - Providing user feedback
 */
export class ImportExportService {
  /**
   * Exports notes as JSON file
   * @param notes - Array of notes to export
   * @returns Result object with success status
   */
  static exportAsJSON(notes: Note[]): ExportResult {
    try {
      const jsonString = JSON.stringify(notes, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sticky-memo-notes-${this.getTimestamp()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: `Exported ${notes.length} note(s) as JSON`,
        fileName: link.download,
      };
    } catch (error) {
      console.error('[ImportExportService] Error exporting as JSON:', error);
      return {
        success: false,
        message: 'Failed to export notes as JSON',
      };
    }
  }

  /**
   * Exports notes as CSV file
   * @param notes - Array of notes to export
   * @returns Result object with success status
   */
  static exportAsCSV(notes: Note[]): ExportResult {
    try {
      // CSV headers
      const headers = [
        'ID',
        'Title',
        'Content',
        'Status',
        'Priority',
        'isPinned',
        'Created',
        'DueDate',
        'Tags',
      ];

      // Convert notes to CSV rows
      const rows = notes.map((note) => [
        this.escapeCsvField(note.id),
        this.escapeCsvField(note.title),
        this.escapeCsvField(note.content),
        note.status || '',
        note.priority || '',
        note.isPinned ? 'true' : 'false',
        note.createdAt ? new Date(note.createdAt).toISOString() : '',
        note.dueDate ? new Date(note.dueDate).toISOString() : '',
        note.tags ? note.tags.join(';') : '',
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sticky-memo-notes-${this.getTimestamp()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: `Exported ${notes.length} note(s) as CSV`,
        fileName: link.download,
      };
    } catch (error) {
      console.error('[ImportExportService] Error exporting as CSV:', error);
      return {
        success: false,
        message: 'Failed to export notes as CSV',
      };
    }
  }

  /**
   * Imports notes from JSON file
   * @param file - JSON file to import
   * @returns Promise with import result
   */
  static async importFromJSON(file: File): Promise<ImportResult> {
    try {
      if (!file.type.includes('json')) {
        return {
          success: false,
          message: 'Invalid file type. Please select a JSON file.',
        };
      }

      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        return {
          success: false,
          message: 'Invalid JSON format. Expected an array of notes.',
        };
      }

      const validatedNotes: Note[] = [];
      const errors: string[] = [];
      const seenIds = new Set<string>();

      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i];

        // Validate required fields
        if (!item.title) {
          errors.push(`Row ${i + 1}: Missing required field (title)`);
          continue;
        }

        // Generate new ID if missing or duplicate
        let noteId = item.id;
        if (!noteId || seenIds.has(noteId)) {
          noteId = uuidv4();
        }
        seenIds.add(noteId);

        // Create normalized note
        const note: Note = {
          id: noteId,
          title: item.title || '',
          content: item.content || '',
          status: item.status || 'todo',
          priority: item.priority || 'medium',
          isPinned: item.isPinned === true,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
          dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
          tags: Array.isArray(item.tags) ? item.tags : undefined,
        };

        validatedNotes.push(note);
      }

      if (validatedNotes.length === 0) {
        return {
          success: false,
          message: 'No valid notes found in the imported file.',
          errors,
        };
      }

      return {
        success: true,
        message: `Successfully imported ${validatedNotes.length} note(s)${errors.length > 0 ? ` (${errors.length} skipped)` : ''}`,
        notes: validatedNotes,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      console.error('[ImportExportService] Error importing from JSON:', error);
      return {
        success: false,
        message: 'Failed to import JSON file. Ensure it is valid JSON.',
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Imports notes from CSV file
   * @param file - CSV file to import
   * @returns Promise with import result
   */
  static async importFromCSV(file: File): Promise<ImportResult> {
    try {
      if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
        return {
          success: false,
          message: 'Invalid file type. Please select a CSV file.',
        };
      }

      const text = await file.text();
      const lines = text.split('\n').filter((line) => line.trim());

      if (lines.length < 2) {
        return {
          success: false,
          message:
            'Invalid CSV format. File must contain headers and at least one row.',
        };
      }

      const validatedNotes: Note[] = [];
      const errors: string[] = [];
      const seenIds = new Set<string>();

      // Skip header row and process data rows
      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i]);

        if (values.length < 2) {
          errors.push(`Row ${i + 1}: Invalid CSV format`);
          continue;
        }

        const [
          id,
          title,
          content,
          status,
          priority,
          isPinned,
          created,
          dueDate,
          tags,
        ] = values;

        if (!title || !title.trim()) {
          errors.push(`Row ${i + 1}: Missing required field (Title)`);
          continue;
        }

        // Generate new ID if missing or duplicate
        let noteId = id?.trim();
        if (!noteId || seenIds.has(noteId)) {
          noteId = uuidv4();
        }
        seenIds.add(noteId);

        const note: Note = {
          id: noteId,
          title: title.trim(),
          content: content ? content.trim() : '',
          status: (status?.trim() as Note['status']) || 'todo',
          priority: (priority?.trim() as Note['priority']) || 'medium',
          isPinned: isPinned?.trim().toLowerCase() === 'true',
          createdAt: created ? new Date(created.trim()) : new Date(),
          dueDate:
            dueDate && dueDate.trim() ? new Date(dueDate.trim()) : undefined,
          tags:
            tags && tags.trim()
              ? tags
                  .trim()
                  .split(';')
                  .filter((t) => t)
              : undefined,
        };

        validatedNotes.push(note);
      }

      if (validatedNotes.length === 0) {
        return {
          success: false,
          message: 'No valid notes found in the imported file.',
          errors,
        };
      }

      return {
        success: true,
        message: `Successfully imported ${validatedNotes.length} note(s)${errors.length > 0 ? ` (${errors.length} skipped)` : ''}`,
        notes: validatedNotes,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      console.error('[ImportExportService] Error importing from CSV:', error);
      return {
        success: false,
        message: 'Failed to import CSV file. Ensure it is properly formatted.',
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Escapes special characters in CSV fields
   */
  private static escapeCsvField(field: string): string {
    if (field === null || field === undefined) return '';
    const stringField = String(field);
    if (
      stringField.includes(',') ||
      stringField.includes('"') ||
      stringField.includes('\n')
    ) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  }

  /**
   * Parses a CSV line handling quoted fields
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  /**
   * Gets formatted timestamp for file names
   */
  private static getTimestamp(): string {
    return new Date().toISOString().split('T')[0];
  }
}
