import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './Notification.module.styl';

export default function Notification({ notification, onClick }) {
  const click = useCallback((evt) => onClick(evt, notification), [
    notification,
    onClick,
  ]);

  return (
    <button className={styles.container} onClick={click}>
      <div className={styles.icon} />
      <div className={styles.inner}>
        <div className={styles.text}>{notification.text}</div>
        <div className={styles.date}>{notification.date}</div>
      </div>
    </button>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    text: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
