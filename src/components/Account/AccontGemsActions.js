import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Prompt } from 'react-router-dom';

import SuccessfulTransaction from './SuccessfulTransaction/SuccessfulTransaction';
import DepositModal from './Deposit/DepositContainer';

import { RequestStates } from '../../common/app/requestUiState';
import { fetchGemsBalance, withdrawPayments } from '../../sagas/gemsSagas';
import { userProps, requestStateProps } from '../shared/propTypes';

import { gemBalanceSelector } from '../../selectors/userSelectors';
import { depositStageSelector, withdrawStateSelector } from '../../selectors/uiStateSelectors';

import { isBalanceSufficient, getBalance } from '../../model/worker';

import styles from './AccontGemsActions.module.styl';

const mapStateToProps = state => ({
  gemsBalance: gemBalanceSelector(state),
  depositStage: depositStageSelector(state),
  withdrawState: withdrawStateSelector(state),
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance, withdrawPayments }, dispatch);

class AccontGemsActions extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,

    depositStage: PropTypes.number.isRequired,
    gemsBalance: PropTypes.number,

    withdrawState: PropTypes.shape(requestStateProps).isRequired,
    withdrawPayments: PropTypes.func.isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gemsBalance: 0,
  }

  state = {
    deposit: false,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.address && user.address.Valid) {
      this.props.fetchGemsBalance(user);
    }
  }

  handleWidthdraw = () => {
    this.props.withdrawPayments();
  }

  toggleDeposit = () => {
    this.setState(({ deposit }) => ({ deposit: !deposit }));
  }

  render() {
    const {
      user, withdrawState, gemsBalance, depositStage,
    } = this.props;
    const { deposit } = this.state;

    const balance = getBalance(user);
    const loading = withdrawState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <Prompt
          when={depositStage > 0}
          message={() => 'Please do not navigate away while your deposit is being processed (click cancel).'}
        />
        {isBalanceSufficient(gemsBalance) &&
          <button className={styles.deposit} onClick={this.handleToggle}>
            Deposit
          </button>
        }
        <button
          onClick={this.handleWidthdraw}
          className={styles.withdraw}
          disabled={balance < 500 || loading}
        >
          {loading ? 'Withdrawing' : 'Withdraw'}
          {loading &&
            <div className={styles.loading} />
          }
          {!loading &&
            <span className={styles.availableFunds}>
              {balance} GEM{balance < 500 ? '*' : null}
            </span>
          }
        </button>
        {deposit &&
          <DepositModal onClose={this.toggleDeposit} />
        }
        <SuccessfulTransaction />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccontGemsActions);
