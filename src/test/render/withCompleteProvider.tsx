import { RenderOptions, render } from '@testing-library/react';
import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import {
  BreakpointProvider,
  TBreakpointContext,
} from '../../components/App/BreakpointContext';
import { store as appStore, StoreProvider } from '../../stores';

export type MockStore = Partial<typeof appStore>;

type TWithAppProviders = {
  route?: string;
  store?: MockStore;
  breakpoint?: Partial<TBreakpointContext>;
} & RenderOptions;

export const renderWithCompleteProvider = (
  ui: React.ReactElement,
  {
    route = '/',
    store = appStore,
    breakpoint = { breakpoint: 'lg', orientation: 'portrait' },
    ...renderOptions
  }: TWithAppProviders = {}
) => {
  const Wrapper: React.FC<Record<string, unknown>> = ({ children }) => {
    return (
      <StoreProvider value={store as typeof appStore}>
        <HashRouter>
          <BreakpointProvider value={breakpoint as TBreakpointContext}>
            {children}
          </BreakpointProvider>
        </HashRouter>
      </StoreProvider>
    );
  };

  window.history.pushState({}, '', route);
  return render(ui, {
    ...renderOptions,
    wrapper: Wrapper,
  });
};
