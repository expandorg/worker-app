import React, { Component } from 'react';

import MetamaskLogin from './metamask/MatamaskLogin';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import styles from './AuthForm.module.styl';

export default class AuthForm extends Component {
  state = {
    signup: false,
  }

  handleToggle = () => {
    this.setState(({ signup }) => ({ signup: !signup }));
  }

  render() {
    const { signup } = this.state;
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>
          Login to Gems.org
        </h2>
        <div className={styles.inner}>
          <MetamaskLogin />
          {signup
            ? <SignupForm onToggle={this.handleToggle} />
            : <LoginForm onToggle={this.handleToggle} />
          }
        </div>
      </div>
    );
  }
}
