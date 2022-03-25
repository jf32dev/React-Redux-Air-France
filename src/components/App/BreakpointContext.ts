import * as React from 'react';
import type { TBreakpoint, TOrientation } from '../../hooks/useBreakpoint';

export type TBreakpointContext = {
  breakpoint: TBreakpoint;
  orientation: TOrientation;
};

const BreakpointContext = React.createContext<TBreakpointContext | null>(null);

export const BreakpointProvider = BreakpointContext.Provider;
export const useBreakpointContext = () => {
  const context = React.useContext(BreakpointContext);
  if (!context) {
    throw new Error('No Breakpoint Context Available');
  }

  return context;
};
