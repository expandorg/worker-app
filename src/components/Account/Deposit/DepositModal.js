import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogHeadline } from '../../common/Dialog';

import { RequestStates } from '../../../common/app/requestUiState';
import { requestStateProps } from '../../shared/propTypes';

import Loading from './Loading';

import styles from './DepositModal.module.styl';

const MIN_DEPOSIT = 5;
const MAX_DEPOSIT = 1000;

export default class DepositModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    depositGemsState: PropTypes.shape(requestStateProps).isRequired,
    depositGems: PropTypes.func.isRequired,
    depositStage: PropTypes.number.isRequired,
  }

  state = {
    value: '',
  }

  componentWillReceiveProps({ depositGemsState: depositState }) {
    const { depositGemsState, onClose } = this.props;
    if (depositGemsState.state !== RequestStates.Fetched &&
      depositState.state === RequestStates.Fetched) {
      onClose();
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(this.state.value);
    if (value < MIN_DEPOSIT || value > MAX_DEPOSIT) {
      return;
    }
    this.props.depositGems(value);
  }

  render() {
    const { depositStage, depositGemsState, onClose } = this.props;
    const { value } = this.state;
    return (
      <Dialog contentLabel="deposit" onHide={onClose} >
        <DialogHeadline>
          Deposit Gems
        </DialogHeadline>
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
          {depositGemsState.state === RequestStates.Fetching &&
            <Loading value={value} depositStage={depositStage} />
          }
        </div>
      </Dialog>
    );
  }
}
