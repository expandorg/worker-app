import React from 'react';
import { Redirect } from 'react-router-dom';

import { RequestStates } from '../../common/app/requestUiState';

import authContainer from './authContainer';

const notAuthenticatedPredicat = ({ user, isFunded }) => {
  if (user) {
    if (isFunded) {
      return <Redirect to="/jobs" />;
    }
    return <Redirect to="/account" />;
  }
  return true;
};

export const notAuthenticated = authContainer(notAuthenticatedPredicat);

const authenticatedPredicat = ({ user, authState }) => {
  if (!user) {
    if (authState.state === RequestStates.FetchError || authState.state === RequestStates.Fetched) {
      return <Redirect to="/" />;
    }
    return null; // loading state
  }
  return true;
};

export const authenticated = authContainer(authenticatedPredicat);
