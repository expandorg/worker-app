import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './GemsIcon.styl';

const GemsIcon = ({ className }) =>
  <ins className={cn('gem-gemicon', className)} alt="Gems" />;

GemsIcon.propTypes = {
  className: PropTypes.string,
};

GemsIcon.defaultProps = {
  className: null,
};

export default GemsIcon;
