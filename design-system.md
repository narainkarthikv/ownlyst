# Wisdom Fox — Community Design System (Core Principles)

A lightweight, framework-agnostic design system for consistent UI/UX across Wisdom Fox projects.

## 1) Design Goals

- **Clarity first**: content should be easy to scan and read.
- **Consistency over novelty**: use shared tokens and patterns before creating new ones.
- **Accessible by default**: keyboard, contrast, and readable typography are non-negotiable.
- **Calm, minimal interface**: avoid visual noise and heavy effects.
- **Theme parity**: light and dark modes must feel equally complete.

---

## 2) Theme Foundations (Light + Dark)

Use semantic tokens in implementation (background, surface, text, border, interactive), not raw values in components.

### Semantic color tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background.primary` | `#FFFFFF` | `#0B1118` | App/page background |
| `background.secondary` | `#F5F5F5` | `#121B26` | Section or alternate background |
| `surface.primary` | `#FFFFFF` | `#121B26` | Cards, panels, containers |
| `surface.secondary` | `#F5F5F5` | `#0F1822` | Elevated or inset surface |
| `surface.overlay` | `rgba(0,0,0,0.5)` | `rgba(2,10,18,0.65)` | Modal and backdrop layers |
| `text.primary` | `#1A1A1A` | `#EAF2F6` | Main content text |
| `text.secondary` | `#6B7280` | `#9FB0C3` | Supportive text |
| `text.muted` | `#9CA3AF` | `#7C8CA0` | Captions, placeholders, disabled text |
| `text.inverse` | `#FFFFFF` | `#0B1118` | Text on saturated/contrasting backgrounds |
| `border.primary` | `#E5E7EB` | `#1E2C3C` | Main borders and outlines |
| `border.subtle` | `#F0F0F0` | `#0F1822` | Dividers and subtle separators |

### Interactive and semantic tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `interactive.default` | `#3B82F6` | `#3B82F6` | Primary actions and emphasis |
| `interactive.hover` | `#2563EB` | `#2563EB` | Hover state |
| `interactive.active` | `#1D4ED8` | `#1E4FBF` | Active/pressed state |
| `interactive.disabled` | `#D1D5DB` | `#1F2C3B` | Disabled controls |
| `success` | `#22C55E` | `#22C55E` | Positive state |
| `warning` | `#F59E0B` | `#F59E0B` | Caution state |
| `error` | `#EF4444` | `#EF4444` | Destructive/invalid state |

Rules:
- Use blue only for interaction and focus-related affordances.
- Use semantic colors only for status meaning (success, warning, error).
- Do not introduce decorative accent colors.

---

## 3) Typography

### Font family

- Primary: `'Sora', ui-sans-serif, system-ui, sans-serif`

### Weights

- 300 Light
- 400 Regular
- 500 Medium
- 600 Semibold
- 700 Bold

### Type scale

- Caption: 12
- Body small: 14
- Body base: 16
- Heading levels: 18, 20, 24, 30, 36, 40

### Line height

- Tight: `1.25` (headings)
- Normal: `1.5` (body)
- Relaxed: `1.625` (long-form text)

### Typography rules

- Prefer **one font family** across the product.
- Keep paragraph width readable (ideal ~60–75 characters).
- Maintain clear hierarchy: size + weight + spacing, not color alone.

---

## 4) Radius & Shape

Use a consistent radius scale:

- **Small**: 6px (buttons, badges, chips)
- **Medium**: 8px (cards, menus, popovers)
- **Large**: 12px (modals, major containers)
- **XL**: 16px–24px (hero/feature blocks)

Rules:
- Do not mix too many radius values in one screen.
- Interactive controls should generally use small/medium radii.

---

## 5) Spacing & Layout

Use a predictable spacing rhythm (4px base suggested).

- Core spacing set: `4, 8, 12, 16, 20, 24, 32, 40, 48`
- Keep vertical rhythm consistent in lists/forms/cards.
- Prefer whitespace for grouping over extra borders.

---

## 6) Elevation, Borders, and Separation

- Prefer subtle borders/dividers before heavy shadows.
- Use elevation sparingly; avoid layered “glassy” effects.
- In dark mode, rely more on contrast between surfaces than strong shadows.

---

## 7) Interaction States

Every interactive element should define:

- **Default**
- **Hover**
- **Active/Pressed**
- **Focus-visible** (clear ring, keyboard-friendly)
- **Disabled** (visibly inactive, still legible)

Rules:
- Never remove visible focus indicators.
- Color alone should not be the only signal for state.

---

## 8) Motion Guidelines

- Motion should support orientation and feedback, not decoration.
- Keep transitions short and subtle.
- Respect reduced-motion preferences.
- Avoid large or continuous animations in core workflows.

---

## 9) Accessibility Baseline

- Ensure sufficient text/background contrast.
- Use semantic structure for headings, lists, buttons, and forms.
- Provide clear labels and error/help text for inputs.
- Support keyboard navigation across all key interactions.
- Ensure target sizes are comfortable for touch and pointer use.

---

## 10) Component Consistency Rules

- Reuse existing patterns before creating new variants.
- Keep component APIs simple and predictable.
- Use semantic tokens in components, not hardcoded per-screen values.
- Validate light/dark parity before release.

---

## 11) Community Contribution Checklist

Before shipping UI changes:

- [ ] Uses shared color/typography/radius tokens
- [ ] Works in both light and dark mode
- [ ] Includes hover, focus, active, and disabled states
- [ ] Passes accessibility checks (contrast + keyboard)
- [ ] Matches spacing and hierarchy conventions
- [ ] Avoids introducing one-off visual styles

---

## 12) Short Version (for README sections)

Wisdom Fox UI should be minimal, readable, and consistent. Use shared semantic theme tokens, one typography system, and a fixed radius/spacing scale.  
Design for both light and dark mode equally, with accessibility and keyboard focus built in from the start. Favor reusable patterns over unique one-off components so projects stay maintainable and visually uniform.