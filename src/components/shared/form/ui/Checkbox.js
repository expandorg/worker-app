import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.styl';

export default class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
    label: '',
  }

  handleChange = () => {
    const { onChange, value } = this.props;
    onChange(!value);
  }

  render() {
    const { label, name, value } = this.props;
    return (
      <label htmlFor={name} className={styles.label}>
        <input
          className={styles.input}
          type="checkbox"
          id={name}
          checked={value}
          onChange={this.handleChange}
        />
        <span className={styles.checkmark} />
        <span className={styles.checkmarkLabel}>
          {label}
        </span>
      </label>
    );
  }
}
