import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type {
  UserPreferences,
  ThemePreference,
  DefaultView,
} from '../models/user-preferences.model';
import { EMOTE_AVATARS } from '../constants/emotes';

interface UserPreferencesContextValue {
  preferences: UserPreferences;
  setThemePreference: (value: ThemePreference) => void;
  setDefaultView: (value: DefaultView) => void;
  setAvatar: (value: string) => void;
  setUsername: (value: string) => void;
  setPreferences: (value: UserPreferences) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  themePreference: 'system',
  defaultView: 'notes',
  avatar: EMOTE_AVATARS[0],
  username: 'Friend',
};

const UserPreferencesContext = createContext<
  UserPreferencesContextValue | undefined
>(undefined);

const isThemePreference = (value: string): value is ThemePreference =>
  value === 'system' || value === 'light' || value === 'dark';

const isDefaultView = (value: string): value is DefaultView =>
  value === 'notes' ||
  value === 'kanban' ||
  value === 'table' ||
  value === 'roadmap';

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'sticky-user-preferences',
    DEFAULT_PREFERENCES
  );

  const normalizedPreferences = useMemo(() => {
    const themePreference = isThemePreference(preferences.themePreference)
      ? preferences.themePreference
      : DEFAULT_PREFERENCES.themePreference;
    const defaultView = isDefaultView(preferences.defaultView)
      ? preferences.defaultView
      : DEFAULT_PREFERENCES.defaultView;
    const avatar = preferences.avatar?.trim()
      ? preferences.avatar
      : DEFAULT_PREFERENCES.avatar;
    const username = preferences.username?.trim()
      ? preferences.username.trim()
      : DEFAULT_PREFERENCES.username;

    return {
      themePreference,
      defaultView,
      avatar,
      username,
    } as UserPreferences;
  }, [preferences]);

  useEffect(() => {
    if (
      normalizedPreferences.themePreference !== preferences.themePreference ||
      normalizedPreferences.defaultView !== preferences.defaultView ||
      normalizedPreferences.avatar !== preferences.avatar ||
      normalizedPreferences.username !== preferences.username
    ) {
      setPreferences(normalizedPreferences);
    }
  }, [normalizedPreferences, preferences, setPreferences]);

  const value: UserPreferencesContextValue = {
    preferences: normalizedPreferences,
    setThemePreference: (value: ThemePreference) =>
      setPreferences((prev) => ({ ...prev, themePreference: value })),
    setDefaultView: (value: DefaultView) =>
      setPreferences((prev) => ({ ...prev, defaultView: value })),
    setAvatar: (value: string) =>
      setPreferences((prev) => ({ ...prev, avatar: value })),
    setUsername: (value: string) =>
      setPreferences((prev) => ({ ...prev, username: value })),
    setPreferences: (value: UserPreferences) => setPreferences(value),
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider'
    );
  }
  return context;
}
