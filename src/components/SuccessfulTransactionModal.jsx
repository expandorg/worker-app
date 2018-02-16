import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Clipboard from 'react-clipboard.js';
import Modal from './Modal';
import { BORDER_R, PADDING } from '../style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '3%',
    display: 'block',
  }),
  inputContainer: css({
    display: 'inline-block',
    width: 'calc(100% - 62px)',
    verticalAlign: 'middle',
  }),
  copyBtn: css({
    display: 'inline-block',
    fontSize: 13,
    textAlign: 'right',
    color: '#3a506b',
    textTransform: 'uppercase',
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: PADDING,
    padding: 0,
    cursor: 'pointer',
  }),
  input: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
    width: 'calc(100% - 205px)',
    minWidth: '200px',
    ':focus': {
      outline: 0,
    },
  }),
  value: css({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
};

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
