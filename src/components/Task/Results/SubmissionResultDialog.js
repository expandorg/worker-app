import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

import Countdown from '../../shared/Countdown';

import { jobListSelector } from '../../../selectors/jobsSelectors';

const linkClasses = cn(
  'gem-button',
  'gem-button-secondary',
  'gem-dialogform-button'
);

export default function SubmissionResultDialog({ jobId, title, onAssign }) {
  const jobs = useSelector(jobListSelector);
  const assignable = jobs.includes(jobId);

  return (
    <Dialog visible hideButton contentLabel="submit task">
      <DF.Container>
        <DF.Title>{title}</DF.Title>
        <DF.Description>Submission successful!</DF.Description>
        {assignable && (
          <DF.Description>
            <Countdown interval={1000} expireIn={5000} onFinish={onAssign}>
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
            <Button className="gem-dialogform-button" onClick={onAssign}>
              Start this task
            </Button>
          )}
        </DF.Actions>
      </DF.Container>
    </Dialog>
  );
}

SubmissionResultDialog.propTypes = {
  jobId: PropTypes.number.isRequired,
  onAssign: PropTypes.func.isRequired,
  title: PropTypes.string,
};

SubmissionResultDialog.defaultProps = {
  title: 'Task Submitted',
};
