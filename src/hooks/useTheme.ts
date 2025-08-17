import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('ativostokenizados-theme');
    
    if (savedTheme) {
      const isUserDark = savedTheme === 'dark';
      setIsDark(isUserDark);
      updateTheme(isUserDark);
    } else {
      // Default to light theme
      setIsDark(false);
      updateTheme(false);
    }
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
    localStorage.setItem('ativostokenizados-theme', newTheme ? 'dark' : 'light');
  };

  return {
    isDark,
    toggleTheme,
  };
};