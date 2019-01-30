import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as GemsIcon } from '../assets/gem.svg';

import styles from './Hero.module.styl';

const Hero = ({ className, value, title, gems }) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.value}>
      {value || '0'}
      {gems && (
        <div className={styles.gems}>
          <GemsIcon className={styles.icon} />{' '}
        </div>
      )}
    </div>
    <div className={styles.title}>{title}</div>
  </div>
);

Hero.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  gems: PropTypes.bool,
  className: PropTypes.string,
};

Hero.defaultProps = {
  value: null,
  gems: false,
  title: null,
  className: null,
};

export default Hero;
