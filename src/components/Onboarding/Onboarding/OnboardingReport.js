import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { ReportForm } from '@expandorg/modules';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { reportOnboardingStateSelector } from '../../../selectors/ui';
import { reportOnboarding } from '../../../sagas/onboardingSagas';

export default function OnboardingReport({ report, reasons, onHide, jobId }) {
  const dispatch = useDispatch();
  const reportState = useSelector(reportOnboardingStateSelector);

  const submit = useCallback(
    (reason, message) => {
      dispatch(reportOnboarding(jobId, reason, message));
    },
    [dispatch, jobId]
  );

  return (
    <>
      <ReportForm
        onHide={onHide}
        reasons={reasons}
        report={report}
        error={reportState.error}
        isReporting={reportState.state === RequestStates.Fetching}
        onReport={submit}
      />
      <SubmitStateEffect submitState={reportState} onComplete={onHide} />
    </>
  );
}

OnboardingReport.propTypes = {
  jobId: PropTypes.number.isRequired,
  reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  report: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

OnboardingReport.defaultProps = {
  report: null,
};
