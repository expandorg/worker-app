import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, DialogHeadline, Button } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../../hoc/withSubmitState';

import { cancelTask } from '../../../sagas/tasksSagas';

import { cancelTaskStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './CancelConfirmationDialog.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ cancelTask }, dispatch);

class CancelConfirmationDialog extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    submitState: requestStateProps.isRequired,
    cancelTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { taskId, onSubmit, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() => this.props.cancelTask(taskId));
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

export default withSubmitState(cancelTaskStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(CancelConfirmationDialog)
);
