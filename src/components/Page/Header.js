import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Hamburger from '../common/Hamburger';

import styles from './Header.module.styl';

export default class Header extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const { collapsed, onToggle } = this.props;
    return (
      <div className={styles.container} >
        <Hamburger
          className={cn(styles.toggle, { [styles.opened]: collapsed })}
          active={collapsed}
          onToggle={onToggle}
        />
        <img src="/images/mobile-logo.png" className={styles.logo} alt="Gems" />
      </div>
    );
  }
}
