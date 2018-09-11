import React from 'react';

import { NavLink } from 'react-router-dom';

const AnonimousNavigation = () => (
  <div className="gem-nav">
    <NavLink
      to="/login"
      className="gem-nav-link"
      activeClassName="gem-nav-active"
    >
      Login
    </NavLink>
    <NavLink
      to="/signup"
      className="gem-nav-link"
      activeClassName="gem-nav-active"
    >
      Signup
    </NavLink>
  </div>
);

export default AnonimousNavigation;
