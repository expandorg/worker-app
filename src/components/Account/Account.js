import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Prompt } from 'react-router-dom';


import Clipboard from 'react-clipboard.js';

import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import DepositModal from './Deposit/DepositContainer';
import SuccessfulTransaction from './SuccessfulTransaction/Container';

import { RequestStates } from '../../common/app/requestUiState';

import Content from '../shared/Content';
import Cell from './Cell';

import { isBalanceSufficient, workerAddress, getStakedGems, getBalance } from '../../model/worker';
import { TRANSACTIONS_DISABLED } from '../../model/consts';

import { workerProps, statsProps, requestStateProps } from '../shared/propTypes';

import styles from './Account.module.styl';

export default class Account extends Component {
  static propTypes = {
    stats: PropTypes.shape(statsProps).isRequired,
    worker: PropTypes.shape(workerProps),

    depositStage: PropTypes.number.isRequired,
    gemsBalance: PropTypes.number,

    withdrawState: PropTypes.shape(requestStateProps).isRequired,

    logout: PropTypes.func.isRequired,
    withdrawPayments: PropTypes.func.isRequired,
    fetchWorkerGemsBalance: PropTypes.func.isRequired,
  };

  static defaultProps = {
    worker: null,
    gemsBalance: null,
  };


  state = {
    emailModal: false,
    depositModal: false,
  }

  componentDidMount() {
    this.props.fetchWorkerGemsBalance();
  }


  handleWidthdraw = () => {
    this.props.withdrawPayments();
  }

  toggleEmail = () => {
    this.setState(({ emailModal }) => ({ emailModal: !emailModal }));
  }

  toggleDeposit = () => {
    this.setState(({ depositModal }) => ({ depositModal: !depositModal }));
  }

  render() {
    const {
      worker, gemsBalance, stats, logout, withdrawState, depositStage,
    } = this.props;

    if (!worker) {
      return null;
    }

    const workerAddr = workerAddress(worker);
    const { emailModal, depositModal } = this.state;

    const staked = getStakedGems(stats.pending);
    const balance = getBalance(worker, staked);

    const loading = withdrawState.state === RequestStates.Fetching;
    return (
      <Content title="Account" >
        <Prompt
          when={depositStage > 0}
          message={() => 'Please do not navigate away while your deposit is being processed (click cancel).'}
        />
        <div className={styles.innerContainer}>
          {depositModal &&
            <DepositModal onClose={this.toggleDeposit} />
          }
          {emailModal &&
            <EmailSubmission worker={worker} onClose={this.toggleEmail} />
          }
          <SuccessfulTransaction />
          <div className={styles.table}>
            <span className={cn(styles.heading, styles.cell)}>
              Your Account
            </span>
            <Cell title="Account Address">
              <div className={styles.accountInput}>
                <div className={styles.accountInputContainer}>
                  <span className={styles.address} id="address">{workerAddr}</span>
                </div>
                <Clipboard className={styles.copyBtn} data-clipboard-text={workerAddr}>
                  Copy
                </Clipboard>
              </div>
            </Cell>
            <Cell title="Email Address">
              <div className={styles.emailInput}>
                <div className={styles.accountInputContainer}>
                  <span className={styles.address} id="address">
                    {worker.email || 'No email found'}
                  </span>
                </div>
              </div>
              <button className={styles.editBtn} onClick={this.toggleEmail}>
                Edit
              </button>
            </Cell>
            <Cell title="Reserved for Pending Tasks">
              <div className={styles.reserved}>
                {staked} GEMS
              </div>
            </Cell>
            <div className={styles.cell}>
              {!TRANSACTIONS_DISABLED &&
                <Fragment>
                  {isBalanceSufficient(gemsBalance) &&
                    <button className={styles.defaultBtn} onClick={this.toggleDeposit}>
                      Deposit
                    </button>
                  }
                  <button
                    onClick={this.handleWidthdraw}
                    className={cn(styles.defaultBtn, styles.disabled)}
                    disabled={balance < 500 || loading}
                  >
                    {loading ? 'Withdrawing' : 'Withdraw'}
                    {loading &&
                      <div className={cn(styles.loading, styles.sm)} />
                    }
                    {!loading &&
                      <div className={styles.availableFunds}>
                        <span>{balance} GEM{balance < 500 ? '*' : null}</span>
                      </div>
                    }
                  </button>
                </Fragment>
              }
              <button className={styles.logout} onClick={logout} >
                Log Out
              </button>
            </div>
            <div className={styles.cell}>
              {TRANSACTIONS_DISABLED
                ? '*Depositing and withrdrawing Gems is temporarily disabled while we update our system'
                : '*Due to high demand, we can only let you withdraw if you have over 500 GEM tokens'
              }
            </div>
          </div>
        </div>
      </Content>
    );
  }
}
