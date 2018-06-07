import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './TextField.module.styl';
import { TaskFieldType } from '../../../model/enums';

const inputTypes = {
  [TaskFieldType.text]: 'text',
  [TaskFieldType.number]: 'text',
  [TaskFieldType.email]: 'email',
  [TaskFieldType.password]: 'password',
};

export default class TextField extends PureComponent {
  static propTypes = {
    field: PropTypes.shape({
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  }

  handleChange = ({ target }) => {
    const { field, onChange } = this.props;
    onChange(field.name, target.value);
  }

  render() {
    const { field, value } = this.props;
    const type = inputTypes[field.type];
    return (
      <input
        type={type}
        autoComplete="off"
        className={styles.input}
        onChange={this.handleChange}
        name={field.name}
        value={value}
        placeholder={field.placeholder || ''}
      />
    );
  }
}
