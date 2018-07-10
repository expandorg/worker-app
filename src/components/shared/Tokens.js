import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import GemsIcon from '../common/GemsIcon';

import styles from './Tokens.module.styl';

const Tokens = ({ value, className }) => (
  <span className={cn(styles.container, className)}>
    {value} <GemsIcon className={styles.icon} />
  </span>
);

Tokens.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
};

Tokens.defaultProps = {
  className: null,
};

export default Tokens;
