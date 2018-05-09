import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loading.module.styl';

export default function Loading({ depositStage, value }) {
  return (
    <div className={styles.loading}>
      Approving transaction, step {depositStage} of 2<br />
      This may take some time,<br />
      PLEASE DO NOT NAVIGATE AWAY<br />
      Depositing {value} Gems<br />
      <img
        className={styles.spinner}
        alt="loading..."
        src="/images/loading-animation.gif"
        width="100"
        height="100"
      />
    </div>
  );
}

Loading.propTypes = {
  value: PropTypes.number.isRequired,
  depositStage: PropTypes.number.isRequired,
};
