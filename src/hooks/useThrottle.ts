import { DependencyList, useCallback } from 'react';

const throttle = <A extends any[]>(fn: (...args: A) => void, delay = 500) => {
  let flag = true;
  return (...args: A) => {
    if (!flag) return;
    flag = false;
    fn(...args);
    setTimeout(() => {
      flag = true;
    }, delay);
  };
};

export const useThrottle = <A extends any[]>(
  fn: (...args: A) => void,
  delay?: number,
  deps: DependencyList = []
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttled = useCallback(
    throttle((...args: A) => {
      fn(...args);
    }, delay),
    deps
  );

  return throttled;
};
