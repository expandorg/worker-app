import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Alignment.module.styl';

export default class Alignment extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['left', 'right', 'center', 'between']),
    padding: PropTypes.oneOf(['small', 'medium', 'none']),
    vertical: PropTypes.bool,
    vCenter: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    align: 'left',
    padding: 'none',
    className: null,
    vertical: false,
    vCenter: false,
  }

  render() {
    const {
      children, align, padding, className, vertical, vCenter,
    } = this.props;
    const classes = cn(
      styles.container,
      styles[align],
      styles[`${padding}Padding`],
      {
        [styles.horizontal]: !vertical,
        [styles.vertical]: vertical,
        [styles.va]: vCenter,
      },
      className,
    );
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}
