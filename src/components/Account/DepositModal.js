import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from '../common/Modal';

import styles from './DepositModal.styles';

const MIN_DEPOSIT = 5;
const MAX_DEPOSIT = 1000;

export default class DepositModal extends PureComponent {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
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
        this.props.toggleModal();
      });
  }

  renderLoading() {
    switch (this.props.depositStage) {
      case 1:
        return (
          <div className={styles.loading}>
            Approving transaction, step 1 of 2<br />
            This may take some time,<br />
            PLEASE DO NOT NAVIGATE AWAY<br />
            Depositing {this.state.value} Gems<br />
            <img
              className={styles.spinner}
              alt="loading..."
              src="../images/loading-animation.gif"
              width="100"
              height="100"
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.loading}>
            Processing deposit, step 2 of 2<br />
            This may take some time,<br />
            PLEASE DO NOT NAVIGATE AWAY<br />
            Depositing {this.state.value} Gems<br />
            <img
              className={styles.spinner}
              alt="loading..."
              src="../images/loading-animation.gif"
              width="100"
              height="100"
            />
          </div>
        );
      default:
        return '';
    }
  }

  renderForm() {
    return (
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="deposit">
          <input
            className={styles.input}
            type="number"
            id="deposit"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Amount of Gems to deposit"
          />
        </label>
        <button
          type="submit"
          className={styles.submit}
          disabled={this.state.value < MIN_DEPOSIT}
        >
          Deposit
        </button>
      </form>
    );
  }

  render() {
    return (
      <Modal
        heading={<span>Deposit Gems</span>}
        toggleModal={this.props.toggleModal}
      >
        <div className={styles.container}>
          <span className={styles.description}>
            In order to submit tasks you will first need to deposit at least 5 Gems
            (and at most 1000 Gems).<br />
            You will not lose these Gems even if your tasks are not accepted,
            and you can withdraw them again once your total balance is at least 500 Gems.
          </span>
          {this.props.depositStage > 0 && this.renderLoading()}
          {this.props.depositStage === 0 && this.renderForm()}
        </div>
      </Modal>
    );
  }
}
