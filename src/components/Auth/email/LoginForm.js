import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { Button, Input, ErrorMessage } from '@gemsorg/components';

import { login } from '../../../sagas/authSagas';

import { loginStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  loginState: loginStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

class LoginForm extends Component {
  static propTypes = {
    loginState: requestStateProps.isRequired,
    onToggle: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  componentWillReceiveProps({ loginState: nextState }) {
    const { loginState } = this.props;
    if (nextState.error && nextState.error !== loginState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.loginState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.login(email, password);
    }
  };

  handleChangeField = (field, { target }) => {
    this.setState({ [field]: target.value, error: null });
  };

  render() {
    const { onToggle, loginState } = this.props;
    const { email, password, error } = this.state;
    const isFetching = loginState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Login with email</h2>
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
          <Button suze="large" type="submit" className={styles.submit}>
            {isFetching ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className={styles.footer}>
          <Link className={styles.forgot} to="/password">
            I forgot my password
          </Link>
          <button className={styles.toggle} onClick={onToggle}>
            Don’t have an account? Sign up!
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
