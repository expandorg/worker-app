import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import ResponsePreview from './ResponsePreview';

import { fetchTaskHistoryEntity } from '../../../../sagas/profileSagas';
import { makeTaskHistoryItemSelector } from '../../../../selectors/profileSelectors';

import styles from './Details.module.styl';

export default function Details({ task, services }) {
  const dispatch = useDispatch();

  const itemSelector = useMemo(makeTaskHistoryItemSelector, []);
  const details = useSelector(state => itemSelector(state, task.id));
  const fetched = !!details;

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchTaskHistoryEntity(task.id));
    }
  }, [dispatch, fetched, task.id]);

  const disput = useCallback(() => {}, []);

  return (
    <div className={styles.container}>
      {fetched && (
        <ResponsePreview
          form={details.task_form}
          data={details.task_data}
          response={details.response}
          services={services}
        />
      )}
      <div className={styles.actions}>
        {task.accepted === false && (
          <div className={styles.rejection}>
            <div className={styles.reason}>{task.reason}</div>
            <button className={styles.disput} onClick={disput}>
              dispute rejection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

Details.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    accepted: PropTypes.bool,
    gems: PropTypes.number,
    reason: PropTypes.string,
  }).isRequired,
  services: PropTypes.shape({}).isRequired,
};
