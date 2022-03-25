import React from 'react';
import {
  render as rtlRender,
  RenderOptions,
  screen,
} from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from '../App';
import { useRecommendedContent } from '../../../hooks/useRecommendedContent';
// import { renderWithAppProviders } from '../../../test/render/withAppProviders';
import { MockStore } from '../../../test/render/withCompleteProvider';
import { renderWithRouter } from '../../../test/render/withRouter';
import { store as appStore, StoreProvider } from '../../../stores';

jest.mock('../../../services/bridge/base');
jest.mock('../../../hooks/useRecommendedContent');

beforeEach(() => {
  jest.spyOn(appStore.user, 'getLoginUser').mockResolvedValue();

  (useRecommendedContent as jest.Mock).mockReturnValue([
    { file: [], story: [] },
    '',
  ]);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

const renderWithAppProviders = (
  ui: React.ReactElement,
  {
    route = '/',
    store = appStore,
    ...renderOptions
  }: RenderOptions & { route?: string; store?: MockStore } = {}
) => {
  const Wrapper: React.FC<Record<string, unknown>> = ({ children }) => {
    return (
      <StoreProvider value={store as typeof appStore}>
        <HashRouter>{children}</HashRouter>
      </StoreProvider>
    );
  };
  window.history.pushState({}, 'App Test Page', route);
  return rtlRender(ui, {
    ...renderOptions,
    wrapper: Wrapper,
  });
};

describe('App to render properly first time', () => {
  test('document title should not be empty', () => {
    renderWithAppProviders(<App />);
    expect(window.document.title).toBeTruthy();
  });

  test('document title should equal to application name', () => {
    const applicationName = 'Testing Application';
    process.env = {
      ...process.env,
      BTC_GS_APP_NAME: applicationName,
    };
    renderWithAppProviders(<App />);
    expect(window.document.title).toEqual(applicationName);

    // reset process.env for next test
    const { BTC_GS_APP_NAME, ...realEnv } = process.env;
    process.env = realEnv;
  });

  it('should render properly at home', () => {
    renderWithAppProviders(<App />);

    expect(useRecommendedContent).toBeCalledTimes(1);
    expect(screen.getByText('My Recommended Files')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

it('should throw error when no Store Provider or Router is provided', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => renderWithRouter(<App />)).toThrowError();
  expect(() => rtlRender(<App />)).toThrowError();
});
