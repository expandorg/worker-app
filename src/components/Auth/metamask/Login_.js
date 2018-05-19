import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from '../shared/Content';

import StartLogin from './StartLogin';


import styles from './Login.module.styl';

export default class Login extends Component {
  static propTypes = {
    loginMetamask: PropTypes.func.isRequired,
  }

  state = {
    step: 0,
  }

  handleStartClick = () => {
    this.setState({ step: 1 });
  }

  render() {
    const { step } = this.state;
    // return null;

    if (step === 0) {
      return (
        <StartLogin onStartClick={this.handleStartClick} />
      );
    }

    return (
      <Content title="Login">
        <div className={styles.container}>
          <img
            className={styles.screenShot}
            src="/images/login-screenshot.svg"
            alt="Login Screenshot"
          />
          <span className={styles.instructions}>
            You’ll need to sign in using MetaMask<br />
            (similar to the above). Click below to log in.
          </span>
          <button className={styles.login} onClick={this.props.loginMetamask}>
            Log In
          </button>
        </div>
      </Content>
    );
  }
}
