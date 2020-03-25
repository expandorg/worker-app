import React, { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Button, Input, ErrorMessage } from '@expandorg/components';
import { PageDark, Navbar } from '@expandorg/components/app';
import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { resetPassword } from '@expandorg/app-auth/sagas';
import { resetPasswordStateSelector } from '@expandorg/app-auth/selectors';

import styles from './styles.module.styl';

export default function ResetPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const change = useCallback((evt) => setEmail(evt.target.value), []);

  const submitState = useSelector(resetPasswordStateSelector);
  const isFetching = submitState.state === RequestStates.Fetching;

  const submit = useCallback(
    (evt) => {
      evt.preventDefault();

      if (!isFetching) {
        dispatch(resetPassword(email));
      }
    },
    [isFetching, dispatch, email]
  );

  const [isFetched, setIsFetched] = useState(false);
  const submitted = useCallback(() => setIsFetched(true), []);

  return (
    <PageDark title="Restore password">
      <Navbar title="Restore password" theme="dark" top={false} />
      <div className={styles.container}>
        <div className={styles.panel}>
          <h2 className={styles.title}>Restore password</h2>
          {!isFetched && (
            <form className={styles.form} onSubmit={submit}>
              <Input
                theme="white"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={change}
              />
              <ErrorMessage
                errors={submitState.error}
                className={styles.error}
              />
              <div className={styles.actions}>
                <Button type="submit" className={styles.submit}>
                  {isFetching ? 'Sending...' : 'Restore'}
                </Button>
              </div>
            </form>
          )}
          {isFetched && (
            <div className={styles.result}>
              <p className={styles.message}>
                Check your mail to get instructions on how to reset your
                password
              </p>
              <Link to="/login" className={styles.link}>
                Return to signin
              </Link>
            </div>
          )}
        </div>
      </div>
      <SubmitStateEffect submitState={submitState} onComplete={submitted} />
    </PageDark>
  );
}
