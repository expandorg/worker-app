import React from 'react';
import PropTypes from 'prop-types';

import styles from './Field.module.styl';

const Field = ({ children, title }) => (
  <div className={styles.container}>
    {title &&
      <div className={styles.title}>{title}</div>
    }
    {children}
  </div>
);

Field.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Field.defaultProps = {
  title: null,
};

export default Field;
