import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGemsBalance } from '@expandorg/app-gemtokens/sagas';
import { Button } from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import {
  fetchBalanceStateSelector,
  transactionStateSelector,
} from '@expandorg/app-gemtokens/selectors';

import EditAddressDialoig from '../../address/EditAddressDialoig';

import DepositDialog from './DepositDialog';

const mapStateToProps = state => ({
  fetchState: fetchBalanceStateSelector(state),
  txState: transactionStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Deposit extends Component {
  static propTypes = {
    user: userProps.isRequired,
    fetchState: requestStateProps.isRequired,
    txState: PropTypes.string.isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
  };

  state = {
    dialog: false,
    addressDialog: false,
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.address) {
      this.props.fetchGemsBalance(user);
    }
  }

  componentDidUpdate({ user: prevUser }) {
    const { user } = this.props;
    if (user !== prevUser && user.address) {
      this.props.fetchGemsBalance(user);
    }
  }

  handleToggle = () => {
    const { user, txState } = this.props;
    if (txState === RequestStates.Fetching) {
      return;
    }
    const { dialog } = this.state;
    if (!dialog && !user.address) {
      this.setState({ addressDialog: true });
    } else {
      this.setState({ dialog: !dialog });
    }
  };

  handleHideAddress = () => {
    this.setState({ addressDialog: false });
    if (this.props.user.address) {
      this.handleToggle();
    }
  };

  render() {
    const { user, fetchState, txState } = this.props;
    const { dialog, addressDialog } = this.state;

    const disabled = txState === RequestStates.Fetching;
    return (
      <Fragment>
        <Button onClick={this.handleToggle} disabled={disabled}>
          Deposit
        </Button>
        {dialog && (
          <DepositDialog
            fetchBalanceState={fetchState}
            onHide={this.handleToggle}
          />
        )}
        {addressDialog && (
          <EditAddressDialoig user={user} onHide={this.handleHideAddress} />
        )}
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
