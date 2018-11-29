import React from 'react';
import { Redirect } from 'react-router-dom';

import { authContainer } from '@gemsorg/app-auth';
import { RequestStates } from '@gemsorg/app-utils';

const notAuthenticatedPredicat = ({ user }) => {
  if (user) {
    return <Redirect to="/jobs" />;
  }
  return true;
};

export const notAuthenticated = authContainer(notAuthenticatedPredicat);

const authenticatedPredicat = ({ user, authState }) => {
  if (!user) {
    if (
      authState.state === RequestStates.FetchError ||
      authState.state === RequestStates.Fetched
    ) {
      return <Redirect to="/" />;
    }
    return null; // loading state
  }
  return true;
};

export const authenticated = authContainer(authenticatedPredicat);
