import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../../common/ErrorMessage';

import AmountWarning from '../AmountWarning';

import { RequestStates } from '../../../../common/app/requestUiState';
import { requestStateProps, userProps } from '../../../shared/propTypes';

import { userBalance } from '../../../../model/balance';

import styles from './WithdrawForm.module.styl';

export default class WithdrawForm extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onWithdraw: PropTypes.func.isRequired,
  }

  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      value: `${userBalance.get(props.user)}`,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { submitState, onWithdraw, user } = this.props;
    const amount = +this.state.value;

    if (submitState.state !== RequestStates.Fetching && userBalance.canWithdraw(user, amount)) {
      onWithdraw(amount);
    }
  }

  render() {
    const { submitState, user } = this.props;
    const { value } = this.state;

    const disabled = !userBalance.canWithdraw(user, +value);
    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit} >
          <div className={styles.row}>
            <input
              className={styles.input}
              type="number"
              value={value}
              onChange={this.handleChange}
              placeholder="Amount of Gems to withdraw"
            />
            <button type="submit" className={styles.submit} disabled={disabled}>
              {isFetching ? 'Withdrawing' : 'Withdraw'}
            </button>
          </div>
          <ErrorMessage error={submitState.error} className={styles.error} />
          <div className={styles.description}>
            <AmountWarning />
          </div>
        </form>
      </div>
    );
  }
}
