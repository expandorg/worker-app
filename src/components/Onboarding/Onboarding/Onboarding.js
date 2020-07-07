import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  Form,
  FormDataProvider,
  Module,
  ReportToggle,
} from '@expandorg/modules';

import { moduleControls } from '@expandorg/modules/app';

import { Panel, useService } from '@expandorg/components';

import { RequestStates } from '@expandorg/app-utils';

import { addNotification } from '@expandorg/app-utils/app';
import GroupFaildDialog from './GroupFaildDialog';
import OnboardingReport from './OnboardingReport';

import { onboardingProps } from '../../shared/propTypes';

import {
  submitOnboarding,
  removeOnboardingMessage,
} from '../../../sagas/onboardingSagas';

import { onboardingVariablesSelector } from '../../../selectors/variablesSelectors';
import { submitOnboardingStateSelector } from '../../../selectors/ui';

import styles from './Onboarding.module.styl';

export default function Onboarding({ jobId, onboarding }) {
  const dispatch = useDispatch();
  const svc = useService();

  const services = useMemo(
    () => new Map([['fileUpload', svc.resolve('fileUpload')]]),
    [svc]
  );

  const submitState = useSelector(submitOnboardingStateSelector);
  const [reportMessage, setReportMessage] = useState(null);

  const moduleError = useCallback((msg) => setReportMessage(msg), []);

  const hide = useCallback(() => {
    dispatch(removeOnboardingMessage(jobId));
  }, [dispatch, jobId]);

  const submit = useCallback(
    (values) => {
      dispatch(submitOnboarding(jobId, values));
    },
    [dispatch, jobId]
  );

  const notify = useCallback(
    (type, msg) => {
      dispatch(addNotification(type, msg));
    },
    [dispatch]
  );

  const variables = useSelector(onboardingVariablesSelector);

  const isSubmitting = submitState.state === RequestStates.Fetching;

  return (
    <div className={styles.container}>
      <Panel className={styles.panel}>
        <div className={styles.actions}>
          <ReportToggle form={onboarding.form} controls={moduleControls}>
            {({ onHide, reasons }) => (
              <OnboardingReport
                jobId={jobId}
                onHide={onHide}
                reasons={reasons}
                report={reportMessage}
              />
            )}
          </ReportToggle>
        </div>
        <div className={styles.form}>
          <FormDataProvider formData={onboarding}>
            <Form
              form={onboarding.form}
              services={services}
              variables={variables}
              controls={moduleControls}
              isSubmitting={isSubmitting}
              onSubmit={submit}
              onNotify={notify}
              onModuleError={moduleError}
            >
              {(props) => <Module {...props} />}
            </Form>
          </FormDataProvider>
        </div>
      </Panel>
      {onboarding.message && (
        <GroupFaildDialog onboarding={onboarding} onHide={hide} />
      )}
    </div>
  );
}

Onboarding.propTypes = {
  jobId: PropTypes.number.isRequired,
  onboarding: onboardingProps.isRequired,
};
