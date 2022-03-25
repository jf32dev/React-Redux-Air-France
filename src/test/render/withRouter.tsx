import { RenderOptions, render } from '@testing-library/react';
import * as React from 'react';
import { HashRouter } from 'react-router-dom';

type TWithRouter = {
  route?: string;
} & RenderOptions;

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', ...renderOptions }: TWithRouter = {}
) => {
  window.history.pushState({}, '', route);
  return render(ui, {
    ...renderOptions,
    wrapper: HashRouter,
  });
};
