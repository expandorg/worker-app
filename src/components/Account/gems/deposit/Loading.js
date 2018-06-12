import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loading.module.styl';

export default function Loading({ stage, value }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.p}>Approving transaction, step {stage} of 2</p>
        <p className={styles.p}>This may take some time,</p>
        <p className={styles.p}>PLEASE DO NOT NAVIGATE AWAY</p>
        <p className={styles.p}>Depositing {value} Gems</p>
        <img className={styles.spinner} alt="Processing..." src="/images/loading-animation.gif" />
      </div>
    </div>
  );
}

Loading.propTypes = {
  value: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
};
