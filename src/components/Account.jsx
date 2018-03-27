import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from 'glamor';
import Clipboard from 'react-clipboard.js';
import Big from 'bignumber.js';
import { worker as workerProps, stats as statsProps } from '../schemas';
import { FLEX_PANEL, BORDER_R, PADDING, BTN, LOADING } from '../style-constants';
import DepositModal from './DepositModal';
import SuccessfulTransactionModal from './SuccessfulTransactionModal';
import EmailSubmission from './EmailSubmission';

const styles = {
  innerContainer: FLEX_PANEL,
  btn: BTN,
  table: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: '0 0 3em 0',
    padding: '0',
  }),
  cell: css({
    boxSizing: 'border-box',
    flexGrow: '0 1 auto',
    flexDirection: 'column',
    width: '100%',
    padding: '0.8em 1.2em',
    overflow: 'hidden',
    listStyle: 'none',
  }),
  heading: css({
    fontSize: 16,
    letterSpacing: 0.5,
    opacity: '0.4',
    color: '#0b132b',
    display: 'block',
    textTransform: 'uppercase',
    marginBottom: PADDING / 2,
    marginTop: PADDING / 2,
  }),
  subHeading: css({
    fontSize: 16,
    color: '#3a506b',
    display: 'inline-block',
    marginRight: PADDING / 2,
    marginLeft: 20,
  }),
  gem: css({
    width: '20px',
    height: '20px',
    marginLeft: '10px',
  }),
  accountInputContainer: css({
    display: 'inline-block',
    width: 'calc(100% - 62px)',
    verticalAlign: 'middle',
  }),
  accountInput: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
    width: 'calc(100% - 205px)',
    minWidth: '200px',
    ':focus': {
      outline: 0,
    },
  }),
  emailInput: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
    width: 'calc(100% - 394px)',
    minWidth: '200px',
    ':focus': {
      outline: 0,
    },
  }),
  copyBtn: css({
    display: 'inline-block',
    fontSize: 13,
    textAlign: 'right',
    color: '#3a506b',
    textTransform: 'uppercase',
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: PADDING,
    padding: 0,
    cursor: 'pointer',
  }),
  reserved: css({
    display: 'inline-block',
  }),
  address: css({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  defaultBtn: css({
    minWidth: '100px',
    width: 'calc(25% - 25px)',
    height: '40px',
    margin: PADDING / 2,
    display: 'inline-block',
    fontSize: '16px',
  }),
  loginBtn: css({
    float: 'right',
    backgroundColor: '#ffffff',
    border: 'solid 2px #ff7092',
  }),
  availableFunds: css({
    marginLeft: '2px',
    display: 'inline-block',
  }),
  loading: LOADING,
  sm: css({
    maxHeight: '20px',
    maxWidth: '20px',
    display: 'inline-block',
    top: '0%',
    transform: 'none',
    verticalAlign: 'middle',
  }),
  disabled: css({
    cursor: 'default',
  }),
  editBtn: css({
    display: 'inline-block',
    width: '198px',
  }),
  prompt: css({
    textAlign: 'center',
  }),
};

class Account extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: false,
      editEmail: false,
      showDepositModal: false,
      hasGems: false,
    };
  }

  componentWillMount() {
    this.props.setTitle('Account');
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

  getStakedGems() {
    return Big(this.props.stats.pending).multipliedBy(Big(0.1)).toNumber();
  }

  getBalance() {
    const staked = this.getStakedGems();
    const balance = Big(this.props.worker.vaultBalance + this.props.worker.jobBalance);
    return balance.minus(staked).toNumber();
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
    if (!this.state.hasGems) {
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

  render() {
    if (this.props.worker === null) {
      return '';
    }

    const isWithdrawDisabled = this.getBalance() < 500 || this.state.loading;
    return (
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
            *Due to high demand, we can only let you withdraw if you have over 500 GEM tokens
          </div>
        </div>
      </div>
    );
  }
}

Account.defaultProps = {
  worker: null,
  gemsBalance: null,
  transactions: null,
};

Account.propTypes = {
  logout: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
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

export default Account;
