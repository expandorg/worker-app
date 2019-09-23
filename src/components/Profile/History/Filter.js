import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './Filter.module.styl';

const options = ['all', 'pedning', 'inprogress', 'completed', 'rejected'];
const titles = {
  all: 'All',
  pedning: 'Pedning',
  inprogress: 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected',
};

export default function Filter({ selected, onSelect }) {
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

Filter.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
