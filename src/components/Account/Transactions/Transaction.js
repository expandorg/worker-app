import React from 'react';
import PropTypes from 'prop-types';

import styles from './Transaction.module.styl';

export default function Transaction({ transaction }) {
  return (
    <div className={styles.container}>
      <div>{transaction.id}</div>
    </div>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.shape({ id: PropTypes.string }).isRequired,
};
