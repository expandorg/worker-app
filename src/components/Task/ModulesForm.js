import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import differenceInSeconds from 'date-fns/difference_in_seconds';

import { useService, Panel } from '@expandorg/components';
import { Form, Module, formProps, FormDataProvider } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';
import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import TaskActions from './Actions/Actions';
import SubmissionResultDialog from './Results/SubmissionResultDialog';

import useFormPersist from './useFormPersist';

import styles from './styles.module.styl';

const fd = {};

export default function ModulesForm({
  id,
  assignmentId,
  jobId,
  submitState,
  assignState,
  onAssign,
  visible,
  form,
  variables,
  onSubmit,
  onNotify,
  timeThreshold,
  showActions,
}) {
  const svc = useService();
  const services = useMemo(
    () => new Map([['fileUpload', svc.resolve('fileUpload')]]),
    [svc]
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [reportMessage, setReportMessage] = useState(null);

  const [initial, persist, clear] = useFormPersist(id);
  const change = useCallback((value) => persist(value), [persist]);

  const moduleError = useCallback((msg) => setReportMessage(msg), []);
  const submitted = useCallback(() => setIsSubmitted(true), []);
  const assigned = useCallback(() => {
    setReportMessage(null);
    setIsSubmitted(false);
    setStartTime(new Date());
  }, []);

  const submit = useCallback(
    (...args) => {
      if (
        timeThreshold &&
        differenceInSeconds(new Date(), startTime) < timeThreshold
      ) {
        onNotify('error', 'You spent too little time on the task');
      } else {
        onSubmit(...args);
        clear(null);
      }
    },
    [clear, onNotify, onSubmit, startTime, timeThreshold]
  );

  return (
    <>
      {visible && (
        <Panel className={styles.panel}>
          {showActions && (
            <TaskActions
              assignmentId={assignmentId}
              form={form}
              reportMessage={reportMessage}
            />
          )}
          <FormDataProvider formData={fd}>
            <Form
              className={styles.form}
              form={form}
              initial={initial}
              controls={moduleControls}
              services={services}
              variables={variables}
              isSubmitting={submitState.state === RequestStates.Fetching}
              onChange={change}
              onSubmit={submit}
              onNotify={onNotify}
              onModuleError={moduleError}
            >
              {(props) => <Module {...props} />}
            </Form>
          </FormDataProvider>
        </Panel>
      )}
      <SubmitStateEffect submitState={submitState} onComplete={submitted} />
      <SubmitStateEffect submitState={assignState} onComplete={assigned} />
      {isSubmitted && (
        <SubmissionResultDialog jobId={jobId} onAssign={onAssign} />
      )}
    </>
  );
}

ModulesForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  assignmentId: PropTypes.number.isRequired,
  jobId: PropTypes.number.isRequired,
  timeThreshold: PropTypes.number,
  form: formProps,
  visible: PropTypes.bool.isRequired,
  variables: PropTypes.shape({}),
  submitState: requestStateProps.isRequired,
  assignState: requestStateProps.isRequired,
  showActions: PropTypes.bool,
  onAssign: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ModulesForm.defaultProps = {
  form: null,
  showActions: false,
  timeThreshold: 0,
  variables: null,
};
