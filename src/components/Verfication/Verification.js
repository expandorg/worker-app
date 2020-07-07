import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authenticated } from '../shared/auth';
import Page from '../shared/Page';

import VerificationContainer from './VerificationContainer';

import TaskCancelled from '../Task/Results/TaskCancelled';

import { fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeAssignmentSelector } from '../../selectors/assignmentsSelectors';
import { makeJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import {
  ReportAssignmentStateEffect,
  CancelAssignmentStateEffect,
} from './effects';

import styles from './styles.module.styl';

function Verification() {
  const dispatch = useDispatch();
  const params = useParams();
  const assignmentId = +params.assignmentId;

  const assignmentSelector = useMemo(makeAssignmentSelector, []);
  const assignment = useSelector((s) => assignmentSelector(s, assignmentId));

  const taskSelector = useMemo(makeTaskSelector, []);
  const task = useSelector((s) =>
    taskSelector(s, assignment && assignment.taskId)
  );

  const jobSelector = useMemo(makeJobSelector, []);
  const job = useSelector((s) =>
    jobSelector(s, assignment && assignment.jobId)
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (assignment) {
      dispatch(fetchTask(assignment.taskId));
    }
  }, [assignment, dispatch]);

  const [cancelled, setCancalled] = useState(false);
  const cancelComplete = useCallback(() => setCancalled(true), []);

  if (!assignment) {
    return null;
  }

  const title = cancelled ? 'Task cancelled' : (job && job.name) || '';
  return (
    <Page title={title}>
      <div className={styles.container}>
        {!cancelled && (
          <VerificationContainer
            key={assignmentId}
            job={job}
            task={task}
            assignment={assignment}
          />
        )}
        {cancelled && <TaskCancelled />}
      </div>
      <ReportAssignmentStateEffect onComplete={cancelComplete} />
      <CancelAssignmentStateEffect onComplete={cancelComplete} />
    </Page>
  );
}

export default authenticated(Verification);
