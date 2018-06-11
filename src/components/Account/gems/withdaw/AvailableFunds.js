import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WITHDRAW_MIN } from '../../../../model/balance';

import styles from './AvailableFunds.module.styl';

export default class AvailableFunds extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
  }
  render() {
    const { balance } = this.props;

    return (
      <span className={styles.availableFunds}>
        {balance} GEM{balance < WITHDRAW_MIN && '*'}
      </span>
    );
  }
}
