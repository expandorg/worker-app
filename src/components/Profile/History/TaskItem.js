import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { format, parse } from 'date-fns';

import { JobLogo } from '@expandorg/components/app';
import { ReactComponent as GemsIcon } from '../../assets/gem.svg';

import styles from './TaskItem.module.styl';

export default function TaskItem({ task, details, onFetchDetails }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => {
    if (!expanded && !details) {
      onFetchDetails(task.id);
    }
    setExpanded(!expanded);
  }, [details, expanded, onFetchDetails, task.id]);

  console.log(details);

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
          {!task.status && <div className={styles.rejected}>rejected</div>}
          <div className={styles.reward}>
            {task.gems}
            <GemsIcon className={styles.gem} />
          </div>
        </div>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    status: PropTypes.string,
    gems: PropTypes.number,
  }).isRequired,
  details: PropTypes.shape({}),
  onFetchDetails: PropTypes.func.isRequired,
};

TaskItem.defaultProps = {
  details: null,
};
