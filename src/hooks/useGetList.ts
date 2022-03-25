import { useState, useEffect, useCallback, DependencyList } from 'react';
import Result from '../services/bridge/type/results';

export const useList = <T>(
  fn: () => Promise<Result<T[]>>,
  deps: DependencyList = []
): [T[], boolean, string] => {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getList = useCallback(async () => {
    setLoading(true);
    const result = await fn();
    setLoading(false);
    if (!result.hasError && result.value) {
      setList(result.value);
    } else {
      setError(JSON.stringify(result.error));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    getList();
  }, [getList]);

  return [list, loading, error];
};
