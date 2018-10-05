import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogHeadline, Button } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../../hoc/withSubmitState';

import { cancelAssignmentStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './CancelConfirmationDialog.module.styl';

class CancelConfirmationDialog extends Component {
  static propTypes = {
    assignmentId: PropTypes.number.isRequired,
    submitState: requestStateProps.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { assignmentId, onSubmit, onCancel, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() => onCancel(assignmentId));
    }
  };

  render() {
    const { onHide, submitState } = this.props;
    const fetching = submitState.state === RequestStates.Fetching;
    return (
      <Dialog visible onHide={onHide} contentLabel="submit task">
        <DialogHeadline>Cancel task</DialogHeadline>
        <div className={styles.container}>
          <div className={styles.message}>
            Are you sure that you want to cancel current task?
          </div>
          <div className={styles.actions}>
            <Button theme="white" onClick={onHide} className={styles.cancel}>
              Close
            </Button>
            <Button
              theme="pink"
              onClick={this.handleSubmit}
              disabled={fetching}
            >
              Cancel task
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default withSubmitState(cancelAssignmentStateSelector)(
  CancelConfirmationDialog
);
