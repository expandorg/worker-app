import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Dialog, DialogHeadline, Button } from '@gemsorg/components';

import withSubmitState from '../hoc/withSubmitState';
import { requestStateProps } from '../shared/propTypes';
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import { RequestStates } from '../../common/app/requestUiState';

import { assignJob } from '../../sagas/jobsSagas';

import { assignJobStateSelector } from '../../selectors/uiStateSelectors';

import styles from './SubmissionDialog.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob }, dispatch);

class SubmissionDialog extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,

    submitState: PropTypes.shape(requestStateProps).isRequired,
    assignJob: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAssignComplete: PropTypes.func.isRequired,
  };

  componentDidUpdate({ submitState: prev, onAssignComplete }) {
    const { submitState } = this.props;
    if (
      prev.state === RequestStates.Fetching &&
      submitState.state === RequestStates.Fetched
    ) {
      onAssignComplete();
    }
  }

  handleAssignJob = () => {
    const { jobId, onSubmit, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() => this.props.assignJob(jobId));
    }
  };

  render() {
    const { jobId } = this.props;
    return (
      <Dialog visible hideButton contentLabel="submit task">
        <DialogHeadline>Task Submitted</DialogHeadline>
        <div className={styles.container}>
          <div className={styles.heading}>Submission successful!</div>
          <div className={styles.actions}>
            <Link to="/jobs" className={styles.browse}>
              Browse available jobs
            </Link>
            <Button theme="pink" onClick={this.handleAssignJob}>
              Start this task
            </Button>
          </div>
          <AssignedJobRedirect jobId={jobId} />
        </div>
      </Dialog>
    );
  }
}

export default withSubmitState(assignJobStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(SubmissionDialog)
);
