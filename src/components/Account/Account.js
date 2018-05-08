import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Clipboard from 'react-clipboard.js';
import Big from 'bignumber.js';

import { workerProps, statsProps } from '../shared/propTypes';
import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import DepositModal from './DepositModal';
import SuccessfulTransactionModal from './SuccessfulTransactionModal';

import Content from '../shared/Content';

import { isBalanceSufficient, workerAddress } from '../../model/worker';

import styles from './Account.module.styl';

const TRANSACTIONS_DISABLED = true;

const Cell = ({ children, title }) => (
  <div className={styles.cell}>
    <div className={styles.subHeading}>{title}</div>
    {children}
  </div>
);

Cell.propTypes = {
  title: PropTypes.string.isRequired,
};

export default class Account extends Component {
  static propTypes = {
    router: PropTypes.shape({
      setRouteLeaveHook: PropTypes.func.isRequired,
    }).isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    setTransactions: PropTypes.func.isRequired,
    fetchWorkerGemsBalance: PropTypes.func.isRequired,
    depositGems: PropTypes.func.isRequired,
    withdrawPayments: PropTypes.func.isRequired,
    gemsBalance: PropTypes.number,
    stats: PropTypes.shape(statsProps).isRequired,
    worker: PropTypes.shape(workerProps),
    depositStage: PropTypes.number.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    worker: null,
    gemsBalance: null,
    transactions: null,
  };


  state = {
    loading: false,
    editEmail: false,
    showDepositModal: false,
    blockNavigation: false,
  }

  componentWillMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    if (this.props.transactions) {
      this.setState({ loading: false });
    }
    this.props.fetchWorkerGemsBalance();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.depositStage === this.props.depositStage) {
      return;
    }

    if (nextProps.depositStage > 0) {
      window.onbeforeunload = () => 'Please do not navigate away while your deposit is being processed (click cancel).';
      this.setState({ blockNavigation: true });
    } else {
      window.onbeforeunload = null;
      this.setState({ blockNavigation: false });
    }
  }

  getStakedGems = () => Big(this.props.stats.pending).multipliedBy(Big(0.1)).toNumber()

  getBalance = () => {
    const staked = this.getStakedGems();
    const balance = Big(this.props.worker.vaultBalance + this.props.worker.jobBalance);
    return balance.minus(staked).toNumber();
  }

  routerWillLeave = () => !this.state.blockNavigation

  withdraw = () => {
    this.setState({ loading: true });
    this.props.withdrawPayments()
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  }

  toggleEmailModal = () => {
    this.setState(({ editEmail }) => ({ editEmail: !editEmail }));
  }

  toggleDepositModal = () => {
    this.setState({ showDepositModal: !this.state.showDepositModal });
  }


  renderGems() {
    const balance = this.getBalance();
    if (this.state.loading) {
      return <div className={cn(styles.loading, styles.sm)} />;
    }
    const asterisk = balance < 500 ? '*' : '';
    return (
      <div className={styles.availableFunds}>
        <span>{balance} GEM{asterisk}</span>
      </div>
    );
  }

  render() {
    const { worker, transactions, gemsBalance } = this.props;
    if (worker === null) {
      return null;
    }
    const workerAddr = workerAddress(worker);
    const { editEmail, showDepositModal, loading } = this.state;
    return (
      <Content title="Account" >
        <div className={styles.innerContainer}>
          {showDepositModal && isBalanceSufficient(gemsBalance) &&
            <DepositModal
              toggleModal={this.toggleDepositModal}
              depositGems={this.props.depositGems}
              depositStage={this.props.depositStage}
            />
          }
          {editEmail &&
            <EmailSubmission
              worker={worker}
              toggleModal={this.toggleEmailModal}
            />
          }
          {transactions &&
            <SuccessfulTransactionModal
              transactions={transactions}
              setTransactions={this.props.setTransactions}
            />
          }
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
              <button
                className={cn(styles.defaultBtn, styles.editBtn)}
                onClick={this.toggleEmailModal}
              >
                Edit
              </button>
            </Cell>
            <Cell title="Reserved for Pending Tasks">
              <div className={styles.reserved}>
                {this.getStakedGems()} GEMS
              </div>
            </Cell>
            <div className={styles.cell}>
              {!TRANSACTIONS_DISABLED && isBalanceSufficient(gemsBalance) &&
                <button
                  className={styles.defaultBtn}
                  onClick={this.toggleDepositModal}
                >
                  Deposit
                </button>
              }
              {!TRANSACTIONS_DISABLED &&
                <button
                  className={cn(styles.defaultBtn, styles.disabled)}
                  onClick={() => this.withdraw()}
                  disabled={this.getBalance() < 500 || loading}
                >
                  {loading ? 'Withdrawing' : 'Withdraw'}
                  {this.renderGems()}
                </button>
              }
              <button
                className={cn(styles.defaultBtn, styles.loginBtn)}
                onClick={this.props.logout}
              >
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
