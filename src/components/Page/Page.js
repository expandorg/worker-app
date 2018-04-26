import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { worker as workerProps, stats as statsProps } from '../shared/propTypes';
import InstallMetaMaskModal from './InstallMetaMaskModal';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

import ErrorMessage from '../common/ErrorMessage';

import styles from './Page.styles';

export default class Page extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.string,
    fetchAuth: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
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

  handleClearError = () => {
    this.props.setError(null);
  }

  handleToggleSidebar = () => {
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
      error,
    } = this.props;

    const { sidebar } = this.state;

    return (
      <div className={styles.app}>
        <Header
          collapsed={sidebar}
          onToggle={this.handleToggleSidebar}
        />
        <Sidebar
          visible={sidebar}
          isAuthorized={isAuthorized}
          isJoined={isJoined}
          worker={worker}
          stats={stats}
        />
        <div className={cn(styles.container.toString(), { [styles.sbw]: sidebar })}>
          {error !== null &&
            <ErrorMessage error={error} onClose={this.handleClearError} />
          }
          {children}
        </div>
        {!metamask &&
          <InstallMetaMaskModal />
        }
      </div>
    );
  }
}
