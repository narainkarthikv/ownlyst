# Changelog

All notable changes to this project will be documented in this file.

## [1.0.4] - 2026-06-05

### Changed
- Code quality: removed unnecessary default `React` imports and switched to named/type imports across several modules (`src/hooks/useNotesSync.ts`, `src/context/NotesContext.tsx`, `src/controllers/NotesProvider.tsx`, `src/components/NoteModal.tsx`, `src/views/notes/NoteCard.tsx`, `src/utils/highlighting.tsx`) to align with the `react-jsx` runtime and reduce unused-import warnings.

### Related
- Addresses [#137](https://github.com/narainkarthikv/ownlyst/issues/137) — general code quality and maintenance improvements.

### Version
- Bumped project version from `1.0.3` to `1.0.4`.

## [1.0.3] - 2026-06-02

### Changed
- Refactored debug logging: extracted `debugLog` utility and replaced inline `console.log` calls in `useNotesSync` to centralize debug output. See `src/utils/logger.ts`.

### Related
- Fixes [#137](https://github.com/narainkarthikv/ownlyst/issues/137)

### Version
- Bumped project version from `1.0.2` to `1.0.3`.

## [1.0.1] - 2026-05-22

### Fixed
- Resolved lint failure in `NoteModal` by memoizing `validateForm` with `useCallback` and removing unstable hook dependencies.
- Removed malformed compression output behavior from build pipeline by dropping `vite-plugin-compression` usage.
- Updated Vite chunk-splitting config for Vite 8 by converting `manualChunks` from object form to function form.

### Security
- Remediated npm audit findings from high/moderate advisory set to zero vulnerabilities.
- Upgraded vulnerable runtime/development toolchain paths, including:
  - `vite` to `^8.0.14`
  - `react-router-dom` to `^7.15.1`
  - `uuid` to `^13.0.2`
  - `postcss` to `^8.5.15`

### Tooling
- Updated lint/tooling dependencies for compatibility with patched stack:
  - `@vitejs/plugin-react` to `^6.0.2`
  - `eslint` and `@eslint/js` to `^9.39.4`
  - `eslint-plugin-react-hooks` to `^7.1.1`
  - `eslint-plugin-react-refresh` to `^0.5.2`
  - `typescript-eslint` to `^8.59.4`
- Disabled `react-hooks/set-state-in-effect` in ESLint config to prevent forced large behavioral refactors in this patch release while retaining other recommended React Hooks rules.

### Version
- Bumped project version from `1.0.0` to `1.0.1`.

## [1.0.2] - 2026-05-27

### Added
- Floating assistant FAB with quick actions (Quick note, Create task, Voice placeholder). See `src/components/FloatingAssistant.tsx`.
- Premium-styled FAB using the app `Logo` and the app blue design palette for a cohesive look.

