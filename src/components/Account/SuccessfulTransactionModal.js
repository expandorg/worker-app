import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';
import Modal from '../common/Modal';

import styles from './SuccessfulTransactionModal.styles';


function etherScanUrl(tx) {
  return `https://etherscan.io/tx/${tx}`;
}

class SuccessfulTransactionModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isModalOpen: true,
    };
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    this.props.setTransactions(null);
  }

  renderTxs() {
    return this.props.transactions.map(tx => (
      <div key={tx}>
        <div className={styles.input}>
          <div className={styles.inputContainer}>
            <span className={styles.value} id="input">{tx}</span>
          </div>
          <Clipboard
            className={styles.copyBtn.toString()}
            data-clipboard-text={tx}
          >
            Copy
          </Clipboard>
        </div>
        <br />
        <br />
        <a
          href={etherScanUrl(tx)}
          target="_blank"
        >
          Follow transaction on Etherscan
        </a>
      </div>
    ));
  }

  render() {
    if (this.state.isModalOpen) {
      return (
        <Modal
          toggleModal={this.toggleModal}
          heading={(
            <div>
              <span>Transaction sent</span>
            </div>
          )}
        >
          <div className={styles.container}>
            <span className={styles.description}>
              Congrats! Your transaction is sent.
              Save the following transaction ids for your records:
            </span>
            {this.renderTxs()}
          </div>
        </Modal>
      );
    }
    return false;
  }
}

SuccessfulTransactionModal.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTransactions: PropTypes.func.isRequired,
};

export default SuccessfulTransactionModal;
