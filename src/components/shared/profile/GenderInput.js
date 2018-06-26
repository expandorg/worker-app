import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './GenderInput.module.styl';

export default class GenderInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  handleChage = (evt, gender) => {
    evt.preventDefault();
    const { onChange } = this.props;
    onChange(gender);
  }

  render() {
    const { value } = this.props;
    return (
      <div className={styles.container}>
        <button
          className={cn(styles.button, { [styles.selected]: value === 'female' })}
          onClick={evt => this.handleChage(evt, 'female')}
        >
          Female
        </button>
        <button
          className={cn(styles.button, { [styles.selected]: value === 'male' })}
          onClick={evt => this.handleChage(evt, 'male')}
        >
          Male
        </button>
      </div>
    );
  }
}
