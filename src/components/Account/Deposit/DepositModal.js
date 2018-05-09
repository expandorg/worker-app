import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';

import Loading from './Loading';

import styles from './DepositModal.module.styl';

const MIN_DEPOSIT = 5;
const MAX_DEPOSIT = 1000;

export default class DepositModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    depositGems: PropTypes.func.isRequired,
    depositStage: PropTypes.number.isRequired,
  }

  state = {
    value: '',
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value < MIN_DEPOSIT || this.state.value > MAX_DEPOSIT) {
      return;
    }
    const value = parseFloat(this.state.value);
    this.props.depositGems(value)
      .then(() => {
        this.props.onClose();
      });
  }

  render() {
    const { depositStage, onClose } = this.props;
    const { value } = this.state;
    return (
      <Modal heading="Deposit Gems" onClose={onClose} >
        <div className={styles.container}>
          <span className={styles.description}>
            In order to submit tasks you will first need to deposit at least 5 Gems
            (and at most 1000 Gems).<br />
            You will not lose these Gems even if your tasks are not accepted,
            and you can withdraw them again once your total balance is at least 500 Gems.
          </span>
          {depositStage === 0 &&
            <form className={styles.form} onSubmit={this.handleSubmit} >
              <label htmlFor="deposit">
                <input
                  className={styles.input}
                  type="number"
                  value={value}
                  onChange={this.handleChange}
                  placeholder="Amount of Gems to deposit"
                />
              </label>
              <button
                type="submit"
                className={styles.submit}
                disabled={value < MIN_DEPOSIT}
              >
                Deposit
              </button>
            </form>
          }
          {depositStage > 0 &&
            <Loading value={value} depositStage={depositStage} />
          }
        </div>
      </Modal>
    );
  }
}
