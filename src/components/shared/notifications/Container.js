import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Container.module.styl';

export default class Container extends Component {
  static propTypes = {
    onClear: PropTypes.func.isRequired,
  };

  render() {
    const { children, onClear } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
        <button className={styles.clear} onClick={onClear}>
          ✕
        </button>
      </div>
    );
  }
}
