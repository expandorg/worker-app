import React from 'react';

import { useToggle } from '@expandorg/components';
import { ReactComponent as Icon } from '../../assets/notifications.svg';

import NotificationsList from './NotificationsList';

import styles from './Badge.module.styl';

export default function Badge() {
  const counter = 0;
  const [display, toggle] = useToggle(false);

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={toggle}>
        <Icon className={styles.icon} />
        {!!counter && <div className={styles.counter}>{counter}</div>}
      </button>
      {display && !!counter && <NotificationsList onHide={toggle} />}
    </div>
  );
}
