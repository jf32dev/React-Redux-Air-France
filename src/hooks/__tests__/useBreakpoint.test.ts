import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useBreakpoint } from '../useBreakpoint';

jest.mock('../../style/_breakpoint.module.scss', () => {
  return { lg: '1200px', md: '965px', sm: '730px', xl: '1380px', xs: '0px' };
});

/**
 * Need to pass in as modern timer to use sinonjs for throttle and debounce
 * https://github.com/facebook/jest/issues/3465#issuecomment-504908570
 */
beforeEach(() => jest.useFakeTimers('modern'));
afterEach(() => jest.useRealTimers());
afterAll(() => jest.resetAllMocks());

const fireResize = (width: number, height?: number) => {
  global.innerWidth = width;
  if (height) {
    global.innerHeight = height;
  }

  act(() => {
    fireEvent(window, new Event('resize'));
  });
};

test('exposes current breakpoint and orientation', () => {
  const { result } = renderHook(useBreakpoint);
  expect(result.current).toBeTruthy();
  expect(result.current.breakpoint).toBe('lg');
  expect(result.current.orientation).toBe('landscape');
});

describe('Resizing windows', () => {
  test('Resize width to 729px, 964px, 1199px, 1240px, 1440px with constant height', () => {
    const { result } = renderHook(useBreakpoint);
    fireResize(729);
    expect(result.current.breakpoint).toBe('xs');

    jest.advanceTimersByTime(300);
    fireResize(964);
    expect(result.current.breakpoint).toBe('sm');

    jest.advanceTimersByTime(300);
    fireResize(1199);
    expect(result.current.breakpoint).toBe('md');

    jest.advanceTimersByTime(300);
    fireResize(1240);
    expect(result.current.breakpoint).toBe('lg');

    jest.advanceTimersByTime(300);
    fireResize(1440);
    expect(result.current.breakpoint).toBe('xl');
  });

  test('Resize height so that width is less than height (portrait)', () => {
    const { result } = renderHook(useBreakpoint);
    fireResize(1200, 1440);
    expect(result.current.orientation).toBe('portrait');
    expect(result.current.breakpoint).toBe('lg');

    jest.advanceTimersByTime(300);
    fireResize(1380, 960);
    expect(result.current.orientation).toBe('landscape');
    expect(result.current.breakpoint).toBe('xl');
  });

  test('Hook unmounted', () => {
    const eventMap: Record<string, any> = {};
    const mockFn = jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((e) => {
        eventMap[e] = jest.fn();
      });

    const { unmount } = renderHook(useBreakpoint);
    unmount();
    fireResize(200);
    expect(eventMap.resize).not.toBeCalled();

    mockFn.mockRestore();
  });
});
