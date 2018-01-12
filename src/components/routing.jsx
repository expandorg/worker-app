import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import { LOGIN_PAGE } from '../constants';
import AppWrapper from '../containers/app-wrapper';
import createPageLoader from './create-page-loader';

export default function Routing({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={AppWrapper}>
        <Route path="login" component={createPageLoader(LOGIN_PAGE)} />
      </Route>
    </Router>
  );
}

Routing.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
