import { RenderOptions, render } from '@testing-library/react';
import * as React from 'react';
import {
  BreakpointProvider,
  TBreakpointContext,
} from '../../components/App/BreakpointContext';

type TWithBreakpointProvider = {
  context?: TBreakpointContext;
} & RenderOptions;
export const renderWithBreakpointProvider = (
  ui: React.ReactElement,
  {
    context = { breakpoint: 'lg', orientation: 'landscape' },
    ...renderOptions
  }: TWithBreakpointProvider = {}
) => {
  const Wrapper: React.FC<Record<string, unknown>> = ({ children }) => {
    return <BreakpointProvider value={context}>{children}</BreakpointProvider>;
  };
  return render(ui, {
    ...renderOptions,
    wrapper: Wrapper,
  });
};
