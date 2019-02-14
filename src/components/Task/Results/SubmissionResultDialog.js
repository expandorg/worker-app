import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import Countdown from '../../shared/Countdown';
import AssignedJobRedirect from '../../shared/AssignedJobRedirect';

import { assignJob } from '../../../sagas/jobsSagas';
import { jobListSelector } from '../../../selectors/jobsSelectors';
import { assignJobStateSelector } from '../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  jobs: jobListSelector(state),
  submitState: assignJobStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob }, dispatch);

class SubmissionResultDialog extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    jobs: PropTypes.arrayOf(PropTypes.number),

    submitState: requestStateProps.isRequired,
    assignJob: PropTypes.func.isRequired,
    onAssignComplete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    jobs: [],
  };

  handleAssignJob = () => {
    const { jobId, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.assignJob(jobId);
    }
  };

  render() {
    const { jobId, jobs, submitState, onAssignComplete } = this.props;

    const assignable = jobs.includes(jobId);

    return (
      <Dialog visible hideButton contentLabel="submit task">
        <DF.Container>
          <DF.Title>Task Submitted</DF.Title>
          <DF.Description>Submission successful!</DF.Description>

          {assignable && (
            <DF.Description>
              <Countdown
                interval={1000}
                expireIn={5000}
                onFinish={this.handleAssignJob}
              >
                {({ timeLeft, finished }) => {
                  const time = Math.ceil(timeLeft / 1000);
                  return finished
                    ? 'Assigning to task...'
                    : `You will be automatically assigned to this task in ${time} seconds`;
                }}
              </Countdown>
            </DF.Description>
          )}

          <DF.Actions>
            <Link
              to="/"
              className={cn(
                'gem-button',
                'gem-button-secondary',
                'gem-dialogform-button'
              )}
            >
              Browse jobs
            </Link>
            {assignable && (
              <Button
                className="gem-dialogform-button"
                onClick={this.handleAssignJob}
              >
                Start this task
              </Button>
            )}
          </DF.Actions>
        </DF.Container>
        <AssignedJobRedirect jobId={jobId} />
        <SubmitStateEffect
          submitState={submitState}
          onComplete={onAssignComplete}
        />
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionResultDialog);
