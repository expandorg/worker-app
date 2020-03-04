import React from 'react';
import { Redirect } from 'react-router-dom';

import { authContainer } from '@expandorg/app-auth';
import { RequestStates } from '@expandorg/app-utils';

const notAuthenticatedPredicat = ({ user }) => {
  if (user) {
    return <Redirect to="/" />;
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
      return <Redirect to="/login" />;
    }
    return null; // loading state
  }
  return true;
};

export const authenticated = authContainer(authenticatedPredicat);
