/**
 * Design Tokens - Strict Semantic Color System
 * 
 * Minimal, focused color palette across light and dark modes
 * Colors communicate: action, state, focus — NOT decoration
 * 
 * Design Principles:
 * - One primary accent color (blue)
 * - Neutral grayscale system
 * - No arbitrary or decorative colors
 * - Same tokens across all views (Notes, Kanban, Table, Roadmap)
 * - Contrast-compliant (WCAG AA minimum)
 */

export type Theme = 'light' | 'dark';

export interface ThemeTokens {
  // ============= BACKGROUNDS =============
  background: {
    primary: string;      // Page background
    secondary: string;    // Alt background (e.g., hover sections)
  };
  
  // ============= SURFACES (Content Areas) =============
  surface: {
    primary: string;      // Default card/container
    secondary: string;    // Subtle elevated surface
    overlay: string;      // Modal backdrop
  };
  
  // ============= TEXT (Content) =============
  text: {
    primary: string;      // Main content, high contrast
    secondary: string;    // Supporting text
    muted: string;        // Disabled, placeholder, tertiary
    inverse: string;      // On dark/saturated backgrounds
  };
  
  // ============= INTERACTIVE STATES =============
  interactive: {
    default: string;      // Button/control default (accent)
    hover: string;        // Accent hover state
    active: string;       // Accent active state
    disabled: string;     // Disabled control
  };
  
  // ============= SEMANTIC (Functional) =============
  success: string;        // Positive/done state
  error: string;          // Destructive/invalid state
  warning: string;        // Caution state
  
  // ============= BORDERS & DIVIDERS =============
  border: {
    primary: string;      // Main borders
    subtle: string;       // Dividers, light separators
  };
}

/**
 * LIGHT MODE TOKENS
 * 
 * Design: Clean, calm, professional
 * Inspired by Apple HIG and GitHub Light
 * - Soft whites for primary background
 * - Subtle grays for hierarchy
 * - Blue for primary actions
 * - Green/red only for semantic states
 */
export const lightTokens: ThemeTokens = {
  // Backgrounds - Clean, minimal
  background: {
    primary: '#FFFFFF',     // Pure white
    secondary: '#F5F5F5',   // Very subtle gray
  },
  
  // Surfaces - Content containers
  surface: {
    primary: '#FFFFFF',     // Cards, panels
    secondary: '#F5F5F5',   // Subtle elevation
    overlay: 'rgba(0, 0, 0, 0.5)',  // Modal backdrop
  },
  
  // Text - High contrast for readability
  text: {
    primary: '#1A1A1A',     // Main text, high contrast
    secondary: '#6B7280',   // Supporting text
    muted: '#9CA3AF',       // Disabled, placeholder
    inverse: '#FFFFFF',     // On dark backgrounds
  },
  
  // Interactive - Blue as primary accent
  interactive: {
    default: '#3B82F6',     // Primary blue
    hover: '#2563EB',       // Darker blue on hover
    active: '#1D4ED8',      // Darker blue on active
    disabled: '#D1D5DB',    // Disabled state
  },
  
  // Semantic states
  success: '#10B981',       // Green for success
  error: '#EF4444',         // Red for error
  warning: '#F59E0B',       // Amber for warning
  
  // Borders - Subtle separators
  border: {
    primary: '#E5E7EB',     // Main borders
    subtle: '#F0F0F0',      // Dividers
  },
};

/**
 * DARK MODE TOKENS
 * 
 * Design: Calm, intentional, not inverted
 * Inspired by GitHub Dark and Figma Dark
 * - Deep slate backgrounds
 * - Soft surfaces, minimal contrast fatigue
 * - Lighter blue for primary actions
 * - Brighter semantic colors for visibility
 */
export const darkTokens: ThemeTokens = {
  // Backgrounds - Deep, calm
  background: {
    primary: '#0F172A',     // Deep slate
    secondary: '#1A202C',   // Slightly lighter
  },
  
  // Surfaces - Layered, soft
  surface: {
    primary: '#1A202C',     // Card background
    secondary: '#2D3748',   // Elevated surface
    overlay: 'rgba(0, 0, 0, 0.7)',  // Modal backdrop
  },
  
  // Text - High contrast but reduced fatigue
  text: {
    primary: '#F8FAFC',     // Off-white, soft
    secondary: '#CBD5E1',   // Supporting text
    muted: '#94A3B8',       // Disabled, placeholder
    inverse: '#0F172A',     // On light backgrounds
  },
  
  // Interactive - Lighter blue for dark backgrounds
  interactive: {
    default: '#60A5FA',     // Light blue
    hover: '#93C5FD',       // Even lighter on hover
    active: '#BFDBFE',      // Lightest on active
    disabled: '#4B5563',    // Disabled state
  },
  
  // Semantic states - Brighter for visibility
  success: '#34D399',       // Bright green
  error: '#F87171',         // Bright red
  warning: '#FBBF24',       // Bright amber
  
  // Borders - Subtle in dark mode
  border: {
    primary: '#2D3748',     // Subtle borders
    subtle: '#1A202C',      // Very subtle dividers
  },
};

/**
 * Get tokens for specified theme
 */
export function getThemeTokens(theme: Theme): ThemeTokens {
  return theme === 'dark' ? darkTokens : lightTokens;
}

/**
 * CSS variable definitions for themes
 * Used for CSS-in-JS and utility class generation
 */
export function generateThemeCSS(theme: Theme): string {
  const tokens = getThemeTokens(theme);
  const prefix = theme === 'dark' ? 'dark' : 'light';
  
  return `
    :root[data-theme="${prefix}"] {
      /* Backgrounds */
      --color-bg-primary: ${tokens.background.primary};
      --color-bg-secondary: ${tokens.background.secondary};
      
      /* Surfaces */
      --color-surface-primary: ${tokens.surface.primary};
      --color-surface-secondary: ${tokens.surface.secondary};
      --color-surface-overlay: ${tokens.surface.overlay};
      
      /* Text */
      --color-text-primary: ${tokens.text.primary};
      --color-text-secondary: ${tokens.text.secondary};
      --color-text-muted: ${tokens.text.muted};
      --color-text-inverse: ${tokens.text.inverse};
      
      /* Interactive */
      --color-action-default: ${tokens.interactive.default};
      --color-action-hover: ${tokens.interactive.hover};
      --color-action-active: ${tokens.interactive.active};
      --color-action-disabled: ${tokens.interactive.disabled};
      
      /* Semantic */
      --color-success: ${tokens.success};
      --color-error: ${tokens.error};
      --color-warning: ${tokens.warning};
      
      /* Borders */
      --color-border-primary: ${tokens.border.primary};
      --color-border-subtle: ${tokens.border.subtle};
    }
  `;
}
