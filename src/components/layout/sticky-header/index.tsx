import { THEME } from '@/consts';
import './style.scss';
import { useTheme } from '@/hooks/useTheme';

export const StickyHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sticky-header">
      <div className="link-list">
        <a href="https://github.com/easymean" target="_blank">
          GITHUB
        </a>
        <a href="https://velog.io/@easymean/posts" target="_blank">
          블로그
        </a>
      </div>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === THEME.DARK ? 'DARK' : 'LIGHT'}
      </button>
    </nav>
  );
};
