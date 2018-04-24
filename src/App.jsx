import { hot } from 'react-hot-loader';
import React from 'react';

import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './reducers/store';

import App from './containers/App';
import Private from './containers/Private';
import Funded from './containers/Funded';
import Login from './containers/Login';
import Jobs from './containers/Jobs';
import Account from './containers/Account';
import Stats from './containers/Stats';
import Requester from './containers/Requester';
import Task from './containers/Task';
import Confirm from './containers/Confirm';
import NotFound from './containers/NotFound';
import MaintenanceMode from './components/MaintenanceMode';

const MAINTENANCE_MODE = false;

const history = syncHistoryWithStore(browserHistory, store);

const GemsApp = () => {
  if (MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <Route path="login" component={Login} />
          <Route component={Private}>
            <Route path="account" component={Account} />
            <Route path="confirm" component={Confirm} />
            <Route path="jobs" component={Jobs} />
            <Route path="stats" component={Stats} />
            <Route path="requester" component={Requester} />
            <Route component={Funded}>
              <Route path="task" component={Task} />
            </Route>
            <Route path="*" component={NotFound} />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default hot(module)(GemsApp);
