import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DepositDialog from './deposit/DepositDialog';
import Withraw from './withdaw/Withdraw';

import { fetchGemsBalance } from '../../../sagas/gemsSagas';
import { userProps } from '../../shared/propTypes';

import { gemBalanceSelector, userSelector } from '../../../selectors/userSelectors';

import { DEPOSIT_MIN } from '../../../model/balance';

import styles from './Actions.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  gemsBalance: gemBalanceSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Actions extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    gemsBalance: PropTypes.number,
    fetchGemsBalance: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gemsBalance: 0,
  }

  state = {
    deposit: false,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.address /* FIXME: fix address confirmation: && user.addressConfirmed */) {
      this.props.fetchGemsBalance(user);
    }
  }

  handleToggle = () => {
    this.setState(({ deposit }) => ({ deposit: !deposit }));
  }

  render() {
    const { gemsBalance, user } = this.props;
    const canDeposit = gemsBalance > DEPOSIT_MIN;

    return (
      <div className={styles.container}>
        <button className={styles.deposit} onClick={this.handleToggle} disabled={!canDeposit}>
          Deposit
        </button>
        <Withraw user={user} />
        {this.state.deposit &&
          <DepositDialog onHide={this.handleToggle} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
