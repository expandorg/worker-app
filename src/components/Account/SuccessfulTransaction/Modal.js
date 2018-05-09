import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';
import Transaction from './Transaction';

import styles from './Modal.module.styl';


export default class SuccessfulTransactionModal extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTransactions: PropTypes.func.isRequired,
  }

  handleClose = () => {
    this.props.setTransactions(null);
  }

  render() {
    const { transactions } = this.props;
    if (!transactions) {
      return null;
    }
    return (
      <Modal heading="Transaction sent" onClose={this.handleClose}>
        <div className={styles.container}>
          <span className={styles.description}>
            Congrats! Your transaction is sent.
            Save the following transaction ids for your records:
          </span>
          {transactions.map(tx => <Transaction key={tx} tx={tx} />)}
        </div>
      </Modal>
    );
  }
}
