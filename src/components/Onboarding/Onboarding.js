import React, { useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { matchProps } from '@expandorg/app-utils';

import { authenticated } from '../shared/auth';

import Page from '../shared/Page';

import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import Onboarding from './Onboarding/Onboarding';
import Complete from './Results/Complete';
import Failed from './Results/Failed';

import { OnboardingStatus } from '../../model/enums';
import { fetchJobs } from '../../sagas/jobsSagas';
import { fetchOnboarding } from '../../sagas/onboardingSagas';

import {
  makeJobSelector,
  makeOnboardingSelector,
} from '../../selectors/jobsSelectors';

function OnboardingPage({ match }) {
  const dispatch = useDispatch();
  const jobId = +match.params.jobId;

  const jobSelector = useMemo(makeJobSelector, []);
  const onboardingSelector = useMemo(makeOnboardingSelector, []);

  const job = useSelector(state => jobSelector(state, jobId));
  const onboarding = useSelector(state => onboardingSelector(state, jobId));

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchOnboarding(jobId));
  }, [dispatch, jobId]);

  if (!job || !onboarding) {
    return null;
  }

  return (
    <Page title={job.name}>
      {onboarding.status === OnboardingStatus.InProgress && (
        <Onboarding jobId={jobId} onboarding={onboarding} />
      )}
      {onboarding.status === OnboardingStatus.Failed && <Failed job={job} />}
      {onboarding.status === OnboardingStatus.Passed && <Complete job={job} />}
      <AssignedJobRedirect replace jobId={jobId} />
    </Page>
  );
}

OnboardingPage.propTypes = {
  match: matchProps.isRequired,
};

export default authenticated(OnboardingPage);
