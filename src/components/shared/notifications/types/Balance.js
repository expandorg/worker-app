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
    return (
      <div className={styles.content}>
        Your {params.source} has succeeded. Your new balance is&nbsp;
        <span className={styles.important}>{data.user.gems.balance}</span>&nbsp;Gems
      </div>
    );
  }
}
