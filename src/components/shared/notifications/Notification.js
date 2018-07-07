import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { notificationProps } from '../../shared/propTypes';


export default class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps),
  };

  static defaultProps = {
    notification: null,
  }

  render() {
    const { notification } = this.props;
    if (!notification) {
      return null;
    }
    return (
      <div>
        {notification.text}
      </div>
    );
  }
}
