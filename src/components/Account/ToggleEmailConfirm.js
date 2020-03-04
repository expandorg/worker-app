import React from 'react';

import { Tooltip, useToggle } from '@expandorg/components';
import { userProps } from '@expandorg/app-auth';

import { ReactComponent as I } from '@expandorg/uikit/assets/i.svg';

import { ConfirmEmailDialog } from '@expandorg/app-account/components';

import styles from './ToggleEmailConfirm.module.styl';

const Btn = Tooltip(({ children, ...rest }) => (
  <button className={styles.btn} {...rest}>
    <I width="14" height="14" viewBox="0 0 12 12" className={styles.warning} />
    {children}
  </button>
));

export default function ToggleEmailConfirm({ user }) {
  const [dialog, toggle] = useToggle(false);
  if (!user.email) {
    return null;
  }
  return (
    <>
      {!user.emailConfirmed && (
        <Btn onClick={toggle} tooltip="Confirm Email Address" />
      )}
      {dialog && <ConfirmEmailDialog user={user} onHide={toggle} />}
    </>
  );
}

ToggleEmailConfirm.propTypes = {
  user: userProps.isRequired,
};
