import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates } from '../../common/app/requestUiState';
import { authenticated } from '../hoc/authRules';
import withSubmitState from '../hoc/withSubmitState';

import Content from '../shared/Content';

import Onboarding from './Onboarding/Onboarding';
import OnboardingComplete from './Onboarding/OnboardingComplete';
import OnboardingFailed from './Onboarding/OnboardingFailed';

import { requestStateProps, jobProps, historyProps, onboardingProps } from '../shared/propTypes';

import { OnboardingStage } from '../../model/enums';
import { fetchJobs, assignJob } from '../../sagas/jobsSagas';
import { fetchOnboarding } from '../../sagas/onboardingSagas';

import { makeJobSelector, makeOnboardingSelector } from '../../selectors/jobsSelectors';
import { assignJobStateSelector } from '../../selectors/uiStateSelectors';

const makeMapStateToProps = () => {
  const jobSelector = makeJobSelector();
  const onboardingSelector = makeOnboardingSelector();
  return (state, props) => ({
    jobId: +props.match.params.jobId,
    job: jobSelector(state, +props.match.params.jobId),
    onboarding: onboardingSelector(state, +props.match.params.jobId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchJobs, assignJob, fetchOnboarding,
  }, dispatch);

class JobDetails extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,

    history: PropTypes.shape(historyProps).isRequired,

    job: PropTypes.shape(jobProps),
    onboarding: PropTypes.shape(onboardingProps),

    submitState: PropTypes.shape(requestStateProps).isRequired,

    fetchJobs: PropTypes.func.isRequired,
    assignJob: PropTypes.func.isRequired,
    fetchOnboarding: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    onboarding: null,
  };

  componentDidMount() {
    const { jobId } = this.props;
    this.props.fetchJobs();
    this.props.fetchOnboarding(jobId);
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
    const { job, onboarding, jobId, submitState } = this.props;
    const title = job ? job.name : '';
    if (!onboarding) {
      return null;
    }
    return (
      <Content title={title}>
        {onboarding.stage === OnboardingStage.InProgress &&
          <Onboarding jobId={jobId} onboarding={onboarding} />
        }
        {onboarding.stage === OnboardingStage.Failed &&
          <OnboardingFailed />
        }
        {onboarding.stage === OnboardingStage.Complete &&
          <OnboardingComplete
            onboarding={onboarding}
            submitState={submitState}
            onAssign={this.handleAssignJob}
          />
        }
      </Content>
    );
  }
}
export default authenticated(
  withSubmitState(assignJobStateSelector)(
    connect(makeMapStateToProps, mapDispatchToProps)(JobDetails),
  ),
);
