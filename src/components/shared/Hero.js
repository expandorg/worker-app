import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as GemsIcon } from '../assets/gem.svg';

import './Hero.styl';

const Hero = ({ className, value, title, gems }) => (
  <div className={cn('gem-hero', className)}>
    <div className="gem-hero-value">
      {value || '0'}
      {gems && (
        <div className="gem-hero-gems">
          <GemsIcon className="gem-hero-icon" />{' '}
        </div>
      )}
    </div>
    <div className="gem-hero-title">{title}</div>
  </div>
);

Hero.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  gems: PropTypes.bool,
  className: PropTypes.string,
};

Hero.defaultProps = {
  value: null,
  gems: false,
  title: null,
  className: null,
};

export default Hero;
