import React, { PureComponent } from 'react';
import { css } from 'glamor';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autoBind from 'auto-bind';
import Carousel from './Carousel';
import UnlockMetaMaskModal from './warnings/UnlockMetaMaskModal';
import { worker as workerProps, stats as statsProps } from './shared/propTypes';
import { isWorkerFunded } from '../lib';
import { BTN } from './common/style-constants';

import Content from './shared/Content';

const styles = {
  btn: BTN,
  container: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  loginContainer: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  startBtn: css({
    width: '174px',
    height: '64px',
    marginTop: '35px',
  }),
  loginBtn: css({
    width: 'calc(174px / 1.5)',
    height: 'calc(64px / 1.5)',
    marginTop: '17.5px',
  }),
  instructions: css({
    fontFamily: 'Poppins',
    fontSize: '10.6px',
    fontWeight: '400',
    textAlign: 'center',
    margin: 'auto',
    display: 'block',
  }),
  screenShot: css({
    paddingBottom: '7.5px',
    paddingTop: '50px',
    width: 'calc(414px / 1.5)',
    height: 'calc(556px / 1.5)',
    margin: 'auto',
    textAlign: 'center',
    display: 'block',
  }),
};
// TODO: redirect after successful login
class Login extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      step: 0,
    };
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
      this.props.replace(redirect);
    }
  }

  showLogin() {
    this.setState({ step: 1 });
  }

  render() {
    if (this.state.step === 0) {
      return (
        <Content title="Login">
          <div className={styles.container}>
            <Carousel />
            <button
              className={classNames({ [styles.btn]: true, [styles.startBtn]: true })}
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
            src="images/login-screenshot.svg"
            alt="Login Screenshot"
          />
          <span className={styles.instructions}>
            You’ll need to sign in using MetaMask
            <br />
            (similar to the above). Click below to log in.
          </span>
          <button
            className={classNames({ [styles.btn]: true, [styles.loginBtn]: true })}
            onClick={this.props.login}
          >
            Log In
          </button>
        </div>
      </Content>
    );
  }
}

Login.defaultProps = {
  isAuthorized: null,
  locked: false,
  worker: null,
};

Login.propTypes = {
  isAuthorized: PropTypes.bool,
  login: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  worker: PropTypes.shape(workerProps),
  stats: PropTypes.shape(statsProps).isRequired,
};

export default Login;
