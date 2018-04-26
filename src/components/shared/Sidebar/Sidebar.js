import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { worker as workerProps, stats as statsProps } from '../propTypes';

import Navigation from './Navigation';

import styles from './Sidebar.styles';

export default class Sidebar extends PureComponent {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    isAuthorized: null,
    worker: null,
  }

  render() {
    const {
      isAuthorized,
      isJoined,
      worker,
      stats,
      visible,
    } = this.props;

    return (
      <div className={cn(styles.sideBar.toString(), { [styles.ib]: visible })} >
        <img className={styles.logo} src="/images/logo.svg" alt="Gems" />
        <Navigation
          isAuthorized={isAuthorized}
          isJoined={isJoined}
          worker={worker}
          stats={stats}
        />
      </div>
    );
  }
}
