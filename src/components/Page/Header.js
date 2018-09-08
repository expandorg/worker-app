import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Hamburger } from '@gemsorg/components';

import './Header.styl';

export default class Header extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const { collapsed, onToggle } = this.props;
    return (
      <div className="gem-header">
        <Hamburger
          className={cn('gem-header-toggle', {
            'gem-header-opened': collapsed,
          })}
          active={collapsed}
          onToggle={onToggle}
        />
        <img
          className="gem-header-logo"
          src="/images/mobile-logo.png"
          alt="Gems"
        />
      </div>
    );
  }
}
