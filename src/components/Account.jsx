import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Clipboard from 'react-clipboard.js';
import { worker as workerProps } from '../schemas';
import { PADDING, BORDER_R, PANEL } from '../style-constants';

const styles = {
  innerContainer: PANEL,
  accountSection: css({
    marginLeft: '22%',
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
    width: '25px',
    height: '25px',
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
    minWidth: '50%',
    maxWidth: 'calc(100% - 25px)',
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
  btn: css({
    minWidth: '25%',
    maxWidth: 'calc(25% - 25px)',
    height: '40px',
    borderRadius: '4px',
    backgroundColor: '#ff7092',
    margin: PADDING / 2,
    cursor: 'pointer',
    border: '0',
    ':focus': {
      outline: '0px',
    },
  }),
};

class Account extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.setTitle('Account');
  }

  renderGems() {
    if (this.props.worker.balance > 0) {
      return(this.props.worker.balance);
    }
    return false;
  }

  render() {
    return this.props.worker && (
      <div className={styles.innerContainer}>
        <div className={styles.accountSection}>
          <span className={styles.heading}>Your Account</span>
          <div>
            <div className={styles.subHeading}>Account Address</div>
            <div className={styles.accountInput}>
              <div className={styles.accountInputContainer}>
                <span className={styles.address} id="address">{this.props.worker.id}</span>
              </div>
              <Clipboard
                className={styles.copyBtn.toString()}
                data-clipboard-text={this.props.worker.id}
              >
                Copy
              </Clipboard>
            </div>
            <button
              className={styles.btn}
              onClick={this.props.withdrawPayments}
              disabled={this.props.worker.balance < 1}
            >
              Withdraw
              {this.renderGems()}
              <img className={styles.gem} src="../images/mobile-logo.png" alt="Gems" />
            </button>
            <button
              className={styles.btn}
              onClick={this.props.logout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Account.defaultProps = {
  worker: null,
};

Account.propTypes = {
  logout: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  withdrawPayments: PropTypes.func.isRequired,
  worker: PropTypes.shape(workerProps),
};

export default Account;
