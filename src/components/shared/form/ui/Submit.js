import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

export default class Submit extends Component {
  static propTypes = {
    caption: PropTypes.string,
    theme: PropTypes.string,
    size: PropTypes.string,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    caption: 'Next',
    theme: 'pink',
    size: 'large',
  }

  render() {
    const {
      caption, isSubmitting, onSubmit, theme, size,
    } = this.props;
    return (
      <Button
        onClick={onSubmit}
        size={size}
        theme={theme}
        type="submit"
        disabled={isSubmitting}
      >
        {caption}
      </Button>
    );
  }
}
