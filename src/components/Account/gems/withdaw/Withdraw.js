import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Button } from '@expandorg/components';

import { RequestStates } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import { userBalance } from '@expandorg/app-gemtokens';
import { transactionStateSelector } from '@expandorg/app-gemtokens/selectors';

import EditAddressDialoig from '../../address/EditAddressDialoig';
import ConfirmEmailDialog from '../../../shared/email/ConfirmEmailDialog';

import AvailableFunds from './AvailableFunds';
import WithdrawDialog from './WithdrawDialog';

import styles from './Withdraw.module.styl';

const mapStateToProps = state => ({
  txState: transactionStateSelector(state),
});

class Withdraw extends Component {
  static propTypes = {
    user: userProps.isRequired,
    txState: PropTypes.string.isRequired,
  };

  state = {
    dialog: false,
    emailDialog: false,
    addressDialog: false,
  };

  handleToggle = () => {
    const { user, txState } = this.props;
    if (txState === RequestStates.Fetching) {
      return;
    }
    const { dialog } = this.state;
    try {
      if (!dialog) {
        if (!user.emailConfirmed) {
          throw new Error('emailDialog');
        }
        if (!user.address) {
          throw new Error('addressDialog');
        }
      }
      this.setState({ dialog: !dialog });
    } catch (e) {
      this.setState({ [e.message]: true });
    }
  };

  handleHideAddress = () => {
    this.setState({ addressDialog: false });
    if (this.props.user.address) {
      this.handleToggle();
    }
  };

  handleHideEmail = () => {
    this.setState({ emailDialog: false });
    if (this.props.user.emailConfirmed) {
      this.handleToggle();
    }
  };

  render() {
    const { user, txState } = this.props;
    const { dialog, emailDialog, addressDialog } = this.state;
    const balance = userBalance.get(user);

    const disabled = txState === RequestStates.Fetching;
    return (
      <Fragment>
        <Button
          onClick={this.handleToggle}
          className={styles.withdraw}
          disabled={disabled}
        >
          Withdraw <AvailableFunds balance={balance} />
        </Button>
        {dialog && <WithdrawDialog user={user} onHide={this.handleToggle} />}
        {addressDialog && (
          <EditAddressDialoig user={user} onHide={this.handleHideAddress} />
        )}
        {emailDialog && (
          <ConfirmEmailDialog user={user} onHide={this.handleHideEmail} />
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Withdraw);
