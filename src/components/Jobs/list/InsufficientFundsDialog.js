import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

import { userProps } from '@expandorg/app-auth';
import { Deposit } from '@expandorg/app-gemtokens/components';

export default class InsufficientFundsDialog extends Component {
  static propTypes = {
    user: userProps.isRequired,
    requires: PropTypes.number.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide, requires, user } = this.props;

    return (
      <Dialog visible onHide={onHide} contentLabel="submit task">
        <DF.Container>
          <DF.WarningIcon />
          <DF.Title>You need {requires} XPN to qualify.</DF.Title>
          <DF.Description>Would you like to top up?</DF.Description>
          <DF.Actions>
            <Deposit user={user}>
              {({ onToggleDepsoit }) => (
                <Button
                  className="gem-dialogform-button"
                  onClick={onToggleDepsoit}
                >
                  deposit XPN
                </Button>
              )}
            </Deposit>
            <Button
              className="gem-dialogform-button"
              theme="grey"
              onClick={onHide}
            >
              no, go back
            </Button>
          </DF.Actions>
        </DF.Container>
      </Dialog>
    );
  }
}
