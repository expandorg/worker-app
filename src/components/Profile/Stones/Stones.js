import React from 'react';

import Stone from './Stone';

import styles from './Stones.module.styl';

const stone = [];

export default function Stones() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Stone Collection</h2>
      <div className={styles.content}>
        {stone.map(s => (
          <Stone key={s.id} stone={s} />
        ))}
      </div>
    </div>
  );
}
