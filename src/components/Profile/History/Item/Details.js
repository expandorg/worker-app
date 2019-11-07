import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import ResponsePreview from './ResponsePreview';

import { fetchTaskHistoryEntity } from '../../../../sagas/profileSagas';
import { makeTaskHistoryItemSelector } from '../../../../selectors/profileSelectors';

import styles from './Details.module.styl';

export default function Details({ taskId, services }) {
  const dispatch = useDispatch();

  const itemSelector = useMemo(makeTaskHistoryItemSelector, []);
  const details = useSelector(state => itemSelector(state, taskId));
  const fetched = !!details;

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchTaskHistoryEntity(taskId));
    }
  }, [dispatch, fetched, taskId]);

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
    </div>
  );
}

Details.propTypes = {
  taskId: PropTypes.number.isRequired,
  services: PropTypes.shape({}).isRequired,
};
