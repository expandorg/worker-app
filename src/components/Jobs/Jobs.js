import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';
import { historyProps } from '@expandorg/app-utils';
import { useToggle, usePrevious } from '@expandorg/components';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';
import SurveyPopup from '../shared/Survey/SurveyPopup';
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import InsufficientFundsDialog from './InsufficientFundsDialog';

import Job from './list/Job';

import {
  assignTask,
  fetchJobs,
  assignVerification,
} from '../../sagas/jobsSagas';
import { jobsSelector } from '../../selectors/jobsSelectors';
import { assignmentsSelector } from '../../selectors/assignmentsSelectors';
import { profileSelector } from '../../selectors/profileSelectors';

import { jobHasSufficientFunds } from '../../model/jobs';

import styles from './Jobs.module.styl';

function Jobs({ history }) {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);
  const jobs = useSelector(jobsSelector);
  const assignments = useSelector(assignmentsSelector);

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
      if (job.onboarding.enabled) {
        history.push(`/onboarding/${job.id}`, {
          verification: job.isVerification,
        });
        return;
      }

      if (!job.isVerification) {
        dispatch(assignTask(job.id));
      } else {
        dispatch(assignVerification(job.id));
      }
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

  return (
    <Page title="Browse Jobs">
      <div className={styles.list}>
        {jobs.map((job) => (
          <Job
            key={job.id}
            job={job}
            user={user}
            assignment={assignments.find((a) => a.jobId === job.id)}
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
      <AssignedJobRedirect />
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

Jobs.propTypes = {
  history: historyProps.isRequired,
};

export default authenticated(Jobs);
