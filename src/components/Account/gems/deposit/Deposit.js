import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DepositDialog from './DepositDialog';

import { fetchGemsBalance } from '../../../../sagas/gemsSagas';
import { userProps } from '../../../shared/propTypes';

import styles from './Deposit.module.styl';


const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Deposit extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
    onEditAddres: PropTypes.func.isRequired,
  }

  state = {
    dialog: false,
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
    const { user, onEditAddres } = this.props;
    if (!user.address) {
      onEditAddres();
    } else {
      this.setState(({ dialog }) => ({ dialog: !dialog }));
    }
  }

  render() {
    const { dialog } = this.state;
    return (
      <Fragment>
        <button className={styles.deposit} onClick={this.handleToggle}>
          Deposit
        </button>
        {dialog &&
          <DepositDialog onHide={this.handleToggle} />
        }
      </Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(Deposit);
