import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../../hoc/withSubmitState';
import Dialog, { DialogHeadline } from '../../../common/Dialog';

import WithdrawForm from './WithdrawForm';
import Transactions from '../../../shared/transactions/Transactions';

import { RequestStates } from '../../../../common/app/requestUiState';
import { userProps, requestStateProps } from '../../../shared/propTypes';

import { withdrawPayments } from '../../../../sagas/gemsSagas';

import { withdrawStateSelector } from '../../../../selectors/uiStateSelectors';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ withdrawPayments }, dispatch);

class WithdrawDialog extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    withdrawPayments: PropTypes.func.isRequired,
  }

  handleWithdraw = (amount) => {
    const { onSubmit, user } = this.props;
    onSubmit(() => this.props.withdrawPayments(user, amount));
  }

  handleHide = () => {
    if (this.props.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  }

  render() {
    const { submitState, user } = this.props;
    const isFetched = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="withdaw" visible onHide={this.handleHide} >
        <DialogHeadline>
          {isFetched ? 'Transactions' : 'Withdaw Gems'}
        </DialogHeadline>
        {isFetched
          ? <Transactions transactions={[submitState.payload.tx]} />
          : <WithdrawForm user={user} submitState={submitState} onWithdraw={this.handleWithdraw} />
        }
      </Dialog>
    );
  }
}

export default withSubmitState(withdrawStateSelector)(
  connect(null, mapDispatchToProps)(WithdrawDialog),
);
