import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import './Sidebar.styl';

export default class Sidebar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  render() {
    const { visible } = this.props;
    return (
      <div className={cn('gem-sidebar', { 'gem-sidebar-visible': visible })}>
        <Link to="/">
          <img className="gem-sidebar-logo" src="/images/logo.svg" alt="Expand" />
        </Link>
        <Navigation />
      </div>
    );
  }
}
