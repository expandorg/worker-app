import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';
import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import Countdown from '../../shared/Countdown';

import { assignJob } from '../../../sagas/jobsSagas';
import { jobListSelector } from '../../../selectors/jobsSelectors';
import { assignJobStateSelector } from '../../../selectors/ui';

const linkClasses = cn(
  'gem-button',
  'gem-button-secondary',
  'gem-dialogform-button'
);

export default function SubmissionResultDialog({ jobId, onAssignComplete }) {
  const dispatch = useDispatch();

  const jobs = useSelector(jobListSelector);
  const submitState = useSelector(assignJobStateSelector);

  const assign = useCallback(() => {
    if (submitState.state !== RequestStates.Fetching) {
      dispatch(assignJob(jobId));
    }
  }, [dispatch, jobId, submitState.state]);

  const assignable = jobs.includes(jobId);

  return (
    <Dialog visible hideButton contentLabel="submit task">
      <DF.Container>
        <DF.Title>Task Submitted</DF.Title>
        <DF.Description>Submission successful!</DF.Description>
        {assignable && (
          <DF.Description>
            <Countdown interval={1000} expireIn={5000} onFinish={assign}>
              {({ timeLeft, finished }) =>
                finished
                  ? 'Assigning to task...'
                  : `You will be automatically assigned to this task in ${Math.ceil(
                      timeLeft / 1000
                    )} seconds`
              }
            </Countdown>
          </DF.Description>
        )}
        <DF.Actions>
          <Link to="/" className={linkClasses}>
            Browse jobs
          </Link>
          {assignable && (
            <Button className="gem-dialogform-button" onClick={assign}>
              Start this task
            </Button>
          )}
        </DF.Actions>
      </DF.Container>
      <SubmitStateEffect
        submitState={submitState}
        onComplete={onAssignComplete}
      />
    </Dialog>
  );
}

SubmissionResultDialog.propTypes = {
  jobId: PropTypes.number.isRequired,
  onAssignComplete: PropTypes.func.isRequired,
};
