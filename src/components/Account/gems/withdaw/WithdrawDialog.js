import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, DialogHeadline } from '@expandorg/components';
import { RequestStates, requestStateProps } from '@expandorg/app-utils';
import { withdrawPayments } from '@expandorg/app-gemtokens/sagas';

import { userProps } from '@expandorg/app-auth';

import { withdrawStateSelector } from '@expandorg/app-gemtokens/selectors';

import withSubmitState from '../../../hoc/withSubmitState';

import WithdrawForm from './WithdrawForm';
import Transactions from '../../../shared/transactions/Transactions';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ withdrawPayments }, dispatch);

class WithdrawDialog extends Component {
  static propTypes = {
    user: userProps.isRequired,
    submitState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    withdrawPayments: PropTypes.func.isRequired,
  };

  handleWithdraw = amount => {
    const { onSubmit, user } = this.props;
    onSubmit(() => this.props.withdrawPayments(user, amount));
  };

  handleHide = () => {
    if (this.props.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  };

  render() {
    const { submitState, user } = this.props;
    const isFetched = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="withdaw" visible onHide={this.handleHide}>
        <DialogHeadline>
          {isFetched ? 'Transactions' : 'Withdaw Gems'}
        </DialogHeadline>
        {isFetched ? (
          <Transactions
            transactions={[submitState.payload.user.pendingTx.hash]}
          />
        ) : (
          <WithdrawForm
            user={user}
            submitState={submitState}
            onWithdraw={this.handleWithdraw}
          />
        )}
      </Dialog>
    );
  }
}

export default withSubmitState(withdrawStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(WithdrawDialog)
);
