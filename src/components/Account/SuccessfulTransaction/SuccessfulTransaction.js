import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, { DialogHeadline } from '../../common/Dialog';
import Transaction from './Transaction';

import { setTransactions } from '../../../sagas/gemsSagas';
import { transactionsSelector } from '../../../selectors/userSelectors';

import styles from './SuccessfulTransaction.module.styl';

const mapStateToProps = state => ({
  transactions: transactionsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setTransactions }, dispatch);


class SuccessfulTransaction extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.string),
    setTransactions: PropTypes.func.isRequired,
  }

  static defaultProps = {
    transactions: null,
  }

  handleHide = () => {
    this.props.setTransactions(null);
  }

  render() {
    const { transactions } = this.props;
    if (!transactions) {
      return null;
    }
    return (
      <Dialog contentLabel="ASD" visible onHide={this.handleHide}>
        <DialogHeadline>
          Transaction sent
        </DialogHeadline>
        <div className={styles.container}>
          <span className={styles.description}>
            Congrats! Your transaction is sent.
            Save the following transaction ids for your records:
          </span>
          {transactions.map(tx => <Transaction key={tx} tx={tx} />)}
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessfulTransaction);
