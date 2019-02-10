import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { Button, ErrorMessage, Input } from '@expandorg/components';

import { loginStateSelector } from '@expandorg/app-auth/selectors';
import { login } from '@expandorg/app-auth/sagas';
import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  loginState: loginStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

class EmailLogin extends Component {
  static propTypes = {
    loginState: requestStateProps.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.loginState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.login(email, password);
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, error: null });
  };

  handleFailed = ({ error }) => {
    this.setState({ error });
  };

  render() {
    const { loginState } = this.props;
    const { email, password, error } = this.state;

    return (
      <div className="gem-email-container">
        <div className={styles.header}>
          <Logo
            width={40}
            height={40}
            viewBox="0 0 50 50"
            className={styles.logo}
          />
          <h2 className={styles.title}>Sign in manually</h2>
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <Input
            className={styles.input}
            type="email"
            required
            placeholder="Email address"
            value={email}
            name="email"
            onChange={this.handleChange}
          />
          <Input
            className={styles.input}
            type="password"
            required
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <div className={styles.forgotContainer}>
            <Link className={styles.forgot} to="/password">
              Forgot password?
            </Link>
          </div>
          <ErrorMessage errors={error} className={styles.error} />
          <Button type="submit" theme="blue" className={styles.submit}>
            Login
          </Button>
        </form>
        <SubmitStateEffect
          submitState={loginState}
          onFailed={this.handleFailed}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailLogin);
