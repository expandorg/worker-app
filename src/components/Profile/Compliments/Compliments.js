import React from 'react';

import { range } from '@expandorg/utils';
import Compliment from './Compliment';

import styles from './Compliments.module.styl';

const compliments = range(5).map(id => ({
  id,
  autor: 'Firstname Lastname',
  createDate: new Date().toString(),
  title: 'Title of this compliment goes here.',
  text: range(id + 1)
    .map(c => `${c} Lorem ipsum dolor sit amet, consectetur adipiscing elit`)
    .join(''),
}));

export default function Compliments() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Compliments</h2>
      <div className={styles.content}>
        {compliments.map(c => (
          <Compliment key={c.id} compliment={c} />
        ))}
      </div>
    </div>
  );
}
