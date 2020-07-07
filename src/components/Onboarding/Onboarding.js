import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { authenticated } from '../shared/auth';

import Page from '../shared/Page';

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

function OnboardingPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = +params.jobId;

  const jobSelector = useMemo(makeJobSelector, []);
  const onboardingSelector = useMemo(makeOnboardingSelector, []);

  const job = useSelector((state) => jobSelector(state, jobId));
  const onboarding = useSelector((state) => onboardingSelector(state, jobId));

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
    </Page>
  );
}

export default authenticated(OnboardingPage);
