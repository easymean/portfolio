export enum TITLE {
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  FOOTER = 'footer',
}

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export const getTheme = (theme: string) => {
  if (theme === THEME.DARK) {
    return THEME.DARK;
  }
  return THEME.LIGHT;
};
