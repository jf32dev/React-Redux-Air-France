import * as React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './components/App';
import { StoreProvider, store } from './stores';
import { hashHistory } from './history';

const syncHistory = syncHistoryWithStore(hashHistory, store.route);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <Router history={syncHistory}>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
