/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';

import { useClickOutside } from '@expandorg/components';

import { ReactComponent as Icon } from '../../assets/notifications.svg';

import styles from './Badge.module.styl';

export default function Badge() {
  const counter = 0;

  const [display, setDispay] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => setDispay(false));

  return (
    <div ref={ref} className={styles.container}>
      <div onClick={() => setDispay(!display)}>
        <Icon className={styles.icon} />
        {!!counter && <div className={styles.counter}>{counter}</div>}
      </div>
      {display && !!counter && <div className={styles.list}>list lalala</div>}
    </div>
  );
}
