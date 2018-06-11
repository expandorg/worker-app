import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, { DialogHeadline } from '../../../common/Dialog';
import { RequestStates, initialState as initialRequestState } from '../../../../common/app/requestUiState';
import { requestStateProps } from '../../../shared/propTypes';

import DepositForm from './DepositForm';
import Transactions from '../../transactions/Transactions';

import { depositGems } from '../../../../sagas/gemsSagas';

import { depositStageSelector, depositStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  submitState: depositStateSelector(state),
  stage: depositStageSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ depositGems }, dispatch);


class DepositDialog extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    stage: PropTypes.number.isRequired,
    depositGems: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  state = {
    submitState: initialRequestState,
    submitted: false,
  }

  componentWillReceiveProps({ submitState }) {
    if (this.state.submitted) {
      this.setState({ submitState });
    }
  }

  handleDeposit = (amount) => {
    this.setState({ submitted: true }, () => this.props.depositGems(amount));
  }

  handleHide = () => {
    if (this.state.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  }

  render() {
    const { stage } = this.props;
    const { submitState } = this.state;
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

export default connect(mapStateToProps, mapDispatchToProps)(DepositDialog);
