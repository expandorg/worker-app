import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import App from './containers/App';
import Private from './containers/Private';
import Login from './containers/Login';
import Jobs from './containers/Jobs';
import Account from './containers/Account';
import Task from './containers/Task';
import NotFound from './containers/NotFound';
import GCPTask from './components/GCP-Task';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize react-router-redux.
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route component={Private}>
              <Route path="task" component={Task} />
              <Route path="jobs" component={Jobs} />
              <Route path="account" component={Account} />
              <Router path="gcp-task" component={GCPTask} />

              <Route path="*" component={NotFound} />
            </Route>
          </Route>
        </Router>
      </Provider>
    ),
    document.getElementById('root'),
  );
});
