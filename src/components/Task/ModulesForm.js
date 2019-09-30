import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

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
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import { assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

export default function ModulesForm({
  submitState,
  visible,
  form,
  assignment,
  variables,
  onSubmit,
  onNotify,
  timeThreshold,
}) {
  const svc = useService();
  const services = useMemo(
    () => new Map([['fileUpload', svc.resolve('fileUpload')]]),
    [svc]
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportMessage, setReportMessage] = useState(null);

  const moduleError = useCallback(msg => setReportMessage(msg), []);
  const submitted = useCallback(() => setIsSubmitted(true), []);
  const assigned = useCallback(() => {
    setReportMessage(null);
    setIsSubmitted(false);
  }, []);

  const isFetching = submitState.state === RequestStates.Fetching;

  return (
    <>
      {visible && (
        <Panel className={styles.panel}>
          <TaskActions
            assignmentId={assignment.id}
            form={form}
            reportMessage={reportMessage}
          />
          <FormDataProvider formData={{}}>
            <Form
              timeThreshold={timeThreshold}
              controls={moduleControls}
              className={styles.form}
              services={services}
              form={form}
              variables={variables}
              errors={submitState.error}
              isSubmitting={isFetching}
              onSubmit={onSubmit}
              onNotify={onNotify}
              onModuleError={moduleError}
            >
              {props => <Module {...props} />}
            </Form>
          </FormDataProvider>
        </Panel>
      )}
      <SubmitStateEffect submitState={submitState} onComplete={submitted} />
      <AssignedJobRedirect />
      {isSubmitted && (
        <SubmissionResultDialog
          jobId={assignment.jobId}
          onAssignComplete={assigned}
        />
      )}
    </>
  );
}

ModulesForm.propTypes = {
  assignment: assignmentProps.isRequired,
  timeThreshold: PropTypes.number,
  form: formProps,
  visible: PropTypes.bool.isRequired,
  variables: PropTypes.shape({}),
  submitState: requestStateProps.isRequired,
  onNotify: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ModulesForm.defaultProps = {
  form: null,
  timeThreshold: 0,
  variables: null,
};
