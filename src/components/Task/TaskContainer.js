import React, { useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotification } from '@expandorg/app-utils/app';

import { RequestStates } from '@expandorg/app-utils';
import ModulesForm from './ModulesForm';

import { makeTaskVariablesSelector } from '../../selectors/variablesSelectors';
import { submitTask } from '../../sagas/tasksSagas';
import {
  submitTaskStateSelector,
  assignTaskStateSelector,
} from '../../selectors/ui';

import { assignTask } from '../../sagas/jobsSagas';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

export default function TaskContainer({ job, task, assignment }) {
  const dispatch = useDispatch();
  const submitTaskState = useSelector(submitTaskStateSelector);

  const variablesSelector = useMemo(makeTaskVariablesSelector, []);
  const variables = useSelector((state) => variablesSelector(state, task));

  const submit = useCallback(
    (form) => {
      dispatch(submitTask(assignment.taskId, form, assignment.jobId));
    },
    [assignment.jobId, assignment.taskId, dispatch]
  );

  const notify = useCallback(
    (type, msg) => {
      dispatch(addNotification(type, msg));
    },
    [dispatch]
  );

  const assignState = useSelector(assignTaskStateSelector);
  const assign = useCallback(() => {
    if (assignState.state !== RequestStates.Fetching) {
      dispatch(assignTask(assignment.jobId));
    }
  }, [dispatch, assignment.jobId, assignState.state]);

  return (
    <ModulesForm
      key={assignment.id}
      id={`-t-${assignment.id}`}
      assignmentId={assignment.id}
      jobId={assignment.jobId}
      timeThreshold={job && job.logic.verification.minimumExecutionTime}
      form={job && job.taskForm}
      visible={!!(job && task)}
      variables={variables}
      submitState={submitTaskState}
      assignState={assignState}
      onSubmit={submit}
      onAssign={assign}
      onNotify={notify}
    />
  );
}

TaskContainer.propTypes = {
  assignment: assignmentProps.isRequired,
  job: jobProps,
  task: taskProps,
};

TaskContainer.defaultProps = {
  job: null,
  task: null,
};
