import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { worker as workerProps, stats as statsProps, routerProps } from '../shared/propTypes';
import Content from '../shared/Content';

import Carousel from './Carousel';
import UnlockMetaMaskModal from './UnlockMetaMaskModal';

import { isWorkerFunded } from '../../model/worker';

import styles from './Login.styles';


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

  showLogin = () => {
    this.setState({ step: 1 });
  }

  render() {
    if (this.state.step === 0) {
      return (
        <Content title="Login">
          <div className={styles.container}>
            <Carousel />
            <button
              className={cn(styles.btn.toString(), styles.startBtn.toString())}
              onClick={this.showLogin}
            >
              Start
            </button>
          </div>
        </Content>
      );
    }
    return (
      <Content title="Login">
        <div className={styles.loginContainer}>
          {this.props.locked && <UnlockMetaMaskModal />}
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
          <button
            className={cn(styles.btn.toString(), styles.loginBtn.toString())}
            onClick={this.props.login}
          >
            Log In
          </button>
        </div>
      </Content>
    );
  }
}
