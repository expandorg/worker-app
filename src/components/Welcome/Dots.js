import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Dots.module.styl';

export default class Dots extends Component {
  static propTypes ={
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render() {
    const {
      count, active, onSelect,
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          {[...Array(count).keys()].map(index => (
            <button
              key={index}
              className={cn(styles.item, { [styles.active]: active === index })}
              onClick={() => onSelect(index)}
            >
              <ins className={styles.dot} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
