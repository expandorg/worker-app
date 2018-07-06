import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates } from '../../common/app/requestUiState';
import { authenticated } from '../hoc/authRules';
import withSubmitState from '../hoc/withSubmitState';

import Content from '../shared/Content';

import Onboarding from './Onboarding/Onboarding';

import { requestStateProps, jobProps, historyProps, onboardingStatusProps } from '../shared/propTypes';

import { fetchJob, assignJob } from '../../sagas/jobsSagas';
import { fetchOnboardingStatus } from '../../sagas/onboardingSagas';

import { makeJobSelector, makeOnboardingStatusSelector } from '../../selectors/jobsSelectors';
import { assignJobStateSelector } from '../../selectors/uiStateSelectors';

const makeMapStateToProps = () => {
  const jobSelector = makeJobSelector();
  const onboardingStatusSelector = makeOnboardingStatusSelector();
  return (state, props) => ({
    jobId: props.match.params.jobId,
    onboardingStatus: onboardingStatusSelector(state, props.match.params.jobId),
    job: jobSelector(state, props.match.params.jobId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchJob, assignJob, fetchOnboardingStatus,
  }, dispatch);

class JobDetails extends Component {
  static propTypes = {
    jobId: PropTypes.string.isRequired,

    history: PropTypes.shape(historyProps).isRequired,

    job: PropTypes.shape(jobProps),
    onboardingStatus: PropTypes.shape(onboardingStatusProps),

    submitState: PropTypes.shape(requestStateProps).isRequired,

    fetchJob: PropTypes.func.isRequired,
    assignJob: PropTypes.func.isRequired,
    fetchOnboardingStatus: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    onboardingStatus: null,
  };

  componentDidMount() {
    const { jobId } = this.props;
    this.props.fetchJob(jobId);
    this.props.fetchOnboardingStatus(jobId);
  }

  componentDidUpdate({ submitState: prev }) {
    const { submitState, history } = this.props;
    if (prev.state === RequestStates.Fetching && submitState.state === RequestStates.Fetched) {
      history.push(`/tasks/${submitState.payload.result.newAssignment.taskId}`);
    }
  }

  handleAssignJob = () => {
    const { jobId, onSubmit } = this.props;
    onSubmit(() => this.props.assignJob(jobId));
  }

  render() {
    const { job, onboardingStatus } = this.props;
    if (!job || !onboardingStatus) {
      return null;
    }
    return (
      <Content title={job.name}>
        <Onboarding
          job={job}
          onboardingStatus={onboardingStatus}
          onAssign={this.handleAssignJob}
        />
      </Content>
    );
  }
}
export default authenticated(
  withSubmitState(assignJobStateSelector)(
    connect(makeMapStateToProps, mapDispatchToProps)(JobDetails),
  ),
);
