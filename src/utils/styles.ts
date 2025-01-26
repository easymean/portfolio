export const rootFontSize = parseFloat(
  getComputedStyle(document.documentElement).fontSize,
);

export const calLenCss = (len: string): number => {
  if (len.includes('rem')) {
    return Number(len.slice(0, -3)) * rootFontSize;
  } else if (len.includes('px')) {
    return Number(len.slice(0, -2));
  } else {
    return Number(len);
  }
};
