import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@gemsorg/components';
import { initSaga } from '@gemsorg/app-utils/app';

import AppPage from './components/Page/AppPage';

import Welcome from './components/Welcome/Welcome';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import Password from './components/Password/Password';
import Restore from './components/Password/Restore';

import Account from './components/Account/Account';
import Jobs from './components/Jobs/Jobs';
import Job from './components/Job/Job';

import Stats from './components/Stats/Stats';
import Requester from './components/Requester/Requester';
import Task from './components/Task/TaskPage';
import Confirm from './components/Confirm/Confirm';

import NotFound from './components/shared/pages/NotFound';
import MaintenanceMode from './components/shared/pages/MaintenanceMode';

import store from './reducers/store';
import services from './services/services';

import settings from './common/settings';

store.dispatch(initSaga());

const App = () => {
  if (settings.maintenanceMode) {
    return <MaintenanceMode />;
  }
  return (
    <ServiceProvider services={services}>
      <Provider store={store}>
        <BrowserRouter>
          <AppPage>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/password" component={Password} />
              <Route path="/restore" component={Restore} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/account" component={Account} />
              <Route path="/jobs" exact component={Jobs} />
              <Route path="/jobs/:jobId" component={Job} />
              <Route path="/tasks/:taskId" component={Task} />
              <Route path="/stats" component={Stats} />
              <Route path="/requester" component={Requester} />
              <Route component={NotFound} />
            </Switch>
          </AppPage>
        </BrowserRouter>
      </Provider>
    </ServiceProvider>
  );
};

export default hot(module)(App);
