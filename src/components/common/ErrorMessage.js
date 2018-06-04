import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ErrorMessage.module.styl';

export default function ErrorMessage({ error, className }) {
  return !error ? null : (
    <div className={cn(styles.container, className)}>
      {error}
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: null,
  className: null,
};
