import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router-dom';

import { Button, Input, ErrorMessage } from '@expandorg/components';
import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import { userBalance, DEPOSIT_MIN } from '@expandorg/app-gemtokens';

import Loading from './Loading';
import Description from './Description';

import styles from './DepositForm.module.styl';

const message = () =>
  'Please do not navigate away while your deposit is being processed (click cancel).';

export default class DepositForm extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    fetchState: requestStateProps.isRequired,
    gemsBalance: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired,
    onDeposit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { submitState, onDeposit, gemsBalance } = this.props;
    const amount = +this.state.value;

    if (
      submitState.state !== RequestStates.Fetching &&
      userBalance.canDeposit(amount, gemsBalance)
    ) {
      onDeposit(amount);
    }
  };

  render() {
    const { stage, submitState, fetchState, gemsBalance } = this.props;
    const { value } = this.state;

    const available = gemsBalance >= DEPOSIT_MIN;
    const disabled = !userBalance.canDeposit(+value, gemsBalance);
    const isSubmitting = submitState.state === RequestStates.Fetching;

    const isFetching =
      fetchState.state === RequestStates.Fetching ||
      fetchState.state === RequestStates.NotFetched;
    return (
      <div className={styles.container}>
        <Description gemsBalance={gemsBalance} isFetching={isFetching} />
        {!isSubmitting && available && (
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.row}>
              <Input
                className={styles.input}
                type="number"
                value={value}
                onChange={this.handleChange}
                placeholder="Amount of XPN to deposit"
              />
              <Button
                size="large"
                type="submit"
                className={styles.submit}
                disabled={disabled}
              >
                Deposit
              </Button>
            </div>
            <ErrorMessage error={submitState.error} className={styles.error} />
          </form>
        )}
        {isSubmitting && <Loading value={value} stage={stage} />}
        <Prompt when={isSubmitting} message={message} />
      </div>
    );
  }
}
