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
      <div className={cn(styles.header, { [styles.sbw]: collapsed })} >
        <Hamburger onClick={onToggle} />
        <div className={styles.container}>
          <img
            className={styles.logo}
            src="/images/mobile-logo.png"
            alt="Gems"
          />
        </div>
      </div>
    );
  }
}
