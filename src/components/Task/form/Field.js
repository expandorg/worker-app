import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../common/ErrorMessage';

import TextField from './TextField';
import ButtonField from './ButtonField';

import { TaskFieldType } from '../../../model/enums';

import styles from './Field.module.styl';

export default class Field extends PureComponent {
  static propTypes = {
    field: PropTypes.shape({}).isRequired,
    error: PropTypes.shape({}),
    value: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string, // eslint-disable-line
    columnStyle: PropTypes.string, // eslint-disable-line
  };

  static defaultProps = {
    value: null,
    error: null,
  }

  renderField() {
    const {
      field, value, onChange, className,
    } = this.props;
    switch (field.type) {
      case TaskFieldType.text:
      case TaskFieldType.number:
      case TaskFieldType.email:
      case TaskFieldType.password:
        return (
          <TextField field={field} value={value} onChange={onChange} />
        );
      case TaskFieldType.button:
        return (
          <ButtonField
            field={field}
            value={value}
            className={className}
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
    const styleName = this.props.columnStyle ? this.props.columnStyle : 'container';
    const componentStyle = styles[styleName || 'container'];

    return (
      <div className={componentStyle} >
        {this.renderField()}
        <ErrorMessage field={field.name} error={error} className={styles.error} />
      </div>
    );
  }
}
