import React, { useState, useCallback } from 'react';

import { range } from '@expandorg/utils';
import Sort from './Sort';
import Filter from './Filter';
import TaskItem from './TaskItem';

import styles from './History.module.styl';

const tasks = range(10).map(id => ({
  id,
  name: 'Task Name',
  createDate: 'Thu Sep 19 2019 21:13:48 GMT+0300 (Moscow Standard Time)',
  reward: 200,
  rejected: id === 3,
}));

export default function History() {
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
