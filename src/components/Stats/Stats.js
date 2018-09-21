import React from 'react';
import { connect } from 'react-redux';

import { Panel } from '@gemsorg/components';

import Content from '../shared/Content';

import { userProps } from '../shared/propTypes';
import { userSelector } from '../../selectors/userSelectors';
import { authenticated } from '../hoc/authRules';

import styles from './Stats.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const Stats = ({ user }) => (
  <Content title="Submission Stats">
    <Panel className={styles.container}>
      <div className={styles.completed}>
        {user.stats.pending}
        <span className={styles.span}>Tasks Pending*</span>
      </div>
      <div className={styles.completed}>
        {user.stats.accepted}
        <span className={styles.span}>Tasks Accepted</span>
      </div>
      <div className={styles.completed}>
        {user.stats.rejected}
        <span className={styles.span}>Tasks Rejected</span>
      </div>
      <span>*Tasks are pending acceptance</span>
    </Panel>
  </Content>
);

Stats.propTypes = {
  user: userProps.isRequired,
};

export default authenticated(connect(mapStateToProps)(Stats));
