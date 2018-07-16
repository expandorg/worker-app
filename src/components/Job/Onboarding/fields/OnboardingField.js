import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Rules from './Rules';
import QA from './QA/QA';

import { FieldType } from '../../../../model/enums';
import { fieldProps } from '../../../shared/propTypes';

import Field from '../../../shared/form/Field';

export default class OnboardingField extends PureComponent {
  static propTypes = {
    field: PropTypes.shape(fieldProps).isRequired,
    value: PropTypes.any, // eslint-disable-line
    isSubmitting: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  }

  render() {
    const {
      field, value, onChange, isSubmitting, onSubmit,
    } = this.props;

    switch (field.type) {
      case FieldType.rules:
        return <Rules field={field} value={value} onChange={onChange} />;
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
    return <Field {...this.props} />;
  }
}
