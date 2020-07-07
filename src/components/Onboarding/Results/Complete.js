import React, { useCallback, useEffect } from 'react';

import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Panel } from '@expandorg/components';

import { RequestStates } from '@expandorg/app-utils';

import { jobProps } from '../../shared/propTypes';

import { assignTask } from '../../../sagas/jobsSagas';
import { assignTaskStateSelector } from '../../../selectors/ui';

import styles from './styles.module.styl';

export default function OnboardingComplete({ job }) {
  const dispatch = useDispatch();

  const assignState = useSelector(assignTaskStateSelector);

  useEffect(() => {
    if (!job.onboarding.successMessage) {
      dispatch(assignTask(job.id, 'replace'));
    }
  }, [dispatch, job]);

  const assign = useCallback(() => dispatch(assignTask(job.id, 'replace')), [
    dispatch,
    job.id,
  ]);

  if (!job.onboarding.successMessage) {
    return null;
  }

  const sending = assignState.state === RequestStates.Fetching;
  const classes = cn('gem-button', 'gem-button-pink', styles.back);

  return (
    <div className={styles.container}>
      <Panel className={styles.panel}>
        <h1 className={styles.heading}>Great job!</h1>
        <div className={styles.title}>{job.onboarding.successMessage}</div>
        <div className={styles.description}>
          Continue with the real task and earn some gems!
        </div>
        <div className={styles.actions}>
          <Button className={styles.start} onClick={assign} disabled={sending}>
            Start
          </Button>
          <Link className={classes} to="/">
            Not interesting
          </Link>
        </div>
      </Panel>
    </div>
  );
}

OnboardingComplete.propTypes = {
  job: jobProps.isRequired,
};
