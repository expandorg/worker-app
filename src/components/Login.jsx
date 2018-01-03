import React, { PureComponent } from 'react';
import { css } from 'glamor';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import Carousel from './Carousel';

const styles = {
  container: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  loginContainer: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '150px',
    marginRight: '150px',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  startBtn: css({
    width: '174px',
    height: '64px',
    borderRadius: '4px',
    backgroundColor: '#ff7092',
    marginTop: '35px',
    fontSize: '11px',
    textAlign: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    ':focus': {
      outline: '0px',
    },
  }),
  loginBtn: css({
    width: 'calc(174px / 1.5)',
    height: 'calc(64px / 1.5)',
    borderRadius: '4px',
    backgroundColor: '#ff7092',
    marginTop: '17.5px',
    fontSize: '11px',
    textAlign: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    ':focus': {
      outline: '0px',
    },
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

  componentWillMount() {
    this.props.setTitle('Login');
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  checkAuth() {
    if (this.props.isAuthorized) {
      this.props.replace('/account');
    }
  }

  showLogin() {
    this.setState({ step: 1 });
  }

  render() {
    if (this.state.step === 0) {
      return (
        <div className={styles.container}>
          <Carousel />
          <button className={styles.startBtn} onClick={this.showLogin}>Start</button>
        </div>
      );
    }
    return (
      <div className={styles.loginContainer}>
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
        <button className={styles.loginBtn} onClick={this.props.login}>Log In</button>
      </div>
    );
  }
}

Login.defaultProps = {
  isAuthorized: null,
};

Login.propTypes = {
  isAuthorized: PropTypes.bool,
  login: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default Login;
