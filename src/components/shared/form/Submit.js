import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { fieldProps } from '../propTypes';

import UISubmit from './ui/Submit';
import Alignment from './ui/Alignment';


export default class Submit extends PureComponent {
  static propTypes = {
    field: PropTypes.shape(fieldProps).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { field, isSubmitting, onSubmit } = this.props;
    return (
      <Alignment padding="small" >
        <UISubmit
          caption={field.caption}
          theme={field.theme}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </Alignment>
    );
  }
}
