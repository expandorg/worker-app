import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { stats as statsProps } from './shared/propTypes';
import { FLEX_PANEL } from './common/style-constants';

import Content from './shared/Content';

const styles = {
  container: FLEX_PANEL,
  completed: css({
    width: '30%',
    display: 'inline-block',
    border: 'solid 1px #f2f2f2',
    borderRadius: '4px',
    fontSize: '40px',
    color: '#ff7092',
    textAlign: 'center',
    paddingTop: '46px',
    paddingBottom: '46px',
    marginBottom: '25px',
    '> span': {
      fontSize: '16px',
      color: '#3a506b',
      display: 'block',
    },
  }),
};

const Stats = ({ stats }) => (
  <Content title="Submission Stats">
    <div className={styles.container}>
      <div className={styles.completed}>
        {stats.pending || 0}
        <span>Tasks Pending*</span>
      </div>
      <div className={styles.completed}>
        {stats.accepted || 0}
        <span>Tasks Accepted</span>
      </div>
      <div className={styles.completed}>
        {stats.rejected || 0}
        <span>Tasks Rejected</span>
      </div>
      <span>*Tasks are pending acceptance</span>
    </div>
  </Content>
);

Stats.propTypes = {
  stats: PropTypes.shape(statsProps).isRequired,
};

export default Stats;
