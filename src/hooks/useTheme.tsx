import { getTheme, THEME } from '@/consts';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('');

  const setLocalStorageTheme = (theme: string) => {
    const themeAsEnum = getTheme(theme);
    setTheme(themeAsEnum);
    localStorage.setItem('theme', themeAsEnum);
    const app = document.body.querySelector('.app') as HTMLElement;
    if (app) {
      app.style.colorScheme = themeAsEnum;
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setLocalStorageTheme(nextTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? THEME.DARK;
    setLocalStorageTheme(theme);
  }, []);

  return {
    theme,
    setLocalStorageTheme,
    toggleTheme,
  };
};
