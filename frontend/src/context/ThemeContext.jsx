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
    const body = document.body;
    
    // Remove existing theme classes
    html.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Add current theme class
    const themeClass = isDarkMode ? 'dark' : 'light';
    html.classList.add(themeClass);
    body.classList.add(themeClass);
    
    console.log(`[ThemeProvider] Applied theme: ${themeClass} (isDarkMode: ${isDarkMode})`);
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
