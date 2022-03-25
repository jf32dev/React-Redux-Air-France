import * as React from 'react';
import bridge from '../services/bridge/bridge';
import { TStatus } from '../stores/type';
import Result from '../services/bridge/type/results';

/**
 * Generic Bridge Open Hook
 * usage:
 * const [open, status, error] = useBridgeOpen(bridge.openEntity)
 */
export type BridgeOpenParamsType = Parameters<
  | typeof bridge.openEntity
  | typeof bridge.openMenu
  | typeof bridge.openUrl
  | typeof bridge.openInterestAreas
>[0];

type HookReturnType<T extends BridgeOpenParamsType> = [
  (params: T) => Promise<void>,
  TStatus,
  string | null
];

const useBridgeOpen = <T extends BridgeOpenParamsType>(
  fn: (params: T) => Promise<Result<unknown>>
): HookReturnType<T> => {
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const open = React.useCallback(
    async (params: T) => {
      setStatus('loading');
      const result = await fn.call(bridge, params);
      if (!result.hasError) {
        setStatus('succeeded');
        return;
      }
      setStatus('failed');
      setError(JSON.stringify(result.error));
    },
    [fn]
  );

  return [open, status, error];
};

export default useBridgeOpen;
