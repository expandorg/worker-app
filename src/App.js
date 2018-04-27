import { hot } from 'react-hot-loader';
import React from 'react';

import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import store from './reducers/store';

import Page from './components/Page/PageContainer';

import Private from './components/shared/PrivateContainer';
import Funded from './components/shared/FundedContainer';

import Login from './components/Login/LoginContainer';
import Account from './components/Account/AccountContainer';
import Jobs from './components/Jobs/JobsContainer';
import Stats from './components/Stats/StatsContainer';
import Requester from './components/Requester/Requester';
import Task from './components/Task/TaskContainer';
import Confirm from './components/Confirm/ConfirmContainer';

import NotFound from './components/shared/pages/NotFoundContainer';
import MaintenanceMode from './components/shared/pages/MaintenanceMode';

import { initWeb3 } from './actions/action-creators';

const MAINTENANCE_MODE = false;

store.dispatch(initWeb3());


const App = () => {
  if (MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
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
          </Route>
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};

export default hot(module)(App);
