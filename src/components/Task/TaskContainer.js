import React, { useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotification } from '@expandorg/app-utils/app';

import ModulesForm from './ModulesForm';

import { makeTaskVariablesSelector } from '../../selectors/variablesSelectors';
import { submitTask } from '../../sagas/tasksSagas';
import { submitTaskStateSelector } from '../../selectors/ui';
import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

export default function TaskContainer({ job, task, assignment }) {
  const dispatch = useDispatch();
  const submitTaskState = useSelector(submitTaskStateSelector);

  const variablesSelector = useMemo(makeTaskVariablesSelector, []);
  const variables = useSelector(state => variablesSelector(state, task));

  const submit = useCallback(
    form => {
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
      onSubmit={submit}
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
