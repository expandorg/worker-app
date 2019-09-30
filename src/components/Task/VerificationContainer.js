import React, { useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { moduleControls } from '@expandorg/modules/app';
import { calculateVerificationScore } from '@expandorg/modules/model';

import { addNotification } from '@expandorg/app-utils/app';
import ModulesForm from './ModulesForm';

import { verifyResponse } from '../../sagas/responsesSagas';

import { makeVerficationVariablesSelector } from '../../selectors/variablesSelectors';
import { verifyResponseStateSelector } from '../../selectors/ui';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

export default function VerificationContainer({ assignment, job, task }) {
  const dispatch = useDispatch();
  const verifyState = useSelector(verifyResponseStateSelector);

  const variablsSelector = useMemo(makeVerficationVariablesSelector, []);
  const variables = useSelector(state =>
    variablsSelector(state, task, assignment)
  );

  const submit = useCallback(
    result => {
      if (job) {
        const score = calculateVerificationScore(
          result,
          job.verificationForm.modules,
          moduleControls
        );
        dispatch(verifyResponse(assignment.responseId, score));
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

  return (
    <ModulesForm
      assignment={assignment}
      form={job && job.verificationForm}
      visible={!!(job && task)}
      variables={variables}
      submitState={verifyState}
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
