import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Login.module.styl';

export default class Login extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  render() {
    const { onLogin, action } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.screenshot} />
        <div className={styles.info}>
          <div className={styles.instructions}>
            You’ll need to sign in using MetaMask<br />
            (similar to the above). Click below to log in.
          </div>
          <button className={styles.login} onClick={onLogin}>
            {action}
          </button>
        </div>
      </div>
    );
  }
}
