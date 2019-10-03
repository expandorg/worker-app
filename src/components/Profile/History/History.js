import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sort from './Sort';
import Filter from './Filter';
import TaskItem from './TaskItem';

import { fetchTaskHistory } from '../../../sagas/profileSagas';
import { taskHistorySelector } from '../../../selectors/profileSelectors';

import styles from './History.module.styl';

export default function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaskHistory(0));
  }, [dispatch]);

  const tasks = useSelector(taskHistorySelector);

  const [sort, setSort] = useState('recent');
  const onSort = useCallback(val => setSort(val), []);

  const [filter, setFilter] = useState('all');
  const onFilter = useCallback(val => setFilter(val), []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Job History</h2>
        <Filter selected={filter} onSelect={onFilter} />
      </div>
      <div className={styles.content}>
        <Sort onSelect={onSort} selected={sort} />
        <div className={styles.list}>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
