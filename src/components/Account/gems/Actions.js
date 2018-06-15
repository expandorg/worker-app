import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Deposit from './deposit/Deposit';
import Withraw from './withdaw/Withdraw';

import EditAddressDialoig from '../address/EditAddressDialoig';
import ConfirmEmailDialog from '../../shared/email/ConfirmEmailDialog';

import { userProps } from '../../shared/propTypes';
import { userSelector } from '../../../selectors/userSelectors';

import styles from './Actions.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Actions extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  }

  state = {
    addressDialog: false,
    emailDialog: false,
  }

  handleToggleAddress = () => {
    this.setState(({ addressDialog }) => ({ addressDialog: !addressDialog }));
  }

  handleToggleEmail = () => {
    this.setState(({ emailDialog }) => ({ emailDialog: !emailDialog }));
  }

  render() {
    const { user } = this.props;
    const { addressDialog, emailDialog } = this.state;
    return (
      <div className={styles.container}>
        <Deposit user={user} onEditAddres={this.handleToggleAddress} />
        <Withraw
          user={user}
          onEditAddres={this.handleToggleAddress}
          onEditEmail={this.handleToggleEmail}
        />
        {addressDialog &&
          <EditAddressDialoig user={user} onHide={this.handleToggleAddress} />
        }
        {emailDialog &&
          <ConfirmEmailDialog user={user} onHide={this.handleToggleEmail} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Actions);
