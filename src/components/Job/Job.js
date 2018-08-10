import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../hoc/authRules';
import withSubmitState from '../hoc/withSubmitState';

import Content from '../shared/Content';
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import Onboarding from './Onboarding/Onboarding';
import Complete from './Onboarding/Complete';
import Failed from './Onboarding/Failed';

import { requestStateProps, jobProps, onboardingProps } from '../shared/propTypes';

import { OnboardingStatus } from '../../model/enums';
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

  handleAssignJob = () => {
    const { jobId, onSubmit } = this.props;
    onSubmit(() => this.props.assignJob(jobId));
  }

  render() {
    const { job, onboarding, jobId, submitState } = this.props;
    if (!job || !onboarding) {
      return null;
    }
    return (
      <Content title={job.name}>
        {onboarding.status === OnboardingStatus.InProgress &&
          <Onboarding jobId={jobId} onboarding={onboarding} />
        }
        {onboarding.status === OnboardingStatus.Failed &&
          <Failed job={job} />
        }
        {onboarding.status === OnboardingStatus.Passed &&
          <Complete
            job={job}
            submitState={submitState}
            onAssign={this.handleAssignJob}
          />
        }
        <AssignedJobRedirect />
      </Content>
    );
  }
}
export default authenticated(
  withSubmitState(assignJobStateSelector)(
    connect(makeMapStateToProps, mapDispatchToProps)(JobDetails),
  ),
);
