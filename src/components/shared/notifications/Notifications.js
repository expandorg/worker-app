import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ToastAnimated } from '@gemsorg/components';

import Notification from './Notification';

import { clearNotification } from '../../../sagas/notificationsSagas';
import { notificationSelector } from '../../../selectors/uiStateSelectors';

import { notificationProps } from '../propTypes';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearNotification }, dispatch);

class Notifications extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps),
    clearNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notification: null,
  };

  render() {
    const { notification } = this.props;
    return (
      <ToastAnimated visible={!!notification}>
        <Notification
          notification={notification}
          onClear={this.props.clearNotification}
        />
      </ToastAnimated>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
