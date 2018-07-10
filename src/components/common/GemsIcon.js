import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './GemsIcon.styl';

const Gems = ({ className }) =>
  <ins className={cn('gem-gemicon', className)} alt="Gems" />;

Gems.propTypes = {
  className: PropTypes.string,
};

Gems.defaultProps = {
  className: null,
};

export default Gems;
