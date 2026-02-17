import type { Note } from './note.model';

export type ThemePreference = 'system' | 'light' | 'dark';

export type DefaultView = 'notes' | 'kanban' | 'table' | 'roadmap';

export interface UserPreferences {
  themePreference: ThemePreference;
  defaultView: DefaultView;
  avatar: string;
  username: string;
}

export interface UserProfileExport {
  version: number;
  exportedAt: string;
  preferences: UserPreferences;
  notes: Note[];
}
