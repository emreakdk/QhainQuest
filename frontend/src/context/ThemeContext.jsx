import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider - Centralized theme management for ChainQuest
 * 
 * Key design decisions:
 * 1. Prevents flicker: Theme is set in index.html <script> before React loads
 * 2. localStorage priority: User preference overrides system preference
 * 3. System preference fallback: Uses prefers-color-scheme when no saved preference
 * 4. Works on all devices: No mobile-specific restrictions - theme works everywhere
 * 5. DOM sync: Updates document.documentElement.classList for Tailwind dark: classes
 * 6. System theme listener: Updates theme when system preference changes (only if user hasn't set preference)
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then fall back to system preference
    // This ensures user preference is respected across sessions
    const stored = localStorage.getItem('usehooks-ts-dark-mode');
    let initialTheme;
    if (stored !== null) {
      initialTheme = JSON.parse(stored);
    } else {
      // Fall back to system preference on first load
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme immediately on initialization
    // Note: This is a backup - the main theme is set in index.html to prevent flicker
    const html = document.documentElement;
    if (initialTheme) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    html.style.colorScheme = initialTheme ? 'dark' : 'light';
    
    return initialTheme;
  });

  // Apply theme changes to DOM
  useEffect(() => {
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('usehooks-ts-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Listen for system theme changes (optional enhancement)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't set a preference (localStorage is empty)
      const stored = localStorage.getItem('usehooks-ts-dark-mode');
      if (stored === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const theme = isDarkMode ? 'dark' : 'light';
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
