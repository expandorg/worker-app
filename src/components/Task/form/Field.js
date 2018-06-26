import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../common/ErrorMessage';

import TextField from './TextField';
import OneColumn from './OneColumn';
import TwoColums from './TwoColums';
import YesNo from './YesNo';

import { TaskFieldType } from '../../../model/enums';

import styles from './Field.module.styl';

export default class Field extends PureComponent {
  static propTypes = {
    field: PropTypes.shape({}).isRequired,
    error: PropTypes.shape({}),
    value: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
    error: null,
  }

  renderField() {
    const { field, value, onChange } = this.props;
    switch (field.type) {
      case TaskFieldType.text:
      case TaskFieldType.number:
      case TaskFieldType.email:
      case TaskFieldType.password:
        return (
          <TextField field={field} value={value} onChange={onChange} />
        );
      case TaskFieldType.list:
        return (
          <OneColumn
            choices={field.choices}
            onChange={onChange}
          />
        );
      case TaskFieldType.twoColumnsList:
        return (
          <TwoColums
            choices={field.choices}
            onChange={onChange}
          />
        );
      case TaskFieldType.yesNo:
        return (
          <YesNo
            onChange={onChange}
          />
        );
      default:
        break;
    }
    return null;
  }

  render() {
    const { field, error } = this.props;
    return (
      <div className={styles.container}>
        {this.renderField()}
        <ErrorMessage field={field.name} error={error} className={styles.error} />
      </div>
    );
  }
}
