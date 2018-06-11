import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates, initialState as initialRequestState } from '../../../../common/app/requestUiState';
import { withdrawPayments } from '../../../../sagas/gemsSagas';
import { userProps, requestStateProps } from '../../../shared/propTypes';

import AvailableFunds from './AvailableFunds';
import WithdrawSuccessDialog from './WithdrawSuccessDialog';

import { gemBalanceSelector } from '../../../../selectors/userSelectors';
import { withdrawStateSelector } from '../../../../selectors/uiStateSelectors';
import { userBalance, WITHDRAW_MIN } from '../../../../model/balance';

import styles from './Withdraw.module.styl';

const mapStateToProps = state => ({
  gemsBalance: gemBalanceSelector(state),
  submitState: withdrawStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ withdrawPayments }, dispatch);

class Withdraw extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    withdrawPayments: PropTypes.func.isRequired,
  }

  state = {
    submitState: initialRequestState,
    submitted: false,
  }

  componentWillReceiveProps({ submitState }) {
    if (this.state.submitted) {
      this.setState({ submitState });
    }
  }

  handleClick = () => {
    if (this.state.submitState.state !== RequestStates.Fetching) {
      this.setState({ submitted: true }, () => this.props.withdrawPayments(this.props.user));
    }
  }

  handleHide = () => {
    this.setState({ submitState: initialRequestState });
  }

  render() {
    const { user } = this.props;
    const { submitState } = this.state;

    const isFetching = submitState.state === RequestStates.Fetching;

    const balance = userBalance.get(user);
    const disabled = balance < WITHDRAW_MIN;

    return (
      <Fragment>
        <button onClick={this.handleClick} className={styles.withdraw} disabled={disabled}>
          {isFetching ? 'Withdrawing' : 'Withdraw'}
          {!isFetching && <AvailableFunds balance={balance} />}
        </button>
        {submitState.state === RequestStates.Fetched &&
          <WithdrawSuccessDialog
            transactions={submitState.payload.result.tx}
            onHide={this.handleHide}
          />
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
