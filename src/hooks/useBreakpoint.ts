import * as React from 'react';
import { throttle } from 'lodash';
import styles from '../style/_breakpoint.module.scss';

export type TBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TOrientation = 'portrait' | 'landscape';
type ReturnType = {
  breakpoint: TBreakpoint;
  orientation: TOrientation;
};
// transform pixel sizes to number from string
const sizes = Object.keys(styles).reduce<Record<TBreakpoint, number>>(
  (acc, size) => ({ ...acc, [size]: +styles[size].replace('px', '') }),
  {} as any
);

const getBreakpoint = (width: number) => {
  if (width < +sizes.sm) {
    return 'xs';
  }
  if (width >= +sizes.sm && width < +sizes.md) {
    return 'sm';
  }
  if (width >= +sizes.md && width < +sizes.lg) {
    return 'md';
  }
  if (width >= +sizes.lg && width < +sizes.xl) {
    return 'lg';
  }
  if (width >= +sizes.xl) {
    return 'xl';
  }
  return 'lg';
};

const getOrientation = () => {
  const height = document.body.clientHeight || window.innerHeight;
  const width = document.body.clientWidth || window.innerWidth;
  return height > width ? 'portrait' : 'landscape';
};

/**
 * This implementation can be change to use ResizeObservers if required
 */
export const useBreakpoint = (): ReturnType => {
  const [breakpoint, setBreakpoint] = React.useState<TBreakpoint>('lg');
  const [orientation, setOrientation] = React.useState<TOrientation>(
    'landscape'
  );

  React.useEffect(() => {
    const refreshBreakpoint = throttle(() => {
      // Instead of window.innerWidth use body.clientWidth
      // from some reason, in Mobile Platform particulary iOS WKWebView is not detecting
      // a change in size especially in orientation change.
      setBreakpoint(
        getBreakpoint(document.body.clientWidth || window.innerWidth)
      );
      setOrientation(getOrientation());
    }, 300);

    window.addEventListener('resize', refreshBreakpoint);
    return () => window.removeEventListener('resize', refreshBreakpoint);
  }, []);

  return {
    breakpoint,
    orientation,
  };
};
