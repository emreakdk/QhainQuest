import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // CRITICAL FIX: Custom theme state management with proper localStorage sync
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Read from localStorage on initialization
    const stored = localStorage.getItem('usehooks-ts-dark-mode');
    let initialTheme;
    if (stored !== null) {
      initialTheme = JSON.parse(stored);
    } else {
      // Default to system preference if no stored value
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // CRITICAL FIX: Apply theme immediately to prevent flash
    const html = document.documentElement;
    if (initialTheme) {
      html.classList.add('dark');
      console.log(`[ThemeProvider] ✅ Immediately added 'dark' class on initialization`);
    } else {
      html.classList.remove('dark');
      console.log(`[ThemeProvider] ❌ Immediately removed 'dark' class on initialization`);
    }
    html.style.colorScheme = initialTheme ? 'dark' : 'light';
    
    return initialTheme;
  });

  // CRITICAL FIX: Apply theme to DOM immediately on mount and when state changes
  useEffect(() => {
    const html = document.documentElement;
    
    // Check if user is on mobile (screen width < 768px)
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    
    console.log(`[ThemeProvider] === THEME APPLICATION START ===`);
    console.log(`[ThemeProvider] Current isDarkMode:`, isDarkMode);
    console.log(`[ThemeProvider] Is Mobile:`, isMobile);
    console.log(`[ThemeProvider] HTML element:`, html);
    console.log(`[ThemeProvider] HTML classes before:`, html.classList.toString());
    
    // CRITICAL FIX: Disable dark mode on mobile devices
    if (isMobile) {
      // Force light mode on mobile regardless of theme state
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
      console.log(`[ThemeProvider] 📱 Mobile detected - Forcing light mode`);
    } else {
      // Apply normal theme logic on desktop
      if (isDarkMode) {
        html.classList.add('dark');
        console.log(`[ThemeProvider] ✅ Added 'dark' class to document.documentElement`);
      } else {
        html.classList.remove('dark');
        console.log(`[ThemeProvider] ❌ Removed 'dark' class from document.documentElement`);
      }
      
      // Set color scheme for browser compatibility
      html.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }
    
    console.log(`[ThemeProvider] HTML classes after:`, html.classList.toString());
    console.log(`[ThemeProvider] Has dark class:`, html.classList.contains('dark'));
    console.log(`[ThemeProvider] Color scheme:`, html.style.colorScheme);
    console.log(`[ThemeProvider] === THEME APPLICATION END ===`);
    
    // Additional verification after a short delay
    setTimeout(() => {
      console.log(`[ThemeProvider] === VERIFICATION ===`);
      console.log(`[ThemeProvider] Final HTML classes:`, document.documentElement.classList.toString());
      console.log(`[ThemeProvider] Final has dark class:`, document.documentElement.classList.contains('dark'));
    }, 50);
  }, [isDarkMode]);

  // CRITICAL FIX: Sync with localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('usehooks-ts-dark-mode', JSON.stringify(isDarkMode));
    console.log(`[ThemeProvider] Saved to localStorage: ${isDarkMode}`);
  }, [isDarkMode]);

  // Handle window resize to reapply theme logic when switching between mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      const html = document.documentElement;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      
      console.log(`[ThemeProvider] 📱 Resize detected - Mobile: ${isMobile}`);
      
      if (isMobile) {
        // Force light mode on mobile
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
        console.log(`[ThemeProvider] 📱 Resize - Forcing light mode on mobile`);
      } else {
        // Apply normal theme logic on desktop
        if (isDarkMode) {
          html.classList.add('dark');
          html.style.colorScheme = 'dark';
        } else {
          html.classList.remove('dark');
          html.style.colorScheme = 'light';
        }
        console.log(`[ThemeProvider] 🖥️ Resize - Applied theme on desktop: ${isDarkMode ? 'dark' : 'light'}`);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
