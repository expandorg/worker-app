import React, { Component } from 'react';

import { notificationPayloadProps } from '../../propTypes';

import styles from './styles.module.styl';

export default class TxFailed extends Component {
  static propTypes = {
    payload: notificationPayloadProps.isRequired,
  };

  render() {
    const { params } = this.props.payload;
    const op = params.source === 'withdraw' ? 'withdrawal' : 'deposit';
    return <div className={styles.content}>Your {op} has failed.</div>;
  }
}
