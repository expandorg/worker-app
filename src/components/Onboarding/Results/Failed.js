import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Panel } from '@expandorg/components';

import { jobProps } from '../../shared/propTypes';

import styles from './styles.module.styl';

export default function OnboardingFailed({ job }) {
  return (
    <div className={styles.container}>
      <Panel className={styles.panel}>
        <h1 className={styles.heading}>Sorry you are out of tries!</h1>
        <div className={styles.title}>{job.onboarding.failureMessage}</div>
        <div className={styles.actions}>
          <Link
            className={cn(
              'gem-button',
              'gem-button-large',
              'gem-button-pink',
              styles.back
            )}
            to="/"
          >
            Ok
          </Link>
        </div>
      </Panel>
    </div>
  );
}

OnboardingFailed.propTypes = {
  job: jobProps.isRequired,
};
