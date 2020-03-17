import { hot } from 'react-hot-loader/root';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@expandorg/components';
import { initSaga } from '@expandorg/app-utils/app';

import { NotFound } from '@expandorg/components/app';

import AppContainer from './components/shared/AppContainer';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import Jobs from './components/Jobs/Jobs';
import Onboarding from './components/Onboarding/Onboarding';
import JobPreview from './components/JobPreview/JobPreview';

import Task from './components/Task/Task';

import Account from './components/Account/Account';
import Profile from './components/Profile/Profile';

import ResetPassword from './components/Password/ResetPassword';
import RestorePassword from './components/Password/RestorePassword';
import EmailConfirm from './components/Email/EmailConfirm';

import store from './reducers/store';
import services from './services';

store.dispatch(initSaga());

function App() {
  return (
    <ServiceProvider services={services}>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer>
            <Switch>
              <Route path="/" exact component={Jobs} />

              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />

              <Route path="/jobs/:jobId" component={JobPreview} />
              <Route path="/onboarding/:jobId" component={Onboarding} />
              <Route path="/tasks/:taskId" component={Task} />

              <Route path="/account" component={Account} />
              <Route path="/profile" component={Profile} />

              <Route path="/password" component={ResetPassword} />
              <Route path="/restore" component={RestorePassword} />
              <Route path="/confirm" component={EmailConfirm} />

              <Route component={NotFound} />
            </Switch>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    </ServiceProvider>
  );
}

export default hot(App);
