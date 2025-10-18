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

  // CRITICAL FIX: Apply theme immediately on mount (before first render)
  useEffect(() => {
    const html = document.documentElement;
    console.log(`[ThemeProvider] === INITIAL THEME APPLICATION ===`);
    console.log(`[ThemeProvider] Initial isDarkMode:`, isDarkMode);
    
    if (isDarkMode) {
      html.classList.add('dark');
      console.log(`[ThemeProvider] ✅ Initially added 'dark' class to document.documentElement`);
    } else {
      html.classList.remove('dark');
      console.log(`[ThemeProvider] ❌ Initially removed 'dark' class from document.documentElement`);
    }
    
    html.style.colorScheme = isDarkMode ? 'dark' : 'light';
    console.log(`[ThemeProvider] Initial HTML classes:`, html.classList.toString());
  }, []); // Empty dependency array - only run on mount

  // CRITICAL FIX: Apply theme to DOM immediately on mount and when state changes
  useEffect(() => {
    // Ensure DOM is ready
    const applyTheme = () => {
      const html = document.documentElement;
      
      console.log(`[ThemeProvider] === DOM INSPECTION START ===`);
      console.log(`[ThemeProvider] Current isDarkMode:`, isDarkMode);
      console.log(`[ThemeProvider] HTML element before:`, html);
      console.log(`[ThemeProvider] HTML classes before:`, html.classList.toString());
      console.log(`[ThemeProvider] HTML classList length:`, html.classList.length);
      
      // CRITICAL FIX: Only manage 'dark' class on document.documentElement
      // Tailwind darkMode: 'class' only checks for 'dark' class on html element
      if (isDarkMode) {
        html.classList.add('dark');
        console.log(`[ThemeProvider] ✅ Added 'dark' class to document.documentElement`);
      } else {
        html.classList.remove('dark');
        console.log(`[ThemeProvider] ❌ Removed 'dark' class from document.documentElement`);
      }
      
      // Force a re-render by triggering a style recalculation
      html.style.colorScheme = isDarkMode ? 'dark' : 'light';
      
      console.log(`[ThemeProvider] HTML element after:`, html);
      console.log(`[ThemeProvider] HTML classes after:`, html.classList.toString());
      console.log(`[ThemeProvider] HTML classList length after:`, html.classList.length);
      console.log(`[ThemeProvider] Has dark class:`, html.classList.contains('dark'));
      console.log(`[ThemeProvider] Color scheme:`, html.style.colorScheme);
      console.log(`[ThemeProvider] === DOM INSPECTION END ===`);
    };

    // Apply immediately
    applyTheme();
    
    // Also apply on next tick to ensure DOM is fully ready
    setTimeout(applyTheme, 0);
    
    // Additional verification
    setTimeout(() => {
      console.log(`[ThemeProvider] === DELAYED VERIFICATION ===`);
      console.log(`[ThemeProvider] HTML classes after 100ms:`, document.documentElement.classList.toString());
      console.log(`[ThemeProvider] Has dark class after 100ms:`, document.documentElement.classList.contains('dark'));
    }, 100);
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

  // Global function for DOM inspection (for debugging)
  useEffect(() => {
    window.inspectTheme = () => {
      const html = document.documentElement;
      console.log(`[DOM INSPECTION] HTML element:`, html);
      console.log(`[DOM INSPECTION] HTML classes:`, html.classList.toString());
      console.log(`[DOM INSPECTION] Has dark class:`, html.classList.contains('dark'));
      console.log(`[DOM INSPECTION] Color scheme:`, html.style.colorScheme);
      console.log(`[DOM INSPECTION] Current theme state:`, { isDarkMode, theme });
      return {
        html,
        classes: html.classList.toString(),
        hasDarkClass: html.classList.contains('dark'),
        colorScheme: html.style.colorScheme,
        isDarkMode,
        theme
      };
    };
    console.log(`[ThemeProvider] Global inspectTheme() function available for debugging`);
  }, [isDarkMode, theme]);

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
