import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Progress.module.styl';

export default class Progress extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    triesLeft: PropTypes.number.isRequired,
  };

  render() {
    const {
      number, total, triesLeft,
    } = this.props;
    return (
      <div className={styles.stats}>
        <div className={styles.block}>
          Question<span className={styles.number}>{number} / {total}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>{triesLeft}</span>Tries left
        </div>
      </div>
    );
  }
}
