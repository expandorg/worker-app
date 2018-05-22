import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';

import AuthForm from './AuthForm';

import { notAuthenticated } from '../hoc/authRules';

import styles from './styles.module.styl';

class Signup extends Component {
  render() {
    return (
      <DocumentTitle title="Signup">
        <div className={styles.container}>
          <div className={styles.panel}>
            <AuthForm signup />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Signup);
