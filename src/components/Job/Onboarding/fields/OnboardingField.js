import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field, fieldProps } from '@gigs/components/fields';

import Rules from './Rules';
import QA from './QA/QA';

import FieldType from './fieldTypes';

export default class OnboardingField extends PureComponent {
  static propTypes = {
    field: fieldProps.isRequired,
    value: PropTypes.any, // eslint-disable-line
    isSubmitting: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
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
