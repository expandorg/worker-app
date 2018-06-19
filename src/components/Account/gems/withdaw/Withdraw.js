import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AvailableFunds from './AvailableFunds';
import WithdrawDialog from './WithdrawDialog';

import { userBalance } from '../../../../model/balance';
import { userProps } from '../../../shared/propTypes';

import styles from './Withdraw.module.styl';

export default class Withdraw extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    onEditAddres: PropTypes.func.isRequired,
    onEditEmail: PropTypes.func.isRequired,
  }

  state = {
    dialog: false,
  }

  handleToggle = () => {
    const { user, onEditAddres, onEditEmail } = this.props;
    if (!user.emailConfirmed) {
      onEditEmail();
    } else if (!user.address) {
      onEditAddres();
    } else {
      this.setState(({ dialog }) => ({ dialog: !dialog }));
    }
  }

  render() {
    const { user } = this.props;
    const { dialog } = this.state;
    const balance = userBalance.get(user);

    return (
      <Fragment>
        <button onClick={this.handleToggle} className={styles.withdraw}>
          Withdraw <AvailableFunds balance={balance} />
        </button>
        {dialog &&
          <WithdrawDialog user={user} onHide={this.handleToggle} />
        }
      </Fragment>
    );
  }
}
