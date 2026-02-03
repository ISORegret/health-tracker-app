/**
 * SpotFinder themes – light and dark.
 */

export type ThemePalette = {
  bg: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  border: string;
  borderStrong: string;
  success: string;
  error: string;
  warning: string;
  overlay: string;
};

export const lightTheme: ThemePalette = {
  bg: '#fafaf9',
  surface: '#ffffff',
  surfaceMuted: '#f5f5f4',
  text: '#1c1917',
  textSecondary: '#78716c',
  textMuted: '#a8a29e',
  accent: '#059669',
  accentLight: '#d1fae5',
  accentDark: '#047857',
  border: '#e7e5e4',
  borderStrong: '#d6d3d1',
  success: '#059669',
  error: '#dc2626',
  warning: '#d97706',
  overlay: 'rgba(0,0,0,0.35)',
};

export const darkTheme: ThemePalette = {
  bg: '#0f1419',
  surface: '#1a1f26',
  surfaceMuted: '#252b33',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#34d399',
  accentLight: '#064e3b',
  accentDark: '#6ee7b7',
  border: '#334155',
  borderStrong: '#475569',
  success: '#34d399',
  error: '#f87171',
  warning: '#fbbf24',
  overlay: 'rgba(0,0,0,0.5)',
};

export type ThemeMode = 'light' | 'dark';

/** Default export for backwards compat – use useTheme() in components. */
export const theme = lightTheme;
