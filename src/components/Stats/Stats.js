import React from 'react';
import PropTypes from 'prop-types';
import { userProps } from '../shared/propTypes';

import Content from '../shared/Content';

import styles from './Stats.module.styl';

const Stats = ({ user }) => (
  <Content title="Submission Stats">
    <div className={styles.container}>
      <div className={styles.completed}>
        {user.stats.pending || 0}
        <span className={styles.span}>Tasks Pending*</span>
      </div>
      <div className={styles.completed}>
        {user.stats.accepted || 0}
        <span className={styles.span}>Tasks Accepted</span>
      </div>
      <div className={styles.completed}>
        {user.stats.rejected || 0}
        <span className={styles.span}>Tasks Rejected</span>
      </div>
      <span>*Tasks are pending acceptance</span>
    </div>
  </Content>
);

Stats.propTypes = {
  user: PropTypes.shape(userProps).isRequired,
};

export default Stats;
