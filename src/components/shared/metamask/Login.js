import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Login.module.styl';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  render() {
    const { onLogin } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.screenshot} />
        <div className={styles.info}>
          <div className={styles.instructions}>
            You’ll need to sign in using MetaMask<br />
            (similar to the above). Click below to log in.
          </div>
          <button className={styles.login} onClick={onLogin}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
}
