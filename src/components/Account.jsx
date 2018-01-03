import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Clipboard from 'react-clipboard.js';
import { worker as workerProps } from '../schemas';
import { PADDING, BORDER_R, PANEL } from '../style-constants';

const styles = {
  innerContainer: PANEL,
  heading: css({
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#0b132b',
    display: 'block',
    textTransform: 'uppercase',
    marginBottom: PADDING / 2,
  }),
  subHeading: css({
    fontSize: 16,
    color: '#3a506b',
    display: 'inline-block',
    marginRight: PADDING / 2,
  }),
  accountInput: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
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

  render() {
    return this.props.worker && (
      <div className={styles.innerContainer}>
        <div>{this.props.worker.balance}</div>
        <button onClick={this.props.withdrawPayments} disabled={this.props.worker.balance < 1}>
          Withdraw
        </button>
        <span className={styles.heading}>Your Account</span>
        <div>
          <div className={styles.subHeading}>Account Address</div>
          <div className={styles.accountInput}>
            <span id="address">{this.props.worker.id}</span>
            <Clipboard
              className={styles.copyBtn.toString()}
              data-clipboard-text={this.props.worker.id}
            >
              Copy
            </Clipboard>
          </div>
        </div>
        <button onClick={this.props.logout}>Log Out</button>
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
