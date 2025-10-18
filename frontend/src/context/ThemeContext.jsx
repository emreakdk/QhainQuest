import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // CRITICAL FIX: Custom theme state management with proper localStorage sync
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Read from localStorage on initialization
    const stored = localStorage.getItem('usehooks-ts-dark-mode');
    if (stored !== null) {
      return JSON.parse(stored);
    }
    // Default to system preference if no stored value
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // CRITICAL FIX: Apply theme to DOM immediately on mount and when state changes
  useEffect(() => {
    const html = document.documentElement;
    
    // CRITICAL FIX: Only manage 'dark' class on document.documentElement
    // Tailwind darkMode: 'class' only checks for 'dark' class on html element
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Force a re-render by triggering a style recalculation
    html.style.colorScheme = isDarkMode ? 'dark' : 'light';
    
    console.log(`[ThemeProvider] Applied theme: ${isDarkMode ? 'dark' : 'light'} (isDarkMode: ${isDarkMode})`);
    console.log(`[ThemeProvider] HTML classes:`, html.classList.toString());
    console.log(`[ThemeProvider] HTML element:`, html);
    console.log(`[ThemeProvider] Has dark class:`, html.classList.contains('dark'));
    console.log(`[ThemeProvider] Color scheme:`, html.style.colorScheme);
  }, [isDarkMode]);

  // CRITICAL FIX: Sync with localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('usehooks-ts-dark-mode', JSON.stringify(isDarkMode));
    console.log(`[ThemeProvider] Saved to localStorage: ${isDarkMode}`);
  }, [isDarkMode]);

  const theme = isDarkMode ? 'dark' : 'light';
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    console.log(`[ThemeProvider] Toggling theme: ${theme} -> ${newTheme ? 'dark' : 'light'}`);
    setIsDarkMode(newTheme);
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
