import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../common/ErrorMessage';

import Input from './Input';
import Submit from './Submit';

import Article from './onboarding/Article';
import Rules from './onboarding/Rules';
import QA from './onboarding/QA/QA';

import { FieldType } from '../../../model/enums';
import { fieldProps } from '../propTypes';

import styles from './Field.module.styl';

export default class Field extends PureComponent {
  static propTypes = {
    field: PropTypes.shape(fieldProps).isRequired,
    error: PropTypes.shape({}),
    value: PropTypes.any, // eslint-disable-line
    isSubmitting: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
    error: null,
  }

  renderField() {
    const {
      field, value, onChange, isSubmitting, onSubmit,
    } = this.props;

    switch (field.type) {
      case FieldType.text:
      case FieldType.number:
      case FieldType.email:
      case FieldType.password:
        return <Input field={field} value={value} onChange={onChange} />;
      case FieldType.article:
        return <Article field={field} />;
      case FieldType.rules:
        return <Rules field={field} value={value} onChange={onChange} />;
      case FieldType.submit:
        return <Submit field={field} onSubmit={onSubmit} isSubmitting={isSubmitting} />;
      case FieldType.qa:
        return (
          <QA
            field={field}
            value={value}
            onChange={onChange}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
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
