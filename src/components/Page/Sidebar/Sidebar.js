import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import styles from './Sidebar.module.styl';

export default class Sidebar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const { visible } = this.props;
    return (
      <div className={cn(styles.container, { [styles.visible]: visible })} >
        <Link to="/">
          <img className={styles.logo} src="/images/logo.svg" alt="Gems" />
        </Link>
        <Navigation />
      </div>
    );
  }
}
