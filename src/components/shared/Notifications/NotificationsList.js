import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useClickOutside } from '@expandorg/components';

import Notification from './Notification';

import styles from './NotificationsList.module.styl';

const initial = [
  {
    id: 0,
    text: 'Company has posted a new job!',
    date: new Date().toDateString(),
  },
  {
    id: 1,
    text: 'Company has posted a new job!',
    date: new Date().toDateString(),
  },
  {
    id: 2,
    text:
      'Company has posted  job Company has posted  job Company has posted  job!',
    date: new Date().toDateString(),
  },
];

export default function NotificationsList({ onHide }) {
  const ref = useRef();
  useClickOutside(ref, onHide);

  const [notifications, setNotifications] = useState(initial);

  const loadNext = useCallback(() => {
    setNotifications((ns) =>
      ns.concat(initial.map((n, i) => ({ ...n, id: ns.length + i })))
    );
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      {notifications.map((n) => (
        <Notification key={n.id} notification={n} onClick={onHide} />
      ))}
      {true && (
        <button className={styles.more} onClick={loadNext}>
          Load More
        </button>
      )}
    </div>
  );
}

NotificationsList.propTypes = {
  onHide: PropTypes.func.isRequired,
};
