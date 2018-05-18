import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorMessage.module.styl';

const ErrorMessage = ({ error, clearErrors }) => {
  if (!error) {
    return null;
  }
  return (
    <div className={styles.error}>
      {error}
      <button className={styles.close} onClick={clearErrors}>
        ✕
      </button>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  clearErrors: PropTypes.func.isRequired,
};

ErrorMessage.defaultProps = {
  error: null,
};

export default ErrorMessage;
