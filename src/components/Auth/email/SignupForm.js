import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input, ErrorMessage, Button } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { signupStateSelector } from '@gemsorg/app-auth/selectors';
import { signup } from '@gemsorg/app-auth/sagas';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  signupState: signupStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

class SignupForm extends Component {
  static propTypes = {
    signupState: requestStateProps.isRequired,
    onToggle: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  componentWillReceiveProps({ signupState: nextState }) {
    const { signupState } = this.props;
    if (nextState.error && nextState.error !== signupState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.signupState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.signup({ email, password });
    }
  };

  handleChangeField = (field, { target }) => {
    this.setState({ [field]: target.value, error: null });
  };

  render() {
    const { onToggle, signupState } = this.props;
    const { email, password, error } = this.state;

    const isFetching = signupState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Signup with email</h2>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <Input
            className={styles.input}
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={evt => this.handleChangeField('email', evt)}
          />
          <Input
            className={styles.input}
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={evt => this.handleChangeField('password', evt)}
          />
          <ErrorMessage error={error} className={styles.error} />
          <Button size="large" type="submit" className={styles.submit}>
            {isFetching ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>
        <div className={styles.footer}>
          <button className={styles.toggle} onClick={onToggle}>
            Sign in with existing account
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
