import { THEME } from '@/consts';
import './style.scss';
import { useTheme } from '@/hooks/useTheme';

export const StickyHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sticky-header">
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === THEME.DARK ? 'DARK' : 'LIGHT'}
      </button>
    </nav>
  );
};
