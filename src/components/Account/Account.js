import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';
import { logout } from '@expandorg/app-auth/sagas';

import { Button, Panel, useToggle } from '@expandorg/components';

import {
  AddressDialog,
  EditEmailDialog,
  ChangePasswordDialog,
} from '@expandorg/app-account/components';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import XPN from './XPN';
import Transactions from './Transactions/Transactions';

import Field from './Field';
import ToggleEmailConfirm from './ToggleEmailConfirm';

import styles from './Account.module.styl';

function Account() {
  const dispatch = useDispatch();
  const [email, toggleEmail] = useToggle(false);
  const [address, toggleAddress] = useToggle(false);
  const [password, togglePassword] = useToggle(false);

  const user = useSelector(userSelector);

  const logoutClick = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Page title="Account">
      <div className={styles.container}>
        <Panel className={styles.panel}>
          <XPN user={user} />
        </Panel>
        <Panel className={styles.panel}>
          <div className={styles.title}>Account Details</div>
          <Field
            title="Account address"
            placeholder="No ethereum address found"
            value={user.address}
            onToggle={toggleAddress}
          />
          <Field
            title="Email address"
            placeholder="No email found"
            value={user.email}
            onToggle={toggleEmail}
          >
            <ToggleEmailConfirm user={user} />
          </Field>
          <Field placeholder="Change password" onToggle={togglePassword} />
          <div className={styles.actions}>
            <Button
              className={styles.logout}
              theme="white-blue"
              onClick={logoutClick}
            >
              Logout
            </Button>
          </div>
          {address && <AddressDialog user={user} onHide={toggleAddress} />}
          {email && <EditEmailDialog user={user} onHide={toggleEmail} />}
          {password && (
            <ChangePasswordDialog user={user} onHide={togglePassword} />
          )}
        </Panel>
        <Transactions />
      </div>
    </Page>
  );
}

export default authenticated(Account);
