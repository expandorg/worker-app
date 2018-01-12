import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Modal from '../containers/meta-mask-modal';
import { BTN } from '../../../style-constants';

const styles = {
  root: css({
    width: '80%',
    margin: '10px auto',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  img: css({
    paddingBottom: 5,
    paddingTop: 50,
    width: 'auto',
    height: 500,
    margin: 'auto',
    textAlign: 'center',
  }),
  instructions: css({
    fontSize: 12,
    fontWeight: 400,
    margin: '0 10px',
    textAlign: 'center',
    lineHeight: '10px',
    whiteSpace: 'pre-line',
  }),
  login: css(BTN, { marginTop: 25 }),
};

export default function MetaMaskStep({ onLogin, isLoading }) {
  return (
    <div className={styles.root}>
      <Modal />

      <img
        className={styles.img}
        src="images/login-screenshot.svg"
        alt="Login Screenshot"
      />

      <p className={styles.instructions}>
        {`You’ll need to sign in using MetaMask\n
        (similar to the above). Click below to log in.`}
      </p>

      <button className={styles.login} onClick={() => onLogin()}>
        {isLoading ? 'Loading...' : 'Log in'}
      </button>
    </div>
  );
}

MetaMaskStep.defaultProps = {
  onLogin() {},
  isLoading: false,
};

MetaMaskStep.propTypes = {
  onLogin: PropTypes.func,
  isLoading: PropTypes.bool,
};

