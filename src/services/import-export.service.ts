/**
 * Import/Export Service - Data portability for privacy and user control
 *
 * Handles importing and exporting backups in JSON and CSV.
 * All operations are local - no server involvement.
 */

import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../models/note.model';
import type {
  UserPreferences,
  UserProfileExport,
} from '../models/user-preferences.model';
import { EMOTE_AVATARS } from '../constants/emotes';

interface ExportResult {
  success: boolean;
  message: string;
  fileName?: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  notes?: Note[];
  preferences?: UserPreferences;
  errors?: string[];
  duplicateCount?: number;
  newCount?: number;
}

/**
 * ImportExportService - Handles data portability
 *
 * Responsibilities:
 * - Exporting backups to JSON and CSV
 * - Importing notes from JSON and CSV files
 * - Validating imported data
 * - Providing user feedback
 */
export class ImportExportService {
  /**
   * Exports backup (notes + preferences) as JSON file
   * @param notes - Array of notes to export
   * @param preferences - User preferences to export
   * @returns Result object with success status
   */
  static exportBackupJSON(
    notes: Note[],
    preferences: UserPreferences
  ): ExportResult {
    try {
      const profile: UserProfileExport = {
        version: 1,
        exportedAt: new Date().toISOString(),
        preferences,
        notes,
      };
      const jsonString = JSON.stringify(profile, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sticky-memo-backup-${this.getTimestamp()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: `Exported ${notes.length} note(s) with profile`,
        fileName: link.download,
      };
    } catch (error) {
      console.error(
        '[ImportExportService] Error exporting backup JSON:',
        error
      );
      return {
        success: false,
        message: 'Failed to export backup as JSON',
      };
    }
  }

  /**
   * Exports backup (notes + preferences) as CSV file
   * @param notes - Array of notes to export
   * @param preferences - User preferences to export
   * @returns Result object with success status
   */
  static exportAsCSV(
    notes: Note[],
    preferences: UserPreferences
  ): ExportResult {
    try {
      const profileHeaders = [
        '__PROFILE__',
        'themePreference',
        'defaultView',
        'avatar',
        'username',
      ];
      const profileRow = [
        '__PROFILE__',
        preferences.themePreference,
        preferences.defaultView,
        preferences.avatar,
        preferences.username,
      ];

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

      // Combine profile, headers, and rows
      const csvContent = [
        profileHeaders.map((header) => this.escapeCsvField(header)).join(','),
        profileRow.map((value) => this.escapeCsvField(value)).join(','),
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sticky-memo-backup-${this.getTimestamp()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: `Exported ${notes.length} note(s) with profile as CSV`,
        fileName: link.download,
      };
    } catch (error) {
      console.error('[ImportExportService] Error exporting as CSV:', error);
      return {
        success: false,
        message: 'Failed to export backup as CSV',
      };
    }
  }

  /**
   * Imports notes (and optional preferences) from JSON backup file
   * @param file - JSON backup file to import
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

      const isLegacyNotes = Array.isArray(parsed);
      const notesPayload = isLegacyNotes ? parsed : parsed?.notes;

      if (!Array.isArray(notesPayload)) {
        return {
          success: false,
          message:
            'Invalid JSON format. Expected notes array or backup payload.',
        };
      }

      const validatedNotes: Note[] = [];
      const errors: string[] = [];
      const seenIds = new Set<string>();

      for (let i = 0; i < notesPayload.length; i++) {
        const item = notesPayload[i];

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
        preferences:
          !isLegacyNotes && parsed?.preferences
            ? (parsed.preferences as UserPreferences)
            : undefined,
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
   * Imports notes (and optional preferences) from CSV file
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
      const lines = text
        .split('\n')
        .map((line) => line.trimEnd())
        .filter((line) => line.trim());

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
      let preferences: UserPreferences | undefined;

      let startIndex = 0;
      const possibleProfileHeader = this.parseCSVLine(lines[0] ?? '');
      if (possibleProfileHeader[0] === '__PROFILE__') {
        const profileRowLine = lines[1];
        if (!profileRowLine) {
          return {
            success: false,
            message: 'Invalid CSV format. Profile row is missing.',
          };
        }
        const profileValues = this.parseCSVLine(profileRowLine);
        if (profileValues[0] !== '__PROFILE__') {
          return {
            success: false,
            message: 'Invalid CSV format. Profile row is invalid.',
          };
        }
        preferences = this.parseProfileCSV(
          possibleProfileHeader,
          profileValues
        );
        startIndex = 2;
      }

      const headerLine = lines[startIndex];
      if (!headerLine) {
        return {
          success: false,
          message: 'Invalid CSV format. Missing notes header row.',
        };
      }

      // Skip header row and process data rows
      for (let i = startIndex + 1; i < lines.length; i++) {
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
        preferences,
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

  private static parseProfileCSV(
    header: string[],
    values: string[]
  ): UserPreferences | undefined {
    const profile = new Map<string, string>();
    for (let i = 1; i < header.length; i++) {
      profile.set(header[i], values[i] ?? '');
    }

    const themePreference = profile.get('themePreference')?.trim();
    const defaultView = profile.get('defaultView')?.trim();
    const avatar = profile.get('avatar')?.trim();
    const username = profile.get('username')?.trim();

    if (!this.isThemePreference(themePreference)) {
      return undefined;
    }

    if (!this.isDefaultView(defaultView)) {
      return undefined;
    }

    return {
      themePreference,
      defaultView,
      avatar: avatar || EMOTE_AVATARS[0],
      username: username || 'Friend',
    };
  }

  private static isThemePreference(
    value: string | undefined
  ): value is UserPreferences['themePreference'] {
    return value === 'system' || value === 'light' || value === 'dark';
  }

  private static isDefaultView(
    value: string | undefined
  ): value is UserPreferences['defaultView'] {
    return (
      value === 'notes' ||
      value === 'kanban' ||
      value === 'table' ||
      value === 'roadmap'
    );
  }

  /**
   * Gets formatted timestamp for file names
   */
  private static getTimestamp(): string {
    return new Date().toISOString().split('T')[0];
  }
}
