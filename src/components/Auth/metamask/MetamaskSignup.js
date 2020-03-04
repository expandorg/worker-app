import React, { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { ErrorMessage } from '@expandorg/components';

import { SubmitStateEffect } from '@expandorg/app-utils';
import { signupMetamaskStateSelector } from '@expandorg/app-auth/selectors';
import { signupMetamask } from '@expandorg/app-auth/sagas';

import { metamaskStateSelector } from '@expandorg/app-web3/selectors';
import { MetamaskPromt } from '@expandorg/app-web3/components';
import { MetamaskState } from '@expandorg/app-web3';

import styles from './styles.module.styl';

export default function MetamaskSignup() {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [metamaskDialog, setMetamaskDialog] = useState(false);

  const mmask = useSelector(metamaskStateSelector);
  const signupState = useSelector(signupMetamaskStateSelector);

  const hide = useCallback(() => setMetamaskDialog(false), []);
  const failed = useCallback(p => setError(p.error), []);

  const signup = useCallback(() => dispatch(signupMetamask()), [dispatch]);

  const click = useCallback(() => {
    if (mmask.state !== MetamaskState.Authorized) {
      setMetamaskDialog(true);
    } else {
      dispatch(signupMetamask());
    }
  }, [dispatch, mmask.state]);

  return (
    <div className={styles.container}>
      <button className="gem-metamask-button" onClick={click}>
        <ins className={styles.fox} /> Sign up with MetaMask
      </button>
      {metamaskDialog && (
        <MetamaskPromt
          onAction={signup}
          onHide={hide}
          action="Sign up"
          error={error}
        />
      )}
      <ErrorMessage errors={error} className={styles.error} />
      <SubmitStateEffect submitState={signupState} onFailed={failed} />
    </div>
  );
}
