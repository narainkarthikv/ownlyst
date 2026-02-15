# GitHub Copilot Coding Agent Instructions

## Purpose

These instructions onboard GitHub Copilot Coding Agent to the Sticky Memo repository.
Use this document as the source of truth for repo context, architecture, and development practices.
Only search the repository if details here are missing or incorrect.

---

## Repository Summary

**Sticky Memo** is a privacy-first, local-only note-taking app that runs entirely in the browser.
It is a lightweight, local-first app for creating, organizing, and searching notes with zero server dependency.

Key features:

- Multiple note views (grid, Kanban, table, roadmap)
- Color coding by priority and status
- Instant search and filtering
- Drag and drop organization
- Import/export (JSON, CSV)
- Dark mode and responsive design

---

## High-Level Repository Information

- **Repository Size**: Small to Medium (frontend-only)
- **Primary Language**: TypeScript
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
- **Data Storage**: Browser IndexedDB/localStorage (no backend)

---

## Environment Requirements

### Runtime Versions

- **Node.js**: 18.x or newer
- **npm**: 9.x or newer

### Development Setup

- No environment variables required for local development.
- App works offline after initial load.

---

## Build & Validation Instructions

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173` with hot reload.

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Project Architecture & Layout

```
sticky-memo/
├── src/
│   ├── components/     # Reusable UI components
│   ├── constants/      # App constants and configs
│   ├── context/        # React context providers
│   ├── controllers/    # App-level controllers/providers
│   ├── data/           # Sample data
│   ├── hooks/          # Custom React hooks
│   ├── models/         # TypeScript types and validation
│   ├── pages/          # Page components
│   ├── services/       # Business logic and storage
│   ├── utils/          # Helpers (filtering, sorting, text)
│   └── views/          # View-specific components
├── public/             # Static assets
└── .github/            # GitHub templates and workflows
```

### Component Architecture

- React components are functional and hook-based.
- UI primitives live in `src/components/` and are reused across views.
- View-specific rendering is in `src/views/` (e.g., NotesView, KanbanView).
- Global state flows through context/providers in `src/context/` and `src/controllers/`.

### Data Flow

- Notes data is stored in browser storage (localStorage/IndexedDB).
- Services in `src/services/` handle persistence and import/export.
- Filtering, sorting, and highlighting live in `src/utils/`.

---

## Coding Standards

### General

- **Language**: TypeScript preferred
- **Formatting**: Follow existing patterns (2-space indent typical)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Imports**: Prefer path aliases if already used in codebase

### React

- Use functional components with hooks only.
- Keep components small and focused.
- Avoid unnecessary re-renders; use memoization where it improves UX.

### Styling

- Tailwind CSS for most styling.
- Keep utility class order consistent with existing components.
- Ensure dark mode coverage for any new UI.

### Accessibility

- Use semantic HTML.
- Provide ARIA labels where needed.
- Ensure keyboard navigation works for interactive elements.

---

## UI/UX Guidelines

### Design Philosophy

- Privacy-first, clean, and minimal.
- Fast and responsive with smooth interactions.
- Subtle animations; avoid heavy motion.

### Visual Design

- Respect existing color tokens and theme system.
- Ensure contrast in both light and dark themes.
- Use consistent spacing and typography.

### Interaction Design

- Drag and drop should feel fluid.
- Search and filters should respond instantly.
- Avoid disruptive modal behavior; keep focus handling correct.

---

## Component Development Guidelines

### Adding Features

1. Identify existing patterns in `src/components/` and `src/views/`.
2. Reuse services and utils for data ops before adding new ones.
3. Keep new state in context/controllers if it is global.
4. Add types to `src/models/` if needed.

### Styling New Components

1. Use Tailwind utilities first.
2. Reuse color tokens from `src/constants/`.
3. Ensure responsive behavior across breakpoints.

### Animations

1. Use Framer Motion where motion already exists.
2. Respect `prefers-reduced-motion`.

---

## Development Workflow

- Run `npm run lint` before commits if you touched TS/TSX.
- Validate changes in both light and dark themes.
- Verify responsive layout on mobile and desktop.

---

## When to Ask for Help

- Major architecture changes
- New state management strategy
- Replacing storage or persistence flows
- Large UI/UX redesigns

---

## End of Instructions
