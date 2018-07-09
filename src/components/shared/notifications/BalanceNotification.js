import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { notificationProps } from '../../shared/propTypes';

import styles from './styles.module.styl';

export default class BalanceNotification extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps).isRequired,
    onClear: PropTypes.func.isRequired,
  };

  render() {
    const { notification, onClear } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          Your balance has been updated. New balance is&nbsp;
          <span className={styles.important}>{notification.data.balance}</span>&nbsp;Gems
        </div>
        <button className={styles.clear} onClick={onClear}>
          ✕
        </button>
      </div>
    );
  }
}
