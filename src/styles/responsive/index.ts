const breakpointDesktop = 1024;
const breakpointTablet = 758;
const breakpointMobile = 335;

const customQuery = (param: { maxWidth?: string; minWidth?: string }) => {
  const maxQuery = param.maxWidth ? `(max-width: ${param.maxWidth})` : '';
  const minQuery = param.minWidth ? `(min-width: ${param.minWidth})` : '';
  return minQuery && maxQuery
    ? `${minQuery} and ${maxQuery}`
    : `${minQuery}${maxQuery}`;
};

export const isDesktopQuery = customQuery({
  minWidth: `${breakpointDesktop}px`,
});
export const isTabletQuery = customQuery({
  minWidth: `${breakpointTablet}px`,
  maxWidth: `${breakpointDesktop - 1}px`,
});
export const isMobileQuery = customQuery({
  minWidth: `${breakpointMobile}px`,
  maxWidth: `${breakpointTablet - 1}px`,
});
