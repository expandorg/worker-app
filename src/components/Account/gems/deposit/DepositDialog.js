import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../../hoc/withSubmitState';
import Dialog, { DialogHeadline } from '../../../common/Dialog';

import DepositForm from './DepositForm';
import Transactions from '../../../shared/transactions/Transactions';

import { RequestStates } from '../../../../common/app/requestUiState';
import { requestStateProps } from '../../../shared/propTypes';

import { depositGems } from '../../../../sagas/gemsSagas';

import { gemBalanceSelector } from '../../../../selectors/userSelectors';
import { depositStageSelector, depositStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  stage: depositStageSelector(state),
  gemsBalance: gemBalanceSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ depositGems }, dispatch);

class DepositDialog extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    fetchBalanceState: PropTypes.shape(requestStateProps).isRequired,
    stage: PropTypes.number.isRequired,
    gemsBalance: PropTypes.number,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    depositGems: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gemsBalance: 0,
  }

  handleDeposit = (amount) => {
    const { onSubmit } = this.props;
    onSubmit(() => this.props.depositGems(amount));
  }

  handleHide = () => {
    if (this.props.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  }

  render() {
    const {
      stage, submitState, fetchBalanceState, gemsBalance,
    } = this.props;
    const isFetched = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="deposit" visible onHide={this.handleHide} >
        <DialogHeadline>
          {isFetched ? 'Transactions' : 'Deposit Gems'}
        </DialogHeadline>
        {isFetched
          ? <Transactions transactions={submitState.payload.result.tx} />
          : (
            <DepositForm
              submitState={submitState}
              fetchState={fetchBalanceState}
              stage={stage}
              gemsBalance={gemsBalance}
              onDeposit={this.handleDeposit}
            />
          )
        }
      </Dialog>
    );
  }
}

export default withSubmitState(depositStateSelector)(
  connect(mapStateToProps, mapDispatchToProps)(DepositDialog),
);
