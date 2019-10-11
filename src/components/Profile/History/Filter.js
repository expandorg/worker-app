import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from '@expandorg/components';
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
    <Tabs className={styles.container} theme="underline">
      {options.map(option => (
        <Tab
          key={option}
          className={styles.option}
          active={option === selected}
          onClick={() => onSelect(option)}
        >
          {titles[option]}
        </Tab>
      ))}
    </Tabs>
  );
}

Filter.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
