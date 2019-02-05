import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../shared/auth';

import Page from '../shared/Page';

import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import Onboarding from './Onboarding/Onboarding';
import Complete from './Results/Complete';
import Failed from './Results/Failed';

import { jobProps, onboardingProps } from '../shared/propTypes';

import { OnboardingStatus } from '../../model/enums';
import { fetchJobs } from '../../sagas/jobsSagas';
import { fetchOnboarding } from '../../sagas/onboardingSagas';

import {
  makeJobSelector,
  makeOnboardingSelector,
} from '../../selectors/jobsSelectors';

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
  bindActionCreators({ fetchJobs, fetchOnboarding }, dispatch);

class JobDetails extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,

    job: jobProps,
    onboarding: onboardingProps,

    fetchJobs: PropTypes.func.isRequired,
    fetchOnboarding: PropTypes.func.isRequired,
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

  render() {
    const { job, onboarding, jobId } = this.props;

    if (!job || !onboarding) {
      return null;
    }

    return (
      <Page title={job.name}>
        {onboarding.status === OnboardingStatus.InProgress && (
          <Onboarding jobId={jobId} onboarding={onboarding} />
        )}
        {onboarding.status === OnboardingStatus.Failed && <Failed job={job} />}
        {onboarding.status === OnboardingStatus.Passed && (
          <Complete job={job} />
        )}
        <AssignedJobRedirect replace jobId={jobId} />
      </Page>
    );
  }
}
export default authenticated(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(JobDetails)
);
