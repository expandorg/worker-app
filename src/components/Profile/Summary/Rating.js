import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { range } from '@expandorg/utils';

import { ReactComponent as Star } from './rating.svg';

import styles from './Rating.module.styl';

export default function Rating({ rating }) {
  return (
    <div className={styles.container}>
      {range(5).map(i => (
        <Star
          key={i}
          className={cn(styles.star, { [styles.fill]: rating > i })}
        />
      ))}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 5,
};
