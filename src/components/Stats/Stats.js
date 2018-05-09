import React from 'react';
import PropTypes from 'prop-types';
import { statsProps } from '../shared/propTypes';

import Content from '../shared/Content';

import styles from './Stats.module.styl';

const Stats = ({ stats }) => (
  <Content title="Submission Stats">
    <div className={styles.container}>
      <div className={styles.completed}>
        {stats.pending || 0}
        <span className={styles.span}>Tasks Pending*</span>
      </div>
      <div className={styles.completed}>
        {stats.accepted || 0}
        <span className={styles.span}>Tasks Accepted</span>
      </div>
      <div className={styles.completed}>
        {stats.rejected || 0}
        <span className={styles.span}>Tasks Rejected</span>
      </div>
      <span>*Tasks are pending acceptance</span>
    </div>
  </Content>
);

Stats.propTypes = {
  stats: PropTypes.shape(statsProps).isRequired,
};

export default Stats;
