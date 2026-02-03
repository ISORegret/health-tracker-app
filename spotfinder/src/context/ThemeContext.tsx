import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemePalette, darkTheme, lightTheme } from '../theme';

const THEME_KEY = '@spotfinder/theme_mode';

type ThemeContextValue = {
  mode: ThemeMode;
  theme: ThemePalette;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') setModeState(saved);
    });
  }, []);

  const setMode = useCallback(async (next: ThemeMode) => {
    setModeState(next);
    await AsyncStorage.setItem(THEME_KEY, next);
  }, []);

  const toggleTheme = useCallback(async () => {
    const next: ThemeMode = mode === 'light' ? 'dark' : 'light';
    setModeState(next);
    await AsyncStorage.setItem(THEME_KEY, next);
  }, [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const value: ThemeContextValue = {
    mode,
    theme,
    setMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
