import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorMessage.module.styl';

const ErrorMessage = ({ error, onClose }) => (
  <div className={styles.error}>
    {error}
    <button className={styles.close} onClick={onClose}>
      ✕
    </button>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
