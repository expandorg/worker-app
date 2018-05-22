import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppPage from './components/Page/AppPage';

import Welcome from './components/Welcome/Welcome';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import Account from './components/Account/AccountContainer';
import Jobs from './components/Jobs/Jobs';

import Stats from './components/Stats/StatsContainer';
import Requester from './components/Requester/Requester';
import Task from './components/Task/TaskContainer';
import Confirm from './components/Confirm/ConfirmContainer';

import NotFound from './components/shared/pages/NotFoundContainer';
import MaintenanceMode from './components/shared/pages/MaintenanceMode';

import store from './reducers/store';

import { init } from './sagas/appSagas';

import { MAINTENANCE_MODE } from './model/consts';

store.dispatch(init());

const App = () => {
  if (MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppPage>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/account" component={Account} />
            <Route path="/confirm" component={Confirm} />≥≥
            <Route path="/jobs" component={Jobs} />
            <Route path="/stats" component={Stats} />
            <Route path="/requester" component={Requester} />
            <Route path="/task" component={Task} />

            <Route component={NotFound} />
          </Switch>
        </AppPage>
      </BrowserRouter>
    </Provider>
  );
};

export default hot(module)(App);
