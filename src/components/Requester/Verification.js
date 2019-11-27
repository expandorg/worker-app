import React, { useEffect, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import VerificationContainer from '../Task/VerificationContainer';

import { fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeTaskAssignmentSelector } from '../../selectors/assignmentsSelectors';
import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import styles from '../Task/styles.module.styl';

function Verification() {
  const dispatch = useDispatch();
  const { taskId } = useParams();

  const user = useSelector(userSelector);
  console.log(user);

  const taskSelector = useMemo(makeTaskSelector, []);
  const task = useSelector(state => taskSelector(state, taskId));

  const assignedJobSelector = useMemo(makeAssignedJobSelector, []);
  const job = useSelector(state => assignedJobSelector(state, taskId));

  const assignmentsSelector = useMemo(makeTaskAssignmentSelector, []);
  const assignment = useSelector(state => assignmentsSelector(state, taskId));

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTask(+taskId));
  }, [dispatch, taskId]);

  if (!assignment) {
    return null;
  }

  return (
    <Page title={(job && job.name) || ''}>
      <div className={styles.container}>
        {assignment.responseId !== null && (
          <VerificationContainer
            key={taskId}
            job={job}
            task={task}
            assignment={assignment}
          />
        )}
      </div>
    </Page>
  );
}

export default authenticated(Verification);
