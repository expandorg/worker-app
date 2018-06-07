import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.styl';

import ErrorMessage from '../../common/ErrorMessage';


export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    error: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  render() {
    const { onLogin, action, error } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.screenshot} />
        <div className={styles.info}>
          <div className={styles.instructions}>
            You’ll need to sign in using MetaMask<br />
            (similar to the above). Click below to log in.
          </div>
          <button className={styles.login} onClick={onLogin}>
            {action}
          </button>
          <ErrorMessage error={error} className={styles.error} />
        </div>
      </div>
    );
  }
}
