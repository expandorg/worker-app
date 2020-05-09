import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';
import { useToggle, usePrevious } from '@expandorg/components';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';
import SurveyPopup from '../shared/Survey/SurveyPopup';

import InsufficientFundsDialog from './InsufficientFundsDialog';

import Job from './Job';

import {
  assignTask,
  fetchJobs,
  assignVerification,
} from '../../sagas/jobsSagas';
import { dashboardSelector } from '../../selectors/jobsSelectors';
import { assignmentsByJobSelector } from '../../selectors/assignmentsSelectors';
import { profileSelector } from '../../selectors/profileSelectors';

import { jobHasSufficientFunds } from '../../model/jobs';

import styles from './Jobs.module.styl';

const jobTypeKey = (job) => (job.isVerification ? 'verification' : 'task');

function Jobs() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);
  const jobs = useSelector(dashboardSelector);
  const assignmentsMap = useSelector(assignmentsByJobSelector);

  const [profilePoup, toggleProfile] = useToggle();

  const [topup, setTopup] = useState(false);
  const topupJob = useCallback(
    ({ logic }) => setTopup(logic.funding.requirement),
    []
  );
  const hideTopup = useCallback(() => setTopup(false), []);

  const completeProfile = !!profile && profile.state === 'complete';

  const assign = useCallback(
    (job) => {
      if (!jobHasSufficientFunds(job, user)) {
        setTopup(job.logic.funding.requirement);
        return;
      }
      if (job.requiresProfile && !completeProfile) {
        toggleProfile();
        return;
      }

      if (job.isVerification) {
        dispatch(assignVerification(job.id));
        return;
      }
      if (job.onboarding.enabled) {
        history.push(`/onboarding/${job.id}`);
        return;
      }
      dispatch(assignTask(job.id));
    },
    [completeProfile, dispatch, history, toggleProfile, user]
  );

  const prevProfile = usePrevious(profile);

  useEffect(() => {
    if (profile && prevProfile) {
      if (prevProfile.state !== 'complete' && profile.state === 'complete') {
        dispatch(fetchJobs());
      }
    }
  }, [dispatch, prevProfile, profile]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  console.log(assignmentsMap);
  return (
    <Page title="Browse Jobs">
      <div className={styles.list}>
        {jobs.map((job) => (
          <Job
            key={job.key}
            job={job}
            user={user}
            assignment={assignmentsMap[jobTypeKey(job)][job.id]}
            onAssign={assign}
            onTopup={topupJob}
          />
        ))}
      </div>
      {topup && (
        <InsufficientFundsDialog
          user={user}
          requires={topup}
          onHide={hideTopup}
        />
      )}
      {profilePoup && (
        <SurveyPopup
          profile={profile}
          title="User Profile"
          userId={user.id}
          onHide={toggleProfile}
        />
      )}
    </Page>
  );
}

export default authenticated(Jobs);
