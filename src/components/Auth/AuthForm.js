import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { historyProps } from '../shared/propTypes';

import MetamaskLogin from './metamask/MatamaskLogin';

import LoginForm from './email/LoginForm';
import SignupForm from './email/SignupForm';


import styles from './AuthForm.module.styl';

class AuthForm extends Component {
  static propTypes = {
    signup: PropTypes.bool,
    history: PropTypes.shape(historyProps).isRequired,
  }

  static defaultProps = {
    signup: false,
  }


  handleToggle = () => {
    const { signup, history } = this.props;
    history.push(signup ? '/login' : '/signup');
  }

  render() {
    const { signup } = this.props;
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>
          Login to Gems.org
        </h2>
        <div className={styles.inner}>
          <MetamaskLogin />
          {signup
            ? <SignupForm onToggle={this.handleToggle} />
            : <LoginForm onToggle={this.handleToggle} />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(AuthForm);
