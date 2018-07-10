import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { notificationPayloadProps } from '../../../shared/propTypes';

import styles from './styles.module.styl';

export default class Balance extends Component {
  static propTypes = {
    payload: PropTypes.shape(notificationPayloadProps).isRequired,
  };

  render() {
    const { data, params } = this.props.payload;
    const op = params.source === 'withdraw' ? 'withdrawal' : 'deposit';
    return (
      <div className={styles.content}>
        Your {op} has succeeded. Your new balance is&nbsp;
        <span className={styles.important}>{data.balance}</span>&nbsp;Gems
      </div>
    );
  }
}
