import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import { connect } from 'react-redux';

import { userSelector, statsSelector } from '../../selectors/userSelectors';
import { authStateSelector } from '../../selectors/uiStateSelectors';

import { requestStateProps, userProps, statsProps } from '../shared/propTypes';

const mapStateToProps = state => ({
  user: userSelector(state),
  stats: statsSelector(state),
  authState: authStateSelector(state),
});

export default function authContainer(authCallback) {
  return (Wrapped) => {
    class AuthWrapper extends Component {
      static propTypes = {
        user: PropTypes.shape(userProps),
        stats: PropTypes.shape(statsProps).isRequired,
        authState: PropTypes.shape(requestStateProps).isRequired,
      }

      static defaultProps = {
        user: null,
      }

      render() {
        const { user, stats, ...rest } = this.props;
        const checkResult = authCallback(this.props);
        if (checkResult !== true) {
          return checkResult;
        }
        return <Wrapped {...rest} />;
      }
    }
    return connect(mapStateToProps)(hoistStatics(AuthWrapper, Wrapped));
  };
}
