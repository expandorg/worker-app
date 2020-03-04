import React from 'react';

import { JobLogo } from '@expandorg/components/app';
import { jobProps } from '../shared/propTypes';

import styles from './Info.module.styl';

export default function Info({ job }) {
  if (!job) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <JobLogo className={styles.logo} name={job.name} />
        <div className={styles.heading}>
          <div className={styles.name}>{job.name}</div>
          <div className={styles.description}>{job.description}</div>
        </div>
      </div>
    </div>
  );
}

Info.propTypes = {
  job: jobProps,
};

Info.defaultProps = {
  job: null,
};
