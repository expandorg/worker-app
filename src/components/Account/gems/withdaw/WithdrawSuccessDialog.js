import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogHeadline } from '../../../common/Dialog';

import Transactions from '../../transactions/Transactions';

export default class WithdrawSuccessDialog extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render() {
    const { transactions, onHide } = this.props;

    return (
      <Dialog contentLabel="withdaw" visible onHide={onHide} >
        <DialogHeadline>
          Transactions
        </DialogHeadline>
        <Transactions transactions={transactions} />
      </Dialog>
    );
  }
}
