import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from 'glamor';
import Clipboard from 'react-clipboard.js';
import { worker as workerProps } from '../schemas';
import { FLEX_PANEL, BORDER_R, PADDING, BTN, LOADING } from '../style-constants';
import SuccessfulTransactionModal from './SuccessfulTransactionModal';

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
};

class Account extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    this.props.setTitle('Account');
  }

  workerAdderss() {
    return `0x${this.props.worker.id}`;
  }

  withdraw() {
    this.setState({ loading: true });
    this.props.withdrawPayments();
  }

  renderGems() {
    if (this.state.loading) {
      return <div className={classNames({ [styles.loading]: true, [styles.sm]: true })} />;
    }
    if (this.props.worker.balance > 0 && this.props.worker.balance < 500) {
      return (
        <div className={styles.availableFunds}>
          <span>{this.props.worker.balance} GEM*</span>
        </div>
      );
    }
    if (this.props.worker.balance >= 500) {
      return (
        <div className={styles.availableFunds}>
          <span>{this.props.worker.balance} GEM</span>
        </div>
      );
    }
    return false;
  }

  renderText() {
    if (this.state.loading) {
      return 'Withdrawing';
    }
    return 'Withdraw';
  }
  renderTransactionSuccess() {
    if (this.props.transaction) {
      this.setState({ loading: false });
      return (
        <SuccessfulTransactionModal
          transaction={this.props.transaction}
        />
      );
    }
    return false;
  }

  render() {
    return this.props.worker && (
      <div className={styles.innerContainer}>
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
                <span className={styles.address} id="address">{this.workerAdderss()}</span>
              </div>
              <Clipboard
                className={styles.copyBtn.toString()}
                data-clipboard-text={this.workerAdderss()}
              >
                Copy
              </Clipboard>
            </div>
          </div>
          <div className={styles.cell}>
            <button
              className={classNames({
                [styles.defaultBtn]: true,
                [styles.btn]: true,
                [styles.disabled]: true,
              })}
              onClick={() => this.withdraw()}
              disabled
              // disabled={this.props.worker.balance < 500 || this.state.loading}
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
            *Due to high demand, we have disabled GEM withdrawals on the Ropsten test network
            {/*
              *Due to high demand, we can only let you withdraw if you have over 500 GEM tokens
            */}
          </div>
        </div>
      </div>
    );
  }
}

Account.defaultProps = {
  worker: null,
  transaction: null,
};

Account.propTypes = {
  logout: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  withdrawPayments: PropTypes.func.isRequired,
  worker: PropTypes.shape(workerProps),
  transaction: PropTypes.string,
};

export default Account;
