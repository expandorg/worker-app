import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Clipboard from 'react-clipboard.js';

import styles from './Editable.module.styl';

export default class Editable extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  };

  render() {
    const { value, placeholder, onEdit } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.value}>{value || placeholder}</div>
          {value && (
            <Clipboard className={styles.copy} data-clipboard-text={value}>
              Copy
            </Clipboard>
          )}
        </div>
        <Button className={styles.edit} onClick={onEdit}>
          Edit
        </Button>
      </div>
    );
  }
}
