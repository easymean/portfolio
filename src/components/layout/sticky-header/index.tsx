import { getTheme, THEME } from '@/consts';
import { useEffect, useState } from 'react';
import './style.scss';

export const StickyHeader = () => {
  const [theme, setTheme] = useState('');

  const setLocalStorageTheme = (theme: string) => {
    const themeAsEnum = getTheme(theme);
    setTheme(themeAsEnum);
    localStorage.setItem('theme', themeAsEnum);
    const app = document.body.querySelector('.app') as HTMLElement;
    if (app) {
      console.log(app);
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

  return (
    <nav className="sticky-header">
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === THEME.DARK ? 'DARK' : 'LIGHT'}
      </button>
    </nav>
  );
};
