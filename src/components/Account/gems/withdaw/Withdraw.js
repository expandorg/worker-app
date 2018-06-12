import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../../hoc/withSubmitState';

import { RequestStates } from '../../../../common/app/requestUiState';
import { withdrawPayments } from '../../../../sagas/gemsSagas';
import { userProps, requestStateProps } from '../../../shared/propTypes';

import AvailableFunds from './AvailableFunds';
import WithdrawSuccessDialog from './WithdrawSuccessDialog';

import { gemBalanceSelector } from '../../../../selectors/userSelectors';
import { withdrawStateSelector } from '../../../../selectors/uiStateSelectors';
import { userBalance } from '../../../../model/balance';

import styles from './Withdraw.module.styl';

const mapStateToProps = state => ({
  gemsBalance: gemBalanceSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ withdrawPayments }, dispatch);

class Withdraw extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    withdrawPayments: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const { submitState, onSubmit, user } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() => this.props.withdrawPayments(user));
    }
  }

  render() {
    const { user, submitState, onResetSubmit } = this.props;

    const isFetching = submitState.state === RequestStates.Fetching;

    const balance = userBalance.get(user);
    const disabled = !userBalance.canWithdraw(user);

    return (
      <Fragment>
        <button onClick={this.handleClick} className={styles.withdraw} disabled={disabled}>
          {isFetching ? 'Withdrawing' : 'Withdraw '}
          {!isFetching && <AvailableFunds balance={balance} />}
        </button>
        {submitState.state === RequestStates.Fetched &&
          <WithdrawSuccessDialog
            transactions={submitState.payload.result.tx}
            onHide={onResetSubmit}
          />
        }
      </Fragment>
    );
  }
}

export default withSubmitState(withdrawStateSelector)(
  connect(mapStateToProps, mapDispatchToProps)(Withdraw),
);
