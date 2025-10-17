import { createContext, useContext, useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    // HTML elementine tema class'ını ekle
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(isDarkMode ? 'dark' : 'light');
    
    // Body'ye de tema class'ını ekle
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const theme = isDarkMode ? 'dark' : 'light';
  const toggleTheme = () => {
    console.log('Tema değiştiriliyor:', theme, '->', isDarkMode ? 'light' : 'dark');
    toggle();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
