import { DependencyList, useCallback, useEffect, useState } from 'react';
import Result from '../services/bridge/type/results';
import { Nullable } from '../type';

type TProps<T, R> = {
  request: () => Promise<Result<T[]>> | Promise<Result<T[]>[]>;
  afterRequest?: (
    value: Nullable<T[]>
  ) => Promise<Nullable<R[]>> | Nullable<R[]>;
  deps?: DependencyList;
  immediate?: boolean;
};

type List<T, R> = T extends R ? T : R;

type TReturnType<T, R> = [
  List<T, R>[],
  boolean,
  () => Promise<void>,
  string | null
];

/**
 * @description Hook that handles bridge/private api that returns a list of anything.
 *
 * @param options an object of options, please see below
 * @param request the request you wanna make which returns a list of anything
 * @param afterRequest the extra manipulation of the returned list you wanna make, which returns a list of anything.
 * @param deps the dependency list, this can be used to update the list
 * @param immediate it determines whether the request would be made or not
 *
 * @returns the list the request returns. If afterRequest is provided, it returns the list the afterRequest returns. The type of the list will be automatically inferred.
 * @returns the loading status
 * @returns the fetch function, which makes the request, you normally don't need it, but if use, please set 'immediate' to false.
 * @returns the error
 */
export const useList = <T, R>({
  request,
  afterRequest,
  deps = [],
  immediate = true,
}: TProps<T, R>): TReturnType<T, R> => {
  const [list, setList] = useState<Nullable<T[]> | R[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const result = await request();
    setLoading(false);

    if (Array.isArray(result)) {
      const data = result
        .filter((res) => !res.hasError)
        .map((res) => res.value)
        .flat();

      const errors = result
        .filter((res) => res.hasError)
        .map((res) => res.error)
        .flat();

      if (errors.length) {
        setError(JSON.stringify(errors[0]));
      }

      if (data.length) {
        const value = afterRequest
          ? await afterRequest(data as Nullable<T[]>)
          : data;
        setList(value as Nullable<T[]>);
      }
    } else if (!result.hasError) {
      const value = afterRequest
        ? await afterRequest(result.value)
        : result.value;
      setList(value);
    } else {
      setError(JSON.stringify(result.error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      fetch();
    }
  }, [fetch, immediate]);

  return [list as List<T, R>[], loading, fetch, error];
};
