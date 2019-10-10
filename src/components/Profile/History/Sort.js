import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './Sort.module.styl';

const options = ['token', 'submission'];
const titles = {
  token: 'Tokens',
  submission: 'Recent',
};

export default function Sort({ selected, onSelect }) {
  return (
    <div className={styles.container}>
      {options.map(option => (
        <button
          key={option}
          className={cn(styles.option, {
            [styles.selected]: option === selected,
          })}
          onClick={() => onSelect(option)}
        >
          {titles[option]}
        </button>
      ))}
    </div>
  );
}

Sort.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
