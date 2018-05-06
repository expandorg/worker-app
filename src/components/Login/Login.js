import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { workerProps, statsProps, routerProps } from '../shared/propTypes';
import Content from '../shared/Content';

import StartLogin from './StartLogin';
import UnlockMetaMaskModal from './UnlockMetaMaskModal';

import { isWorkerFunded } from '../../model/worker';

import styles from './Login.module.styl';


// TODO: redirect after successful login
export default class Login extends PureComponent {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    login: PropTypes.func.isRequired,
    router: PropTypes.shape(routerProps).isRequired,
    locked: PropTypes.bool,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    isAuthorized: null,
    locked: false,
    worker: null,
  }

  state = {
    step: 0,
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  checkAuth() {
    if (this.props.isAuthorized) {
      const redirect = isWorkerFunded(this.props.worker, this.props.stats) ? '/jobs' : '/account';
      this.props.router.replace(redirect);
    }
  }

  handleStartClick = () => {
    this.setState({ step: 1 });
  }

  render() {
    const { locked } = this.props;
    const { step } = this.state;

    if (step === 0) {
      return (
        <StartLogin onStartClick={this.handleStartClick} />
      );
    }

    return (
      <Content title="Login">
        <div className={styles.container}>
          {locked &&
            <UnlockMetaMaskModal />
          }
          <img
            className={styles.screenShot}
            src="/images/login-screenshot.svg"
            alt="Login Screenshot"
          />
          <span className={styles.instructions}>
            You’ll need to sign in using MetaMask
            <br />
            (similar to the above). Click below to log in.
          </span>
          <button className={styles.login} onClick={this.props.login}>
            Log In
          </button>
        </div>
      </Content>
    );
  }
}
