import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Button } from '@expandorg/components';
import { JobLogo } from '@expandorg/components/app';
import { userProps } from '@expandorg/app-auth';
import { EmailConfirmed } from '@expandorg/app-account/components';

import { ReactComponent as GemsIcon } from '../../assets/gem.svg';

import I from '../../shared/I';
import { jobProps, assignmentProps } from '../../shared/propTypes';
import { jobHasSufficientFunds } from '../../../model/jobs';

import {
  isTaskAssignment,
  isVerificationAssignment,
} from '../../../model/assignments';

import styles from './Job.module.styl';

export default function Job({ job, assignment, user, onAssign, onTopup }) {
  const assign = useCallback(() => onAssign(job), [job, onAssign]);
  const topup = useCallback(() => onTopup(job), [job, onTopup]);

  const isJoined = job.isVerification
    ? isTaskAssignment(assignment)
    : isVerificationAssignment(assignment);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <JobLogo className={styles.logo} src={job.logo} name={job.name} />
        <div className={styles.heading}>
          <div className={styles.name}>{job.name}</div>
          {job.isVerification && (
            <div className={styles.description}>Virify</div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {!jobHasSufficientFunds(job, user) && (
          <button className={styles.warning} onClick={topup}>
            {job.logic.funding.requirement}
            <I
              tooltipOrientation="right"
              className={styles.i}
              tooltip={`You need ${job.logic.funding.requirement} to qualify for this job.`}
            />
          </button>
        )}
        <div className={styles.primary}>
          <div className={styles.reward}>
            {job.logic.funding.reward}
            <GemsIcon viewBox="0 0 18 16" height={15} className={styles.icon} />
          </div>
          {isJoined && (
            <Link
              className={cn(
                'gem-button',
                'gem-button-white-blue',
                styles.assign
              )}
              to={`/tasks/${assignment.taskId}`}
            >
              Continue
            </Link>
          )}
          {!isJoined && (
            <EmailConfirmed user={user} onConfirmed={assign}>
              {({ onToggle }) => (
                <Button
                  theme="white-blue"
                  className={styles.assign}
                  onClick={onToggle}
                >
                  Start
                </Button>
              )}
            </EmailConfirmed>
          )}
        </div>
      </div>
    </div>
  );
}

Job.propTypes = {
  job: jobProps.isRequired,
  user: userProps.isRequired,
  assignment: assignmentProps,
  onAssign: PropTypes.func.isRequired,
  onTopup: PropTypes.func.isRequired,
};

Job.defaultProps = {
  assignment: null,
};
