import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Module, moduleProps } from '@gemsorg/components/modules';

import Rules from './Rules';
import QA from './QA/QA';

import OnboardingModuleTypes from './OnboardingModuleTypes';

export default class OnboardingModule extends PureComponent {
  static propTypes = {
    module: moduleProps.isRequired,
    contextData: PropTypes.object.isRequired, // eslint-disable-line
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
      module, value, onChange, isSubmitting, onSubmit, contextData,
    } = this.props;

    switch (module.type) {
      case OnboardingModuleTypes.rules:
        return <Rules module={module} value={value} onChange={onChange} />;
      case OnboardingModuleTypes.qa:
        return (
          <QA
            module={module}
            value={value}
            onChange={onChange}
            contextData={contextData}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        break;
    }
    return <Module {...this.props} />;
  }
}
