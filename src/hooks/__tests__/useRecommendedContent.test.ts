import { renderHook } from '@testing-library/react-hooks';
import { sequence } from '@jackfranklin/test-data-bot';
import bridge from '../../services/bridge';
import Result from '../../services/bridge/type/results';
import { fakeFileList } from '../../test/mock/fakeFile';
import { fakeStoryList } from '../../test/mock/fakeStory';
import { useRecommendedContent } from '../useRecommendedContent';

jest.mock('../../services/bridge/base');

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});
it('should return content, status, and error correctly', async () => {
  jest
    .spyOn(bridge, 'getRecommendedList')
    .mockImplementation(async (params) => {
      const { entityName, limit } = params;
      switch (entityName) {
        case 'file':
          return new Result<unknown[]>(fakeFileList(limit), 'test-app', null);

        case 'story':
          return new Result<unknown[]>(fakeStoryList(limit), 'test-app', null);

        default:
          return new Result<unknown[]>(
            undefined as any,
            'test-app',
            'Not Found'
          );
      }
    });

  const limit = 10;
  const { result, waitForNextUpdate } = renderHook(useRecommendedContent, {
    initialProps: limit,
  });
  expect(result.current[1]).toBe('loading');
  await waitForNextUpdate();

  expect(bridge.getRecommendedList).toBeCalledTimes(2);
  expect(result.current[1]).toBe('succeeded');
  expect(result.current[2].length).toEqual(0);

  expect(result.current[0]).toHaveProperty('file', expect.any(Array));
  expect(result.current[0].file.length).toEqual(limit);

  expect(result.current[0]).toHaveProperty('story', expect.any(Array));
  expect(result.current[0].story.length).toEqual(limit);
});

describe('should return error when bridge give any error value', () => {
  test('with error string', async () => {
    const errorString = 'error';
    jest
      .spyOn(bridge, 'getRecommendedList')
      .mockResolvedValue(
        new Result<unknown[]>(undefined as any, `${sequence()}`, errorString)
      );
    const { result, waitForNextUpdate } = renderHook(useRecommendedContent, {
      initialProps: 1,
    });
    expect(result.current[1]).toBe('loading');
    await waitForNextUpdate();
    expect(bridge.getRecommendedList).toBeCalledTimes(2);
    expect(result.current[1]).toBe('failed');
    expect(result.current[2]).toEqual(
      expect.arrayContaining([JSON.stringify(errorString)])
    );
  });

  test('with error object', async () => {
    const errorObject = {
      code: 100,
      message: 'whatever error message',
    };
    jest
      .spyOn(bridge, 'getRecommendedList')
      .mockResolvedValue(
        new Result<unknown[]>(undefined as any, `${sequence()}`, errorObject)
      );
    const { result, waitForNextUpdate } = renderHook(useRecommendedContent, {
      initialProps: 1,
    });
    expect(result.current[1]).toBe('loading');

    await waitForNextUpdate();

    expect(bridge.getRecommendedList).toBeCalledTimes(2);
    expect(result.current[1]).toBe('failed');
    expect(result.current[2]).toEqual(
      expect.arrayContaining([JSON.stringify(errorObject)])
    );
  });
});
