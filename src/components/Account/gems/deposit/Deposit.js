import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditAddressDialoig from '../../address/EditAddressDialoig';

import DepositDialog from './DepositDialog';

import { fetchGemsBalance } from '../../../../sagas/gemsSagas';
import { fetchBalanceStateSelector } from '../../../../selectors/uiStateSelectors';

import { userProps, requestStateProps } from '../../../shared/propTypes';

import styles from './Deposit.module.styl';

const mapStateToProps = state => ({
  fetchState: fetchBalanceStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Deposit extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    fetchState: PropTypes.shape(requestStateProps).isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
  }

  state = {
    dialog: false,
    addressDialog: false,
  }

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
    const { user } = this.props;
    const { dialog } = this.state;
    if (!dialog && !user.address) {
      this.setState({ addressDialog: true });
    } else {
      this.setState({ dialog: !dialog });
    }
  }

  handleHideAddress = () => {
    this.setState({ addressDialog: false });
    if (this.props.user.address) {
      this.handleToggle();
    }
  }

  render() {
    const { user, fetchState } = this.props;
    const { dialog, addressDialog } = this.state;
    return (
      <Fragment>
        <button className={styles.deposit} onClick={this.handleToggle}>
          Deposit
        </button>
        {dialog &&
          <DepositDialog fetchBalanceState={fetchState} onHide={this.handleToggle} />
        }
        {addressDialog &&
          <EditAddressDialoig user={user} onHide={this.handleHideAddress} />
        }
      </Fragment>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
