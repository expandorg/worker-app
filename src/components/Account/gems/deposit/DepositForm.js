import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router-dom';

import ErrorMessage from '../../../common/ErrorMessage';
import { RequestStates } from '../../../../common/app/requestUiState';
import { requestStateProps } from '../../../shared/propTypes';

import Loading from './Loading';
import Description from './Description';

import { userBalance } from '../../../../model/balance';

import styles from './DepositForm.module.styl';


const message = () =>
  'Please do not navigate away while your deposit is being processed (click cancel).';

export default class DepositForm extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
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
    const { submitState, onDeposit } = this.props;
    const amount = parseFloat(this.state.value);

    if (submitState.state !== RequestStates.Fetching && userBalance.canDeposit(amount)) {
      onDeposit(amount);
    }
  }

  render() {
    const { stage, submitState } = this.props;
    const { value } = this.state;

    const disabled = !userBalance.canDeposit(value);
    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <Description />
        {!isFetching &&
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
