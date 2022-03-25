import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';

import '../../style/global.scss';
import styles from './App.module.scss';
import { BreakpointProvider } from './BreakpointContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import FullStoryList from '../FullStoryList';
import NavBar from './NavBar';
import OperationalContent from '../OperationalContent';
import OperationalContentSelect from '../OperationalContent/OperationalContentSelect';

const App = () => {
  const { breakpoint, orientation } = useBreakpoint();
  // Name the application based on the package.json name
  React.useEffect(() => {
    if (process.env.BTC_GS_APP_NAME) {
      window.document.title = process.env.BTC_GS_APP_NAME;
    } else {
      window.document.title = 'GS Custom Application';
    }
  }, []);

  return (
    <BreakpointProvider value={{ breakpoint, orientation }}>
      {orientation === 'landscape' ? (
        <div className={styles.app}>
          <Switch>
            <Route component={FullStoryList} path="/fulllist/:type" />
            <>
              <NavBar />
              <Route component={Home} path="/" exact />
              <Route
                component={OperationalContentSelect}
                path="/operational-content"
                exact
              />
              <Route
                component={OperationalContent}
                path="/operational-content/:id"
                exact
              />
            </>
          </Switch>
        </div>
      ) : (
        <div className={styles['not-support']}>
          <h3>Portrait orientation not supported yet</h3>
        </div>
      )}
    </BreakpointProvider>
  );
};

export default App;
