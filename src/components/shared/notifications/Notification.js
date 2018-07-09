import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BalanceNotification from './BalanceNotification';

import { notificationProps } from '../../shared/propTypes';

export default class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps),
    onClear: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notification: null,
  }

  render() {
    const { notification } = this.props;
    if (!notification) {
      return null;
    }
    switch (notification.type) {
      case 'balance':
        return <BalanceNotification {...this.props} />;
      default:
        break;
    }
    return null;
  }
}
