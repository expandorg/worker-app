import React, { useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { moduleControls } from '@expandorg/modules/app';
import { getVerificationResponse } from '@expandorg/modules/model';

import { addNotification } from '@expandorg/app-utils/app';
import { RequestStates } from '@expandorg/app-utils';
import ModulesForm from '../Task/ModulesForm';

import { verifyResponse } from '../../sagas/responsesSagas';

import { makeVerficationVariablesSelector } from '../../selectors/variablesSelectors';
import {
  verifyResponseStateSelector,
  assignVerificationStateSelector,
} from '../../selectors/ui';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';
import { assignVerification } from '../../sagas/jobsSagas';

export default function VerificationContainer({ assignment, job, task }) {
  const dispatch = useDispatch();
  const verifyState = useSelector(verifyResponseStateSelector);

  const variablsSelector = useMemo(makeVerficationVariablesSelector, []);
  const variables = useSelector((state) =>
    variablsSelector(state, task, assignment)
  );

  const submit = useCallback(
    (result) => {
      if (job) {
        const { score, reason } = getVerificationResponse(
          result,
          job.verificationForm,
          moduleControls
        );
        dispatch(verifyResponse(assignment.responseId, score, reason));
      }
    },
    [assignment.responseId, dispatch, job]
  );

  const notify = useCallback(
    (type, msg) => {
      dispatch(addNotification(type, msg));
    },
    [dispatch]
  );

  const assignState = useSelector(assignVerificationStateSelector);
  const assign = useCallback(() => {
    if (assignState.state !== RequestStates.Fetching) {
      dispatch(assignVerification(assignment.jobId));
    }
  }, [dispatch, assignment.jobId, assignState.state]);

  return (
    <ModulesForm
      key={assignment.responseId}
      id={`-v-${assignment.responseId}`}
      assignmentId={assignment.id}
      jobId={assignment.jobId}
      form={job && job.verificationForm}
      visible={!!(job && task)}
      variables={variables}
      submitState={verifyState}
      assignState={assignState}
      onAssign={assign}
      onSubmit={submit}
      onNotify={notify}
    />
  );
}

VerificationContainer.propTypes = {
  assignment: assignmentProps.isRequired,
  job: jobProps,
  task: taskProps,
};

VerificationContainer.defaultProps = {
  job: null,
  task: null,
};
