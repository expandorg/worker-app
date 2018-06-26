import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Container.module.styl';

const Container = ({ children, className }) => (
  <div className={cn(styles.taskContainer, className)}>
    {children}
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
};

Container.defaultProps = {
  className: null,
};

export default Container;
