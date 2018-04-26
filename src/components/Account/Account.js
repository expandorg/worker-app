import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Clipboard from 'react-clipboard.js';
import Big from 'bignumber.js';
import { worker as workerProps, stats as statsProps } from '../shared/propTypes';

import DepositModal from './DepositModal';
import SuccessfulTransactionModal from './SuccessfulTransactionModal';
import EmailSubmission from '../EmailSubmission';

import Content from '../shared/Content';


import styles from './Account.styles';

const TRANSACTIONS_DISABLED = true;

function renderMessage() {
  if (TRANSACTIONS_DISABLED) {
    return '*Depositing and withrdrawing Gems is temporarily disabled while we update our system';
  }
  return '*Due to high demand, we can only let you withdraw if you have over 500 GEM tokens';
}

class Account extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: false,
      editEmail: false,
      showDepositModal: false,
      hasGems: false,
      blockNavigation: false,
    };
  }

  componentWillMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    if (this.props.transactions) {
      this.setState({ loading: false });
    }
    this.setState({ hasGems: false });
    this.props.setGemsBalance(null);
    this.props.fetchWorkerGemsBalance()
      .then(() => {
        if (this.props.gemsBalance >= 5) {
          this.setState({ hasGems: true });
        }
      });
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

  getStakedGems() {
    return Big(this.props.stats.pending).multipliedBy(Big(0.1)).toNumber();
  }

  getBalance() {
    const staked = this.getStakedGems();
    const balance = Big(this.props.worker.vaultBalance + this.props.worker.jobBalance);
    return balance.minus(staked).toNumber();
  }

  routerWillLeave() {
    return !this.state.blockNavigation;
  }

  workerAddress() {
    return `0x${this.props.worker.id}`;
  }

  withdraw() {
    this.setState({ loading: true });
    this.props.withdrawPayments()
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  }

  toggleEmailModal() {
    const currentState = this.state.editEmail;
    this.setState({ editEmail: !currentState });
  }

  toggleDepositModal() {
    this.setState({ showDepositModal: !this.state.showDepositModal });
  }

  renderDepositModal() {
    if (!this.state.showDepositModal || !this.state.hasGems) {
      return '';
    }
    return (
      <DepositModal
        toggleModal={this.toggleDepositModal}
        depositGems={this.props.depositGems}
        depositStage={this.props.depositStage}
      />
    );
  }

  renderEmail() {
    const { worker } = this.props;
    const { email } = worker;
    if (email) {
      return (
        <div className={styles.accountInputContainer}>
          <span className={styles.address} id="address">{email}</span>
        </div>
      );
    }
    return (
      <div className={styles.accountInputContainer}>
        <span className={styles.address} id="address">No email found</span>
      </div>
    );
  }

  renderEmailEdit() {
    if (this.state.editEmail) {
      return (
        <EmailSubmission
          worker={this.props.worker}
          toggleModal={this.toggleEmailModal}
        />
      );
    }
    return false;
  }

  renderGems() {
    const balance = this.getBalance();
    if (this.state.loading) {
      return <div className={classNames({ [styles.loading]: true, [styles.sm]: true })} />;
    }
    const asterisk = balance < 500 ? '*' : '';
    return (
      <div className={styles.availableFunds}>
        <span>{balance} GEM{asterisk}</span>
      </div>
    );
  }

  renderText() {
    if (this.state.loading) {
      return 'Withdrawing';
    }
    return 'Withdraw';
  }

  renderTransactionSuccess() {
    if (this.props.transactions) {
      return (
        <SuccessfulTransactionModal
          transactions={this.props.transactions}
          setTransactions={this.props.setTransactions}
        />
      );
    }
    return false;
  }

  renderDepositButton() {
    if (TRANSACTIONS_DISABLED || !this.state.hasGems) {
      return false;
    }
    return (
      <button
        className={classNames({
          [styles.defaultBtn]: true,
          [styles.btn]: true,
        })}
        onClick={() => this.toggleDepositModal()}
      >
        Deposit
      </button>
    );
  }

  renderWithdrawButton() {
    if (TRANSACTIONS_DISABLED) {
      return false;
    }

    const isWithdrawDisabled = this.getBalance() < 500 || this.state.loading;
    return (
      <button
        className={classNames({
          [styles.defaultBtn]: true,
          [styles.btn]: true,
          [styles.disabled]: isWithdrawDisabled,
        })}
        onClick={() => this.withdraw()}
        disabled={isWithdrawDisabled}
      >
        {this.renderText()}
        {this.renderGems()}
      </button>
    );
  }

  render() {
    if (this.props.worker === null) {
      return '';
    }

    return (
      <Content title="Account" >
        <div className={styles.innerContainer}>
          {this.renderDepositModal()}
          {this.renderEmailEdit()}
          {this.renderTransactionSuccess()}
          <div className={styles.table}>
            <span
              className={classNames({ [styles.heading]: true, [styles.cell]: true })}
            >
              Your Account
            </span>
            <div className={styles.cell}>
              <div className={styles.subHeading}>Account Address</div>
              <div className={styles.accountInput}>
                <div className={styles.accountInputContainer}>
                  <span className={styles.address} id="address">{this.workerAddress()}</span>
                </div>
                <Clipboard
                  className={styles.copyBtn.toString()}
                  data-clipboard-text={this.workerAddress()}
                >
                  Copy
                </Clipboard>
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.subHeading}>Email Address</div>
              <div className={styles.emailInput}>
                {this.renderEmail()}
              </div>
              <button
                className={classNames({
                  [styles.defaultBtn]: true,
                  [styles.btn]: true,
                  [styles.editBtn]: true,
                })}
                onClick={() => this.toggleEmailModal()}
              >
                Edit
              </button>
            </div>
            <div className={styles.cell}>
              <div className={styles.subHeading}>Reserved for Pending Tasks</div>
              <div className={styles.reserved}>{this.getStakedGems()} GEMS</div>
            </div>
            <div className={styles.cell}>
              {this.renderDepositButton()}
              {this.renderWithdrawButton()}
              <button
                className={classNames({
                    [styles.defaultBtn]: true,
                    [styles.btn]: true,
                    [styles.loginBtn]: true,
                  })}
                onClick={this.props.logout}
              >
                Log Out
              </button>
            </div>
            <div className={styles.cell}>
              {renderMessage()}
            </div>
          </div>
        </div>
      </Content>
    );
  }
}

Account.defaultProps = {
  worker: null,
  gemsBalance: null,
  transactions: null,
};

Account.propTypes = {
  router: PropTypes.shape({
    setRouteLeaveHook: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  setGemsBalance: PropTypes.func.isRequired,
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

export default withRouter(Account);
