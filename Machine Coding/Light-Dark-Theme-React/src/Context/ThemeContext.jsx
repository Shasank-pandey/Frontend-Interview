import React, { useContext, useState, createContext, useEffect } from 'react';

const Theme = createContext();

export const useTheme = () => {
  return useContext(Theme);
};

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkmode] = useState(false);

  const toggleTheme = () => {
    setIsDarkmode((mode) => !mode);
  };

  const theme = isDarkMode ? 'dark' : 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>{children}</Theme.Provider>
  );
};

export default ThemeProvider;
