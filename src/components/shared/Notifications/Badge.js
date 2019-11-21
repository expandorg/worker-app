import React from 'react';

import { ReactComponent as Icon } from '../../assets/notifications.svg';

import styles from './Badge.module.styl';

export default function Badge() {
  return (
    <div className={styles.container}>
      <Icon />
    </div>
  );
}
