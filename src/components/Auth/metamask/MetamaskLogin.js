import React, { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { SubmitStateEffect } from '@expandorg/app-utils';
import { ErrorMessage } from '@expandorg/components';

import { loginMetamaskStateSelector } from '@expandorg/app-auth/selectors';
import { loginMetamask } from '@expandorg/app-auth/sagas';

import { MetamaskState } from '@expandorg/app-web3';
import { metamaskStateSelector } from '@expandorg/app-web3/selectors';

import { MetamaskPromt } from '@expandorg/app-web3/components';

import styles from './styles.module.styl';

export default function MetamaskLogin() {
  const dispatch = useDispatch();

  const metamaskState = useSelector(metamaskStateSelector);
  const loginState = useSelector(loginMetamaskStateSelector);

  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState(false);

  const hide = useCallback(() => setDialog(false), []);
  const login = useCallback(() => dispatch(loginMetamask()), [dispatch]);
  const failed = useCallback(p => setError(p.error), []);

  const click = useCallback(() => {
    if (metamaskState !== MetamaskState.Authorized) {
      setDialog(true);
    } else {
      dispatch(loginMetamask());
    }
  }, [dispatch, metamaskState]);

  return (
    <div className={styles.container}>
      <button className="gem-metamask-button" onClick={click}>
        <ins className={styles.fox} /> Sign in with MetaMask
      </button>
      {dialog && (
        <MetamaskPromt
          metamaskState={metamaskState}
          onLogin={login}
          onHide={hide}
          error={error}
        />
      )}
      <ErrorMessage errors={error} className={styles.error} />
      <SubmitStateEffect submitState={loginState} onFailed={failed} />
    </div>
  );
}
