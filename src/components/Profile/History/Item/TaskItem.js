import React from 'react';
import PropTypes from 'prop-types';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { useToggle } from '@expandorg/components';
import { JobLogo } from '@expandorg/components/app';

import Details from './Details';
import { ReactComponent as GemsIcon } from '../../../assets/gem.svg';

import styles from './TaskItem.module.styl';

export default function TaskItem({ task, services }) {
  const [expanded, toggle] = useToggle();

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <div className={styles.container}>
      <div className={styles.preview} onClick={toggle}>
        <div className={styles.info}>
          <JobLogo className={styles.logo} name={task.title} />
          <div className={styles.heading}>
            <div className={styles.name}>{task.title}</div>
            <div className={styles.date}>
              {format(parse(task.submitted_at), 'MM/DD/YYYY HH:mm')}
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          {task.accepted === true && (
            <div className={styles.accepted}>accepted</div>
          )}
          {task.accepted === false && (
            <div className={styles.rejected}>rejected</div>
          )}
          <div className={styles.reward}>
            {task.gems}
            <GemsIcon className={styles.gem} />
          </div>
        </div>
      </div>
      {expanded && <Details task={task} services={services} />}
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    accepted: PropTypes.bool,
    gems: PropTypes.number,
  }).isRequired,
  services: PropTypes.shape({}).isRequired,
};
