
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Tooltip.styl';

export default (WrappedComponent) => {
  class Tooltip extends Component {
    static propTypes = {
      tooltipPosition: PropTypes.oneOf(['left', 'right', 'center']),
      tooltipOrientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
      tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }

    static defaultProps = {
      tooltip: null,
      tooltipPosition: 'center',
      tooltipOrientation: 'top',
    }

    state = {
      visible: false,
    }

    handleMouseEnter = () => {
      this.setState({ visible: true });
    }

    handleMouseLeave = () => {
      this.setState({ visible: false });
    }

    render() {
      const {
        tooltip, tooltipPosition, children, tooltipOrientation, ...rest
      } = this.props;
      const className = cn(
        'gem-tooltip',
        `gem-tooltip-orientation-${tooltipOrientation}`,
        { [`gem-tooltip-position-${tooltipPosition}`]: tooltipOrientation !== 'left' && tooltipOrientation !== 'right' },
      );

      const childProps = {
        ...rest,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      };

      return (
        <WrappedComponent {...childProps}>
          {children}
          {this.state.visible && tooltip &&
            <div className={className}>{tooltip}</div>
          }
        </WrappedComponent>
      );
    }
  }
  return Tooltip;
};
