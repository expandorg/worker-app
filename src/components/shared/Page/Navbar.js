import React from 'react';

import { Navbar as UINavbar } from '@expandorg/components/app';

import Badge from '../Notifications/Badge';

import styles from './Navbar.module.styl';

export default function Navbar({ children, ...rest }) {
  return (
    <UINavbar {...rest}>
      <div className={styles.content}>
        <Badge />
      </div>
    </UINavbar>
  );
}
