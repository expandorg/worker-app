import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, useService } from '@expandorg/components';

import Sort from './Sort';
import Filter from './Filter';
import TaskItem from './Item/TaskItem';

import { fetchTaskHistory, fetchDisputes } from '../../../sagas/profileSagas';
import { taskHistorySelector } from '../../../selectors/profileSelectors';

import styles from './History.module.styl';

export default function History() {
  const dispatch = useDispatch();
  const svc = useService();
  const services = useMemo(
    () => new Map([['fileUpload', svc.resolve('fileUpload')]]),
    [svc]
  );

  const ts = useSelector(taskHistorySelector);

  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState(null);

  useEffect(() => {
    dispatch(fetchTaskHistory());
    dispatch(fetchDisputes());
  }, [dispatch]);

  const onStatus = useCallback(
    val => {
      setStatus(val);
      setSort(null);
      dispatch(fetchTaskHistory(undefined, val));
    },
    [dispatch]
  );

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
      <h2 className={styles.title}>Job History</h2>
      <Filter selected={status} onSelect={onStatus} />
      {ts.tasks.length > 0 && (
        <div className={styles.content}>
          <Sort onSelect={onSort} selected={sort} />
          <div className={styles.list}>
            {ts.tasks.map(response => (
              <TaskItem
                key={response.id}
                response={response}
                services={services}
              />
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
      )}
    </div>
  );
}
