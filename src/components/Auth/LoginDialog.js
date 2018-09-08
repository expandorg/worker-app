import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';

import AuthForm from './AuthForm';

import styles from './LoginDialog.module.styl';

export default class LoginDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide } = this.props;
    return (
      <Dialog onHide={onHide} visible contentLabel="Login">
        <div className={styles.container}>
          <AuthForm />
        </div>
      </Dialog>
    );
  }
}
