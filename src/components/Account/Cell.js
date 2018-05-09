import React from 'react';
import PropTypes from 'prop-types';

import styles from './Account.module.styl';

const Cell = ({ children, title }) => (
  <div className={styles.cell}>
    <div className={styles.subHeading}>{title}</div>
    {children}
  </div>
);

Cell.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Cell;
