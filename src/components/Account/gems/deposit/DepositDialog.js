import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../../hoc/withSubmitState';
import Dialog, { DialogHeadline } from '../../../common/Dialog';

import DepositForm from './DepositForm';
import Transactions from '../../transactions/Transactions';

import { RequestStates } from '../../../../common/app/requestUiState';
import { requestStateProps } from '../../../shared/propTypes';

import { depositGems } from '../../../../sagas/gemsSagas';

import { depositStageSelector, depositStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  stage: depositStageSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ depositGems }, dispatch);

class DepositDialog extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    stage: PropTypes.number.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    depositGems: PropTypes.func.isRequired,
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
    const { stage, submitState } = this.props;
    const isFetched = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="deposit" visible onHide={this.handleHide} >
        <DialogHeadline>
          {isFetched ? 'Transactions' : 'Deposit Gems'}
        </DialogHeadline>
        {isFetched
          ? <Transactions transactions={submitState.payload.result.tx} />
          : <DepositForm submitState={submitState} stage={stage} onDeposit={this.handleDeposit} />
        }
      </Dialog>
    );
  }
}

export default withSubmitState(depositStateSelector)(
  connect(mapStateToProps, mapDispatchToProps)(DepositDialog),
);
