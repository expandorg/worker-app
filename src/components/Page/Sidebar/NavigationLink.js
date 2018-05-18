import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './NavigationLink.module.styl';

const NavigationLink = ({ to, label }) => (
  <li>
    <NavLink exact to={to} className={styles.link} activeClassName={styles.active} >
      {label}
    </NavLink>
  </li>
);

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavigationLink;
