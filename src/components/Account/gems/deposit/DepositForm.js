import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router-dom';

import ErrorMessage from '../../../common/ErrorMessage';
import { RequestStates } from '../../../../common/app/requestUiState';
import { requestStateProps } from '../../../shared/propTypes';

import Loading from './Loading';
import Description from './Description';

import { userBalance, DEPOSIT_MIN } from '../../../../model/balance';

import styles from './DepositForm.module.styl';


const message = () =>
  'Please do not navigate away while your deposit is being processed (click cancel).';

export default class DepositForm extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    gemsBalance: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired,
    onDeposit: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  }

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { submitState, onDeposit, gemsBalance } = this.props;
    const amount = +this.state.value;

    if (submitState.state !== RequestStates.Fetching &&
        userBalance.canDeposit(amount, gemsBalance)) {
      onDeposit(amount);
    }
  }

  render() {
    const { stage, submitState, gemsBalance } = this.props;
    const { value } = this.state;

    const available = gemsBalance >= DEPOSIT_MIN;
    const disabled = !userBalance.canDeposit(+value, gemsBalance);
    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <Description gemsBalance={gemsBalance} />
        {!isFetching && available &&
          <form className={styles.form} onSubmit={this.handleSubmit} >
            <div className={styles.row}>
              <input
                className={styles.input}
                type="number"
                value={value}
                onChange={this.handleChange}
                placeholder="Amount of Gems to deposit"
              />
              <button type="submit" className={styles.submit} disabled={disabled}>
                Deposit
              </button>
            </div>
            <ErrorMessage error={submitState.error} className={styles.error} />
          </form>
        }
        {isFetching &&
          <Loading value={value} stage={stage} />
        }
        <Prompt when={isFetching} message={message} />
      </div>
    );
  }
}
