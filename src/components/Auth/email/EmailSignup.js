import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';

import { Button, ErrorMessage, Input } from '@expandorg/components';

import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { signupStateSelector } from '@expandorg/app-auth/selectors';
import { signup } from '@expandorg/app-auth/sagas';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  signupState: signupStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

class EmailSignup extends Component {
  static propTypes = {
    signupState: requestStateProps.isRequired,
    signup: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.signupState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.signup({ email, password });
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, error: null });
  };

  handleFailed = ({ error }) => {
    this.setState({ error });
  };

  render() {
    const { signupState } = this.props;
    const { email, password, error } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo
            width={40}
            height={40}
            viewBox="0 0 50 50"
            className={styles.logo}
          />
          <h2 className={styles.title}>Sign up manually</h2>
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
            value={password}
            name="password"
            onChange={this.handleChange}
          />
          <ErrorMessage errors={error} className={styles.error} />
          <Button
            type="submit"
            theme="blue"
            className={cn(styles.submit, styles.signUpSubmit)}
          >
            Sign up
          </Button>
        </form>
        <SubmitStateEffect
          submitState={signupState}
          onFailed={this.handleFailed}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignup);
