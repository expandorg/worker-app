import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';

import AuthForm from './AuthForm';

import { notAuthenticated } from '../hoc/authRules';

import styles from './styles.module.styl';

class Login extends Component {
  render() {
    return (
      <DocumentTitle title="Login">
        <div className={styles.container}>
          <div className={styles.panel}>
            <AuthForm />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Login);
