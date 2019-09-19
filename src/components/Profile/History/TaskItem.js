import React from 'react';
import PropTypes from 'prop-types';

import { format, parse } from 'date-fns';

import { JobLogo } from '@expandorg/components/app';
import { ReactComponent as GemsIcon } from '../../assets/gem.svg';

import styles from './TaskItem.module.styl';

export default function TaskItem({ task }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <JobLogo className={styles.logo} name={task.name} />
        <div className={styles.heading}>
          <div className={styles.name}>{task.name}</div>
          <div className={styles.date}>
            {format(parse(task.createDate), 'MM/DD/YYYY HH:mm')}
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        {task.rejected && <div className={styles.rejected}>rejected</div>}
        <div className={styles.reward}>
          {task.reward}
          <GemsIcon className={styles.gem} />
        </div>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    createDate: PropTypes.string,
    reward: PropTypes.number,
    rejected: PropTypes.bool,
  }).isRequired,
};
