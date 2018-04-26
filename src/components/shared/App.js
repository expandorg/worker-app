import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { worker as workerProps, stats as statsProps } from '../../schemas';
import InstallMetaMaskModal from '../InstallMetaMaskModal';

import Navigation from './Navigation/Navigation';
import Hamburger from './Hamburger';

import styles from './App.styles';

export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.string,
    fetchAuth: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    metamask: PropTypes.bool,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    error: null,
    isAuthorized: null,
    metamask: true,
    worker: null,
  }

  state = {
    sidebar: false,
  }

  componentDidMount() {
    this.props.fetchAuth();
  }

  closeError = () => {
    this.props.setError(null);
  }

  toggleSidebar = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  }

  render() {
    const {
      metamask,
      isAuthorized,
      isJoined,
      worker,
      stats,
      children,
      title,
    } = this.props;

    const { sidebar } = this.state;
    return (
      <div className={styles.app}>
        {!metamask &&
          <InstallMetaMaskModal />
        }
        <div className={cn(styles.mobileHeader.toString(), { [styles.sbw]: sidebar })} >
          <Hamburger onClick={this.toggleSidebar} />
          <div className={styles.mobileLogoContainer}>
            <img className={styles.mobileLogo} src="../images/mobile-logo.png" alt="Gems" />
          </div>
        </div>
        <div className={cn(styles.sideBar.toString(), { [styles.ib]: sidebar })} >
          <img className={styles.logo} src="../images/logo.svg" alt="Gems" />
          <Navigation
            isAuthorized={isAuthorized}
            isJoined={isJoined}
            worker={worker}
            stats={stats}
          />
        </div>
        <div className={cn(styles.container.toString(), { [styles.sbw]: sidebar })}>
          {this.props.error !== null && this.state.error && (
            <div className={styles.error}>
              {this.props.error}
              <button href="#" className={styles.closeBtn} onClick={this.closeError}>
                X
              </button>
            </div>
            )
          }
          <div className={styles.title}>
            <span className={styles.titleText}>{title}</span>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
