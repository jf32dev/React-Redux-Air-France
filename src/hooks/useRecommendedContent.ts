import * as React from 'react';
import type { Story, File } from '../services/bridge/type/entities';
import { TStatus } from '../stores/type';
import bridge from '../services/bridge';

type TContent = {
  story: Story[];
  file: File[];
};
type HookReturnType = [TContent, TStatus, string[]];

export const useRecommendedContent = (limit: number): HookReturnType => {
  // NOTE: useReducer can be used for the another option.
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [error, setError] = React.useState<string[]>([]);
  const [content, setContent] = React.useState<TContent>({
    story: [],
    file: [],
  });
  const getContents = React.useCallback(async () => {
    setStatus('loading');
    const [stories, files] = await Promise.all([
      await bridge.getRecommendedList<Story>({
        entityName: 'story',
        limit,
      }),
      await bridge.getRecommendedList<File>({
        entityName: 'file',
        limit,
      }),
    ]);
    const errorCollection: string[] = [];
    if (stories.hasError) {
      errorCollection.push(JSON.stringify(stories.error));
    }
    if (files.hasError) {
      errorCollection.push(JSON.stringify(files.error));
    }
    if (stories.hasError && files.hasError) {
      setStatus('failed');
      setError(errorCollection);
      return;
    }

    setError(errorCollection);
    setContent({
      story: stories.hasError || !stories.value ? [] : stories.value,
      file: files.hasError || !files.value ? [] : files.value,
    });
    setStatus('succeeded');
  }, [limit]);

  React.useEffect(() => {
    getContents();
  }, []);

  return [content, status, error];
};
