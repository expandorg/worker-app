import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@expandorg/components';

import Sort from './Sort';
import Filter from './Filter';
import TaskItem from './TaskItem';

import { fetchTaskHistory } from '../../../sagas/profileSagas';
import { taskHistorySelector } from '../../../selectors/profileSelectors';

import styles from './History.module.styl';

export default function History() {
  const dispatch = useDispatch();

  const ts = useSelector(taskHistorySelector);

  useEffect(() => {
    dispatch(fetchTaskHistory());
  }, [dispatch]);

  const [status, setStatus] = useState('all');
  const onStatus = useCallback(
    val => {
      setStatus(val);
      dispatch(fetchTaskHistory(undefined, val));
    },
    [dispatch]
  );

  const [sort, setSort] = useState(null);
  const onSort = useCallback(
    val => {
      setSort(val);
      dispatch(fetchTaskHistory(undefined, status, val));
    },
    [dispatch, status]
  );

  const nextPage = useCallback(() => {
    dispatch(fetchTaskHistory(ts.next, status, sort));
  }, [dispatch, sort, status, ts.next]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Job History</h2>
        <Filter selected={status} onSelect={onStatus} />
      </div>
      <div className={styles.content}>
        <Sort onSelect={onSort} selected={sort} />
        <div className={styles.list}>
          {ts.tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          {ts.next && (
            <Button
              size="small"
              className={styles.next}
              theme="white-blue"
              onClick={nextPage}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
