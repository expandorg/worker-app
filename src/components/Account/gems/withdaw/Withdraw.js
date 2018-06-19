import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditAddressDialoig from '../../address/EditAddressDialoig';
import ConfirmEmailDialog from '../../../shared/email/ConfirmEmailDialog';

import AvailableFunds from './AvailableFunds';
import WithdrawDialog from './WithdrawDialog';

import { userBalance } from '../../../../model/balance';
import { userProps } from '../../../shared/propTypes';

import styles from './Withdraw.module.styl';


export default class Withdraw extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  }

  state = {
    dialog: false,
    emailDialog: false,
    addressDialog: false,
  }

  handleToggle = () => {
    const { user } = this.props;
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
  }

  handleHideAddress = () => {
    this.setState({ addressDialog: false });
    if (this.props.user.address) {
      this.handleToggle();
    }
  }

  handleHideEmail = () => {
    this.setState({ emailDialog: false });
    if (this.props.user.emailConfirmed) {
      this.handleToggle();
    }
  }

  render() {
    const { user } = this.props;
    const { dialog, emailDialog, addressDialog } = this.state;
    const balance = userBalance.get(user);

    return (
      <Fragment>
        <button onClick={this.handleToggle} className={styles.withdraw}>
          Withdraw <AvailableFunds balance={balance} />
        </button>
        {dialog &&
          <WithdrawDialog user={user} onHide={this.handleToggle} />
        }
        {addressDialog &&
          <EditAddressDialoig user={user} onHide={this.handleHideAddress} />
        }
        {emailDialog &&
          <ConfirmEmailDialog user={user} onHide={this.handleHideEmail} />
        }
      </Fragment>
    );
  }
}
