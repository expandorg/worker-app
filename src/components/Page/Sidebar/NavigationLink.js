import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';

import styles from './NavigationLink.styles';

const NavigationLink = ({ to, label }) => {
  const NavComponent = to === '/' ? IndexLink : Link;
  return (
    <li>
      <NavComponent
        to={to}
        className={styles.link}
        activeClassName={styles.active.toString()}
      >
        {label}
      </NavComponent>
    </li>
  );
};

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavigationLink;
