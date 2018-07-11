import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

export default class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { transactions } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          Congrats! Your transaction is sent. Save the following transaction ids for your records:
        </div>
        <div className={styles.description}>
          Please wait while we confirm the transaction and update your account.
          This may take a few minutes
        </div>
        <div className={styles.list}>
          {transactions.map(tx => <Transaction key={tx} tx={tx} />)}
        </div>
      </div>
    );
  }
}
