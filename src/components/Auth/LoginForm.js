import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.styl';

export default class LoginForm extends Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  handleChangeField = (field, { target }) => {
    this.setState({ [field]: target.value });
  }

  render() {
    const { onToggle } = this.props;
    const { email, password } = this.state;

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          Login with email
        </h2>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            required
            placeholder="Email address"
            value={email}
            onChange={evt => this.handleChangeField('email', evt)}
          />
          <input
            className={styles.input}
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={evt => this.handleChangeField('password', evt)}
          />
          <button type="submit" className={styles.submit}>
            Sign in
          </button>
        </form>
        <div className={styles.footer}>
          <button className={styles.forgot}>
            I forgot my password
          </button>
          <button className={styles.toggle} onClick={onToggle}>
            Don’t have an account? Sign up!
          </button>
        </div>
      </div>
    );
  }
}
