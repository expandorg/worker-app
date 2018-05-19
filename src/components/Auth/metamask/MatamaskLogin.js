import React, { Component } from 'react';

import styles from './MatamaskLogin.module.styl';

export default class MatamaskLogin extends Component {
  render() {
    return (
      <div className={styles.container}>
        <button className={styles.login}>
          <ins className={styles.fox} /> Login with MetaMask
        </button>
      </div>
    );
  }
}
